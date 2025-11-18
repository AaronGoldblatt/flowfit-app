"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Droplets, Moon, Sparkles, Sun, Plus, TrendingUp } from "lucide-react"
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, differenceInDays } from "date-fns"
import { getProfile } from "@/actions/profile"
import { getCurrentCycle } from "@/actions/cycles"

interface UserProfile {
  name: string
  lastPeriodDate?: string
  cycleLength: string
  periodLength: string
  mode: "cycle" | "pregnancy"
}

interface SymptomLog {
  date: string
  symptoms: string[]
  notes: string
  mood: string
}

type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal"

export function CycleTracker() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])
  const [isLoggingSymptoms, setIsLoggingSymptoms] = useState(false)
  const [currentLog, setCurrentLog] = useState<SymptomLog>({
    date: format(new Date(), "yyyy-MM-dd"),
    symptoms: [],
    notes: "",
    mood: "",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: profileData } = await getProfile()
        if (profileData) {
          const parsedProfile: UserProfile = {
            name: profileData.name,
            mode: profileData.mode as "cycle" | "pregnancy",
            cycleLength: "28",
            periodLength: "5",
          }
          
          const { data: cycleData } = await getCurrentCycle()
          if (cycleData) {
            parsedProfile.lastPeriodDate = cycleData.lastPeriodDate || undefined
            parsedProfile.cycleLength = cycleData.cycleLength?.toString() || "28"
            parsedProfile.periodLength = cycleData.periodLength?.toString() || "5"
          }
          
          setProfile(parsedProfile)
        }
      } catch (error) {
        console.error("Error loading cycle data:", error)
        setProfile({
          name: "User",
          mode: "cycle",
          cycleLength: "28",
          periodLength: "5",
        })
      }
    }

    loadData()
  }, [])

  const getPhaseForDay = (date: Date): CyclePhase | null => {
    if (!profile?.lastPeriodDate) return null

    const lastPeriod = new Date(profile.lastPeriodDate)
    const daysSinceLastPeriod = differenceInDays(date, lastPeriod)
    const cycleLength = Number.parseInt(profile.cycleLength)
    const periodLength = Number.parseInt(profile.periodLength)

    if (daysSinceLastPeriod < 0) return null

    const currentDay = (daysSinceLastPeriod % cycleLength) + 1

    if (currentDay <= periodLength) return "menstrual"
    if (currentDay <= 13) return "follicular"
    if (currentDay <= 16) return "ovulation"
    return "luteal"
  }

  const getPhaseColor = (phase: CyclePhase | null): string => {
    if (!phase) return "bg-gray-100"
    const colors = {
      menstrual: "bg-red-100 border-red-300",
      follicular: "bg-green-100 border-green-300",
      ovulation: "bg-yellow-100 border-yellow-300",
      luteal: "bg-purple-100 border-purple-300",
    }
    return colors[phase]
  }

  const getPhaseIcon = (phase: CyclePhase | null) => {
    if (!phase) return null
    const icons = {
      menstrual: <Droplets className="h-3 w-3" />,
      follicular: <Sparkles className="h-3 w-3" />,
      ovulation: <Sun className="h-3 w-3" />,
      luteal: <Moon className="h-3 w-3" />,
    }
    return icons[phase]
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startDayOfWeek = monthStart.getDay()
  const emptyDays = Array(startDayOfWeek).fill(null)

  const symptomOptions = [
    "Cramps",
    "Headache",
    "Bloating",
    "Fatigue",
    "Mood Swings",
    "Breast Tenderness",
    "Acne",
    "Back Pain",
    "Nausea",
    "Food Cravings",
  ]

  const moodOptions = ["Great", "Good", "Okay", "Low", "Irritable"]

  const handleSymptomToggle = (symptom: string) => {
    setCurrentLog((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }))
  }

  const handleSaveLog = () => {
    const updatedLogs = [...symptomLogs.filter((log) => log.date !== currentLog.date), currentLog]
    setSymptomLogs(updatedLogs)
    localStorage.setItem("flowfit-symptom-logs", JSON.stringify(updatedLogs))
    setIsLoggingSymptoms(false)
    setCurrentLog({
      date: format(new Date(), "yyyy-MM-dd"),
      symptoms: [],
      notes: "",
      mood: "",
    })
  }

  const openLogDialog = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const existingLog = symptomLogs.find((log) => log.date === dateStr)

    if (existingLog) {
      setCurrentLog(existingLog)
    } else {
      setCurrentLog({
        date: dateStr,
        symptoms: [],
        notes: "",
        mood: "",
      })
    }
    setSelectedDate(date)
    setIsLoggingSymptoms(true)
  }

  const getLogForDate = (date: Date): SymptomLog | undefined => {
    return symptomLogs.find((log) => log.date === format(date, "yyyy-MM-dd"))
  }

  if (!profile || profile.mode === "pregnancy") {
    return (
      <div className="space-y-6">
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle>Cycle Tracker</CardTitle>
            <CardDescription>
              {profile?.mode === "pregnancy"
                ? "Cycle tracking is not available in pregnancy mode"
                : "Loading your cycle information..."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const today = new Date()
  const currentPhase = getPhaseForDay(today)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Cycle Tracker</h2>
        <p className="text-muted-foreground mt-1">Visualize your cycle and log symptoms</p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          {/* Current Phase Card */}
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${getPhaseColor(currentPhase)}`}>{getPhaseIcon(currentPhase)}</div>
                  <div>
                    <CardTitle className="text-lg">
                      {currentPhase
                        ? currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1) + " Phase"
                        : "Tracking..."}
                    </CardTitle>
                    <CardDescription>Today's phase</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => openLogDialog(today)}
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Today
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Calendar */}
          <Card className="border-pink-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {daysInMonth.map((day) => {
                  const phase = getPhaseForDay(day)
                  const log = getLogForDate(day)
                  const isToday = isSameDay(day, today)

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => openLogDialog(day)}
                      className={`aspect-square p-2 rounded-lg border-2 transition-all hover:scale-105 ${getPhaseColor(phase)} ${
                        isToday ? "ring-2 ring-pink-500 ring-offset-2" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-sm font-medium">{format(day, "d")}</span>
                        {phase && <div className="mt-1">{getPhaseIcon(phase)}</div>}
                        {log && log.symptoms.length > 0 && (
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-pink-200">
                <p className="text-sm font-medium mb-3">Phase Legend:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-red-100 border-2 border-red-300 flex items-center justify-center">
                      <Droplets className="h-3 w-3" />
                    </div>
                    <span className="text-sm">Menstrual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300 flex items-center justify-center">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span className="text-sm">Follicular</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center">
                      <Sun className="h-3 w-3" />
                    </div>
                    <span className="text-sm">Ovulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-purple-100 border-2 border-purple-300 flex items-center justify-center">
                      <Moon className="h-3 w-3" />
                    </div>
                    <span className="text-sm">Luteal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="border-pink-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-500" />
                <CardTitle>Symptom Patterns</CardTitle>
              </div>
              <CardDescription>Track patterns across your cycle</CardDescription>
            </CardHeader>
            <CardContent>
              {symptomLogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Start logging symptoms to see patterns and insights
                </p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Most Common Symptoms</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(symptomLogs.flatMap((log) => log.symptoms))).map((symptom) => {
                        const count = symptomLogs.filter((log) => log.symptoms.includes(symptom)).length
                        return (
                          <Badge key={symptom} variant="secondary">
                            {symptom} ({count})
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recent Logs</h4>
                    <div className="space-y-3">
                      {symptomLogs
                        .slice(-5)
                        .reverse()
                        .map((log) => (
                          <div key={log.date} className="p-3 border border-pink-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{format(new Date(log.date), "MMM d, yyyy")}</span>
                              {log.mood && <Badge variant="outline">{log.mood}</Badge>}
                            </div>
                            {log.symptoms.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {log.symptoms.map((symptom) => (
                                  <Badge key={symptom} variant="secondary" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {log.notes && <p className="text-sm text-muted-foreground">{log.notes}</p>}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Symptom Logging Dialog */}
      <Dialog open={isLoggingSymptoms} onOpenChange={setIsLoggingSymptoms}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Log Symptoms</DialogTitle>
            <DialogDescription>{selectedDate && format(selectedDate, "MMMM d, yyyy")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>How are you feeling?</Label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood}
                    variant={currentLog.mood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentLog((prev) => ({ ...prev, mood }))}
                    className={currentLog.mood === mood ? "bg-gradient-to-r from-pink-500 to-purple-500" : ""}
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Symptoms</Label>
              <div className="grid grid-cols-2 gap-3">
                {symptomOptions.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={currentLog.symptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <Label htmlFor={symptom} className="text-sm cursor-pointer">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes..."
                value={currentLog.notes}
                onChange={(e) => setCurrentLog((prev) => ({ ...prev, notes: e.target.value }))}
                className="border-pink-200"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsLoggingSymptoms(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveLog} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">
                Save Log
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
