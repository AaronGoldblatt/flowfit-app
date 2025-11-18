"use server";

import { db } from "@/database";
import {
  nutritionLogs,
  nutritionGoals,
  insertNutritionLogSchema,
  insertNutritionGoalSchema,
  updateNutritionGoalSchema,
  type InsertNutritionLog,
  type InsertNutritionGoal,
  type UpdateNutritionGoal,
} from "@/database/schema/nutrition";
import { profiles } from "@/database/schema/profiles";
import { getCurrentUserId } from "@/lib/server-auth";
import { eq, and, desc, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Get user's profile ID
 */
async function getProfileId() {
  const userId = await getCurrentUserId();
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile.id;
}

/**
 * Create a nutrition log
 */
export async function createNutritionLog(data: InsertNutritionLog) {
  try {
    const profileId = await getProfileId();

    // Validate input
    const validatedData = insertNutritionLogSchema.parse({
      ...data,
      profileId,
    });

    // Create nutrition log
    const [log] = await db
      .insert(nutritionLogs)
      .values(validatedData)
      .returning();

    revalidatePath("/");

    return {
      error: null,
      data: log,
    };
  } catch (error) {
    console.error("Create nutrition log error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create nutrition log",
      data: null,
    };
  }
}

/**
 * Get nutrition logs
 */
export async function getNutritionLogs(limit = 30) {
  try {
    const profileId = await getProfileId();

    const logs = await db.query.nutritionLogs.findMany({
      where: eq(nutritionLogs.profileId, profileId),
      orderBy: [desc(nutritionLogs.date)],
      limit,
    });

    return {
      error: null,
      data: logs,
    };
  } catch (error) {
    console.error("Get nutrition logs error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to get nutrition logs",
      data: [],
    };
  }
}

/**
 * Get nutrition logs for a specific date
 */
export async function getNutritionLogsByDate(date: string) {
  try {
    const profileId = await getProfileId();

    const logs = await db.query.nutritionLogs.findMany({
      where: and(
        eq(nutritionLogs.profileId, profileId),
        eq(nutritionLogs.date, date)
      ),
      orderBy: [desc(nutritionLogs.createdAt)],
    });

    return {
      error: null,
      data: logs,
    };
  } catch (error) {
    console.error("Get nutrition logs by date error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to get nutrition logs for date",
      data: [],
    };
  }
}

/**
 * Delete a nutrition log
 */
export async function deleteNutritionLog(id: string) {
  try {
    const profileId = await getProfileId();

    await db
      .delete(nutritionLogs)
      .where(
        and(eq(nutritionLogs.id, id), eq(nutritionLogs.profileId, profileId))
      );

    revalidatePath("/");

    return {
      error: null,
      data: true,
    };
  } catch (error) {
    console.error("Delete nutrition log error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete nutrition log",
      data: null,
    };
  }
}

/**
 * Create or update nutrition goals
 */
export async function upsertNutritionGoals(
  data: InsertNutritionGoal | UpdateNutritionGoal
) {
  try {
    const profileId = await getProfileId();

    // Validate input
    const validatedData = insertNutritionGoalSchema.parse({
      ...data,
      profileId,
    });

    // Check if goals already exist
    const existing = await db.query.nutritionGoals.findFirst({
      where: eq(nutritionGoals.profileId, profileId),
    });

    let result;
    if (existing) {
      // Update existing goals
      [result] = await db
        .update(nutritionGoals)
        .set(validatedData)
        .where(eq(nutritionGoals.id, existing.id))
        .returning();
    } else {
      // Create new goals
      [result] = await db
        .insert(nutritionGoals)
        .values(validatedData)
        .returning();
    }

    revalidatePath("/");

    return {
      error: null,
      data: result,
    };
  } catch (error) {
    console.error("Upsert nutrition goals error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to save nutrition goals",
      data: null,
    };
  }
}

/**
 * Get nutrition goals
 */
export async function getNutritionGoals() {
  try {
    const profileId = await getProfileId();

    const goals = await db.query.nutritionGoals.findFirst({
      where: eq(nutritionGoals.profileId, profileId),
    });

    return {
      error: null,
      data: goals || null,
    };
  } catch (error) {
    console.error("Get nutrition goals error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to get nutrition goals",
      data: null,
    };
  }
}

/**
 * Get nutrition statistics
 */
export async function getNutritionStats(date: string) {
  try {
    const profileId = await getProfileId();

    const logs = await db.query.nutritionLogs.findMany({
      where: and(
        eq(nutritionLogs.profileId, profileId),
        eq(nutritionLogs.date, date)
      ),
    });

    const stats = {
      totalCalories: logs.reduce((sum, log) => sum + (log.calories || 0), 0),
      totalProtein: logs.reduce((sum, log) => sum + (log.protein || 0), 0),
      totalCarbs: logs.reduce((sum, log) => sum + (log.carbs || 0), 0),
      totalFat: logs.reduce((sum, log) => sum + (log.fat || 0), 0),
      totalWater: logs.reduce((sum, log) => sum + (log.waterIntake || 0), 0),
      mealCount: logs.length,
    };

    return {
      error: null,
      data: stats,
    };
  } catch (error) {
    console.error("Get nutrition stats error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to get nutrition stats",
      data: null,
    };
  }
}

