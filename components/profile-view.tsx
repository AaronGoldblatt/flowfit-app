"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Target, Activity, Sparkles } from "lucide-react"
import { getProfile } from "@/actions/profile"
import { getCurrentCycle } from "@/actions/cycles"
import { getWorkoutLogs } from "@/actions/workouts"
import { getGoalLabel } from "@/lib/utils"
import { getPersonaInfo } from "@/lib/personas"

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

interface ProfileViewProps {
  onEditProfile?: () => void
}

export function ProfileView({ onEditProfile }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    totalCalories: 0,
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: profileData } = await getProfile()
        if (profileData) {
          const parsedProfile: UserProfile = {
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
          
          if (profileData.mode === "cycle") {
            const { data: cycleData } = await getCurrentCycle()
            if (cycleData) {
              parsedProfile.cycleLength = cycleData.cycleLength?.toString() || "28"
              parsedProfile.periodLength = cycleData.periodLength?.toString() || "5"
              parsedProfile.lastPeriodDate = cycleData.lastPeriodDate || undefined
            }
          }
          
          setProfile(parsedProfile)

          // Fetch workout stats
          const { data: workoutLogs } = await getWorkoutLogs(1000)
          if (workoutLogs) {
            const totalWorkouts = workoutLogs.length
            const totalMinutes = workoutLogs.reduce((sum, log) => sum + (log.duration || 0), 0)
            const totalCalories = workoutLogs.reduce((sum, log) => sum + (log.caloriesBurned || 0), 0)
            setWorkoutStats({ totalWorkouts, totalMinutes, totalCalories })
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadProfile()
  }, [])

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Your Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
      </div>

      <Card className="border-pink-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription>
                {profile.age} years old • {profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1)}{" "}
                level
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {profile.persona && (() => {
        const personaInfo = getPersonaInfo(profile.persona);
        return personaInfo ? (
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <CardTitle>Your Persona</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{personaInfo.icon}</span>
                <div>
                  <div className="font-semibold text-lg">{personaInfo.label}</div>
                  <div className="text-sm text-muted-foreground">{personaInfo.description}</div>
                </div>
              </div>
              <div className="p-3 bg-indigo-100/50 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-900 italic">"{personaInfo.motivationalMessage}"</p>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Focus Areas:</div>
                <div className="flex flex-wrap gap-2">
                  {personaInfo.focusAreas.map((area) => (
                    <Badge key={area} variant="outline" className="border-indigo-300 text-indigo-700 bg-white/50">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null;
      })()}

      <Card className="border-pink-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-pink-500" />
            <CardTitle>Cycle Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Mode</span>
            <Badge variant="outline">
              {profile.mode === "pregnancy" ? `Pregnancy (${profile.trimester})` : "Cycle Tracking"}
            </Badge>
          </div>
          {profile.mode === "cycle" && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cycle Length</span>
                <span className="font-medium">{profile.cycleLength} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Period Length</span>
                <span className="font-medium">{profile.periodLength} days</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-pink-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-pink-500" />
            <CardTitle>Your Goals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.goals.map((goal) => (
              <Badge key={goal} variant="secondary" className="text-sm">
                {getGoalLabel(goal)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-pink-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-pink-500" />
            <CardTitle>Activity Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Workouts</span>
            <span className="font-medium text-lg">{workoutStats.totalWorkouts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Time</span>
            <span className="font-medium text-lg">
              {workoutStats.totalMinutes === 0 
                ? "0 hours" 
                : (workoutStats.totalMinutes / 60).toFixed(1) + " hours"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Calories Burned</span>
            <span className="font-medium text-lg">{workoutStats.totalCalories.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Button 
        variant="outline" 
        className="w-full bg-transparent"
        onClick={onEditProfile}
      >
        Edit Profile
      </Button>
    </div>
  )
}
