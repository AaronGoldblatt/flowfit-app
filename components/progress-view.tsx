"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Flame, Clock, Target, Award, CalendarIcon, Activity } from "lucide-react"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getProfile } from "@/actions/profile"
import { getWorkoutLogs } from "@/actions/workouts"
import { getGoalLabel } from "@/lib/utils"

interface WorkoutLog {
  date: string
  workoutTitle: string
  duration: number
  calories: number
  intensity: string
}

interface UserProfile {
  name: string
  goals: string[]
}

export function ProgressView() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    totalCalories: 0,
    currentStreak: 0,
    longestStreak: 0,
    averagePerWeek: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: profileData } = await getProfile()
        if (profileData) {
          setProfile({
            name: profileData.name,
            goals: profileData.goals || [],
          })
        }

        // Fetch real workout logs from database
        const { data: workoutLogsData } = await getWorkoutLogs(30)
        if (workoutLogsData) {
          // Transform database workout logs to match the expected format
          const transformedLogs: WorkoutLog[] = workoutLogsData.map((log) => ({
            date: log.date,
            workoutTitle: log.workoutType || "Workout",
            duration: log.duration || 0,
            calories: log.caloriesBurned || 0,
            intensity: log.intensity || "medium",
          }))
          setWorkoutLogs(transformedLogs)
          calculateStats(transformedLogs)
        } else {
          // No workout logs yet - set empty arrays and zero stats
          setWorkoutLogs([])
          setStats({
            totalWorkouts: 0,
            totalMinutes: 0,
            totalCalories: 0,
            currentStreak: 0,
            longestStreak: 0,
            averagePerWeek: 0,
          })
        }
      } catch (error) {
        console.error("Error loading data:", error)
        setProfile({ name: "User", goals: [] })
        setWorkoutLogs([])
        setStats({
          totalWorkouts: 0,
          totalMinutes: 0,
          totalCalories: 0,
          currentStreak: 0,
          longestStreak: 0,
          averagePerWeek: 0,
        })
      }
    }

    loadData()
  }, [])

  const calculateStats = (logs: WorkoutLog[]) => {
    const totalWorkouts = logs.length
    const totalMinutes = logs.reduce((sum, log) => sum + log.duration, 0)
    const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0)

    // Calculate current streak
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    const today = new Date()
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const dateStr = checkDate.toISOString().split("T")[0]

      if (sortedLogs.some((log) => log.date === dateStr)) {
        tempStreak++
        if (i === 0 || currentStreak > 0) {
          currentStreak = tempStreak
        }
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak
        }
        if (i === 0) {
          currentStreak = 0
        }
        tempStreak = 0
      }
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak
    }

    const averagePerWeek = (totalWorkouts / 30) * 7

    setStats({
      totalWorkouts,
      totalMinutes,
      totalCalories,
      currentStreak,
      longestStreak,
      averagePerWeek: Math.round(averagePerWeek * 10) / 10,
    })
  }

  const getWeeklyData = () => {
    const weeklyData: { week: string; workouts: number; calories: number; minutes: number }[] = []

    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - i * 7 - 6)
      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() - i * 7)

      const weekLogs = workoutLogs.filter((log) => {
        const logDate = new Date(log.date)
        return logDate >= weekStart && logDate <= weekEnd
      })

      weeklyData.push({
        week: `Week ${4 - i}`,
        workouts: weekLogs.length,
        calories: weekLogs.reduce((sum, log) => sum + log.calories, 0),
        minutes: weekLogs.reduce((sum, log) => sum + log.duration, 0),
      })
    }

    return weeklyData
  }

  const getIntensityBreakdown = () => {
    const breakdown = {
      low: 0,
      medium: 0,
      high: 0,
    }

    workoutLogs.forEach((log) => {
      if (log.intensity in breakdown) {
        breakdown[log.intensity as keyof typeof breakdown]++
      }
    })

    return [
      { name: "Low", value: breakdown.low, fill: "#86efac" },
      { name: "Medium", value: breakdown.medium, fill: "#fbbf24" },
      { name: "High", value: breakdown.high, fill: "#f87171" },
    ]
  }

  const getRecentWorkouts = () => {
    return [...workoutLogs].reverse().slice(0, 10)
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading your progress...</p>
      </div>
    )
  }

  const weeklyData = getWeeklyData()
  const intensityData = getIntensityBreakdown()
  const recentWorkouts = getRecentWorkouts()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Your Progress</h2>
        <p className="text-muted-foreground mt-1">Track your fitness journey and celebrate your wins</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Workouts</CardDescription>
              <Activity className="h-4 w-4 text-pink-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Time</CardDescription>
              <Clock className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active minutes</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Calories Burned</CardDescription>
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCalories.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total calories</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Current Streak</CardDescription>
              <Award className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Longest Streak</CardDescription>
              <Target className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.longestStreak} days</div>
            <p className="text-xs text-muted-foreground mt-1">Personal best</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Weekly Average</CardDescription>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.averagePerWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">Workouts per week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {/* Weekly Activity Chart */}
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your workout frequency over the past 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  workouts: {
                    label: "Workouts",
                    color: "#ec4899",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="workouts" fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Calories Burned Chart */}
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle>Calories Burned</CardTitle>
              <CardDescription>Weekly calorie burn trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "#f97316",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Intensity Breakdown */}
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle>Workout Intensity</CardTitle>
              <CardDescription>Distribution of workout intensities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intensityData.map((item) => {
                  const total = intensityData.reduce((sum, i) => sum + i.value, 0)
                  const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0

                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                          <span className="font-medium">{item.name} Intensity</span>
                        </div>
                        <span className="text-muted-foreground">
                          {item.value} workouts ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%`, backgroundColor: item.fill }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
              <CardDescription>Track progress towards your fitness goals</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.goals.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No goals set yet. Update your profile to add fitness goals!
                </p>
              ) : stats.totalWorkouts === 0 ? (
                <div className="space-y-4">
                  {profile.goals.map((goal) => (
                    <div key={goal} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{getGoalLabel(goal)}</span>
                        <span className="text-sm text-muted-foreground">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-center text-muted-foreground pt-2">
                    Complete workouts to start tracking your progress!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.goals.map((goal) => {
                    // Calculate real progress based on workouts completed
                    // For now, use a simple formula: (totalWorkouts / 30) * 100, capped at 100%
                    // This assumes 30 workouts as a milestone for achieving goals
                    const progress = Math.min(Math.round((stats.totalWorkouts / 30) * 100), 100)

                    return (
                      <div key={goal} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{getGoalLabel(goal)}</span>
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-pink-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-pink-500" />
                <CardTitle>Recent Workouts</CardTitle>
              </div>
              <CardDescription>Your workout history</CardDescription>
            </CardHeader>
            <CardContent>
              {recentWorkouts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No workouts logged yet. Start your first workout!
                </p>
              ) : (
                <div className="space-y-3">
                  {recentWorkouts.map((workout, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-pink-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{workout.workoutTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(workout.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>{workout.calories} cal</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            workout.intensity === "high"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : workout.intensity === "medium"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {workout.intensity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-pink-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <CardTitle>Achievements</CardTitle>
              </div>
              <CardDescription>Milestones you've reached</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.totalWorkouts === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Complete workouts to unlock achievements! 🏆
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {/* First Workout - Show if completed at least 1 */}
                  {stats.totalWorkouts >= 1 && (
                    <div className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="text-3xl mb-2">🏆</div>
                      <h4 className="font-semibold">First Workout</h4>
                      <p className="text-sm text-muted-foreground">Completed your first workout</p>
                    </div>
                  )}
                  
                  {/* 7 Day Streak - Show if current streak is 7+ days */}
                  {stats.currentStreak >= 7 && (
                    <div className="p-4 border-2 border-pink-200 bg-pink-50 rounded-lg">
                      <div className="text-3xl mb-2">🔥</div>
                      <h4 className="font-semibold">7 Day Streak</h4>
                      <p className="text-sm text-muted-foreground">Worked out 7 days in a row</p>
                    </div>
                  )}
                  
                  {/* 10 Workouts - Show if completed 10+ total */}
                  {stats.totalWorkouts >= 10 && (
                    <div className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg">
                      <div className="text-3xl mb-2">💪</div>
                      <h4 className="font-semibold">10 Workouts</h4>
                      <p className="text-sm text-muted-foreground">Completed 10 total workouts</p>
                    </div>
                  )}
                  
                  {/* 1000 Calories - Show if burned 1000+ calories total */}
                  {stats.totalCalories >= 1000 && (
                    <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-semibold">1000 Calories</h4>
                      <p className="text-sm text-muted-foreground">Burned 1000+ calories</p>
                    </div>
                  )}
                  
                  {/* Show message if only first workout is unlocked */}
                  {stats.totalWorkouts >= 1 && stats.totalWorkouts < 10 && stats.currentStreak < 7 && stats.totalCalories < 1000 && (
                    <div className="col-span-full text-center text-muted-foreground text-sm py-2">
                      Keep going to unlock more achievements! 💫
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
