"use server";

import { db } from "@/database";
import { user, account } from "@/database/schema/auth";
import { getCurrentUserId } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { hash, verify } from "@node-rs/argon2";

/**
 * Update user information (name, email)
 */
export async function updateUserInfo(data: { name: string; email: string }) {
  try {
    const userId = await getCurrentUserId();

    // Validate input
    if (!data.name || data.name.trim().length === 0) {
      return {
        error: "Name is required",
        data: null,
      };
    }

    if (!data.email || !data.email.includes("@")) {
      return {
        error: "Valid email is required",
        data: null,
      };
    }

    // Check if email is already taken by another user
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    });

    if (existingUser && existingUser.id !== userId) {
      return {
        error: "Email is already in use by another account",
        data: null,
      };
    }

    // Update user
    const [updatedUser] = await db
      .update(user)
      .set({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning();

    if (!updatedUser) {
      return {
        error: "Failed to update user information",
        data: null,
      };
    }

    revalidatePath("/");

    return {
      error: null,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Update user info error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to update user information",
      data: null,
    };
  }
}

/**
 * Change user password
 */
export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const userId = await getCurrentUserId();

    // Validate input
    if (!data.currentPassword || !data.newPassword) {
      return {
        error: "Both current and new password are required",
        data: null,
      };
    }

    if (data.newPassword.length < 8) {
      return {
        error: "New password must be at least 8 characters long",
        data: null,
      };
    }

    if (data.newPassword.length > 128) {
      return {
        error: "New password must be at most 128 characters long",
        data: null,
      };
    }

    // Get user's account with password
    const userAccount = await db.query.account.findFirst({
      where: eq(account.userId, userId),
    });

    if (!userAccount || !userAccount.password) {
      return {
        error: "No password found for this account. You may be using social login.",
        data: null,
      };
    }

    // Verify current password
    const isValid = await verify(userAccount.password, data.currentPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!isValid) {
      return {
        error: "Current password is incorrect",
        data: null,
      };
    }

    // Hash new password
    const hashedPassword = await hash(data.newPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Update password
    await db
      .update(account)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(account.id, userAccount.id));

    revalidatePath("/");

    return {
      error: null,
      data: { success: true },
    };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to change password",
      data: null,
    };
  }
}

