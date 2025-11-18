import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique(),
  name: text("name").notNull(),
  age: integer("age"),
  fitnessLevel: text("fitness_level", {
    enum: ["beginner", "intermediate", "advanced"],
  }).notNull(),
  goals: json("goals").$type<string[]>().default([]).notNull(),
  mode: text("mode", { enum: ["cycle", "pregnancy"] })
    .default("cycle")
    .notNull(),
  trimester: text("trimester", { enum: ["first", "second", "third"] }),
  privacySettings: json("privacy_settings")
    .$type<{ shareData: boolean }>()
    .default({ shareData: false })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Validation schemas
export const insertProfileSchema = createInsertSchema(profiles, {
  name: z.string().min(1, "Name is required"),
  age: z.number().int().min(13).max(120).optional(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.array(z.string()).default([]),
  mode: z.enum(["cycle", "pregnancy"]).default("cycle"),
  trimester: z.enum(["first", "second", "third"]).optional(),
});

export const selectProfileSchema = createSelectSchema(profiles);
export const updateProfileSchema = insertProfileSchema.partial().omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;

