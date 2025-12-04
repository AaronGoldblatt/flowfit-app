"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, Flame, Moon, Sun, Sparkles, Heart, BookOpen, RefreshCw } from "lucide-react"
import { WorkoutDetailModal } from "@/components/workout-detail-modal"
import { EducationModal } from "@/components/education-modal"
import { getProfile } from "@/actions/profile"
import { getCurrentCycle } from "@/actions/cycles"
import { getWorkoutStats, getRecommendedWorkouts, getAlternativeWorkout } from "@/actions/workouts"
import { calculateCycleInfo, type CyclePhase } from "@/lib/cycle-utils"
import type { WorkoutTemplate } from "@/database/schema/workouts"
import { getPersonaMotivation } from "@/lib/personas"

interface UserProfile {
  name: string
  age: string
  fitnessLevel: string
  persona?: string
  lastPeriodDate?: string
  cycleLength: string
  periodLength: string
  goals: string[]
  mode: "cycle" | "pregnancy"
  trimester?: string
}

export function HomeDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentPhase, setCurrentPhase] = useState<CyclePhase>("follicular")
  const [dayInCycle, setDayInCycle] = useState(1)
  const [recommendedWorkouts, setRecommendedWorkouts] = useState<WorkoutTemplate[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutTemplate | null>(null)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [swappingWorkoutId, setSwappingWorkoutId] = useState<string | null>(null)
  const [swapError, setSwapError] = useState<string | null>(null)
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalDuration: 0,
    streak: 0,
  })

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
            persona: profileData.persona || undefined,
            goals: profileData.goals || [],
            mode: profileData.mode as "cycle" | "pregnancy",
            trimester: profileData.trimester || undefined,
            cycleLength: "28",
            periodLength: "5",
          }
          setProfile(parsedProfile)

          let calculatedPhase: CyclePhase = "follicular"
          
          // If cycle mode, try to get cycle data
          if (profileData.mode === "cycle") {
            const { data: cycleData } = await getCurrentCycle()
            if (cycleData && cycleData.lastPeriodDate) {
              const cycleLength = cycleData.cycleLength || 28
              const periodLength = cycleData.periodLength || 5

              // Use the utility function for proper date handling
              const cycleInfo = calculateCycleInfo(
                cycleData.lastPeriodDate,
                cycleLength,
                periodLength
              )
              
              calculatedPhase = cycleInfo.phase
              setDayInCycle(cycleInfo.dayInCycle)
              setCurrentPhase(calculatedPhase)
            }
          }

          // Fetch recommended workouts from database
          const { data: workouts } = await getRecommendedWorkouts(
            parsedProfile.mode === "pregnancy" ? "pregnancy" : calculatedPhase,
            parsedProfile.fitnessLevel,
            parsedProfile.mode === "pregnancy" ? parsedProfile.trimester : undefined,
            3 // Get 3 random workouts
          )
          
          if (workouts && workouts.length > 0) {
            setRecommendedWorkouts(workouts)
          } else {
            // Fallback to any workouts if none match the criteria
            const { data: fallbackWorkouts } = await getRecommendedWorkouts(
              parsedProfile.mode === "pregnancy" ? "pregnancy" : calculatedPhase,
              undefined, // Don't filter by fitness level
              parsedProfile.mode === "pregnancy" ? parsedProfile.trimester : undefined,
              3
            )
            if (fallbackWorkouts) {
              setRecommendedWorkouts(fallbackWorkouts)
            }
          }

          // Fetch workout stats
          const { data: stats } = await getWorkoutStats(7)
          if (stats) {
            setWorkoutStats(stats)
          }
        } else {
          // No profile found, use fallback
          const fallbackProfile = {
            name: "User",
            age: "",
            fitnessLevel: "intermediate",
            goals: [],
            mode: "cycle" as "cycle" | "pregnancy",
            trimester: undefined,
            cycleLength: "28",
            periodLength: "5",
          }
          setProfile(fallbackProfile)
          
          // Fetch fallback workouts
          const { data: fallbackWorkouts } = await getRecommendedWorkouts("follicular", "intermediate", undefined, 3)
          if (fallbackWorkouts) {
            setRecommendedWorkouts(fallbackWorkouts)
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        // Use fallback on error
        const fallbackProfile = {
          name: "User",
          age: "",
          fitnessLevel: "intermediate",
          goals: [],
          mode: "cycle" as "cycle" | "pregnancy",
          trimester: undefined,
          cycleLength: "28",
          periodLength: "5",
        }
        setProfile(fallbackProfile)
        
        // Try to fetch fallback workouts even on error
        try {
          const { data: fallbackWorkouts } = await getRecommendedWorkouts("follicular", "intermediate", undefined, 3)
          if (fallbackWorkouts) {
            setRecommendedWorkouts(fallbackWorkouts)
          }
        } catch (workoutError) {
          console.error("Error loading fallback workouts:", workoutError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])


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

  const handleSwapWorkout = async (workoutId: string) => {
    if (!profile) return
    
    setSwappingWorkoutId(workoutId)
    setSwapError(null)
    
    try {
      // Exclude all currently displayed workout IDs to avoid duplicates
      const currentWorkoutIds = recommendedWorkouts.map(w => w.id)
      
      console.log("Swapping workout:", workoutId)
      console.log("Current workout IDs:", currentWorkoutIds)
      console.log("Phase:", profile.mode === "pregnancy" ? "pregnancy" : currentPhase)
      console.log("Fitness level:", profile.fitnessLevel)
      
      let alternativeWorkout = null
      
      // Try with fitness level filter first
      let result = await getAlternativeWorkout(
        profile.mode === "pregnancy" ? "pregnancy" : currentPhase,
        profile.fitnessLevel,
        profile.mode === "pregnancy" ? profile.trimester : undefined,
        currentWorkoutIds
      )
      
      console.log("Alternative workout result:", result)
      
      if (result.data) {
        alternativeWorkout = result.data
      } else {
        // Fallback: try without fitness level filter
        console.log("No alternative found with fitness level, trying without filter...")
        result = await getAlternativeWorkout(
          profile.mode === "pregnancy" ? "pregnancy" : currentPhase,
          undefined, // Remove fitness level filter
          profile.mode === "pregnancy" ? profile.trimester : undefined,
          currentWorkoutIds
        )
        
        if (result.data) {
          alternativeWorkout = result.data
          console.log("Found alternative without fitness level filter")
        } else {
          console.warn("No alternative workouts available")
          setSwapError("No more workouts available to swap")
          setTimeout(() => setSwapError(null), 3000)
        }
      }
      
      if (alternativeWorkout) {
        console.log("Replacing workout with:", alternativeWorkout.title)
        // Replace the workout in the list - create new array to ensure re-render
        setRecommendedWorkouts(prev => {
          const newWorkouts = prev.map(w => 
            w.id === workoutId ? alternativeWorkout : w
          )
          console.log("New workouts array:", newWorkouts.map(w => w.title))
          return newWorkouts
        })
      }
    } catch (error) {
      console.error("Error swapping workout:", error)
      setSwapError("Failed to swap workout")
      setTimeout(() => setSwapError(null), 3000)
    } finally {
      setSwappingWorkoutId(null)
    }
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
        {profile.persona && (
          <p className="text-indigo-300 mt-2 italic text-sm">
            ✨ {getPersonaMotivation(profile.persona)}
          </p>
        )}
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
        
        {/* Swap Error Message */}
        {swapError && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-950/50 border border-yellow-500/30 text-yellow-300 text-sm">
            {swapError}
          </div>
        )}
        
        {recommendedWorkouts.length === 0 ? (
          <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400">No workouts found. Try updating your profile settings.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      <span>{workout.caloriesMin}-{workout.caloriesMax} cal</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-300">Exercises:</p>
                    <div className="flex flex-wrap gap-2">
                      {(workout.exercises as string[]).slice(0, 3).map((exercise, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                        >
                          {exercise}
                        </Badge>
                      ))}
                      {(workout.exercises as string[]).length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                        >
                          +{(workout.exercises as string[]).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleWorkoutClick(workout)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start
                    </Button>
                    <Button
                      onClick={() => handleSwapWorkout(workout.id)}
                      variant="outline"
                      size="icon"
                      className="border-indigo-500/30 text-slate-300 hover:bg-slate-800"
                      disabled={swappingWorkoutId === workout.id}
                      title="Try a different workout"
                    >
                      <RefreshCw className={`h-4 w-4 ${swappingWorkoutId === workout.id ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">This Week</CardDescription>
            <CardTitle className="text-3xl text-slate-100">
              {workoutStats.totalWorkouts} {workoutStats.totalWorkouts === 1 ? 'workout' : 'workouts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              {workoutStats.totalWorkouts === 0 
                ? "Start your first workout!" 
                : workoutStats.totalWorkouts >= 4 
                  ? "Great consistency!" 
                  : "Keep going!"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Total Calories</CardDescription>
            <CardTitle className="text-3xl text-slate-100">{workoutStats.totalCalories.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">Burned this week</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Current Streak</CardDescription>
            <CardTitle className="text-3xl text-slate-100">
              {workoutStats.streak} {workoutStats.streak === 1 ? 'day' : 'days'} {workoutStats.streak > 0 ? '🔥' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              {workoutStats.streak === 0 ? "Start your streak today!" : "Keep it up!"}
            </p>
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
