/**
 * Seed the database with initial workout templates
 */

import { db } from "./index";
import { workoutTemplates } from "./schema/workouts";

const workoutData = [
  // Menstrual Phase Workouts
  {
    title: "Gentle Yoga Flow",
    description: "Restorative poses to ease cramps and promote relaxation",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Child's Pose", "Cat-Cow", "Supine Twist", "Legs Up the Wall"],
    phase: "menstrual" as const,
    fitnessLevel: null,
  },
  {
    title: "Light Walking",
    description: "Easy-paced walk to boost mood and circulation",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: ["Warm-up", "Steady pace walk", "Gentle stretching", "Cool down"],
    phase: "menstrual" as const,
    fitnessLevel: null,
  },
  {
    title: "Restorative Stretching",
    description: "Gentle stretches focusing on relaxation and pain relief",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 80,
    exercises: [
      "Hip Openers",
      "Spinal Twists",
      "Forward Folds",
      "Breathing Exercises",
    ],
    phase: "menstrual" as const,
    fitnessLevel: null,
  },

  // Follicular Phase Workouts
  {
    title: "HIIT Cardio Blast",
    description: "High-energy intervals to match your rising energy",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 300,
    exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers", "High Knees"],
    phase: "follicular" as const,
    fitnessLevel: null,
  },
  {
    title: "Strength Training",
    description: "Build muscle with compound movements",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 250,
    exercises: ["Squats", "Deadlifts", "Push-ups", "Rows"],
    phase: "follicular" as const,
    fitnessLevel: null,
  },
  {
    title: "Cardio & Core",
    description: "Dynamic cardio combined with core strengthening",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 220,
    caloriesMax: 270,
    exercises: [
      "Running Intervals",
      "Plank Variations",
      "Russian Twists",
      "Bicycle Crunches",
    ],
    phase: "follicular" as const,
    fitnessLevel: null,
  },

  // Ovulation Phase Workouts
  {
    title: "Power HIIT",
    description: "Maximum intensity for peak performance",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 300,
    caloriesMax: 350,
    exercises: [
      "Box Jumps",
      "Sprint Intervals",
      "Plyometric Push-ups",
      "Jump Squats",
    ],
    phase: "ovulation" as const,
    fitnessLevel: null,
  },
  {
    title: "Advanced Strength",
    description: "Heavy lifting at your peak strength",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 320,
    exercises: ["Barbell Squats", "Bench Press", "Pull-ups", "Overhead Press"],
    phase: "ovulation" as const,
    fitnessLevel: null,
  },
  {
    title: "Endurance Run",
    description: "Push your cardiovascular limits",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 350,
    caloriesMax: 450,
    exercises: [
      "Dynamic Warm-up",
      "Interval Running",
      "Hill Sprints",
      "Cool Down Jog",
    ],
    phase: "ovulation" as const,
    fitnessLevel: null,
  },

  // Luteal Phase Workouts
  {
    title: "Moderate Cardio",
    description: "Steady-state cardio to maintain fitness",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Jogging", "Cycling", "Rowing", "Elliptical"],
    phase: "luteal" as const,
    fitnessLevel: null,
  },
  {
    title: "Pilates Core",
    description: "Controlled movements for core strength",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Hundred", "Roll-up", "Plank variations", "Side leg lifts"],
    phase: "luteal" as const,
    fitnessLevel: null,
  },
  {
    title: "Yoga Strength Flow",
    description: "Build strength while maintaining mindfulness",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 200,
    exercises: [
      "Sun Salutations",
      "Warrior Poses",
      "Balance Poses",
      "Core Work",
    ],
    phase: "luteal" as const,
    fitnessLevel: null,
  },

  // Pregnancy - First Trimester
  {
    title: "Prenatal Yoga",
    description: "Gentle stretches safe for early pregnancy",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: [
      "Modified Sun Salutations",
      "Pelvic Tilts",
      "Cat-Cow",
      "Side Stretches",
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const,
  },
  {
    title: "Walking & Breathing",
    description: "Light cardio with breathing exercises",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: [
      "Warm-up walk",
      "Breathing practice",
      "Gentle pace",
      "Cool down",
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const,
  },

  // Pregnancy - Second Trimester
  {
    title: "Prenatal Strength",
    description: "Safe strength training for second trimester",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: [
      "Modified Squats",
      "Wall Push-ups",
      "Bicep Curls",
      "Lateral Raises",
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const,
  },
  {
    title: "Aqua Aerobics",
    description: "Low-impact water exercises",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 200,
    exercises: [
      "Water walking",
      "Leg lifts",
      "Arm circles",
      "Floating stretches",
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const,
  },

  // Pregnancy - Third Trimester
  {
    title: "Gentle Prenatal Flow",
    description: "Relaxing movements for late pregnancy",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: [
      "Pelvic Floor",
      "Hip Circles",
      "Gentle Stretches",
      "Relaxation",
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const,
  },
  {
    title: "Birth Prep Exercises",
    description: "Prepare your body for labor",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 110,
    exercises: ["Squats", "Pelvic Tilts", "Kegels", "Breathing Techniques"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing workout templates
    await db.delete(workoutTemplates);
    console.log("✅ Cleared existing workout templates");

    // Insert workout templates
    await db.insert(workoutTemplates).values(workoutData);
    console.log(`✅ Inserted ${workoutData.length} workout templates`);

    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();

