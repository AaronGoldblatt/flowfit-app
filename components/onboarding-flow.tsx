"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PERSONAS, type PersonaType } from "@/lib/personas"

interface OnboardingFlowProps {
  onComplete: () => void
}

type OnboardingStep = "welcome" | "profile" | "cycle" | "goals" | "complete"

interface UserProfile {
  name: string
  age: string
  fitnessLevel: string
  persona: PersonaType | ""
  lastPeriodDate: Date | undefined
  cycleLength: string
  periodLength: string
  goals: string[]
  mode: "cycle" | "pregnancy"
  trimester?: string
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    fitnessLevel: "",
    persona: "",
    lastPeriodDate: undefined,
    cycleLength: "28",
    periodLength: "5",
    goals: [],
    mode: "cycle",
  })
  const [ageError, setAgeError] = useState<string>("")

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const toggleGoal = (goal: string) => {
    setProfile((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleComplete = async () => {
    try {
      // Import the createProfile and upsertCycle actions
      const { createProfile } = await import("@/actions/profile")
      const { upsertCycle } = await import("@/actions/cycles")

      // Create profile
      const profileResult = await createProfile({
        name: profile.name,
        age: profile.age ? Number.parseInt(profile.age) : undefined,
        fitnessLevel: profile.fitnessLevel as "beginner" | "intermediate" | "advanced",
        persona: profile.persona || undefined,
        goals: profile.goals,
        mode: profile.mode,
        trimester: profile.trimester as "first" | "second" | "third" | undefined,
      })

      if (profileResult.error) {
        console.error("Profile creation error:", profileResult.error)
        alert("Error creating profile. Please try again.")
        return
      }

      // If cycle mode and lastPeriodDate exists, create cycle data
      if (profile.mode === "cycle" && profile.lastPeriodDate) {
        await upsertCycle({
          lastPeriodDate: profile.lastPeriodDate.toISOString().split('T')[0],
          cycleLength: Number.parseInt(profile.cycleLength),
          periodLength: Number.parseInt(profile.periodLength),
        })
      }

      onComplete()
    } catch (error) {
      console.error("Onboarding completion error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg p-4">
        <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center moon-glow">
              <span className="text-4xl">🌙</span>
            </div>
            <CardTitle className="text-4xl font-bold lunar-gradient-text">Welcome to FlowFit</CardTitle>
            <CardDescription className="text-lg text-slate-300">
              Your AI-powered fitness companion that flows with your natural rhythms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-3 p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-lg">
                <span className="text-2xl">🌙</span>
                <p className="text-sm text-left text-slate-200">Workouts synced with your menstrual cycle</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-950/50 border border-purple-500/30 rounded-lg">
                <span className="text-2xl">✨</span>
                <p className="text-sm text-left text-slate-200">Track hormonal phases and optimize your journey</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-violet-950/50 border border-violet-500/30 rounded-lg">
                <span className="text-2xl">🐺</span>
                <p className="text-sm text-left text-slate-200">Embrace your natural strength and power</p>
              </div>
            </div>
            <Button
              onClick={() => setStep("profile")}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              size="lg"
            >
              Begin Your Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "profile") {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg p-4">
        <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">Tell us about yourself</CardTitle>
            <CardDescription className="text-slate-400">Help us personalize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">
                Create a username
              </Label>
              <Input
                id="name"
                placeholder="Enter your username"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="border-indigo-500/30 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-slate-200">
                How old are you?
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={profile.age}
                onChange={(e) => {
                  const value = e.target.value
                  // Allow empty string for clearing
                  if (value === "") {
                    setAgeError("")
                    updateProfile({ age: "" })
                    return
                  }
                  
                  const ageNum = Number.parseInt(value, 10)
                  
                  // Check if it's a valid number
                  if (isNaN(ageNum)) {
                    return
                  }
                  
                  // Validate age range
                  if (ageNum < 0 || ageNum > 100) {
                    setAgeError("Age is out of range. Please enter a valid age.")
                    return
                  }
                  
                  // Valid age, update and clear error
                  setAgeError("")
                  updateProfile({ age: value })
                }}
                className={cn(
                  "border-indigo-500/30 bg-slate-800/50 text-slate-100 placeholder:text-slate-500",
                  ageError && "border-red-500/50"
                )}
              />
              {ageError && (
                <p className="text-sm text-red-400">{ageError}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-200">What's your current fitness level?</Label>
              <RadioGroup
                value={profile.fitnessLevel}
                onValueChange={(value) => updateProfile({ fitnessLevel: value })}
              >
                <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="flex-1 cursor-pointer text-slate-200">
                    <div className="font-medium">Beginner</div>
                    <div className="text-sm text-slate-400">New to fitness or returning after a break</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="flex-1 cursor-pointer text-slate-200">
                    <div className="font-medium">Intermediate</div>
                    <div className="text-sm text-slate-400">Regular exercise 2-3 times per week</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="flex-1 cursor-pointer text-slate-200">
                    <div className="font-medium">Advanced</div>
                    <div className="text-sm text-slate-400">Consistent training 4+ times per week</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-200">Which persona best describes you? (Optional)</Label>
              <div className="grid grid-cols-1 gap-3">
                {Object.values(PERSONAS).map((persona) => (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => updateProfile({ persona: persona.id })}
                    className={cn(
                      "p-4 border-2 rounded-lg text-left transition-all hover:scale-[1.02] cursor-pointer",
                      profile.persona === persona.id
                        ? "border-indigo-500 bg-indigo-950/50 shadow-lg shadow-indigo-500/20"
                        : "border-indigo-500/30 bg-slate-800/30 hover:border-indigo-500/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{persona.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-100 mb-1">{persona.label}</div>
                        <div className="text-sm text-slate-400">{persona.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {profile.persona && (
                <button
                  type="button"
                  onClick={() => updateProfile({ persona: "" })}
                  className="text-sm text-slate-400 hover:text-slate-300 underline"
                >
                  Clear selection
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("welcome")}
                className="flex-1 border-indigo-500/30 text-slate-200 hover:bg-slate-800"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep("cycle")}
                disabled={!profile.name || !profile.age || !profile.fitnessLevel}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "cycle") {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg p-4">
        <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">Cycle Information</CardTitle>
            <CardDescription className="text-slate-400">This helps us optimize your workouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-slate-200">Are you currently pregnant?</Label>
              <RadioGroup
                value={profile.mode}
                onValueChange={(value: "cycle" | "pregnancy") => updateProfile({ mode: value })}
              >
                <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                  <RadioGroupItem value="cycle" id="cycle" />
                  <Label htmlFor="cycle" className="flex-1 cursor-pointer text-slate-200">
                    <div className="font-medium">No, tracking my cycle</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                  <RadioGroupItem value="pregnancy" id="pregnancy" />
                  <Label htmlFor="pregnancy" className="flex-1 cursor-pointer text-slate-200">
                    <div className="font-medium">Yes, I'm pregnant</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {profile.mode === "pregnancy" ? (
              <div className="space-y-3">
                <Label className="text-slate-200">Which trimester are you in?</Label>
                <RadioGroup value={profile.trimester} onValueChange={(value) => updateProfile({ trimester: value })}>
                  <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                    <RadioGroupItem value="first" id="first" />
                    <Label htmlFor="first" className="flex-1 cursor-pointer text-slate-200">
                      First Trimester (Weeks 1-12)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                    <RadioGroupItem value="second" id="second" />
                    <Label htmlFor="second" className="flex-1 cursor-pointer text-slate-200">
                      Second Trimester (Weeks 13-26)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg hover:bg-indigo-950/50 cursor-pointer">
                    <RadioGroupItem value="third" id="third" />
                    <Label htmlFor="third" className="flex-1 cursor-pointer text-slate-200">
                      Third Trimester (Weeks 27-40)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-slate-200">When was the first day of your last period?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-indigo-500/30 bg-slate-800/50 text-slate-200",
                          !profile.lastPeriodDate && "text-slate-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {profile.lastPeriodDate ? format(profile.lastPeriodDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-900 border-indigo-500/30" align="start">
                      <Calendar
                        mode="single"
                        selected={profile.lastPeriodDate}
                        onSelect={(date) => updateProfile({ lastPeriodDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cycleLength" className="text-slate-200">
                      Cycle Length (days)
                    </Label>
                    <Input
                      id="cycleLength"
                      type="number"
                      value={profile.cycleLength}
                      onChange={(e) => updateProfile({ cycleLength: e.target.value })}
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                    />
                    <p className="text-xs text-slate-500">Average: 28 days</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="periodLength" className="text-slate-200">
                      Period Length (days)
                    </Label>
                    <Input
                      id="periodLength"
                      type="number"
                      value={profile.periodLength}
                      onChange={(e) => updateProfile({ periodLength: e.target.value })}
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                    />
                    <p className="text-xs text-slate-500">Average: 5 days</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("profile")}
                className="flex-1 border-indigo-500/30 text-slate-200 hover:bg-slate-800"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep("goals")}
                disabled={profile.mode === "pregnancy" ? !profile.trimester : !profile.lastPeriodDate}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "goals") {
    const goalOptions = [
      { id: "strength", label: "Build Strength", icon: "💪" },
      { id: "endurance", label: "Improve Endurance", icon: "🏃‍♀️" },
      { id: "flexibility", label: "Increase Flexibility", icon: "🧘‍♀️" },
      { id: "weight", label: "Manage Weight", icon: "⚖️" },
      { id: "energy", label: "Boost Energy", icon: "⚡" },
      { id: "stress", label: "Reduce Stress", icon: "🌿" },
    ]

    return (
      <div className="min-h-screen flex items-center justify-center starry-bg p-4">
        <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">What are your goals?</CardTitle>
            <CardDescription className="text-slate-400">Select all that apply</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "p-4 border-2 rounded-lg text-left transition-all hover:scale-105 cursor-pointer",
                    profile.goals.includes(goal.id)
                      ? "border-indigo-500 bg-indigo-950/50"
                      : "border-indigo-500/30 bg-slate-800/30 hover:border-indigo-500/50",
                  )}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="font-medium text-sm text-slate-200">{goal.label}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("cycle")}
                className="flex-1 border-indigo-500/30 text-slate-200 hover:bg-slate-800"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep("complete")}
                disabled={profile.goals.length === 0}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg p-4">
        <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center moon-glow">
              <span className="text-4xl">🌙</span>
            </div>
            <CardTitle className="text-3xl text-slate-100">You're all set, {profile.name}!</CardTitle>
            <CardDescription className="text-base text-slate-300">
              We've created a personalized fitness plan that flows with your natural rhythms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 p-4 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/30 rounded-lg">
              <h3 className="font-semibold text-lg text-slate-100">Your Profile Summary:</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-medium text-slate-200">Fitness Level:</span>{" "}
                  {profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1)}
                </p>
                <p>
                  <span className="font-medium text-slate-200">Mode:</span>{" "}
                  {profile.mode === "pregnancy" ? `Pregnancy (${profile.trimester} trimester)` : "Cycle Tracking"}
                </p>
                <p>
                  <span className="font-medium text-slate-200">Goals:</span> {profile.goals.length} selected
                </p>
              </div>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              size="lg"
            >
              Begin Your Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
