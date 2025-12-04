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
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Droplets, Moon, Sparkles, Sun, Plus, TrendingUp, Settings, CalendarIcon } from "lucide-react"
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { getProfile } from "@/actions/profile"
import { getCurrentCycle, upsertCycle } from "@/actions/cycles"
import { getPhaseForDate, parseLocalDate, type CyclePhase } from "@/lib/cycle-utils"
import { cn } from "@/lib/utils"

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

export function CycleTracker() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])
  const [isLoggingSymptoms, setIsLoggingSymptoms] = useState(false)
  const [isEditingCycle, setIsEditingCycle] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentLog, setCurrentLog] = useState<SymptomLog>({
    date: format(new Date(), "yyyy-MM-dd"),
    symptoms: [],
    notes: "",
    mood: "",
  })
  
  // Edit cycle state
  const [editLastPeriodDate, setEditLastPeriodDate] = useState<Date | undefined>(undefined)
  const [editCycleLength, setEditCycleLength] = useState("28")
  const [editPeriodLength, setEditPeriodLength] = useState("5")

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
          
          console.log("Loaded cycle data from DB:", {
            lastPeriodDate: cycleData.lastPeriodDate,
            cycleLength: cycleData.cycleLength,
            periodLength: cycleData.periodLength
          })
        }
        
        setProfile(parsedProfile)
        console.log("Updated profile state:", parsedProfile)
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

  useEffect(() => {
    loadData()
  }, [])

  const getPhaseForDay = (date: Date): CyclePhase | null => {
    if (!profile?.lastPeriodDate) return null

    return getPhaseForDate(
      date,
      profile.lastPeriodDate,
      Number.parseInt(profile.cycleLength),
      Number.parseInt(profile.periodLength)
    )
  }

  const getPhaseColor = (phase: CyclePhase | null): string => {
    if (!phase) return "bg-gray-100 text-gray-900"
    const colors = {
      menstrual: "bg-red-100 border-red-300 text-red-900",
      follicular: "bg-green-100 border-green-300 text-green-900",
      ovulation: "bg-yellow-100 border-yellow-300 text-yellow-900",
      luteal: "bg-purple-100 border-purple-300 text-purple-900",
    }
    return colors[phase]
  }

  const getPhaseBackgroundOnly = (phase: CyclePhase | null): string => {
    if (!phase) return "bg-gray-100"
    const colors = {
      menstrual: "bg-red-100 border-red-300",
      follicular: "bg-green-100 border-green-300",
      ovulation: "bg-yellow-100 border-yellow-300",
      luteal: "bg-purple-100 border-purple-300",
    }
    return colors[phase]
  }

  const getPhaseIconColor = (phase: CyclePhase | null): string => {
    if (!phase) return "text-gray-600"
    const colors = {
      menstrual: "text-red-700",
      follicular: "text-green-700",
      ovulation: "text-yellow-700",
      luteal: "text-purple-700",
    }
    return colors[phase]
  }

  const getPhaseIcon = (phase: CyclePhase | null) => {
    if (!phase) return null
    const iconColor = getPhaseIconColor(phase)
    const icons = {
      menstrual: <Droplets className={`h-3 w-3 ${iconColor}`} />,
      follicular: <Sparkles className={`h-3 w-3 ${iconColor}`} />,
      ovulation: <Sun className={`h-3 w-3 ${iconColor}`} />,
      luteal: <Moon className={`h-3 w-3 ${iconColor}`} />,
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

  const handleMarkPeriodStart = async (date: Date) => {
    // Format the date for display
    const displayDate = format(date, "MMMM d, yyyy")
    const localDateString = format(date, 'yyyy-MM-dd')
    
    console.log("Marking period start:")
    console.log("  Date object:", date)
    console.log("  Display date:", displayDate)
    console.log("  Saving as:", localDateString)
    
    const confirmed = window.confirm(
      `Mark ${displayDate} as the start of your period?\n\nThis will update your cycle tracking from this date forward.`
    )
    
    if (!confirmed) return

    setIsSaving(true)
    try {
      const result = await upsertCycle({
        lastPeriodDate: localDateString,
        cycleLength: Number.parseInt(profile?.cycleLength || "28"),
        periodLength: Number.parseInt(profile?.periodLength || "5"),
      })

      if (result.error) {
        alert(`Error: ${result.error}`)
      } else {
        console.log("Period start saved successfully, reloading data...")
        // Reload cycle data from server to get fresh calculations
        await loadData()
        console.log("Profile after reload:", profile)
      }
    } catch (error) {
      console.error("Error marking period start:", error)
      alert("Failed to mark period start")
    } finally {
      setIsSaving(false)
    }
  }

  const getLogForDate = (date: Date): SymptomLog | undefined => {
    return symptomLogs.find((log) => log.date === format(date, "yyyy-MM-dd"))
  }

  const openEditCycleDialog = () => {
    // Pre-fill with current values
    if (profile?.lastPeriodDate) {
      // Parse as local date to avoid timezone issues
      setEditLastPeriodDate(parseLocalDate(profile.lastPeriodDate))
    }
    setEditCycleLength(profile?.cycleLength || "28")
    setEditPeriodLength(profile?.periodLength || "5")
    setIsEditingCycle(true)
  }

  const handleSaveCycleInfo = async () => {
    if (!editLastPeriodDate) {
      alert("Please select your last period date")
      return
    }

    setIsSaving(true)
    try {
      // Use format to preserve local date instead of UTC conversion
      const localDateString = format(editLastPeriodDate, 'yyyy-MM-dd')
      
      const result = await upsertCycle({
        lastPeriodDate: localDateString,
        cycleLength: Number.parseInt(editCycleLength),
        periodLength: Number.parseInt(editPeriodLength),
      })

      if (result.error) {
        alert(`Error: ${result.error}`)
      } else {
        setIsEditingCycle(false)
        
        // Reload cycle data from server to get fresh calculations
        await loadData()
      }
    } catch (error) {
      console.error("Error saving cycle info:", error)
      alert("Failed to save cycle information")
    } finally {
      setIsSaving(false)
    }
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
                  <div className={`p-3 rounded-full ${getPhaseBackgroundOnly(currentPhase)}`}>
                    {getPhaseIcon(currentPhase)}
                  </div>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openEditCycleDialog}
                    className="flex items-center gap-2"
                    title="Edit cycle settings"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit Cycle</span>
                  </Button>
                </div>
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
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
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
                  // Compare date strings directly to avoid timezone issues
                  const dayString = format(day, 'yyyy-MM-dd')
                  const isPeriodStart = profile?.lastPeriodDate && dayString === profile.lastPeriodDate
                  
                  // Debug logging for the marked day
                  if (isPeriodStart) {
                    console.log("Period start marker:", { dayString, savedDate: profile.lastPeriodDate, matches: true })
                  }

                  return (
                    <div key={day.toISOString()} className="relative group">
                      <button
                        onClick={() => openLogDialog(day)}
                        className={`w-full aspect-square p-2 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${getPhaseColor(phase)} ${
                          isToday ? "ring-2 ring-pink-500 ring-offset-2" : ""
                        } ${isPeriodStart ? "ring-2 ring-red-500" : ""}`}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="text-sm font-semibold">{format(day, "d")}</span>
                          {phase && <div className="mt-1">{getPhaseIcon(phase)}</div>}
                          {log && log.symptoms.length > 0 && (
                            <div className="mt-1 w-2 h-2 rounded-full bg-pink-600 border border-pink-800" />
                          )}
                          {isPeriodStart && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 border border-red-800" title="Period start" />
                          )}
                        </div>
                      </button>
                      
                      {/* Quick action button - only show on hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMarkPeriodStart(day)
                        }}
                        className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg hover:bg-red-600 whitespace-nowrap z-10"
                        title="Mark period start"
                      >
                        📅 Period
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-pink-200 space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Phase Legend:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-red-100 border-2 border-red-300 flex items-center justify-center">
                        <Droplets className="h-3 w-3 text-red-700" />
                      </div>
                      <span className="text-sm">Menstrual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-green-700" />
                      </div>
                      <span className="text-sm">Follicular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center">
                        <Sun className="h-3 w-3 text-yellow-700" />
                      </div>
                      <span className="text-sm">Ovulation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-100 border-2 border-purple-300 flex items-center justify-center">
                        <Moon className="h-3 w-3 text-purple-700" />
                      </div>
                      <span className="text-sm">Luteal</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-3">Markers:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center relative">
                        <div className="w-2 h-2 rounded-full bg-pink-600 border border-pink-800" />
                      </div>
                      <span className="text-sm">Has symptoms logged</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-red-500 flex items-center justify-center relative">
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600 border border-red-800" />
                      </div>
                      <span className="text-sm">Period start date</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-900">
                    <strong>💡 Tip:</strong> Hover over any date and click "📅 Period" to mark when your period actually starts. 
                    This helps keep your cycle tracking accurate!
                  </p>
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

      {/* Edit Cycle Info Dialog */}
      <Dialog open={isEditingCycle} onOpenChange={setIsEditingCycle}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-pink-500" />
              Edit Cycle Information
            </DialogTitle>
            <DialogDescription>
              Update your cycle details to ensure accurate phase tracking
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Last Period Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editLastPeriodDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editLastPeriodDate ? format(editLastPeriodDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={editLastPeriodDate}
                    onSelect={setEditLastPeriodDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                This is the first day of your most recent period
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-cycle-length">
                  Cycle Length (days)
                </Label>
                <Input
                  id="edit-cycle-length"
                  type="number"
                  min="21"
                  max="45"
                  value={editCycleLength}
                  onChange={(e) => setEditCycleLength(e.target.value)}
                  placeholder="28"
                />
                <p className="text-xs text-muted-foreground">
                  Usually 21-35 days
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-period-length">
                  Period Length (days)
                </Label>
                <Input
                  id="edit-period-length"
                  type="number"
                  min="2"
                  max="10"
                  value={editPeriodLength}
                  onChange={(e) => setEditPeriodLength(e.target.value)}
                  placeholder="5"
                />
                <p className="text-xs text-muted-foreground">
                  Usually 3-7 days
                </p>
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm text-pink-900">
                <strong>Tip:</strong> Your cycle phases will automatically update based on these settings. 
                The calendar will recalculate to show accurate phase information.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditingCycle(false)} 
                className="flex-1"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveCycleInfo} 
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
