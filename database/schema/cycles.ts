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

export const cycles = pgTable("cycles", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  lastPeriodDate: date("last_period_date").notNull(),
  cycleLength: integer("cycle_length").default(28).notNull(),
  periodLength: integer("period_length").default(5).notNull(),
  isActive: text("is_active").$type<boolean>().default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const symptomLogs = pgTable("symptom_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  symptoms: json("symptoms").$type<string[]>().default([]).notNull(),
  mood: text("mood"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Validation schemas
export const insertCycleSchema = createInsertSchema(cycles, {
  lastPeriodDate: z.string().transform((val) => new Date(val)),
  cycleLength: z.number().int().min(21).max(35).default(28),
  periodLength: z.number().int().min(2).max(10).default(5),
});

export const insertSymptomLogSchema = createInsertSchema(symptomLogs, {
  date: z.string().transform((val) => new Date(val)),
  symptoms: z.array(z.string()).default([]),
  mood: z.string().optional(),
  notes: z.string().optional(),
});

export const selectCycleSchema = createSelectSchema(cycles);
export const selectSymptomLogSchema = createSelectSchema(symptomLogs);

export const updateCycleSchema = insertCycleSchema.partial().omit({
  id: true,
  profileId: true,
  createdAt: true,
});

export const updateSymptomLogSchema = insertSymptomLogSchema.partial().omit({
  id: true,
  profileId: true,
  createdAt: true,
});

export type Cycle = typeof cycles.$inferSelect;
export type InsertCycle = z.infer<typeof insertCycleSchema>;
export type UpdateCycle = z.infer<typeof updateCycleSchema>;

export type SymptomLog = typeof symptomLogs.$inferSelect;
export type InsertSymptomLog = z.infer<typeof insertSymptomLogSchema>;
export type UpdateSymptomLog = z.infer<typeof updateSymptomLogSchema>;

