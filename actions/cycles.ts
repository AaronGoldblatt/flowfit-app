"use server";

import { db } from "@/database";
import {
  cycles,
  symptomLogs,
  insertCycleSchema,
  insertSymptomLogSchema,
  updateCycleSchema,
  updateSymptomLogSchema,
  type InsertCycle,
  type InsertSymptomLog,
  type UpdateCycle,
  type UpdateSymptomLog,
} from "@/database/schema/cycles";
import { profiles } from "@/database/schema/profiles";
import { getCurrentUserId } from "@/lib/server-auth";
import { eq, and, desc } from "drizzle-orm";
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
 * Create or update cycle data
 */
export async function upsertCycle(data: InsertCycle | UpdateCycle) {
  try {
    const profileId = await getProfileId();

    console.log("Server upsertCycle received:", data);

    // Validate input
    const validatedData = insertCycleSchema.parse({
      ...data,
      profileId,
    });

    console.log("Server validated data:", validatedData);

    // Check if an active cycle exists
    const existing = await db.query.cycles.findFirst({
      where: and(eq(cycles.profileId, profileId), eq(cycles.isActive, "true")),
    });

    let result;
    if (existing) {
      // Update existing cycle
      [result] = await db
        .update(cycles)
        .set(validatedData)
        .where(eq(cycles.id, existing.id))
        .returning();
    } else {
      // Create new cycle
      [result] = await db.insert(cycles).values(validatedData).returning();
    }

    console.log("Server saved to DB, result:", result);

    revalidatePath("/");

    return {
      error: null,
      data: result,
    };
  } catch (error) {
    console.error("Upsert cycle error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to save cycle data",
      data: null,
    };
  }
}

/**
 * Get current active cycle
 */
export async function getCurrentCycle() {
  try {
    const profileId = await getProfileId();

    const cycle = await db.query.cycles.findFirst({
      where: and(eq(cycles.profileId, profileId), eq(cycles.isActive, "true")),
    });

    return {
      error: null,
      data: cycle || null,
    };
  } catch (error) {
    console.error("Get cycle error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to get cycle data",
      data: null,
    };
  }
}

/**
 * Create a symptom log
 */
export async function createSymptomLog(data: InsertSymptomLog) {
  try {
    const profileId = await getProfileId();

    // Validate input
    const validatedData = insertSymptomLogSchema.parse({
      ...data,
      profileId,
    });

    // Check if log already exists for this date
    const existing = await db.query.symptomLogs.findFirst({
      where: and(
        eq(symptomLogs.profileId, profileId),
        eq(symptomLogs.date, validatedData.date)
      ),
    });

    let result;
    if (existing) {
      // Update existing log
      [result] = await db
        .update(symptomLogs)
        .set(validatedData)
        .where(eq(symptomLogs.id, existing.id))
        .returning();
    } else {
      // Create new log
      [result] = await db.insert(symptomLogs).values(validatedData).returning();
    }

    revalidatePath("/");

    return {
      error: null,
      data: result,
    };
  } catch (error) {
    console.error("Create symptom log error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create symptom log",
      data: null,
    };
  }
}

/**
 * Get symptom logs
 */
export async function getSymptomLogs(limit = 30) {
  try {
    const profileId = await getProfileId();

    const logs = await db.query.symptomLogs.findMany({
      where: eq(symptomLogs.profileId, profileId),
      orderBy: [desc(symptomLogs.date)],
      limit,
    });

    return {
      error: null,
      data: logs,
    };
  } catch (error) {
    console.error("Get symptom logs error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to get symptom logs",
      data: [],
    };
  }
}

/**
 * Delete a symptom log
 */
export async function deleteSymptomLog(id: string) {
  try {
    const profileId = await getProfileId();

    await db
      .delete(symptomLogs)
      .where(
        and(eq(symptomLogs.id, id), eq(symptomLogs.profileId, profileId))
      );

    revalidatePath("/");

    return {
      error: null,
      data: true,
    };
  } catch (error) {
    console.error("Delete symptom log error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete symptom log",
      data: null,
    };
  }
}

