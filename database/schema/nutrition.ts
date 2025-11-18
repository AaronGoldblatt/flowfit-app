import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  date,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { profiles } from "./profiles";

export const nutritionLogs = pgTable("nutrition_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  mealType: text("meal_type", {
    enum: ["breakfast", "lunch", "dinner", "snack"],
  }).notNull(),
  description: text("description").notNull(),
  calories: integer("calories"),
  protein: integer("protein"), // in grams
  carbs: integer("carbs"), // in grams
  fat: integer("fat"), // in grams
  waterIntake: integer("water_intake"), // in ml
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const nutritionGoals = pgTable("nutrition_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .unique()
    .references(() => profiles.id, { onDelete: "cascade" }),
  dailyCalories: integer("daily_calories"),
  dailyProtein: integer("daily_protein"), // in grams
  dailyCarbs: integer("daily_carbs"), // in grams
  dailyFat: integer("daily_fat"), // in grams
  dailyWater: integer("daily_water").default(2000), // in ml
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Validation schemas
export const insertNutritionLogSchema = createInsertSchema(nutritionLogs, {
  date: z.string().transform((val) => new Date(val)),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  description: z.string().min(1, "Description is required"),
  calories: z.number().int().min(0).optional(),
  protein: z.number().int().min(0).optional(),
  carbs: z.number().int().min(0).optional(),
  fat: z.number().int().min(0).optional(),
  waterIntake: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

export const insertNutritionGoalSchema = createInsertSchema(nutritionGoals, {
  dailyCalories: z.number().int().min(0).optional(),
  dailyProtein: z.number().int().min(0).optional(),
  dailyCarbs: z.number().int().min(0).optional(),
  dailyFat: z.number().int().min(0).optional(),
  dailyWater: z.number().int().min(0).default(2000),
});

export const selectNutritionLogSchema = createSelectSchema(nutritionLogs);
export const selectNutritionGoalSchema = createSelectSchema(nutritionGoals);

export const updateNutritionLogSchema = insertNutritionLogSchema
  .partial()
  .omit({
    id: true,
    profileId: true,
    createdAt: true,
  });

export const updateNutritionGoalSchema = insertNutritionGoalSchema
  .partial()
  .omit({
    id: true,
    profileId: true,
    createdAt: true,
  });

export type NutritionLog = typeof nutritionLogs.$inferSelect;
export type InsertNutritionLog = z.infer<typeof insertNutritionLogSchema>;
export type UpdateNutritionLog = z.infer<typeof updateNutritionLogSchema>;

export type NutritionGoal = typeof nutritionGoals.$inferSelect;
export type InsertNutritionGoal = z.infer<typeof insertNutritionGoalSchema>;
export type UpdateNutritionGoal = z.infer<typeof updateNutritionGoalSchema>;

