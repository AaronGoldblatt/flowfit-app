"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, Flame, Moon, Sun, Sparkles, Heart, BookOpen } from "lucide-react"
import { differenceInDays } from "date-fns"
import { WorkoutDetailModal } from "@/components/workout-detail-modal"
import { EducationModal } from "@/components/education-modal"
import { getProfile } from "@/actions/profile"
import { getCurrentCycle } from "@/actions/cycles"

interface UserProfile {
  name: string
  age: string
  fitnessLevel: string
  lastPeriodDate?: string
  cycleLength: string
  periodLength: string
  goals: string[]
  mode: "cycle" | "pregnancy"
  trimester?: string
}

type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal"

interface Workout {
  id: string
  title: string
  duration: string
  intensity: "low" | "medium" | "high"
  calories: string
  description: string
  exercises: string[]
}

export function HomeDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentPhase, setCurrentPhase] = useState<CyclePhase>("follicular")
  const [dayInCycle, setDayInCycle] = useState(1)
  const [recommendedWorkouts, setRecommendedWorkouts] = useState<Workout[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        // Add timeout to prevent hanging indefinitely
        const profilePromise = getProfile()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Profile fetch timeout")), 5000)
        )
        
        const { data: profileData } = await Promise.race([profilePromise, timeoutPromise]) as any
        if (profileData) {
          const parsedProfile = {
            name: profileData.name,
            age: profileData.age?.toString() || "",
            fitnessLevel: profileData.fitnessLevel || "",
            goals: profileData.goals || [],
            mode: profileData.mode as "cycle" | "pregnancy",
            trimester: profileData.trimester || undefined,
            cycleLength: "28",
            periodLength: "5",
          }
          setProfile(parsedProfile)

          // If cycle mode, try to get cycle data
          if (profileData.mode === "cycle") {
            const { data: cycleData } = await getCurrentCycle()
            if (cycleData && cycleData.lastPeriodDate) {
              const lastPeriod = new Date(cycleData.lastPeriodDate)
              const today = new Date()
              const daysSinceLastPeriod = differenceInDays(today, lastPeriod)
              const cycleLength = cycleData.cycleLength || 28
              const periodLength = cycleData.periodLength || 5

              const currentDay = (daysSinceLastPeriod % cycleLength) + 1
              setDayInCycle(currentDay)

              // Determine phase
              if (currentDay <= periodLength) {
                setCurrentPhase("menstrual")
              } else if (currentDay <= 13) {
                setCurrentPhase("follicular")
              } else if (currentDay <= 16) {
                setCurrentPhase("ovulation")
              } else {
                setCurrentPhase("luteal")
              }
            }
          }

          // Generate recommended workouts
          generateWorkouts(parsedProfile)
        } else {
          // No profile found, use fallback
          const fallbackProfile = {
            name: "User",
            age: "",
            fitnessLevel: "intermediate",
            goals: [],
            mode: "pregnancy" as "cycle" | "pregnancy",
            trimester: "first",
            cycleLength: "28",
            periodLength: "5",
          }
          setProfile(fallbackProfile)
          generateWorkouts(fallbackProfile)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        // Use fallback on error
        const fallbackProfile = {
          name: "User",
          age: "",
          fitnessLevel: "intermediate",
          goals: [],
          mode: "pregnancy" as "cycle" | "pregnancy",
          trimester: "first",
          cycleLength: "28",
          periodLength: "5",
        }
        setProfile(fallbackProfile)
        generateWorkouts(fallbackProfile)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const generateWorkouts = (userProfile: UserProfile) => {
    if (userProfile.mode === "pregnancy") {
      setRecommendedWorkouts(getPregnancyWorkouts(userProfile.trimester || "first", userProfile.fitnessLevel))
    } else {
      setRecommendedWorkouts(getCycleWorkouts(currentPhase, userProfile.fitnessLevel))
    }
  }

  const getPhaseInfo = (phase: CyclePhase) => {
    const phaseData = {
      menstrual: {
        name: "Menstrual Phase",
        icon: <Moon className="h-5 w-5" />,
        moonEmoji: "🌑",
        color: "bg-slate-800 text-slate-200 border-slate-600",
        description: "Rest and renewal",
        energy: "Low energy - honor your need for rest",
      },
      follicular: {
        name: "Follicular Phase",
        icon: <Sparkles className="h-5 w-5" />,
        moonEmoji: "🌒",
        color: "bg-indigo-900 text-indigo-200 border-indigo-600",
        description: "Energy is rising",
        energy: "Building energy - embrace new challenges",
      },
      ovulation: {
        name: "Ovulation Phase",
        icon: <Sun className="h-5 w-5" />,
        moonEmoji: "🌕",
        color: "bg-purple-900 text-purple-200 border-purple-600",
        description: "Peak power time",
        energy: "High energy - peak performance window",
      },
      luteal: {
        name: "Luteal Phase",
        icon: <Moon className="h-5 w-5" />,
        moonEmoji: "🌘",
        color: "bg-violet-900 text-violet-200 border-violet-600",
        description: "Winding down",
        energy: "Moderate energy - steady and strong",
      },
    }
    return phaseData[phase]
  }

  const getCycleWorkouts = (phase: CyclePhase, fitnessLevel: string): Workout[] => {
    const workoutsByPhase = {
      menstrual: [
        {
          id: "1",
          title: "Gentle Yoga Flow",
          duration: "20 min",
          intensity: "low" as const,
          calories: "80-100",
          description: "Restorative poses to ease cramps and promote relaxation",
          exercises: ["Child's Pose", "Cat-Cow", "Supine Twist", "Legs Up the Wall"],
        },
        {
          id: "2",
          title: "Light Walking",
          duration: "30 min",
          intensity: "low" as const,
          calories: "100-120",
          description: "Easy-paced walk to boost mood and circulation",
          exercises: ["Warm-up", "Steady pace walk", "Gentle stretching", "Cool down"],
        },
      ],
      follicular: [
        {
          id: "3",
          title: "HIIT Cardio Blast",
          duration: "25 min",
          intensity: "high" as const,
          calories: "250-300",
          description: "High-energy intervals to match your rising energy",
          exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers", "High Knees"],
        },
        {
          id: "4",
          title: "Strength Training",
          duration: "35 min",
          intensity: "medium" as const,
          calories: "200-250",
          description: "Build muscle with compound movements",
          exercises: ["Squats", "Deadlifts", "Push-ups", "Rows"],
        },
      ],
      ovulation: [
        {
          id: "5",
          title: "Power HIIT",
          duration: "30 min",
          intensity: "high" as const,
          calories: "300-350",
          description: "Maximum intensity for peak performance",
          exercises: ["Box Jumps", "Sprint Intervals", "Plyometric Push-ups", "Jump Squats"],
        },
        {
          id: "6",
          title: "Advanced Strength",
          duration: "40 min",
          intensity: "high" as const,
          calories: "280-320",
          description: "Heavy lifting at your peak strength",
          exercises: ["Barbell Squats", "Bench Press", "Pull-ups", "Overhead Press"],
        },
      ],
      luteal: [
        {
          id: "7",
          title: "Moderate Cardio",
          duration: "30 min",
          intensity: "medium" as const,
          calories: "180-220",
          description: "Steady-state cardio to maintain fitness",
          exercises: ["Jogging", "Cycling", "Rowing", "Elliptical"],
        },
        {
          id: "8",
          title: "Pilates Core",
          duration: "35 min",
          intensity: "medium" as const,
          calories: "150-180",
          description: "Controlled movements for core strength",
          exercises: ["Hundred", "Roll-up", "Plank variations", "Side leg lifts"],
        },
      ],
    }

    return workoutsByPhase[phase]
  }

  const getPregnancyWorkouts = (trimester: string, fitnessLevel: string): Workout[] => {
    const workoutsByTrimester = {
      first: [
        {
          id: "p1",
          title: "Prenatal Yoga",
          duration: "25 min",
          intensity: "low" as const,
          calories: "100-120",
          description: "Gentle stretches safe for early pregnancy",
          exercises: ["Modified Sun Salutations", "Pelvic Tilts", "Cat-Cow", "Side Stretches"],
        },
        {
          id: "p2",
          title: "Walking & Breathing",
          duration: "20 min",
          intensity: "low" as const,
          calories: "80-100",
          description: "Light cardio with breathing exercises",
          exercises: ["Warm-up walk", "Breathing practice", "Gentle pace", "Cool down"],
        },
      ],
      second: [
        {
          id: "p3",
          title: "Prenatal Strength",
          duration: "30 min",
          intensity: "medium" as const,
          calories: "150-180",
          description: "Safe strength training for second trimester",
          exercises: ["Modified Squats", "Wall Push-ups", "Bicep Curls", "Lateral Raises"],
        },
        {
          id: "p4",
          title: "Aqua Aerobics",
          duration: "35 min",
          intensity: "medium" as const,
          calories: "180-200",
          description: "Low-impact water exercises",
          exercises: ["Water walking", "Leg lifts", "Arm circles", "Floating stretches"],
        },
      ],
      third: [
        {
          id: "p5",
          title: "Gentle Prenatal Flow",
          duration: "20 min",
          intensity: "low" as const,
          calories: "80-100",
          description: "Relaxing movements for late pregnancy",
          exercises: ["Pelvic Floor", "Hip Circles", "Gentle Stretches", "Relaxation"],
        },
        {
          id: "p6",
          title: "Birth Prep Exercises",
          duration: "25 min",
          intensity: "low" as const,
          calories: "90-110",
          description: "Prepare your body for labor",
          exercises: ["Squats", "Pelvic Tilts", "Kegels", "Breathing Techniques"],
        },
      ],
    }

    return workoutsByTrimester[trimester as keyof typeof workoutsByTrimester] || workoutsByTrimester.first
  }

  const handleWorkoutComplete = (workoutId: string) => {
    const updated = [...completedWorkouts, workoutId]
    setCompletedWorkouts(updated)
    localStorage.setItem("flowfit-completed-workouts", JSON.stringify(updated))

    const history = JSON.parse(localStorage.getItem("flowfit-workout-history") || "[]")
    history.push({
      workoutId,
      date: new Date().toISOString(),
      completed: true,
    })
    localStorage.setItem("flowfit-workout-history", JSON.stringify(history))
  }

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout)
    setShowWorkoutModal(true)
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading your personalized dashboard...</p>
      </div>
    )
  }

  const phaseInfo = profile.mode === "cycle" ? getPhaseInfo(currentPhase) : null

  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 p-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-balance lunar-gradient-text">Welcome back, {profile.name}!</h2>
        <p className="text-slate-400 mt-1">
          {profile.mode === "pregnancy"
            ? `${profile.trimester?.charAt(0).toUpperCase()}${profile.trimester?.slice(1)} Trimester`
            : `Day ${dayInCycle} of your cycle`}
        </p>
      </div>

      {/* Current Phase Card */}
      {profile.mode === "cycle" && phaseInfo && (
        <Card className="border-2 border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm moon-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${phaseInfo.color} text-4xl`}>{phaseInfo.moonEmoji}</div>
                <div>
                  <CardTitle className="text-xl text-slate-100">{phaseInfo.name}</CardTitle>
                  <CardDescription className="text-slate-400">{phaseInfo.description}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-sm border-indigo-500/30 text-slate-300">
                Day {dayInCycle}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="font-medium text-slate-200">{phaseInfo.energy}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Cycle Progress</span>
                  <span className="font-medium text-slate-200">
                    {Math.round((dayInCycle / Number.parseInt(profile.cycleLength)) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(dayInCycle / Number.parseInt(profile.cycleLength)) * 100}
                  className="h-2 bg-slate-800"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pregnancy Info Card */}
      {profile.mode === "pregnancy" && (
        <Card className="border-2 border-purple-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-900 text-purple-200 border-purple-600">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-100">
                  {profile.trimester?.charAt(0).toUpperCase()}
                  {profile.trimester?.slice(1)} Trimester
                </CardTitle>
                <CardDescription className="text-slate-400">Safe, effective workouts for you and baby</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              All workouts are designed to be safe during pregnancy. Always listen to your body and consult your
              healthcare provider.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Education Button */}
      <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-indigo-900 text-indigo-200 border-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-100">Learn About Your Cycle</CardTitle>
                <CardDescription className="text-slate-400">
                  Understand how hormonal patterns affect your training
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowEducationModal(true)}
            variant="outline"
            className="w-full border-indigo-500/30 text-slate-200 hover:bg-slate-800"
          >
            View Education Guide
          </Button>
        </CardContent>
      </Card>

      {/* Today's Workouts */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-slate-100">Recommended for You Today</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendedWorkouts.map((workout) => (
            <Card
              key={workout.id}
              className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-500/20 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-slate-100">{workout.title}</CardTitle>
                    <CardDescription className="mt-1 text-slate-400">{workout.description}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      workout.intensity === "high"
                        ? "bg-red-950/50 text-red-300 border-red-600/30"
                        : workout.intensity === "medium"
                          ? "bg-yellow-950/50 text-yellow-300 border-yellow-600/30"
                          : "bg-green-950/50 text-green-300 border-green-600/30"
                    }
                  >
                    {workout.intensity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <span>{workout.calories} cal</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-300">Exercises:</p>
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.map((exercise, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                      >
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleWorkoutClick(workout)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Workout
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">This Week</CardDescription>
            <CardTitle className="text-3xl text-slate-100">4 workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">Great consistency!</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Total Calories</CardDescription>
            <CardTitle className="text-3xl text-slate-100">1,240</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">Burned this week</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Current Streak</CardDescription>
            <CardTitle className="text-3xl text-slate-100">7 days 🔥</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        open={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        onComplete={handleWorkoutComplete}
      />

      <EducationModal open={showEducationModal} onClose={() => setShowEducationModal(false)} />
    </div>
  )
}
