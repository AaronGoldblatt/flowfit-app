"use server";

import { db } from "@/database";
import {
  workoutLogs,
  workoutTemplates,
  insertWorkoutLogSchema,
  type InsertWorkoutLog,
  type WorkoutTemplate,
} from "@/database/schema/workouts";
import { profiles } from "@/database/schema/profiles";
import { getCurrentUserId } from "@/lib/server-auth";
import { eq, and, desc, gte, sql } from "drizzle-orm";
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
 * Get recommended workouts based on cycle phase and fitness level
 */
export async function getRecommendedWorkouts(
  phase?: string,
  fitnessLevel?: string,
  trimester?: string,
  limit = 3
) {
  try {
    let query = db.select().from(workoutTemplates);

    // Build conditions
    const conditions = [];

    if (phase) {
      conditions.push(eq(workoutTemplates.phase, phase));
    }

    if (trimester) {
      conditions.push(eq(workoutTemplates.trimester, trimester));
    }

    if (fitnessLevel) {
      conditions.push(
        sql`(${workoutTemplates.fitnessLevel} = ${fitnessLevel} OR ${workoutTemplates.fitnessLevel} IS NULL)`
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const templates = await query;

    // Shuffle and return random selection
    const shuffled = templates.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, limit);

    return {
      error: null,
      data: selected,
    };
  } catch (error) {
    console.error("Get recommended workouts error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to get recommended workouts",
      data: [],
    };
  }
}

/**
 * Get a single random workout to replace another
 */
export async function getAlternativeWorkout(
  phase?: string,
  fitnessLevel?: string,
  trimester?: string,
  excludeIds?: string[]
) {
  try {
    let query = db.select().from(workoutTemplates);

    // Build conditions
    const conditions = [];

    if (phase) {
      conditions.push(eq(workoutTemplates.phase, phase));
    }

    if (trimester) {
      conditions.push(eq(workoutTemplates.trimester, trimester));
    }

    if (fitnessLevel) {
      conditions.push(
        sql`(${workoutTemplates.fitnessLevel} = ${fitnessLevel} OR ${workoutTemplates.fitnessLevel} IS NULL)`
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    let templates = await query;

    // Filter out all excluded workouts
    if (excludeIds && excludeIds.length > 0) {
      templates = templates.filter(t => !excludeIds.includes(t.id));
    }

    // Return a random workout
    if (templates.length === 0) {
      return {
        error: "No alternative workouts found",
        data: null,
      };
    }

    const randomIndex = Math.floor(Math.random() * templates.length);
    const selected = templates[randomIndex];

    return {
      error: null,
      data: selected,
    };
  } catch (error) {
    console.error("Get alternative workout error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to get alternative workout",
      data: null,
    };
  }
}

/**
 * Log a completed workout
 */
export async function logWorkout(data: InsertWorkoutLog) {
  try {
    const profileId = await getProfileId();

    // Validate input
    const validatedData = insertWorkoutLogSchema.parse({
      ...data,
      profileId,
    });

    // Create workout log
    const [log] = await db
      .insert(workoutLogs)
      .values(validatedData)
      .returning();

    revalidatePath("/");

    return {
      error: null,
      data: log,
    };
  } catch (error) {
    console.error("Log workout error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to log workout",
      data: null,
    };
  }
}

/**
 * Get workout logs
 */
export async function getWorkoutLogs(limit = 30) {
  try {
    const profileId = await getProfileId();

    // Remove with query since relations are not defined
    const logs = await db.query.workoutLogs.findMany({
      where: eq(workoutLogs.profileId, profileId),
      orderBy: [desc(workoutLogs.date)],
      limit,
    });

    return {
      error: null,
      data: logs,
    };
  } catch (error) {
    console.error("Get workout logs error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to get workout logs",
      data: [],
    };
  }
}

/**
 * Get workout statistics
 */
export async function getWorkoutStats(days = 7) {
  try {
    const profileId = await getProfileId();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await db.query.workoutLogs.findMany({
      where: and(
        eq(workoutLogs.profileId, profileId),
        gte(workoutLogs.date, startDate.toISOString().split("T")[0])
      ),
    });

    const stats = {
      totalWorkouts: logs.length,
      totalCalories: logs.reduce((sum, log) => sum + (log.caloriesBurned || 0), 0),
      totalDuration: logs.reduce((sum, log) => sum + (log.duration || 0), 0),
      streak: 0, // Calculate streak
    };

    // Calculate streak
    let currentStreak = 0;
    let checkDate = new Date();
    const logDates = new Set(logs.map((log) => log.date));

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (logDates.has(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    stats.streak = currentStreak;

    return {
      error: null,
      data: stats,
    };
  } catch (error) {
    console.error("Get workout stats error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to get workout stats",
      data: null,
    };
  }
}

/**
 * Delete a workout log
 */
export async function deleteWorkoutLog(id: string) {
  try {
    const profileId = await getProfileId();

    await db
      .delete(workoutLogs)
      .where(
        and(eq(workoutLogs.id, id), eq(workoutLogs.profileId, profileId))
      );

    revalidatePath("/");

    return {
      error: null,
      data: true,
    };
  } catch (error) {
    console.error("Delete workout log error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete workout log",
      data: null,
    };
  }
}

