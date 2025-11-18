"use server";

import { db } from "@/database";
import {
  profiles,
  insertProfileSchema,
  updateProfileSchema,
  type InsertProfile,
  type UpdateProfile,
} from "@/database/schema/profiles";
import { getCurrentUserId } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Create a new profile for the current user
 */
export async function createProfile(data: InsertProfile) {
  try {
    const userId = await getCurrentUserId();

    // Validate input
    const validatedData = insertProfileSchema.parse({
      ...data,
      userId,
    });

    // Check if profile already exists
    const existing = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    if (existing) {
      return {
        error: "Profile already exists",
        data: null,
      };
    }

    // Create profile
    const [profile] = await db
      .insert(profiles)
      .values(validatedData)
      .returning();

    revalidatePath("/");

    return {
      error: null,
      data: profile,
    };
  } catch (error) {
    console.error("Create profile error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create profile",
      data: null,
    };
  }
}

/**
 * Get the current user's profile
 */
export async function getProfile() {
  try {
    const userId = await getCurrentUserId();

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    return {
      error: null,
      data: profile || null,
    };
  } catch (error) {
    console.error("Get profile error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to get profile",
      data: null,
    };
  }
}

/**
 * Update the current user's profile
 */
export async function updateProfile(data: UpdateProfile) {
  try {
    const userId = await getCurrentUserId();

    // Validate input
    const validatedData = updateProfileSchema.parse(data);

    // Update profile
    const [updated] = await db
      .update(profiles)
      .set(validatedData)
      .where(eq(profiles.userId, userId))
      .returning();

    if (!updated) {
      return {
        error: "Profile not found",
        data: null,
      };
    }

    revalidatePath("/");

    return {
      error: null,
      data: updated,
    };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to update profile",
      data: null,
    };
  }
}

/**
 * Delete the current user's profile
 */
export async function deleteProfile() {
  try {
    const userId = await getCurrentUserId();

    await db.delete(profiles).where(eq(profiles.userId, userId));

    revalidatePath("/");

    return {
      error: null,
      data: true,
    };
  } catch (error) {
    console.error("Delete profile error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to delete profile",
      data: null,
    };
  }
}

