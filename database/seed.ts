/**
 * Seed the database with initial workout templates
 */

import { db } from "./index";
import { workoutTemplates } from "./schema/workouts";

const workoutData = [
  // ========== MENSTRUAL PHASE WORKOUTS (Low Intensity) ==========
  {
    title: "Gentle Yoga Flow",
    description: "Restorative poses to ease cramps and promote relaxation",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Child's Pose", "Cat-Cow", "Supine Twist", "Legs Up the Wall"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
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
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Restorative Stretching",
    description: "Gentle stretches focusing on relaxation and pain relief",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 80,
    exercises: ["Hip Openers", "Spinal Twists", "Forward Folds", "Breathing Exercises"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Yin Yoga for Cramps",
    description: "Deep tissue stretches held for extended periods",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Butterfly Pose", "Dragon Pose", "Sleeping Swan", "Banana Pose"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Mindful Walking Meditation",
    description: "Slow, intentional walking with breathwork",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 80,
    exercises: ["Breath Awareness", "Slow Walking", "Body Scan", "Gratitude Practice"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Gentle Pilates Mat",
    description: "Low-impact core work focusing on alignment",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 110,
    exercises: ["Pelvic Tilts", "Single Leg Stretch", "Spine Stretch", "Side Lying Leg Lifts"],
    phase: "menstrual" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Tai Chi Flow",
    description: "Flowing movements to promote energy circulation",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: ["Cloud Hands", "Wave Hands Like Clouds", "Part the Wild Horse's Mane", "Grasp the Bird's Tail"],
    phase: "menstrual" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Foam Rolling & Mobility",
    description: "Self-myofascial release and gentle mobility work",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 70,
    exercises: ["IT Band Roll", "Hip Flexor Release", "Thoracic Mobility", "Hamstring Roll"],
    phase: "menstrual" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Aqua Gentle Movement",
    description: "Water-based gentle exercises for minimal impact",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 110,
    caloriesMax: 130,
    exercises: ["Water Walking", "Gentle Leg Swings", "Arm Circles", "Floating Stretch"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Breathwork & Meditation",
    description: "Pranayama and meditation for pain management",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: ["Box Breathing", "Alternate Nostril Breathing", "Body Scan Meditation", "Guided Visualization"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },

  // ========== FOLLICULAR PHASE WORKOUTS (Rising Energy) ==========
  {
    title: "HIIT Cardio Blast",
    description: "High-energy intervals to match your rising energy",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 300,
    exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers", "High Knees"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Full Body Strength",
    description: "Build muscle with compound movements",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 250,
    exercises: ["Squats", "Deadlifts", "Push-ups", "Rows"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Cardio & Core",
    description: "Dynamic cardio combined with core strengthening",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 220,
    caloriesMax: 270,
    exercises: ["Running Intervals", "Plank Variations", "Russian Twists", "Bicycle Crunches"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Beginner Strength Builder",
    description: "Introduction to strength training with bodyweight",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Bodyweight Squats", "Wall Push-ups", "Glute Bridges", "Assisted Lunges"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Dance Cardio Party",
    description: "Fun, high-energy dance movements",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 230,
    caloriesMax: 280,
    exercises: ["Grapevine Steps", "Hip Shakes", "Body Rolls", "Jump Combinations"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Lower Body Power",
    description: "Build strength in legs and glutes",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 290,
    exercises: ["Bulgarian Split Squats", "Deadlifts", "Leg Press", "Calf Raises"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Upper Body Sculpt",
    description: "Target arms, shoulders, chest, and back",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Dumbbell Press", "Bent-Over Rows", "Bicep Curls", "Tricep Dips"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Kickboxing Cardio",
    description: "High-energy punches and kicks",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 310,
    exercises: ["Jab-Cross Combos", "Front Kicks", "Roundhouse Kicks", "Speed Bag"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Vinyasa Power Flow",
    description: "Dynamic yoga sequences building strength",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 230,
    exercises: ["Sun Salutation B", "Warrior Flow", "Chaturanga", "Arm Balances"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Circuit Training",
    description: "Rotating stations of strength and cardio",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 270,
    caloriesMax: 320,
    exercises: ["Jump Rope", "Kettlebell Swings", "Box Step-ups", "Battle Ropes"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Core & Stability",
    description: "Build a rock-solid core foundation",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 170,
    exercises: ["Dead Bug", "Bird Dog", "Plank to Pike", "Side Plank Rotations"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Spin Class Energy",
    description: "High-intensity cycling intervals",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 350,
    caloriesMax: 450,
    exercises: ["Warm-up Ride", "Hill Climbs", "Sprint Intervals", "Cool Down Spin"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Barre Burn",
    description: "Ballet-inspired isometric strength work",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Pliés", "Relevés", "Leg Lifts at Barre", "Core Pulses"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Plyometric Power",
    description: "Explosive jump training for power",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 330,
    exercises: ["Box Jumps", "Broad Jumps", "Tuck Jumps", "Skater Hops"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Rowing Intervals",
    description: "Full-body cardio on the rowing machine",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 300,
    exercises: ["Technique Drills", "500m Sprints", "Steady State Rows", "Power Strokes"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Functional Fitness",
    description: "Real-world movement patterns",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 240,
    exercises: ["Farmer's Carries", "Turkish Get-ups", "Sled Pushes", "Medicine Ball Slams"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Zumba Dance Fitness",
    description: "Latin-inspired dance cardio",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 300,
    caloriesMax: 350,
    exercises: ["Salsa Steps", "Merengue March", "Cumbia", "Reggaeton"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Athletic Conditioning",
    description: "Sport-specific agility and power",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 290,
    caloriesMax: 340,
    exercises: ["Ladder Drills", "Cone Drills", "Sprint Training", "Agility Hops"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Bodyweight HIIT",
    description: "No equipment needed high-intensity intervals",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 220,
    caloriesMax: 270,
    exercises: ["Squat Jumps", "Push-up to T", "Lunge Jumps", "Plank Jacks"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Strength & Stretch Combo",
    description: "Balanced workout with flexibility focus",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 250,
    exercises: ["Strength Circuits", "Active Stretching", "Mobility Drills", "Deep Stretches"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },

  // ========== OVULATION PHASE WORKOUTS (Peak Performance) ==========
  {
    title: "Power HIIT Max",
    description: "Maximum intensity for peak performance",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 300,
    caloriesMax: 350,
    exercises: ["Box Jumps", "Sprint Intervals", "Plyometric Push-ups", "Jump Squats"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Heavy Compound Lifts",
    description: "Heavy lifting at your peak strength",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 320,
    exercises: ["Barbell Squats", "Bench Press", "Pull-ups", "Overhead Press"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Endurance Run",
    description: "Push your cardiovascular limits",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 350,
    caloriesMax: 450,
    exercises: ["Dynamic Warm-up", "Interval Running", "Hill Sprints", "Cool Down Jog"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "CrossFit Style WOD",
    description: "High-intensity functional movements",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 320,
    caloriesMax: 380,
    exercises: ["Thrusters", "Pull-ups", "Box Jumps", "Burpees"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Tabata Extreme",
    description: "20 seconds on, 10 seconds off maximum effort",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 280,
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Olympic Lifting Focus",
    description: "Technical lifts for power development",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 300,
    caloriesMax: 350,
    exercises: ["Clean & Jerk", "Snatch", "Front Squats", "Push Press"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Bootcamp Challenge",
    description: "Military-style intense circuit training",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 340,
    caloriesMax: 400,
    exercises: ["Tire Flips", "Bear Crawls", "Burpee Pull-ups", "Sprint Drills"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Speed Training",
    description: "Maximize your running speed",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 290,
    caloriesMax: 340,
    exercises: ["Track Sprints", "Acceleration Drills", "Flying 40s", "Speed Endurance"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Power Lifting Session",
    description: "Max effort compound movements",
    duration: 50,
    intensity: "high" as const,
    caloriesMin: 310,
    caloriesMax: 360,
    exercises: ["Deadlifts 3x5", "Squats 3x5", "Bench Press 3x5", "Accessory Work"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Advanced Plyometrics",
    description: "Explosive power and athletic performance",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 330,
    exercises: ["Depth Jumps", "Bounding", "Single-Leg Hops", "Medicine Ball Throws"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Interval Cycling Peak",
    description: "High-power cycling intervals",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 360,
    caloriesMax: 440,
    exercises: ["Power Climbs", "All-Out Sprints", "Resistance Intervals", "Recovery Spins"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Battle Ropes & Bodyweight",
    description: "Intense upper body cardio and strength",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 310,
    exercises: ["Wave Slams", "Alternating Waves", "Power Slams", "Burpee Combos"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Long Distance Run",
    description: "Build endurance at peak cardiovascular fitness",
    duration: 60,
    intensity: "medium" as const,
    caloriesMin: 450,
    caloriesMax: 550,
    exercises: ["Warm-up Jog", "Tempo Run", "Steady State", "Cool Down"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Strength Supersets",
    description: "Paired exercises for maximum muscle stimulus",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 290,
    caloriesMax: 340,
    exercises: ["Squats + Lunges", "Chest Press + Rows", "Overhead Press + Pull-ups", "Core Circuit"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Kickboxing Fight Rounds",
    description: "Timed rounds of intense striking combos",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 310,
    caloriesMax: 370,
    exercises: ["Heavy Bag Rounds", "Speed Bag", "Combo Drills", "Conditioning"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Trail Running Adventure",
    description: "Challenging terrain running",
    duration: 50,
    intensity: "high" as const,
    caloriesMin: 400,
    caloriesMax: 480,
    exercises: ["Uphill Runs", "Technical Descents", "Varied Terrain", "Nature Intervals"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Ashtanga Yoga Full Primary",
    description: "Demanding yoga sequence for peak strength",
    duration: 60,
    intensity: "medium" as const,
    caloriesMin: 270,
    caloriesMax: 320,
    exercises: ["Sun Salutations", "Standing Sequence", "Seated Sequence", "Finishing Poses"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Swimming Power Laps",
    description: "High-intensity pool workout",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 330,
    caloriesMax: 390,
    exercises: ["Sprint Laps", "Freestyle Intervals", "Butterfly Sets", "Kick Sets"],
    phase: "ovulation" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Full Body Metabolic Circuit",
    description: "Non-stop movement for calorie burn",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 320,
    caloriesMax: 380,
    exercises: ["Kettlebell Swings", "Box Jumps", "Push-ups", "Slam Balls"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Peak Performance HIIT",
    description: "Ultimate high-intensity interval challenge",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 310,
    caloriesMax: 360,
    exercises: ["Assault Bike Sprints", "Burpees Over Bar", "Wall Balls", "Row Sprints"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },

  // ========== LUTEAL PHASE WORKOUTS (Moderate Intensity, Mindful) ==========
  {
    title: "Moderate Cardio Steady",
    description: "Steady-state cardio to maintain fitness",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Jogging", "Cycling", "Rowing", "Elliptical"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Pilates Core Flow",
    description: "Controlled movements for core strength",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Hundred", "Roll-up", "Plank Variations", "Side Leg Lifts"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Yoga Strength Flow",
    description: "Build strength while maintaining mindfulness",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 200,
    exercises: ["Sun Salutations", "Warrior Poses", "Balance Poses", "Core Work"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Steady State Cycling",
    description: "Comfortable pace bike workout",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 270,
    exercises: ["Warm-up Spin", "Zone 2 Riding", "Light Hills", "Cool Down"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Moderate Strength Maintenance",
    description: "Maintain muscle without overexertion",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 230,
    exercises: ["Moderate Weight Squats", "Dumbbell Press", "Cable Rows", "Leg Curls"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Hatha Yoga Balance",
    description: "Grounding yoga practice with holds",
    duration: 45,
    intensity: "low" as const,
    caloriesMin: 130,
    caloriesMax: 160,
    exercises: ["Tree Pose", "Triangle Pose", "Extended Side Angle", "Savasana"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Barre Sculpt",
    description: "Isometric toning and lengthening",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Thigh Work", "Seat Work", "Arm Toning", "Core Sequences"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Swimming Endurance",
    description: "Steady swimming for cardiovascular health",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 250,
    exercises: ["Lap Swimming", "Mixed Strokes", "Easy Pace", "Technique Focus"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Walking with Intervals",
    description: "Brisk walking with speed variations",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 190,
    exercises: ["Warm-up Walk", "Brisk Intervals", "Recovery Pace", "Cool Down"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Reformer Pilates",
    description: "Equipment-based pilates for control",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Footwork", "Long Stretch Series", "Arms", "Side Splits"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Low-Impact Cardio Dance",
    description: "Fun cardio without high impact",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Grapevine Steps", "Step Touch", "Arm Movements", "Cool Grooves"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Kettlebell Flow",
    description: "Controlled kettlebell movements",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 240,
    exercises: ["Goblet Squats", "Kettlebell Swings", "Turkish Get-ups", "Halos"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Stability & Balance Training",
    description: "Focus on proprioception and control",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 120,
    caloriesMax: 150,
    exercises: ["Single-Leg Balance", "Bosu Work", "Stability Ball", "Balance Board"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "TRX Suspension Training",
    description: "Bodyweight resistance with straps",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 230,
    exercises: ["TRX Rows", "Chest Press", "Squat Jumps", "Pike"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Gentle Power Yoga",
    description: "Yoga with moderate challenge",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Slow Vinyasa", "Warrior Sequences", "Hip Openers", "Twists"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Bodyweight Circuits",
    description: "Equipment-free strength maintenance",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Push-ups", "Squats", "Lunges", "Planks"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Elliptical Intervals",
    description: "Low-impact cardio with varying resistance",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 240,
    exercises: ["Warm-up", "Resistance Intervals", "Incline Work", "Cool Down"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Core & Flexibility Blend",
    description: "Balance core work with stretching",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Core Exercises", "Dynamic Stretches", "Static Holds", "Relaxation"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Aqua Fitness",
    description: "Water-based resistance training",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 240,
    exercises: ["Water Jogging", "Resistance Exercises", "Aqua Aerobics", "Pool Stretches"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Mind-Body Flow",
    description: "Integrated movement and awareness",
    duration: 35,
    intensity: "low" as const,
    caloriesMin: 140,
    caloriesMax: 170,
    exercises: ["Qigong", "Tai Chi", "Yoga", "Meditation"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },

  // ========== PREGNANCY - FIRST TRIMESTER ==========
  {
    title: "First Trimester Prenatal Yoga",
    description: "Gentle stretches safe for early pregnancy",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: ["Modified Sun Salutations", "Pelvic Tilts", "Cat-Cow", "Side Stretches"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Walking & Breathing",
    description: "Light cardio with breathing exercises",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Warm-up Walk", "Breathing Practice", "Gentle Pace", "Cool Down"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Gentle Prenatal Stretching",
    description: "Full body gentle stretches",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Neck Rolls", "Shoulder Stretches", "Hip Openers", "Ankle Circles"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Pilates Basics",
    description: "Core awareness and pelvic floor engagement",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: ["Pelvic Floor Exercises", "Modified Hundred", "Side-Lying Leg Work", "Breathing"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Low-Impact Cardio",
    description: "Gentle cardiovascular exercise",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 110,
    caloriesMax: 140,
    exercises: ["Marching in Place", "Side Steps", "Arm Circles", "Gentle Movement"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Chair Yoga",
    description: "Supported yoga using a chair",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Seated Twists", "Chair Pose Support", "Hip Stretches", "Relaxation"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Morning Energy Walk",
    description: "Energizing walk to combat fatigue",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: ["Warm-up Stroll", "Moderate Pace", "Nature Observation", "Gentle Cool Down"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Relaxation Flow",
    description: "Stress relief and body awareness",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 80,
    exercises: ["Deep Breathing", "Body Scan", "Gentle Movements", "Visualization"],
    phase: "pregnancy" as const,
    trimester: "first" as const,
    fitnessLevel: null,
  },

  // ========== PREGNANCY - SECOND TRIMESTER ==========
  {
    title: "Second Trimester Strength",
    description: "Safe strength training for second trimester",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Modified Squats", "Wall Push-ups", "Bicep Curls", "Lateral Raises"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Aqua Aerobics",
    description: "Low-impact water exercises",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 200,
    exercises: ["Water Walking", "Leg Lifts", "Arm Circles", "Floating Stretches"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Active Prenatal Yoga",
    description: "Moderate yoga flow for energy",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 170,
    exercises: ["Modified Warriors", "Prenatal Sun Salutations", "Standing Balances", "Hip Work"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Pregnancy Power Walking",
    description: "Brisk walking for cardiovascular health",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: ["Dynamic Warm-up", "Brisk Walking", "Hill Walking", "Cool Down Stretch"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Barre Fitness",
    description: "Ballet-inspired toning for pregnancy",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 190,
    exercises: ["Modified Pliés", "Leg Lifts", "Arm Work", "Balance Training"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Swimming for Pregnancy",
    description: "Full body workout in the pool",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Freestyle Swimming", "Backstroke", "Water Treading", "Pool Stretches"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Pilates Flow",
    description: "Modified pilates for core and stability",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 170,
    exercises: ["Modified Core Work", "Leg Circles", "Side-Lying Series", "Pelvic Floor"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Dance Fitness",
    description: "Fun, safe dance movements",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 190,
    exercises: ["Gentle Hip Movements", "Arm Dancing", "Side Steps", "Swaying"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Resistance Band Training",
    description: "Light resistance for toning",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 130,
    caloriesMax: 160,
    exercises: ["Band Rows", "Chest Press", "Leg Press", "Shoulder Work"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Stability Ball",
    description: "Core and balance work with ball",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 150,
    exercises: ["Ball Squats", "Pelvic Tilts on Ball", "Upper Body Work", "Stretching"],
    phase: "pregnancy" as const,
    trimester: "second" as const,
    fitnessLevel: null,
  },

  // ========== PREGNANCY - THIRD TRIMESTER ==========
  {
    title: "Gentle Third Trimester Flow",
    description: "Relaxing movements for late pregnancy",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Pelvic Floor Work", "Hip Circles", "Gentle Stretches", "Relaxation"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
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
    fitnessLevel: null,
  },
  {
    title: "Late Pregnancy Yoga",
    description: "Restorative poses for comfort",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 110,
    exercises: ["Supported Child's Pose", "Cat-Cow", "Birthing Squats", "Savasana with Props"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Walking Meditation",
    description: "Gentle walks with mindfulness",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Slow Walking", "Breathing Focus", "Body Awareness", "Gentle Pace"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Pelvic Floor & Core Gentle",
    description: "Focus on birth-supporting muscles",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Kegel Exercises", "Pelvic Clocks", "Deep Core Breathing", "Hip Mobility"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Water Walking for Late Pregnancy",
    description: "Gentle water-based movement",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 110,
    caloriesMax: 140,
    exercises: ["Pool Walking", "Gentle Water Movement", "Floating", "Water Stretches"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Prenatal Stretching & Breathing",
    description: "Prepare mind and body for birth",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Full Body Stretches", "Labor Breathing Practice", "Relaxation", "Visualization"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Supported Movement Flow",
    description: "Using props for comfortable exercise",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Wall-Supported Squats", "Chair Stretches", "Ball Sitting Exercises", "Gentle Movement"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Late Pregnancy Pilates",
    description: "Very gentle pilates modifications",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Pelvic Tilts", "Side-Lying Leg Work", "Arm Movements", "Breathing"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },
  {
    title: "Birth Ball Preparation",
    description: "Using birthing ball for labor prep",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Hip Circles on Ball", "Bouncing", "Pelvic Tilts", "Labor Positions"],
    phase: "pregnancy" as const,
    trimester: "third" as const,
    fitnessLevel: null,
  },

  // ========== ADDITIONAL MENSTRUAL PHASE WORKOUTS ==========
  {
    title: "Restorative Yin Stretch",
    description: "Deep passive stretches held for several minutes",
    duration: 35,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Reclined Butterfly", "Supported Fish Pose", "Child's Pose", "Legs Up Wall"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Chair Yoga Comfort",
    description: "Gentle yoga using a chair for support",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 90,
    exercises: ["Seated Cat-Cow", "Seated Twists", "Neck Rolls", "Gentle Stretches"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Walking in Nature",
    description: "Slow mindful walk outdoors",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 110,
    exercises: ["Nature Walking", "Deep Breathing", "Mindful Steps", "Gentle Stretching"],
    phase: "menstrual" as const,
    fitnessLevel: "beginner" as const,
  },

  // ========== ADDITIONAL FOLLICULAR PHASE WORKOUTS ==========
  {
    title: "Boxing Fundamentals",
    description: "Learn basic boxing combos and footwork",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 330,
    exercises: ["Jab-Cross", "Uppercuts", "Hooks", "Footwork Drills"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Jump Rope Intervals",
    description: "High-energy skipping with variations",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 290,
    exercises: ["Basic Skip", "Double Unders", "High Knees Skip", "Criss-Cross"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Hiking Hills",
    description: "Outdoor uphill trekking workout",
    duration: 50,
    intensity: "medium" as const,
    caloriesMin: 300,
    caloriesMax: 380,
    exercises: ["Uphill Walking", "Trail Navigation", "Hill Sprints", "Cool Down Descent"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Calisthenics Basics",
    description: "Bodyweight skill building",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Pull-up Progressions", "Dip Progressions", "L-Sits", "Handstand Practice"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Stair Climbing Power",
    description: "Stadium stairs or stair machine intervals",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 310,
    exercises: ["Stair Sprints", "Single Leg Steps", "Lateral Steps", "Stair Jumps"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Hip Hop Dance",
    description: "Urban dance choreography workout",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 300,
    exercises: ["Hip Hop Grooves", "Popping", "Locking", "Freestyle"],
    phase: "follicular" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Medicine Ball Power",
    description: "Explosive movements with medicine ball",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 290,
    exercises: ["Slams", "Wall Balls", "Russian Twists", "Overhead Throws"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Outdoor Cycling",
    description: "Road or trail cycling adventure",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 280,
    caloriesMax: 340,
    exercises: ["Warm-up Ride", "Interval Sprints", "Hill Climbs", "Cool Down Cruise"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Core Power Hour",
    description: "Intense core-focused workout",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 200,
    caloriesMax: 240,
    exercises: ["V-Ups", "Plank Variations", "Hollow Holds", "Dragon Flags"],
    phase: "follicular" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Tennis Drills",
    description: "Tennis-inspired cardio and agility",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 270,
    caloriesMax: 320,
    exercises: ["Lateral Shuffles", "Sprint to Net", "Backpedal", "Groundstroke Mimics"],
    phase: "follicular" as const,
    fitnessLevel: "intermediate" as const,
  },
  // ========== ADDITIONAL PHASE WORKOUTS ==========
  {
    title: "Spartan Training",
    description: "Obstacle course race preparation",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 350,
    caloriesMax: 420,
    exercises: ["Rope Climbs", "Sandbag Carries", "Wall Climbs", "Monkey Bars"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Sprint Intervals Track",
    description: "Maximum speed training on track",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 320,
    caloriesMax: 380,
    exercises: ["100m Sprints", "200m Intervals", "Flying 40s", "Cool Down Jog"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Rock Climbing Strength",
    description: "Bouldering and climbing drills",
    duration: 50,
    intensity: "high" as const,
    caloriesMin: 310,
    caloriesMax: 370,
    exercises: ["Bouldering Problems", "Hangboard Training", "Campus Board", "Route Climbing"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Assault Bike Challenge",
    description: "All-out air bike intervals",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 290,
    caloriesMax: 340,
    exercises: ["Max Effort Sprints", "Steady State", "Tabata Intervals", "EMOM Rounds"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Compound Strength Circuit",
    description: "Multiple compound lifts in rotation",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 300,
    caloriesMax: 350,
    exercises: ["Deadlifts", "Front Squats", "Barbell Rows", "Military Press"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Parkour Basics",
    description: "Urban movement and obstacle navigation",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 310,
    caloriesMax: 370,
    exercises: ["Precision Jumps", "Vaults", "Wall Runs", "Landing Drills"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Muay Thai Conditioning",
    description: "Thai boxing techniques and conditioning",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 330,
    caloriesMax: 390,
    exercises: ["Pad Work", "Clinch Training", "Kicks", "Conditioning Rounds"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Sled Push/Pull Power",
    description: "Heavy sled work for strength and conditioning",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 330,
    exercises: ["Heavy Sled Push", "Sled Drag", "Sprint Pulls", "Resistance Runs"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Marathon Training Run",
    description: "Long distance running at race pace",
    duration: 70,
    intensity: "medium" as const,
    caloriesMin: 500,
    caloriesMax: 650,
    exercises: ["Warm-up Miles", "Tempo Segments", "Steady State", "Cool Down"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },
  {
    title: "Functional Strongman",
    description: "Strongman movements for full body power",
    duration: 45,
    intensity: "high" as const,
    caloriesMin: 320,
    caloriesMax: 380,
    exercises: ["Atlas Stone Lifts", "Farmers Walk", "Log Press", "Yoke Carry"],
    phase: "ovulation" as const,
    fitnessLevel: "advanced" as const,
  },

  // ========== ADDITIONAL LUTEAL PHASE WORKOUTS ==========
  {
    title: "Power Yoga Flow",
    description: "Vigorous vinyasa for strength",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Warrior Sequences", "Vinyasa Flows", "Balances", "Hip Openers"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Resistance Band Full Body",
    description: "Complete workout using bands",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 210,
    exercises: ["Band Squats", "Band Rows", "Band Press", "Band Curls"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Mobility Flow",
    description: "Dynamic stretches and mobility drills",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 110,
    caloriesMax: 140,
    exercises: ["Hip CARs", "Shoulder Circles", "Spinal Waves", "Ankle Mobility"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Light Jogging",
    description: "Easy conversational pace run",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: ["Dynamic Warm-up", "Easy Jog", "Steady Pace", "Walking Cool Down"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Stretching & Recovery",
    description: "Full body deep stretch session",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 120,
    exercises: ["Hamstring Stretches", "Hip Flexor Stretches", "Chest Openers", "Spinal Twists"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Dance Cardio Low Impact",
    description: "Fun dance without jumping",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 200,
    exercises: ["Side Steps", "Grapevine", "Body Rolls", "Arm Choreography"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Yoga Nidra & Gentle Movement",
    description: "Yogic sleep and light stretching",
    duration: 35,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: ["Body Scan", "Gentle Stretches", "Breathwork", "Guided Relaxation"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Stability Training",
    description: "Balance and stabilization exercises",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 170,
    exercises: ["Single Leg Stands", "Bosu Squats", "Balance Board", "Wobble Cushion"],
    phase: "luteal" as const,
    fitnessLevel: "intermediate" as const,
  },
  {
    title: "Leisurely Bike Ride",
    description: "Easy-paced cycling outdoors or indoors",
    duration: 40,
    intensity: "low" as const,
    caloriesMin: 160,
    caloriesMax: 200,
    exercises: ["Easy Pedaling", "Scenic Route", "Flat Terrain", "Light Resistance"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
  },
  {
    title: "Foam Rolling Session",
    description: "Self-myofascial release full body",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 80,
    exercises: ["IT Band Roll", "Quad Roll", "Back Roll", "Calf Roll"],
    phase: "luteal" as const,
    fitnessLevel: "beginner" as const,
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
      "Core Work"
    ],
    phase: "luteal" as const
  },
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
      "Side Stretches"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
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
      "Lateral Raises"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Moderate Cardio",
    description: "Steady-state cardio to maintain fitness",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 220,
    exercises: [
      "Jogging",
      "Cycling",
      "Rowing",
      "Elliptical"
    ],
    phase: "luteal" as const
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
      "Cool Down Jog"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Training",
    description: "Build muscle with compound movements",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 250,
    exercises: [
      "Squats",
      "Deadlifts",
      "Push-ups",
      "Rows"
    ],
    phase: "follicular" as const
  },
  {
    title: "Advanced Strength",
    description: "Heavy lifting at your peak strength",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 320,
    exercises: [
      "Barbell Squats",
      "Bench Press",
      "Pull-ups",
      "Overhead Press"
    ],
    phase: "ovulation" as const
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
      "Cool down"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Light Walking",
    description: "Easy-paced walk to boost mood and circulation",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 120,
    exercises: [
      "Warm-up",
      "Steady pace walk",
      "Gentle stretching",
      "Cool down"
    ],
    phase: "menstrual" as const
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
      "Bicycle Crunches"
    ],
    phase: "follicular" as const
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
      "Floating stretches"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "HIIT Cardio Blast",
    description: "High-energy intervals to match your rising energy",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 300,
    exercises: [
      "Jumping Jacks",
      "Burpees",
      "Mountain Climbers",
      "High Knees"
    ],
    phase: "follicular" as const
  },
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
      "Jump Squats"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Pilates Core",
    description: "Controlled movements for core strength",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 180,
    exercises: [
      "Hundred",
      "Roll-up",
      "Plank variations",
      "Side leg lifts"
    ],
    phase: "luteal" as const
  },
  {
    title: "Birth Prep Exercises",
    description: "Prepare your body for labor",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 110,
    exercises: [
      "Squats",
      "Pelvic Tilts",
      "Kegels",
      "Breathing Techniques"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Gentle Yoga Flow",
    description: "Restorative poses to ease cramps and promote relaxation",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 100,
    exercises: [
      "Child's Pose",
      "Cat-Cow",
      "Supine Twist",
      "Legs Up the Wall"
    ],
    phase: "menstrual" as const
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
      "Breathing Exercises"
    ],
    phase: "menstrual" as const
  },
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
      "Relaxation"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Agility Training",
    description: "Quickness and movement change training",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 350,
    exercises: [
      "Agility Ladder",
      "Cone Drills"
    ],
    phase: "follicular" as const
  },
  {
    title: "Band Resistance Sculpt",
    description: "Resistance band-driven strength tone",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Band Squats",
      "Band Row",
      "Band Press"
    ],
    phase: "follicular" as const
  },
  {
    title: "Bootcamp Basics",
    description: "Intro-bootcamp conditioning style",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 350,
    exercises: [
      "Burpees",
      "Lunges",
      "Pushups"
    ],
    phase: "follicular" as const
  },
  {
    title: "Power Yoga Flow",
    description: "Dynamic vinyasa-strength fusion",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 260,
    exercises: [
      "Chaturanga",
      "Warrior Lunge",
      "Core Work"
    ],
    phase: "follicular" as const
  },
  {
    title: "Dance HIIT Fusion",
    description: "Dance intervals with power bursts",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 360,
    exercises: [
      "Combo Bursts",
      "Active Recovery"
    ],
    phase: "follicular" as const
  },
  {
    title: "Dance Conditioning",
    description: "Rhythm-based cardio strength class",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Dance Combos",
      "Squat Pulses",
      "Turns"
    ],
    phase: "follicular" as const
  },
  {
    title: "Core Power Session",
    description: "Progressive abdominal strengthening",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Dead Bug",
      "Plank Variations",
      "Side Plank"
    ],
    phase: "follicular" as const
  },
  {
    title: "Lift + Core Session",
    description: "Strength plus ab conditioning finisher",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 320,
    exercises: [
      "Deadlift",
      "Plank Finish"
    ],
    phase: "follicular" as const
  },
  {
    title: "Functional Strength",
    description: "Movement quality & power alignment training",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 290,
    exercises: [
      "Deadlifts",
      "Lunges",
      "Pushes"
    ],
    phase: "follicular" as const
  },
  {
    title: "Running Drills",
    description: "Footwork & stride efficiency development",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 330,
    exercises: [
      "High Knees",
      "Butt Kicks",
      "Strides"
    ],
    phase: "follicular" as const
  },
  {
    title: "Hill Run Practice",
    description: "Incline run with recovery segments",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 370,
    exercises: [
      "Hill Run",
      "Jog Recovery"
    ],
    phase: "follicular" as const
  },
  {
    title: "Boxing Bootcamp",
    description: "Cardio boxing with conditioning finishers",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 250,
    caloriesMax: 370,
    exercises: [
      "Jab Cross",
      "Hooks",
      "Burpees"
    ],
    phase: "follicular" as const
  },
  {
    title: "Cardio Boxing Flow",
    description: "Cardio boxing with technique drills",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 360,
    exercises: [
      "Jab Cross",
      "Hooks",
      "Footwork"
    ],
    phase: "follicular" as const
  },
  {
    title: "Kickboxing Cardio",
    description: "Technique & endurance-based kickboxing",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 350,
    exercises: [
      "Jabs",
      "Kicks",
      "Guard Moves"
    ],
    phase: "follicular" as const
  },
  {
    title: "Moderate Run",
    description: "Steady running for endurance build",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 360,
    exercises: [
      "Jogging",
      "Cadence Work"
    ],
    phase: "follicular" as const
  },
  {
    title: "Pilates Sculpt",
    description: "Core strength and posture focus",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 240,
    exercises: [
      "Leg Lifts",
      "Bridges",
      "Planks"
    ],
    phase: "follicular" as const
  },
  {
    title: "Gym Circuit",
    description: "Machine-based resistance circuit",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 380,
    exercises: [
      "Leg Press",
      "Chest Press",
      "Lat Pulldown"
    ],
    phase: "follicular" as const
  },
  {
    title: "Machine Strength Session",
    description: "Full machine-assisted lift series",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Leg Press",
      "Lat Pull",
      "Chest Press"
    ],
    phase: "follicular" as const
  },
  {
    title: "Pilates Cardio Blend",
    description: "Cardio-pilates hybrid for sculpting",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 240,
    exercises: [
      "Leg Sweep",
      "Core Reach",
      "Pulse Work"
    ],
    phase: "follicular" as const
  },
  {
    title: "Barre Burn",
    description: "Ballet-based muscular endurance workout",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 170,
    caloriesMax: 260,
    exercises: [
      "Plie Variations",
      "Leg Lifts",
      "Arm Work"
    ],
    phase: "follicular" as const
  },
  {
    title: "Kickbox Sculpt",
    description: "Technique-driven kickboxing sculpt",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 320,
    exercises: [
      "Round Kicks",
      "Jab Cross",
      "Guard Defense"
    ],
    phase: "follicular" as const
  },
  {
    title: "Row Intervals",
    description: "Row machine sprint bursts",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 320,
    exercises: [
      "Row Sprints",
      "Steady Stroke Recoveries"
    ],
    phase: "follicular" as const
  },
  {
    title: "Rowing Session",
    description: "Row machine endurance blocks",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Row Strokes",
      "Pace Builds"
    ],
    phase: "follicular" as const
  },
  {
    title: "Row + Flow Combo",
    description: "Row technique + mobility cool down",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 310,
    exercises: [
      "Rowing",
      "Yoga Hip Release"
    ],
    phase: "follicular" as const
  },
  {
    title: "Upper Body Strength",
    description: "Upper push/pull development session",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Rows",
      "Pushups",
      "Shoulder Press"
    ],
    phase: "follicular" as const
  },
  {
    title: "Circuit Sculpt",
    description: "Bodyweight + dumbbell sculpt blast",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 280,
    exercises: [
      "Rows",
      "Squats",
      "Core Holds"
    ],
    phase: "follicular" as const
  },
  {
    title: "Run-Walk Build",
    description: "Interval run/walk transition set",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 250,
    exercises: [
      "Run Sets",
      "Walk Recovery"
    ],
    phase: "follicular" as const
  },
  {
    title: "Cardio Endurance Build",
    description: "Aerobic stamina routine",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 380,
    exercises: [
      "Run",
      "Row",
      "Cycle Mix"
    ],
    phase: "follicular" as const
  },
  {
    title: "Athletic Conditioning",
    description: "General athleticism with agility emphasis",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Shuttles",
      "Agility Ladder",
      "Pushups"
    ],
    phase: "follicular" as const
  },
  {
    title: "Beginner HIIT",
    description: "Light intervals to activate power system",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Sprints",
      "Step Burpees",
      "Active Rest"
    ],
    phase: "follicular" as const
  },
  {
    title: "Adaptive Cardio Session",
    description: "Variable speed cardio zones",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Sprints",
      "Tempo Zones"
    ],
    phase: "follicular" as const
  },
  {
    title: "Weights Intro",
    description: "Lifting mechanics & small load progression",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 250,
    exercises: [
      "Squat",
      "Bench",
      "Row"
    ],
    phase: "follicular" as const
  },
  {
    title: "Strength Express",
    description: "Efficient full-body lift protocol",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 260,
    exercises: [
      "Squat",
      "Press",
      "Deadlift"
    ],
    phase: "follicular" as const
  },
  {
    title: "Progressive Weights",
    description: "Incremental load progression lifts",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Squats",
      "Bench",
      "Rows"
    ],
    phase: "follicular" as const
  },
  {
    title: "Strength + Plyo Mix",
    description: "Strength with controlled plyometric bursts",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 340,
    exercises: [
      "Squats",
      "Box Step-Ups",
      "Light Jumps"
    ],
    phase: "follicular" as const
  },
  {
    title: "Bodyweight Power",
    description: "Strength using bodyweight only",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Squats",
      "Lunges",
      "Planks"
    ],
    phase: "follicular" as const
  },
  {
    title: "Strength Foundations",
    description: "Full-body strength routine to leverage rising energy",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 280,
    exercises: [
      "Squats",
      "Lunges",
      "Pushups",
      "Rows"
    ],
    phase: "follicular" as const
  },
  {
    title: "Strength Circuit",
    description: "Compound lifts in sequence for conditioning",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 330,
    exercises: [
      "Squats",
      "Presses",
      "Rows",
      "Core"
    ],
    phase: "follicular" as const
  },
  {
    title: "Lower Body Strength",
    description: "Strength block targeting legs & glutes",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Squats",
      "Split Squats",
      "Bridges"
    ],
    phase: "follicular" as const
  },
  {
    title: "Stair Climber Workout",
    description: "Step-based cardio effort for legs & lungs",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Stair Climbs",
      "Step Intervals"
    ],
    phase: "follicular" as const
  },
  {
    title: "Standing Pilates Sculpt",
    description: "Pilates standing stability work",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Standing Leg Lifts",
      "Hip Control"
    ],
    phase: "follicular" as const
  },
  {
    title: "Elliptical Builder",
    description: "Moderate cadence elliptical ride",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 290,
    exercises: [
      "Steady Elliptical Pace"
    ],
    phase: "follicular" as const
  },
  {
    title: "Aerobic Power Ride",
    description: "Aerobic fitness cycle ride",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 250,
    caloriesMax: 380,
    exercises: [
      "Steady Spin",
      "Cadence Control"
    ],
    phase: "follicular" as const
  },
  {
    title: "Cycling Endurance",
    description: "Outdoor or stationary cycling for stamina",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 380,
    exercises: [
      "Steady Spin",
      "Tempo Ride"
    ],
    phase: "follicular" as const
  },
  {
    title: "Track Intervals",
    description: "Track-based aerobic performance session",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 370,
    exercises: [
      "Tempo Intervals",
      "Lap Repeats"
    ],
    phase: "follicular" as const
  },
  {
    title: "Spin Class",
    description: "Tempo-driven cycling class",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 350,
    exercises: [
      "Tempo Riding",
      "Climb Drill"
    ],
    phase: "follicular" as const
  },
  {
    title: "Tempo Ride",
    description: "Consistent tempo-focused cycling ride",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 360,
    exercises: [
      "Tempo Spin",
      "Seated Climb"
    ],
    phase: "follicular" as const
  },
  {
    title: "Metcon Strength",
    description: "Metabolic conditioning weight session",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 380,
    exercises: [
      "Thrusters",
      "Rows",
      "Squat Jumps"
    ],
    phase: "follicular" as const
  },
  {
    title: "Pilates Power Core",
    description: "Strength mat sequence with precision",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 130,
    caloriesMax: 220,
    exercises: [
      "Toe Taps",
      "Roll Ups",
      "Bridges"
    ],
    phase: "follicular" as const
  },
  {
    title: "TRX Strength Intro",
    description: "Suspension-based muscle activation",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 240,
    exercises: [
      "TRX Row",
      "TRX Squat",
      "TRX Lunge"
    ],
    phase: "follicular" as const
  },
  {
    title: "Stability Ball Sculpt",
    description: "Low-intensity ball core sculpting",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Ball Crunch",
      "Hip Lift",
      "Balance Work"
    ],
    phase: "luteal" as const
  },
  {
    title: "Band Core Activation",
    description: "Band work for abdominal engagement",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 150,
    exercises: [
      "Band Pull",
      "Core Brace"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low Load Strength Legs",
    description: "Lower body muscle tone focus",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Bodyweight Squat",
      "Bridge",
      "Leg Lift"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low-Impact Strength Circuit",
    description: "Controlled strength with lighter loading",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 220,
    exercises: [
      "Bodyweight Squat",
      "Glute Bridge",
      "Row Band"
    ],
    phase: "luteal" as const
  },
  {
    title: "Steady-State Cardio",
    description: "Brisk walking or cycling for circulation",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 280,
    exercises: [
      "Brisk Walk",
      "Light Cycle"
    ],
    phase: "luteal" as const
  },
  {
    title: "Glute + Core Activation",
    description: "Activation session for pelvic stability",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 150,
    exercises: [
      "Clamshell",
      "Bridge",
      "Brace"
    ],
    phase: "luteal" as const
  },
  {
    title: "Core + Glute Burn",
    description: "Slow controlled core and glute work",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 150,
    exercises: [
      "Clamshell",
      "Hip Lift",
      "Brace"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low-Pressure Bike Ride",
    description: "Comfort-centered cycling without effort",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 110,
    caloriesMax: 190,
    exercises: [
      "Comfort Cycle",
      "Stretch"
    ],
    phase: "luteal" as const
  },
  {
    title: "Core Stability Support",
    description: "Gentle core activation for balance",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 120,
    exercises: [
      "Dead Bug",
      "Side Plank Hold"
    ],
    phase: "luteal" as const
  },
  {
    title: "Breath Centering Training",
    description: "Breath + small movement centering sequence",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 90,
    exercises: [
      "Diaphragm Breath",
      "Hip Mobility"
    ],
    phase: "luteal" as const
  },
  {
    title: "Gentle Swim",
    description: "Relaxed pace swim for joint relief",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 160,
    exercises: [
      "Easy Swim Stroke",
      "Water Walk"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low Intensity Elliptical",
    description: "Very easy elliptical pacing",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Elliptical Steady"
    ],
    phase: "luteal" as const
  },
  {
    title: "Yoga + Breathwork",
    description: "Grounded yoga paired with breathing exercises",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Forward Bend",
      "Hip Release",
      "Pranayama"
    ],
    phase: "luteal" as const
  },
  {
    title: "Recovery Yoga",
    description: "Slow flow focusing on tension release",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 120,
    exercises: [
      "Forward Fold",
      "Hip Opener",
      "Supine Twist"
    ],
    phase: "luteal" as const
  },
  {
    title: "Cooling Yoga Sequence",
    description: "Gentle yoga to release anxiety/tension",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Forward Fold",
      "Hip Release",
      "Breath"
    ],
    phase: "luteal" as const
  },
  {
    title: "Mobility Flow Session",
    description: "Joint mobility and breath reset",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Hip Circle",
      "Shoulder Roll",
      "Spine Twist"
    ],
    phase: "luteal" as const
  },
  {
    title: "Tension Release Stretch",
    description: "Stretching aimed at reducing PMS discomfort",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Hip Mobility",
      "Neck Release"
    ],
    phase: "luteal" as const
  },
  {
    title: "Ground Flow & Stretch",
    description: "Floor-based mobility and stretch blend",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Hip Opener",
      "Back Stretch"
    ],
    phase: "luteal" as const
  },
  {
    title: "Mobility Reset Flow",
    description: "Joint mobility reset for tension and PMS relief",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Hip Opener",
      "Cat Stretch"
    ],
    phase: "luteal" as const
  },
  {
    title: "Moderate Treadmill Walk",
    description: "Incline walking low heart-rate lift",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 150,
    caloriesMax: 250,
    exercises: [
      "Incline Walk",
      "Stretch"
    ],
    phase: "luteal" as const
  },
  {
    title: "Moderate Jog/Walk",
    description: "Alternating light jog and brisk walk",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 230,
    exercises: [
      "Jog",
      "Walk Reset"
    ],
    phase: "luteal" as const
  },
  {
    title: "Pilates Tension Relief",
    description: "Pilates session relieving mid-cycle heaviness",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 190,
    exercises: [
      "Leg Circles",
      "Pelvic Tilt"
    ],
    phase: "luteal" as const
  },
  {
    title: "Pilates Align",
    description: "Alignment and controlled strength work",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Leg Series",
      "Bridge",
      "Roll Up"
    ],
    phase: "luteal" as const
  },
  {
    title: "Easy Ride",
    description: "Lower-gear cycling for comfort",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 100,
    caloriesMax: 190,
    exercises: [
      "Light Cycle",
      "Stretch Off"
    ],
    phase: "luteal" as const
  },
  {
    title: "Recovery Cycle",
    description: "Joint-friendly cycling focus",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Light Ride",
      "Cool Down"
    ],
    phase: "luteal" as const
  },
  {
    title: "Strength Endurance Lite",
    description: "Lighter strength + stability emphasis",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 130,
    caloriesMax: 220,
    exercises: [
      "Lunge",
      "Row",
      "Mini Squat"
    ],
    phase: "luteal" as const
  },
  {
    title: "Strength Conditioning Lite",
    description: "Conditioning through circuit with light loads",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 250,
    exercises: [
      "Lunge",
      "Step Up",
      "Press"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low-Impact Cardio Circuit",
    description: "Mini-circuit with shifts of movement focus",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "March",
      "Side Step",
      "Leg Curl"
    ],
    phase: "luteal" as const
  },
  {
    title: "Balance + Barre Flow",
    description: "Low-intensity barre movements for posture",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 160,
    exercises: [
      "Plié",
      "Leg Sweep",
      "Core Reach"
    ],
    phase: "luteal" as const
  },
  {
    title: "Barre Strength Restore",
    description: "Barre-based strength enhancement",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 190,
    exercises: [
      "Plie",
      "Pulse",
      "Leg Sweep"
    ],
    phase: "luteal" as const
  },
  {
    title: "Pilates Restore",
    description: "Pilates for alignment and balance",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 180,
    exercises: [
      "Roll Up",
      "Bridge",
      "Side Leg Series"
    ],
    phase: "luteal" as const
  },
  {
    title: "Cooling Pilates",
    description: "Humidity easing + core softness activation",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Roll Up",
      "Glute Lift"
    ],
    phase: "luteal" as const
  },
  {
    title: "Mobility + Recovery Flow",
    description: "Mobility aimed at circulation and recovery",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Shoulder Mobility",
      "Hip Flow"
    ],
    phase: "luteal" as const
  },
  {
    title: "Resistance Band Tone",
    description: "Elastic-band tone development",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Side Steps",
      "Glute Band Pull"
    ],
    phase: "luteal" as const
  },
  {
    title: "Mindful Movement Flow",
    description: "Movement to improve mood + clarity",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Slow Flow",
      "Hip Circles"
    ],
    phase: "luteal" as const
  },
  {
    title: "Steady Spin",
    description: "Low-to-moderate pace cycling",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Spin Cadence",
      "Ride Tempo"
    ],
    phase: "luteal" as const
  },
  {
    title: "Strength Form Practice",
    description: "Technique-focused lifting with low load",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Squat Form",
      "Press Form"
    ],
    phase: "luteal" as const
  },
  {
    title: "Strength Endurance Maintenance",
    description: "Maintaining capacity without overload",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Squat Hold",
      "Light Row",
      "Core Set"
    ],
    phase: "luteal" as const
  },
  {
    title: "Strength Basics Light",
    description: "Low-intensity strength session",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 210,
    exercises: [
      "Squat",
      "Press",
      "Row (light)"
    ],
    phase: "luteal" as const
  },
  {
    title: "Universal Circuit",
    description: "Full-body rotation with scaled load",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Squat",
      "Row",
      "Plank"
    ],
    phase: "luteal" as const
  },
  {
    title: "Balanced Strength",
    description: "Lower reps strength with longer rest",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 230,
    exercises: [
      "Squat",
      "Row",
      "Press"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low-Impact Full Body",
    description: "Controlled multi-joint workout",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 230,
    exercises: [
      "Squat",
      "Step Back",
      "Press Out"
    ],
    phase: "luteal" as const
  },
  {
    title: "Light Row Session",
    description: "Low-pressure rowing for cardio",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 190,
    exercises: [
      "Steady Row Pace"
    ],
    phase: "luteal" as const
  },
  {
    title: "Low Impact Step Workout",
    description: "Simple step routine for blood flow",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Step March",
      "Toe Tap"
    ],
    phase: "luteal" as const
  },
  {
    title: "Moderate Dance Cardio",
    description: "Dance flow that lifts mood without fatigue",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 250,
    exercises: [
      "Step Touch",
      "Combo Flow"
    ],
    phase: "luteal" as const
  },
  {
    title: "Mood Lift Dance",
    description: "Smooth dance cardio to raise endorphins",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 155,
    caloriesMax: 240,
    exercises: [
      "Step Touch",
      "Combo Sequence"
    ],
    phase: "luteal" as const
  },
  {
    title: "Light Sport Play",
    description: "Low-effort recreational sport",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 230,
    exercises: [
      "Tennis Rally",
      "Catch Game"
    ],
    phase: "luteal" as const
  },
  {
    title: "Hiking Low Altitude",
    description: "Easy trail hikes for mood leveling",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 260,
    exercises: [
      "Trail Walk",
      "Pace",
      "Stretch Stop"
    ],
    phase: "luteal" as const
  },
  {
    title: "Walking + Stretch Combo",
    description: "Walk intervals + stretch resets",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 115,
    caloriesMax: 195,
    exercises: [
      "Walk",
      "Hip Stretch",
      "Calf Stretch"
    ],
    phase: "luteal" as const
  },
  {
    title: "Walk + Yoga Blend",
    description: "Walk followed by a restorative yoga mini-session",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 210,
    exercises: [
      "Walk",
      "Hip Stretch",
      "Supine Twist"
    ],
    phase: "luteal" as const
  },
  {
    title: "Weighted Walk",
    description: "Walk with light weights for tone",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 240,
    exercises: [
      "Walk",
      "Light Dumbbells"
    ],
    phase: "luteal" as const
  },
  {
    title: "Joint Loosening Routine",
    description: "Low-stress joint articulation movement",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Ankle Rolls",
      "Wrist Circles",
      "Neck Rolls"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Foam Rolling Ease",
    description: "Self-massage to reduce muscle tightness",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Back Roll",
      "Glute Roll",
      "Hamstring Roll"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Soft Dance Movement",
    description: "Light intuitive movement for mood boost",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 105,
    exercises: [
      "Body Wave",
      "Step Touch",
      "Hip Flow"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Meditative Breathwork",
    description: "Calming breath practice for menstrual discomfort relief",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Box Breathing",
      "Mindful Pause"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Deep Restorative Flow",
    description: "Nervous system calming and pelvic support",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Bridge Support",
      "Hip Release",
      "Supine Rest"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Yin Yoga Restore",
    description: "Long-held relaxation yoga for emotional release",
    duration: 35,
    intensity: "low" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Butterfly Pose",
      "Supine Twist",
      "Forward Fold"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Period Relief Stretch",
    description: "Cramp-relief sequence for abdomen and hips",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Butterfly Stretch",
      "Knee Drops",
      "Cat-Cow"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Pelvic Floor Relaxation",
    description: "Relaxation-based pelvic floor release",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 65,
    exercises: [
      "Butterfly Stretch",
      "Knees Apart Hold",
      "Diaphragm Release"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Roll + Restore",
    description: "Foam rolling mixed with restorative yoga sequence",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Child Pose",
      "Hip Mobility",
      "Supported Twist"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Gentle Yoga Flow",
    description: "Restorative yoga for pelvic relief and grounding breath",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Child Pose",
      "Hip Openers",
      "Cat-Cow",
      "Breathwork"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Core Stability Lite",
    description: "Very gentle abdominal activation",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Dead Bug",
      "Marching Core",
      "Breath Coordination"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Breath-led Floor Flow",
    description: "Breath-body synchronized floor sequence",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 65,
    exercises: [
      "Diaphragm Work",
      "Hip Mobility",
      "Supine Twist"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Slow Cycling",
    description: "Low-pressure pedaling to reduce stagnation",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 120,
    exercises: [
      "Easy Pedal Cycling"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Low-Impact Elliptical",
    description: "Very easy-paced elliptical cardio for comfort",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 110,
    exercises: [
      "Elliptical Steady Pace"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Cramp Release Yoga",
    description: "Targeted routine to reduce discomfort",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 65,
    exercises: [
      "Extended Child",
      "Supine Twist",
      "Cat-Cow"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Hip Release Yoga",
    description: "Hip-focused unwinding sequence",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 80,
    exercises: [
      "Figure Four",
      "Frog Stretch",
      "Leg Sweep"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Hip + Back Release",
    description: "Relief yoga for lower back and hip tightness",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 95,
    exercises: [
      "Figure Four",
      "Psoas Release",
      "Side Bend"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Candlelight Yoga",
    description: "Slow yoga with emotional release cues",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Forward Fold",
      "Hip Opener",
      "Relaxation Hold"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Floor Stretch Flow",
    description: "Grounded stretch routine easing pressure",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Happy Baby",
      "Lateral Bend",
      "Knees to Chest"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Balance + Mobility",
    description: "Soft coordination movement to maintain activity",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 85,
    exercises: [
      "Heel Raises",
      "Side Steps",
      "Toe Taps"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Mobility Stretch Session",
    description: "Light mobility work to ease lower back tension",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 80,
    exercises: [
      "Hip Circles",
      "Hamstring Stretch",
      "Glute Release"
    ],
    phase: "menstrual" as const
  },
  {
    title: "De-Stress Flow",
    description: "Somatic release + mobility sequence",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 90,
    exercises: [
      "Hip Circles",
      "Shake Release",
      "Deep Exhale"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Bed Yoga Session",
    description: "Recovery stretch flow in bed",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Knee Hug",
      "Leg Cross",
      "Supine Twist"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Relaxing Pilates",
    description: "Soft pilates sequence for core stability and relaxation",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 85,
    exercises: [
      "Leg Lifts",
      "Pelvic Curl",
      "Spine Articulation"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Gentle Swimming",
    description: "Light-paced pool movement for tension release",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 120,
    exercises: [
      "Light Freestyle",
      "Water Walk"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Guided Yin Video",
    description: "Yin yoga session with cued holds",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Long Holds",
      "Hip Opener",
      "Supported Fold"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Lumbar Mobility Set",
    description: "Relief sequence for lumbar and sacrum tension",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Lumbar Rock",
      "90/90 Stretch",
      "Hip Fold"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Mindful Stretch Flow",
    description: "Ground-based stretch with breath reset",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Neck Release",
      "Quad Openers",
      "Side Bends"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Barre Pilates Lite",
    description: "Slow barre–pilates fusion sequence",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 55,
    caloriesMax: 100,
    exercises: [
      "Plie Holds",
      "Core Reach",
      "Leg Swing"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Soft Barre Flow",
    description: "Slow ballet-based movement for gentle strength",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 105,
    exercises: [
      "Plie Variations",
      "Arm Circles",
      "Leg Sweep"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Pool Walk",
    description: "Reduced-impact water-based movement",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Pool Walk",
      "Hip Mobility Steps"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Warm Stretching",
    description: "Heat-assisted stretch session for cramps",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 70,
    exercises: [
      "Quad Stretch",
      "Hip Flexor Stretch",
      "Neck Supine Stretch"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Somatic Shake Release",
    description: "Tension release shaking routine",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Shake Release",
      "Breath Drop",
      "Reset"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Calm + Stretch",
    description: "Stress-reducing movement sequence",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Side Bend",
      "Breath Cue",
      "Forward Fold"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Slow Flow Yoga",
    description: "Gentle guided yoga with slow transitions",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Slow Sun Salute",
      "Gentle Warrior",
      "Twist"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Mobility Reset",
    description: "Floor-based mobility for relief",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 65,
    exercises: [
      "Spinal Wave",
      "Hip Slide",
      "Rib Mobility"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Low-Effort Cycling",
    description: "Very light cycling",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Steady Pedaling"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Indoor Step Walk",
    description: "Slow stepping routine to ease cramps",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 120,
    exercises: [
      "Step Marching",
      "Heel Taps"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Energy Rejuvenation Stretch",
    description: "Soft movement for refreshed feeling",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Sun Breath",
      "Legs Up Wall",
      "Pelvic Rock"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Aromatherapy Yoga",
    description: "Relaxation-based yoga with calm movement",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 65,
    exercises: [
      "Supported Pose",
      "Pelvic Drop",
      "Neck Ease"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Sleep Recovery Yoga",
    description: "Deep rest preparation routine",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Supported Recline",
      "Bolster Rest",
      "Breath Reset"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Restorative Pilates Mat",
    description: "Light pilates for flow and stability",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 85,
    exercises: [
      "Swan Prep",
      "Pelvic Curl",
      "Side Bend"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Supported Pilates",
    description: "Breath-led alignment and light core activation",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Tabletop Legs",
      "Arm Reach",
      "Spinal Curl"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Gentle Tai Chi",
    description: "Slow-flow movement for relaxation and alignment",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 85,
    exercises: [
      "Tai Chi Basic Sequence"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Light Hiking",
    description: "Very easy terrain walk for mood boost",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 130,
    caloriesMax: 190,
    exercises: [
      "Trail Walk",
      "Steady Pace",
      "Stretch Stop"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Walk + Stretch Combo",
    description: "Walk intervals + stretch recovery stops",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 115,
    exercises: [
      "Walk",
      "Stretch Stops",
      "Hip Openers"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Recovery Circuit",
    description: "Low-load guided recovery activity cycle",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Walk",
      "Stretch",
      "Breath Series"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Walking Meditation",
    description: "Walking paired with breathing rhythm awareness",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 120,
    exercises: [
      "Walking",
      "Breath Timing",
      "Grounding"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Light Walking",
    description: "Easy walk to reduce cramps and improve circulation",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 120,
    exercises: [
      "Walking",
      "Post-walk Stretch"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Pelvic Mobility Flow",
    description: "Sequence easing abdominal tightness and pelvic pressure",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Windshield Wipers",
      "Pelvic Tilts",
      "Kneeling Rock"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Yoga Nidra Stretch",
    description: "Sleep and nervous-system reset stretching",
    duration: 30,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Yoga Nidra",
      "Legs Up Wall",
      "Passive Stretch"
    ],
    phase: "menstrual" as const
  },
  {
    title: "Track Sprint Ladder",
    description: "Sprint interval ladder",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 420,
    exercises: [
      "30m",
      "60m",
      "120m Ladder"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Speed Agility Integration",
    description: "Speed + change of direction training",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 350,
    exercises: [
      "Agility Ladder",
      "Sprint Shuffle"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Sport Conditioning",
    description: "Multi-direction sport training",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 250,
    caloriesMax: 400,
    exercises: [
      "Agility",
      "Sprint",
      "Reaction"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Explosive Medicine Ball",
    description: "Med ball slam & core power session",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 350,
    exercises: [
      "Ball Slam",
      "Rotational Throw"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Booty Power Lift",
    description: "Heavy compound glute training",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 320,
    exercises: [
      "Barbell Hip Thrust",
      "Step Up",
      "Split Squat"
    ],
    phase: "ovulation" as const
  },
  {
    title: "High Output Cycling",
    description: "High-cadence cycling block",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 390,
    exercises: [
      "Cadence Ladder",
      "Sprint Attack"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Barbell Athletic Basics",
    description: "Strength power mechanics intro",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Clean Pull",
      "Push Press",
      "Row"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Complex Barbell",
    description: "Barbell movement complexes maximizing output",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Clean",
      "Front Squat",
      "Push Press"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Cycling Hill Endurance",
    description: "High-load hill cycling",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 260,
    caloriesMax: 430,
    exercises: [
      "Climb",
      "Attack",
      "Recover"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Athlete Dance Power",
    description: "Dance conditioning at peak capacity",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 360,
    exercises: [
      "Combo Bursts",
      "Jump Rhythm"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Competitive Dance Cardio",
    description: "High-output dance cardio",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 370,
    exercises: [
      "Combo Dance Cardio",
      "Intervals"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Sport Movement Max",
    description: "Reaction agility + power circuits",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 230,
    caloriesMax: 390,
    exercises: [
      "Cut Drill",
      "Sprint Drill",
      "Jump Drill"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Capacity Builder",
    description: "Low reps / high intent strength block",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 210,
    caloriesMax: 350,
    exercises: [
      "Deadlift",
      "Front Squat",
      "Bench Hold"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Power Training",
    description: "Explosive lift session capitalizing on neuromuscular peak",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 380,
    exercises: [
      "Deadlift",
      "Kettlebell Swing",
      "Squat Press"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Tempo HIIT Progression",
    description: "Progressive interval sequencing",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 270,
    caloriesMax: 430,
    exercises: [
      "Echo Bike Sprint",
      "Burpee Finisher"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Olympic Lift Intro",
    description: "Technique-focused explosive barbell training",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 190,
    caloriesMax: 300,
    exercises: [
      "Hang Clean",
      "Split Jerk",
      "Power Pull"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Rowing Power Endurance",
    description: "Power-based long row strokes",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 220,
    caloriesMax: 360,
    exercises: [
      "Heavy Row",
      "Sprint Ratio"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Trail Run Elevation",
    description: "Incline trail run for oxygen output and skill use",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 260,
    caloriesMax: 450,
    exercises: [
      "Hill Climb",
      "Downhill Stride"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Kickboxing HIIT",
    description: "Strike-power interval training",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 410,
    exercises: [
      "Hooks",
      "Kicks",
      "Tempo Strikes"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Cardio Boxing Max",
    description: "Power-driven boxing bursts",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Jab",
      "Cross",
      "Combo Punch Flares"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Bootcamp Max Output",
    description: "High-output interval bootcamp",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 270,
    caloriesMax: 430,
    exercises: [
      "Jump Lunge",
      "Burpee",
      "Push Power"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Performance Max Circuit",
    description: "Multi-station peak training",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 270,
    caloriesMax: 440,
    exercises: [
      "Jump Pull",
      "Power Push",
      "Sprint Row"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Explosive Plyometrics",
    description: "Plyometrics leveraging peak tissue elasticity",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 220,
    caloriesMax: 380,
    exercises: [
      "Jump Squats",
      "Bounds",
      "Tuck Jumps"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Kettlebell Power Blocks",
    description: "Heavy kettlebell as power tool",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 230,
    caloriesMax: 380,
    exercises: [
      "Kettlebell Swing",
      "Clean",
      "Push"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Conditioning Run",
    description: "Steady run + weighted intervals",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Race Pace",
      "Weighted Segment"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Reaction Time Training",
    description: "Speed + coordination stimulus session",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Reaction Cone Drill",
      "Sprint Cue"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Battle Rope Blast",
    description: "Explosive rope conditioning bursts",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 200,
    caloriesMax: 340,
    exercises: [
      "Rope Slams",
      "Alternating Waves"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Row Sprint Set",
    description: "Short strong rowing intervals",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 390,
    exercises: [
      "Row Sprint",
      "Low-Rate Power"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength x Aerobic Chain",
    description: "Muscle output with heart-rate drive",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Row",
      "Squat",
      "Sprint"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Attack Ride",
    description: "Burst-phase spin ride",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Spin Attack",
      "Fast Climb"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Spin Race Simulation",
    description: "Race-simulation cycling",
    duration: 40,
    intensity: "high" as const,
    caloriesMin: 280,
    caloriesMax: 450,
    exercises: [
      "Sprint Climb",
      "Cadence Attack"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Sprint-Lift Duo",
    description: "Alternating sprint & strength cycles",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 390,
    exercises: [
      "Sprint Sets",
      "Barbell Blocks"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Track + Turf Mix",
    description: "Track + turf conditioning",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 390,
    exercises: [
      "Sprint",
      "Shuffle",
      "Agility"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Sprint-Bike Combo",
    description: "Run-sprint + indoor bike superset",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Sprint",
      "Spin Sprint"
    ],
    phase: "ovulation" as const
  },
  {
    title: "HIIT Power Session",
    description: "Peak-performance sprint intervals leveraging high capacity",
    duration: 25,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Sprints",
      "Burpees",
      "Power Jump"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Athletic Sprinting",
    description: "Track-based acceleration and speed work",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 230,
    caloriesMax: 380,
    exercises: [
      "Sprints",
      "Strides",
      "Acceleration Drill"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Power Athlete Circuit",
    description: "Strength-to-skill conditioning session",
    duration: 35,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 460,
    exercises: [
      "Squat Jump",
      "Rope Slam",
      "Agility"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Endurance Pump",
    description: "Strength training with short rest to push limits",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 240,
    caloriesMax: 380,
    exercises: [
      "Squat Ladder",
      "Press Ladder",
      "Row Ladder"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Superset Speed",
    description: "Strength supersets with shortened rest",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 210,
    caloriesMax: 350,
    exercises: [
      "Squat Superset",
      "Press Superset"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Athlete Method",
    description: "Structured strength & athletic power",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Squat",
      "Bench",
      "Jump"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Plyometric Strength Mix",
    description: "Strength + plyometric superset combo",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 410,
    exercises: [
      "Squat",
      "Jump Pair",
      "Hip Drive"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength + Sprint Pairing",
    description: "Strength movement paired with sprint effort",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 250,
    caloriesMax: 410,
    exercises: [
      "Squat",
      "Sprint Pair Drill"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Strength Drop Sets",
    description: "Descending load set system",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Squats",
      "Bench",
      "Rows"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Spin Power Climb",
    description: "High-cadence climbing ride",
    duration: 40,
    intensity: "medium" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Standing Climb",
      "Spin Sprint"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Track Skill Speed",
    description: "Skill speed refinement",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 200,
    caloriesMax: 330,
    exercises: [
      "Stride Drill",
      "Toe Drop",
      "Cadence Reset"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Tabata Blast",
    description: "Tabata intervals at high intensity",
    duration: 20,
    intensity: "high" as const,
    caloriesMin: 240,
    caloriesMax: 400,
    exercises: [
      "Tabata Sprints",
      "Burpees",
      "Jump Value"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Tempo Ladder Run",
    description: "Ascending pace progression run",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 230,
    caloriesMax: 380,
    exercises: [
      "Tempo Build",
      "Fast Finish"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Track Tempo Repeats",
    description: "Combined tempo + interval block",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 230,
    caloriesMax: 380,
    exercises: [
      "Tempo Laps",
      "Recovery Jog"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Group Competitive Sport",
    description: "Team sport intensity leveraging reaction speed",
    duration: 45,
    intensity: "medium" as const,
    caloriesMin: 280,
    caloriesMax: 480,
    exercises: [
      "Tennis Rally",
      "Basketball",
      "Soccer Drills"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Power Circuit Metcon",
    description: "Power + metabolic conditioning fusion",
    duration: 30,
    intensity: "high" as const,
    caloriesMin: 260,
    caloriesMax: 420,
    exercises: [
      "Thrusters",
      "Box Jumps",
      "Row Sprint"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Power Yoga Athlete Flow",
    description: "High-energy yoga for coordination & control",
    duration: 35,
    intensity: "medium" as const,
    caloriesMin: 180,
    caloriesMax: 300,
    exercises: [
      "Warrior Flow",
      "Arm Balance Intro"
    ],
    phase: "ovulation" as const
  },
  {
    title: "Stability Ball Postnatal",
    description: "Safe seated ball stability work",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Ball March",
      "Hip Rock"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Band Glute Training",
    description: "Glute activation without strain",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Band Kickback",
      "Band Step"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Band Arm Rehab",
    description: "Light band routine restoring strength",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Band Pull",
      "Band Press"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postural Strength Basic",
    description: "Upper body endurance after feeding posture",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Band Row",
      "Wall Angels"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Low Load Strength Circuit",
    description: "Light multi-station return to strength",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Bodyweight Squat",
      "Light Press"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Mini Strength Activation",
    description: "Light bodyweight reactivation",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 55,
    exercises: [
      "Bodyweight Squat",
      "Wall Pushup"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Breathwork Meditative",
    description: "Parasympathetic activation breathing",
    duration: 8,
    intensity: "low" as const,
    caloriesMin: 5,
    caloriesMax: 15,
    exercises: [
      "Box Breath",
      "Wave Breath"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Reconnecting Breathwork",
    description: "Central nervous grounding breath practice",
    duration: 8,
    intensity: "low" as const,
    caloriesMin: 5,
    caloriesMax: 15,
    exercises: [
      "Breath Wave",
      "Exhale Cue"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Glute Rehab Foundation",
    description: "Rebuild glute stability post birth",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Bridge (supported)",
      "Clamshell"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Light Core Circuit",
    description: "Controlled low-pressure core set",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Bridge",
      "Heel Slide",
      "Side Lift"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Pilates Lite",
    description: "Pilates to restore posture and pelvic control",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Bridge",
      "Side Series"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Yoga Tone",
    description: "Yoga with tone emphasis while safe",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 25,
    caloriesMax: 55,
    exercises: [
      "Chair Pose",
      "Hip Work (supported)"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Low Load Strength Return",
    description: "Strength re-entry training",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Chair Squat",
      "Heel Raise"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Strength + Stability Stage 2",
    description: "Second stage re-entry strength",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 45,
    caloriesMax: 75,
    exercises: [
      "Chair Squat",
      "Wall Press",
      "Hip Lift"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Baby Holding Posture Reset",
    description: "Movement to undo baby-holding posture",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Chest Stretch",
      "Scapular Squeeze"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Yoga Restore",
    description: "Release tension and promote relaxation",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Child Pose",
      "Hip Release"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Restore Flow",
    description: "Soft restorative yoga to reduce fatigue",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Child Pose",
      "Side-Lying Rest"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Breath Restoration",
    description: "Deep breathing for core reconnection",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Diaphragm Breath",
      "Abdominal Release"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Standing Breath + Core",
    description: "Breath syncing with gentle movement",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 30,
    exercises: [
      "Exhale TVA Sync",
      "Arm Reach"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Deep Stretch Rebuild",
    description: "Slow stretch for tension and scar healing",
    duration: 12,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Forward Fold",
      "Hip Opener"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Core Recon Basics",
    description: "Very light core reactivation after birth",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Heel Slide",
      "Bent Knee Fall Out"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Diastasis Recti Safe Core",
    description: "Early-stage ab rehab post pregnancy",
    duration: 12,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Heel Slide",
      "TA Activation"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Pelvic Floor Lift + Ease",
    description: "Learn contraction and release",
    duration: 8,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Kegel",
      "Drop",
      "Breath Sync"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Pelvic Floor Rehab",
    description: "Rebuild pelvic floor awareness",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Kegels",
      "Breath Coordination"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Return to Bike Intro",
    description: "Very easy indoor bike session",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Light Spin",
      "Hip Reset"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Low Impact Aerobics Intro",
    description: "Slow re-entry aerobic session",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "March",
      "Step Touch"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Neck + Back Relief",
    description: "Undo feeding-posture tension",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Neck Release",
      "Cat Stretch"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Functional Mobility Reset",
    description: "Mini mobility routine for fatigue relief",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Neck Release",
      "Hip Circle"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Pelvic Floor Mobility",
    description: "Soft tissue release reducing tension",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Pelvic Drop",
      "Hip Rock"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Pelvic Tilt Routine",
    description: "Re-learn pelvic mobility + stability",
    duration: 8,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Pelvic Rock",
      "Hip Roll"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Barre Sculpt Postnatal",
    description: "Barre toning with joint-safe posture",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Plie",
      "Pulse",
      "Core Reach"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Chair Mobility Session",
    description: "Chair stretch restoring tissue mobility",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Seated Fold",
      "Neck Roll"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Seated Core Support",
    description: "Early seated core coordination",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Seated March",
      "Hip Tilt"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Somatic Calm",
    description: "Somatic unwinding for nervous system reset",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Shake Release",
      "Breath Drop"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Mom Mobility Flow",
    description: "Mobility relieving parenting tension",
    duration: 12,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Side Bend",
      "Hip Opener"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Hip Strength Restore",
    description: "Standing hip strength foundation",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Side Leg Raise",
      "Hip Circle"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Side-Lying Core Training",
    description: "Low pressure core strengthening",
    duration: 12,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 35,
    exercises: [
      "Side-Lying Lift",
      "Hip Press"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Gentle Walking Start",
    description: "First return to light aerobic conditioning",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Slow Walk",
      "Hip Reset"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Core + Hip Stability",
    description: "Standing safe core activation",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Standing March",
      "Hip Reach"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Core Activation Standing",
    description: "Safe upright activation to avoid pressure",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Standing TVA Press",
      "Side Reach"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Light Cardio Dance",
    description: "Dance cardio without impact",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Step Touch",
      "Hip Wave"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Core Stability Step One",
    description: "Deep core reconnect movements",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "TA Brace",
      "Heel Slide"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Core Integration Stage 2",
    description: "Stage two TVA + pelvic rehab core work",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 20,
    caloriesMax: 45,
    exercises: [
      "TA Breath",
      "Side-Lying Reach"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Tai Chi Slow",
    description: "Grounded slow tai chi work for regulation",
    duration: 12,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Tai Chi Wave",
      "Arm Sweep"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Low-Moderate Walk Progression",
    description: "Extend walk duration for endurance",
    duration: 18,
    intensity: "medium" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Walk",
      "Hip Reset"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Short Outdoor Walk",
    description: "First outdoor walks after clearance",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 80,
    exercises: [
      "Walk",
      "Mini Stretch"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Mom + Baby Walk (Carrier)",
    description: "Gentle walk with stroller/carrier",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 85,
    exercises: [
      "Walk",
      "Pause Stretch"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Strength + Walk Hybrid",
    description: "Alternating walking and light strength",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 85,
    exercises: [
      "Walk",
      "Press",
      "Glute Lift"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Walking Progression",
    description: "Walk longer for aerobic recovery",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 80,
    exercises: [
      "Walk",
      "Stretch Stop"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Postnatal Strength Progression",
    description: "Lighter strength progressing load",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 55,
    caloriesMax: 95,
    exercises: [
      "Wall Pushup",
      "Squat",
      "Band Row"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Hydrotherapy Walk",
    description: "Water walking rehab therapy style",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 85,
    exercises: [
      "Water Walk",
      "Hip Sweep"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Short Swim Recovery",
    description: "Water walking for gentle aerobic restart",
    duration: 12,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 80,
    exercises: [
      "Water Walk",
      "Kick Support"
    ],
    // phase: undefined, // postnatal is not in the schema enum
  },
  {
    title: "Lower Limb Activation",
    description: "Leg activation sequence for swelling prevention",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Ankle Pumps",
      "Marching"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Leg Circulation Reset",
    description: "Movement targeting blood flow",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Ankle Roll",
      "Toe Flex"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Calf Swelling Relief",
    description: "Joint release targeting swelling",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Ankle Rolls",
      "Foot Pump"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Seated Mobility Train",
    description: "Chair-based mobility focus",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Arm Sweep",
      "Side Bend",
      "Neck Reset"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Stability Ball Seated Work",
    description: "Seated work promoting pelvic opening",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Ball March",
      "Hip Roll"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Birth Ball Mobility",
    description: "Birth ball rocking for pain relief practice",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Ball Rocking",
      "Hip Figure 8"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Birth Ball Posture Work",
    description: "Posture release + nervous system calm",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Ball Roll",
      "Hip Release"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Stability Ball Training",
    description: "Ball-based strength activation",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Ball Wall Squat",
      "Ball Press"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Band Glute Strength",
    description: "Glute strength development with band",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Band Kickback",
      "Side Stepping"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Arm Circuit Light",
    description: "Upper body strength for posture support",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Band Pull Apart",
      "Wall Press"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Upper Body Band Tone",
    description: "Upper resistance band sculpt",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Band Row",
      "Band Raise"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Band Strength Training",
    description: "Resistance band strength conditioning",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 180,
    exercises: [
      "Band Row",
      "Band Squat",
      "Band Press"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Posture Strength Flow",
    description: "Strength sequence to correct posture changes",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 160,
    exercises: [
      "Band Row",
      "Rear Delts",
      "Scapular Hold"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Upper Back Posture",
    description: "Posture strengthening without strain",
    duration: 10,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Band Row",
      "Scapular Squeeze"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Stationary Bike Moderate",
    description: "Comfortable cycling maintaining capacity",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Bike Cadence",
      "Tempo Spin"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Strength Lite",
    description: "Low load strength foundation session",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 70,
    caloriesMax: 120,
    exercises: [
      "Bodyweight Squat",
      "Band Row",
      "Wall Pushup"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Strength Build",
    description: "Moderate strength session for muscle support",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 180,
    exercises: [
      "Bodyweight Squat",
      "Deadlift (light)",
      "Wall Pushup"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Birth Prep Breathwork",
    description: "Breath control sequences for labor coping",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Breath Wave",
      "Relax Cue"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Breath Patterning",
    description: "Exploring different birth breaths",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Breath-Wave Variations"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Functional Pilates",
    description: "Pilates for muscular endurance and alignment",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Bridge",
      "Leg Sweep",
      "Side Pulse"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Glute Endurance",
    description: "Lower body endurance work",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 140,
    exercises: [
      "Bridge",
      "Pulse Squat",
      "Side Kick"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Gentle Walking",
    description: "Easy-paced walking to maintain circulation",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Brisk Walk",
      "Light Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Low-Impact Yoga Intro",
    description: "Gentle prenatal-friendly yoga mobility",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Cat Cow",
      "Child Pose",
      "Seated Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Labor Prep Flow",
    description: "Breath + movement to prep pelvic outlet",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Cat Cow",
      "Hip Release",
      "Rocking"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Back Relief Stretch",
    description: "Lower back tension release routine",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Cat Cow",
      "Knee Drops",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Hip + Spine Mobility",
    description: "Pelvic and lumbar relief sequence",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Cat Stretch",
      "Hip Circle"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Lower Back Relief",
    description: "Exercise routine for lumbar tension",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Cat Stretch",
      "Hip Release"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Chair Stretch Flow",
    description: "Chair-supported flexibility",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Chair Fold",
      "Seated Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Chair Mobility Routine",
    description: "Chair-based stretch and mobility",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Chair Fold",
      "Seated Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Yoga Tone",
    description: "Yoga sequences with tone focus",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 70,
    caloriesMax: 130,
    exercises: [
      "Chair Pose",
      "Bridge",
      "Hip Work"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Chair Prenatal Strength",
    description: "Chair-based birth prep conditioning",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Chair Squat",
      "Heel Raise"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Strength Alignment Lite",
    description: "Alignment-first strength",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Chair Squat",
      "Hip Shift"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Balance Chair Workout",
    description: "Chair-supported prenatal movement",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Chair Squat",
      "Leg March",
      "Arm Press"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Morning Fatigue Flow",
    description: "Short gentle reset for morning fatigue",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Child Pose",
      "Side Bend",
      "Seated Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pelvic Stability Reset",
    description: "Stability work without abdominal pressure",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Clamshell",
      "Band Side Step"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Glute Activation Light",
    description: "Activate glutes for pelvic stability",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Clamshell",
      "Bridge (pillows supported)"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Labor Hip Release",
    description: "Focused hip opening routine for birth",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Deep Hip Hold",
      "Side Bend"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Deep Hip Release",
    description: "Yoga hip stretch to prep pelvis",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Deep Supported Lunge",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Breathing Awareness Session",
    description: "Breathing practice for anxiety regulation",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Diaphragm Breath",
      "Box Breathing"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pelvic Floor Ease",
    description: "Pelvic release routine for nauseous discomfort",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Diaphragm Breath",
      "Hip Drop"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pelvic Floor Relaxation",
    description: "Relaxation-oriented pelvic release",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Diaphragm Breath",
      "Pelvic Drop"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Light Stationary Bike",
    description: "Comfort-paced cycling on stationary bike",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 90,
    caloriesMax: 140,
    exercises: [
      "Easy Pedal",
      "Cadence Variations"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Gentle Swim",
    description: "Calm swim session reducing joint pressure",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 120,
    exercises: [
      "Easy Swim",
      "Kick Support"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Breath Integration",
    description: "Breath + movement integration session",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Exhale Core Connection",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Breath Down Training",
    description: "Learning downward breathing for labor stage",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Exhale Down Wave"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Pregnancy Stretch Reset",
    description: "Soft full-body stretch reset",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Forward Fold",
      "Hip Stretch",
      "Supine Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Glute + Hip Activation",
    description: "Activation without abdominal strain",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Glute Bridge",
      "Clamshell",
      "Hip Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Glute Activation Circuit",
    description: "Standing glute activation without abdominal strain",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 150,
    exercises: [
      "Glute Bridge",
      "Clamshell",
      "Side Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Labor Position Practice",
    description: "Supported labor position rehearsal",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Hands-and-Knees Rock",
      "Side-Lying"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Strength + Balance",
    description: "Balance muscle work + coordination",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 170,
    exercises: [
      "Heel Raise",
      "Split Squat (assist)",
      "Hip Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Balance + Stability Intro",
    description: "Balance control with safety cues",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Heel Raise",
      "Toe Tap",
      "Side Shift"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Core Stability Intro",
    description: "Deep core activation without pressure rise",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 75,
    exercises: [
      "Heel Slide",
      "Dead Bug Prep",
      "Breath Core Sync"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Slow Mobility Reset",
    description: "Soft mobility for swelling and discomfort",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Hip Circle",
      "Ankle Pumps",
      "Neck Roll"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Mobility Relief Flow",
    description: "Gentle mobility for spine and hips",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Hip Circles",
      "Lumbar Rocking",
      "Open Shoulders"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Stretch + Breath",
    description: "Stretch routine paired with breathing reset",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Hip Opener",
      "Neck Release",
      "Exhale Length"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Deep Stretch Release",
    description: "Deep long-held stretches to release pressure",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Hip Opener",
      "Side Bend"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Birth Posture Coordination",
    description: "Combine pelvic and shoulder release",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Hip Rock",
      "Arm Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Pelvic Floor Strengthening",
    description: "Functional pelvic muscle engagement",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Kegel",
      "Breath Connection"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Pelvic Floor Activation",
    description: "Basic pelvic floor engagement training",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Kegels",
      "Breath Coordination"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pilates Stability Flow",
    description: "Core stability with posture alignment",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Leg Sweep",
      "Pelvic Tilt",
      "Arm Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Pilates Light",
    description: "Light mat pilates for posture stability",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Leg Sweep",
      "Spinal Curl",
      "Arm Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Hip Flexor Release",
    description: "Simple hip release for nausea posture compensation",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Low Lunge Hold",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Flow Strength",
    description: "Dynamic flow with strength emphasis",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Lunge Flow",
      "Bridge",
      "Backbend (supported)"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Strength Intervals Light",
    description: "Light strength endurance intervals",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 170,
    exercises: [
      "Lunge",
      "Press",
      "Bridge"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Strength + Stretch Circuit",
    description: "Strength circuit with stretch transitions",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Lunge",
      "Press",
      "Hip Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Standing Mobility",
    description: "Standing sequence to reduce dizziness risk",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "March",
      "Arm Reach",
      "Hip Roll"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Low Impact Cardio Circuit",
    description: "Simple aerobic multi-station routine",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 180,
    exercises: [
      "March",
      "Leg Curl",
      "Side Step"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Low Impact Aerobics",
    description: "Simple aerobic sequence",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 190,
    exercises: [
      "March",
      "Side Step",
      "Leg Curl"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Neck Release Routine",
    description: "Relieve neck stiffness from fatigue",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Neck Circles",
      "Neck Side Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Breath + Stretch Routine",
    description: "Daily mood regulation movement",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 55,
    exercises: [
      "Neck Stretch",
      "Breath Reset"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Mindful Breath + Stretch",
    description: "Breath-led stretch work for anxiety",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Neck Stretch",
      "Exhale Drop"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Stretch Flow",
    description: "Soft stretch routine easing nausea and tension",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Neck Stretch",
      "Hip Opener",
      "Side Bend"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Outdoor Walk Fresh Air",
    description: "Low effort outdoor movement for nausea support",
    duration: 25,
    intensity: "low" as const,
    caloriesMin: 80,
    caloriesMax: 120,
    exercises: [
      "Outdoor Walk",
      "Stretch Stop"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Supportive Pilates",
    description: "Very gentle pilates for posterior chain support",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 70,
    exercises: [
      "Pelvic Curl",
      "Leg Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pelvic Rock",
    description: "Small pelvic motion loop to alleviate discomfort",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Pelvic Rock",
      "Breathwork"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Pelvis Unwind Routine",
    description: "Release routine for pelvic pressure",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Pelvic Tilt",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Pelvic Support Flow",
    description: "Pelvis-focused coordinated movement",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Pelvic Tilt",
      "Side Kick"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Barre Stability",
    description: "Barre alignment and stability work",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 150,
    exercises: [
      "Plie Hold",
      "Leg Sweep",
      "Arm Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Barre Intro",
    description: "Low-intensity barre alignment training",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Plie Pulse",
      "Core Reach",
      "Side Leg Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Chair Support Barre",
    description: "Low-impact barre posture support",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 140,
    exercises: [
      "Plie",
      "Pulse",
      "Leg Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Chair Barre Sculpt",
    description: "Chair-supported barre toning",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Plie",
      "Pulse",
      "Side Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Low-Moderate Power Walk",
    description: "Heart-rate lift within safe zone",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 220,
    exercises: [
      "Power Walk",
      "Hip Reset"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Guided Meditation",
    description: "Audio-guided relaxation for nausea and stress",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 30,
    exercises: [
      "Relaxation Practice"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Labor Visualization",
    description: "Yoga nidra visualization for labor confidence",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 25,
    exercises: [
      "Relaxation",
      "Mind Script"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Labor Rhythm Training",
    description: "Movement + breath tied to contraction pattern",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 45,
    exercises: [
      "Rocking",
      "Breath Sync"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Chair Yoga Moderate",
    description: "Chair-supported deeper stretch work",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Seated Fold",
      "Hip Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Chair Pilates",
    description: "Seated pilates shapes for safety",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Seated March",
      "Hip Fold"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Seated Core Balance",
    description: "Seated stability training with pelvic alignment",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Seated March",
      "Hip Tilt"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Stability Ball Core (safe)",
    description: "Core engagement without pressure",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Seated March",
      "Hip Tilt"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Somatic Flow",
    description: "Somatic tension release + grounding",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Shake Release",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Somatic Reset",
    description: "Gentle somatic tension release practice",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Shake Release",
      "Hip Roll",
      "Breath Drop"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Side-Lying Release",
    description: "Zoned muscular release via side-lying",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Side Bend",
      "Hip Press"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Pelvis + Rib Expansion",
    description: "Release routine aiding fetal position",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Side Bend",
      "Hip Release"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Side Breath Expansion",
    description: "Deep rib opening breath exercise",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 10,
    caloriesMax: 20,
    exercises: [
      "Side Breathing",
      "Arm Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Pilates Tone",
    description: "Toning session without abdominal compression",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Side Leg Series",
      "Bridge",
      "Pulse Work"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Side-Lying Strength",
    description: "Prenatal-safe side-based strength",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 50,
    exercises: [
      "Side Lift",
      "Glute Press"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Dynamic Stability Flow",
    description: "Active core + stability without crunching",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 70,
    caloriesMax: 130,
    exercises: [
      "Side Plank (modified)",
      "Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Symmetry Reset Routine",
    description: "Movement correcting pelvic asymmetry",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 15,
    caloriesMax: 30,
    exercises: [
      "Side Shift",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Low-Impact Cardio Dance",
    description: "Heart-rate lift via gentle dance movement",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 190,
    exercises: [
      "Side Step",
      "Combo Step",
      "Hip Wave"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Mini Dance Flow",
    description: "Cheerful low-impact movement",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Side Step",
      "Hip Wave"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Birth Ball Flow",
    description: "Soft birth ball mobility practice",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Side to Side Rock",
      "Hip Figure 8"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Core Stability Reset",
    description: "Deep core activation + breath coordination",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Side-Lying Core",
      "Heel Slide"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Side-Lying Strength",
    description: "Side-lying work to protect abdominal pressure",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Side-Lying Leg Lift",
      "Glute Press"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Supported Pilates",
    description: "Pillow-supported pilates tension relief",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 35,
    caloriesMax: 60,
    exercises: [
      "Side-Lying Leg",
      "Pelvic Tilt"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Couch Flow",
    description: "Guided soft movement you can do on sofa",
    duration: 10,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Side-Lying Lift",
      "Bent Knee Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Balance Trainer Flow",
    description: "Exercises enhancing stability shift awareness",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Single Leg Balance",
      "Side Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Breath + Movement Meditation",
    description: "Movement meditation to reduce anxiety",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 35,
    exercises: [
      "Slow Flow",
      "Breath Expansion"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Calming Walk",
    description: "Slow comfortable walk for circulation",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Slow Walk",
      "Stretch Stop"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Relaxation Mobility",
    description: "Yielding mobility for nervous reset",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 35,
    exercises: [
      "Somatic Shake",
      "Hip Drop"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Breathwave",
    description: "Slow wave breath + flow",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Spinal Wave",
      "Hip Roll"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Standing Strength Lite",
    description: "Standing lower-body readiness training",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 40,
    caloriesMax: 70,
    exercises: [
      "Squat (support)",
      "Hip Shift"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Wall-Supported Squats",
    description: "Wall squat posture control",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 130,
    exercises: [
      "Squat Hold",
      "Pelvic Tilt"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Functional Strength Basics",
    description: "Functional movement pattern support",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 170,
    exercises: [
      "Squat Pattern",
      "Hip Hinge",
      "Push Pattern"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Hip Mobility + Strength",
    description: "Strengthening hips to reduce discomfort",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Squat Pulse",
      "Hip Circle",
      "Glute Lift"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Strength + Mobility Lite",
    description: "Strength blended with mobility for joints",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 90,
    caloriesMax: 150,
    exercises: [
      "Squat",
      "Hip Circle",
      "Hamstring Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Stability Circuit",
    description: "Controlled balance + strength pattern",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Squat",
      "Press",
      "Stability Step"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Standing Core Stability",
    description: "Core work without laying flat",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 110,
    exercises: [
      "Standing March",
      "Balance Reach"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Standing Pelvis Prep",
    description: "Standing pelvic release prep work",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Standing Rock",
      "Heel Raise"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Lower Body Tone",
    description: "Standing lower tone routine with no strain",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Standing Squat",
      "Side Leg Raise"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Gentle Elliptical",
    description: "Very low impact elliptical mobility",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 110,
    exercises: [
      "Steady Elliptical Ride"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Moderate Elliptical Ride",
    description: "Elliptical pacing within safe heart rate",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Steady Ride",
      "Tempo Rise"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Swim Endurance",
    description: "Medium effort swim for capacity",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 160,
    caloriesMax: 240,
    exercises: [
      "Steady Swim",
      "Glide"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Swimming Moderate",
    description: "Swimming for joint unloading + endurance",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Steady Swim",
      "Kick Drill"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Comedy Dance Mobility",
    description: "Light dance mobility for mood uplift",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Step Touch",
      "Hip Rock",
      "Side Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Low Impact Step Cardio",
    description: "Step-based cardio for breathing work",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 110,
    caloriesMax: 180,
    exercises: [
      "Step Touch",
      "Toe Tap"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Restoration Flow",
    description: "Relax + release sequence for final weeks",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Supported Child",
      "Side-Lying Rest"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Relax Restore Flow",
    description: "Post-fatigue emotional reset sequence",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 60,
    exercises: [
      "Supported Child",
      "Supine Rest"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Supported Yoga Flow",
    description: "Prop-supported prenatal stretch",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Supported Fold",
      "Hip Release"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Yoga Calm",
    description: "Relaxation-centric yoga",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 40,
    caloriesMax: 75,
    exercises: [
      "Supported Fold",
      "Hip Release",
      "Breath"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Labor Prep Yoga",
    description: "Flow to train labor positions safely",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Supported Lunge",
      "Cat Cow"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Supported Flow Mobility",
    description: "Prop-supported flow improving comfort",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 55,
    exercises: [
      "Supported Lunge",
      "Seated Twist"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Minimal Strength Circuit",
    description: "Scaled movement with breath cues",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 50,
    caloriesMax: 80,
    exercises: [
      "Supported Squat",
      "Wall Push"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Prenatal Tai Chi",
    description: "Slow tai chi flow to reduce anxiety",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 30,
    caloriesMax: 50,
    exercises: [
      "Tai Chi Sequence"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Prenatal Tai Chi Flow",
    description: "Flow tai chi for grounding and mood support",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Tai Chi Sequence",
      "Arm Wave"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Tai Chi Calm",
    description: "Tai chi rhythm for nervous regulation",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 20,
    caloriesMax: 40,
    exercises: [
      "Tai Chi Sway",
      "Arm Flow"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Circulation Relief Walk",
    description: "Walk focusing on reducing swelling",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Walk",
      "Ankle Pump"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Mindful Cardio Walk",
    description: "Brisk walking + mindful breathing",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 100,
    caloriesMax: 170,
    exercises: [
      "Walk",
      "Breath Rhythm"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Walking Mindfulness",
    description: "Walk with inward awareness",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 50,
    caloriesMax: 90,
    exercises: [
      "Walk",
      "Breath Sync"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Mindful Walking",
    description: "Walking practice with body awareness",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 45,
    caloriesMax: 75,
    exercises: [
      "Walk",
      "Breath",
      "Grounding Cue"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Outdoor Mobility Walk",
    description: "Outdoor walking for pelvic health",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 140,
    caloriesMax: 220,
    exercises: [
      "Walk",
      "Hip Rock",
      "Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Moderate Walk Outdoors",
    description: "Nature walk boosting mood and stamina",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Walk",
      "Incline Step"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Walking + Strength Pair",
    description: "Walking interval paired with strength",
    duration: 30,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 200,
    exercises: [
      "Walk",
      "Squat",
      "Press"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Nausea Relief Walk",
    description: "Low-effort outdoor fresh-air walk",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Walk",
      "Stretch Stop"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Bodyweight Arms Lite",
    description: "Light upper body endurance focus",
    duration: 15,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Wall Pushup",
      "Band Pull"
    ],
    phase: "pregnancy" as const,
    trimester: "first" as const
  },
  {
    title: "Arm Sculpt Resistance",
    description: "Light resistance arm endurance",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 80,
    caloriesMax: 140,
    exercises: [
      "Wall Pushup",
      "Band Pull",
      "Raise"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Yoga Moderate",
    description: "Flow-based yoga for calm strength",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 70,
    caloriesMax: 130,
    exercises: [
      "Warrior Flow",
      "Side Stretch"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Prenatal Yoga Strength",
    description: "Strength-focused yoga maintaining stability",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 70,
    caloriesMax: 130,
    exercises: [
      "Warrior Pose",
      "Supported Lunge",
      "Cat Cow"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Gentle Water Aerobics",
    description: "Low intensity pool movement",
    duration: 25,
    intensity: "medium" as const,
    caloriesMin: 120,
    caloriesMax: 180,
    exercises: [
      "Water Step",
      "Arm Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Gentle Pool Aerobics",
    description: "Low-effort water mobility",
    duration: 20,
    intensity: "medium" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Water Step",
      "Hip Sweep"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Mindful Swim Walk",
    description: "Water walk + mindful breath work in pool",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 70,
    caloriesMax: 130,
    exercises: [
      "Water Walk",
      "Kick Board"
    ],
    phase: "pregnancy" as const,
    trimester: "second" as const
  },
  {
    title: "Water Walking Slow (pool)",
    description: "Joint unloading low effort water walk",
    duration: 20,
    intensity: "low" as const,
    caloriesMin: 60,
    caloriesMax: 100,
    exercises: [
      "Water Walk",
      "Kick Support"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  },
  {
    title: "Labor Hip Mobility",
    description: "Wide hip mobility work",
    duration: 15,
    intensity: "low" as const,
    caloriesMin: 25,
    caloriesMax: 45,
    exercises: [
      "Wide Child Pose",
      "Hip Rock"
    ],
    phase: "pregnancy" as const,
    trimester: "third" as const
  }
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

