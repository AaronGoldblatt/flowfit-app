import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  json,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { profiles } from "./profiles";

export const workoutTemplates = pgTable("workout_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // in minutes
  intensity: text("intensity", { enum: ["low", "medium", "high"] }).notNull(),
  caloriesMin: integer("calories_min").notNull(),
  caloriesMax: integer("calories_max").notNull(),
  exercises: json("exercises").$type<string[]>().notNull(),
  phase: text("phase", {
    enum: ["menstrual", "follicular", "ovulation", "luteal", "pregnancy"],
  }),
  trimester: text("trimester", { enum: ["first", "second", "third"] }),
  fitnessLevel: text("fitness_level", {
    enum: ["beginner", "intermediate", "advanced"],
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workoutLogs = pgTable("workout_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  workoutTemplateId: uuid("workout_template_id").references(
    () => workoutTemplates.id,
    { onDelete: "set null" }
  ),
  workoutTitle: text("workout_title").notNull(),
  date: date("date").notNull(),
  duration: integer("duration"), // actual duration in minutes
  completed: boolean("completed").default(true).notNull(),
  caloriesBurned: integer("calories_burned"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Validation schemas
export const insertWorkoutTemplateSchema = createInsertSchema(
  workoutTemplates,
  {
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.number().int().min(1),
    intensity: z.enum(["low", "medium", "high"]),
    caloriesMin: z.number().int().min(0),
    caloriesMax: z.number().int().min(0),
    exercises: z.array(z.string()),
    phase: z
      .enum(["menstrual", "follicular", "ovulation", "luteal", "pregnancy"])
      .optional(),
    trimester: z.enum(["first", "second", "third"]).optional(),
    fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  }
);

export const insertWorkoutLogSchema = createInsertSchema(workoutLogs, {
  workoutTitle: z.string().min(1, "Workout title is required"),
  date: z.string().transform((val) => new Date(val)),
  duration: z.number().int().min(1).optional(),
  completed: z.boolean().default(true),
  caloriesBurned: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

export const selectWorkoutTemplateSchema =
  createSelectSchema(workoutTemplates);
export const selectWorkoutLogSchema = createSelectSchema(workoutLogs);

export const updateWorkoutTemplateSchema = insertWorkoutTemplateSchema
  .partial()
  .omit({
    id: true,
    createdAt: true,
  });

export const updateWorkoutLogSchema = insertWorkoutLogSchema.partial().omit({
  id: true,
  profileId: true,
  createdAt: true,
});

export type WorkoutTemplate = typeof workoutTemplates.$inferSelect;
export type InsertWorkoutTemplate = z.infer<
  typeof insertWorkoutTemplateSchema
>;
export type UpdateWorkoutTemplate = z.infer<
  typeof updateWorkoutTemplateSchema
>;

export type WorkoutLog = typeof workoutLogs.$inferSelect;
export type InsertWorkoutLog = z.infer<typeof insertWorkoutLogSchema>;
export type UpdateWorkoutLog = z.infer<typeof updateWorkoutLogSchema>;

