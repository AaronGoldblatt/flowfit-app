"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSession } from "@/lib/auth-client"
import { User, Mail, Lock, Loader2, Target, Calendar as CalendarIcon, Heart } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Account info state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Profile info state
  const [age, setAge] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner")
  const [goals, setGoals] = useState<string[]>([])
  const [mode, setMode] = useState<"cycle" | "pregnancy">("cycle")
  const [trimester, setTrimester] = useState<"first" | "second" | "third">("first")
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(undefined)
  const [cycleLength, setCycleLength] = useState("28")
  const [periodLength, setPeriodLength] = useState("5")

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
    }
    
    // Load profile data
    loadProfileData()
  }, [session])

  const loadProfileData = async () => {
    try {
      const { getProfile } = await import("@/actions/profile")
      const { getCurrentCycle } = await import("@/actions/cycles")
      
      const { data: profileData } = await getProfile()
      if (profileData) {
        setAge(profileData.age?.toString() || "")
        setFitnessLevel(profileData.fitnessLevel as "beginner" | "intermediate" | "advanced")
        setGoals(profileData.goals || [])
        setMode(profileData.mode as "cycle" | "pregnancy")
        setTrimester(profileData.trimester as "first" | "second" | "third" || "first")
        
        // Load cycle data if in cycle mode
        if (profileData.mode === "cycle") {
          const { data: cycleData } = await getCurrentCycle()
          if (cycleData) {
            if (cycleData.lastPeriodDate) {
              setLastPeriodDate(new Date(cycleData.lastPeriodDate))
            }
            setCycleLength(cycleData.cycleLength?.toString() || "28")
            setPeriodLength(cycleData.periodLength?.toString() || "5")
          }
        }
      }
    } catch (error) {
      console.error("Error loading profile data:", error)
    }
  }

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { updateUserInfo } = await import("@/actions/user")
      const result = await updateUserInfo({ name, email })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Account information updated successfully!")
        setTimeout(() => {
          setSuccess(null)
          // Refresh the page to update session data
          window.location.reload()
        }, 2000)
      }
    } catch (err) {
      setError("An error occurred while updating your account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { changePassword } = await import("@/actions/user")
      const result = await changePassword({ currentPassword, newPassword })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Password changed successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      setError("An error occurred while changing your password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { updateProfile } = await import("@/actions/profile")
      const { upsertCycle } = await import("@/actions/cycles")

      // Update profile
      const profileResult = await updateProfile({
        age: age ? Number.parseInt(age) : undefined,
        fitnessLevel,
        goals,
        mode,
        trimester: mode === "pregnancy" ? trimester : undefined,
      })

      if (profileResult.error) {
        setError(profileResult.error)
        setIsLoading(false)
        return
      }

      // Update cycle data if in cycle mode
      if (mode === "cycle" && lastPeriodDate) {
        await upsertCycle({
          lastPeriodDate: lastPeriodDate.toISOString().split('T')[0],
          cycleLength: Number.parseInt(cycleLength),
          periodLength: Number.parseInt(periodLength),
        })
      }

      setSuccess("Profile updated successfully!")
      setTimeout(() => {
        setSuccess(null)
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError("An error occurred while updating your profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-indigo-500/30 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl lunar-gradient-text">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Update your account information and security settings
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-950/50 border border-green-500/30 text-green-300 text-sm">
            {success}
          </div>
        )}

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="profile">Profile & Goals</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 mt-4">
            <Card className="border-indigo-500/30 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your name and email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-200">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card className="border-indigo-500/30 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                  <User className="h-5 w-5" />
                  Personal Details
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your age and fitness level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-slate-200">
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Your age"
                        className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-200">Fitness Level</Label>
                      <RadioGroup
                        value={fitnessLevel}
                        onValueChange={(value) => setFitnessLevel(value as "beginner" | "intermediate" | "advanced")}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="edit-beginner" />
                          <Label htmlFor="edit-beginner" className="text-slate-200 cursor-pointer">Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="edit-intermediate" />
                          <Label htmlFor="edit-intermediate" className="text-slate-200 cursor-pointer">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="edit-advanced" />
                          <Label htmlFor="edit-advanced" className="text-slate-200 cursor-pointer">Advanced</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-200 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Fitness Goals
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "strength", label: "Build Strength", icon: "💪" },
                        { id: "endurance", label: "Improve Endurance", icon: "🏃‍♀️" },
                        { id: "flexibility", label: "Increase Flexibility", icon: "🧘‍♀️" },
                        { id: "weight", label: "Manage Weight", icon: "⚖️" },
                        { id: "energy", label: "Boost Energy", icon: "⚡" },
                        { id: "stress", label: "Reduce Stress", icon: "🌿" },
                      ].map((goal) => (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className={cn(
                            "p-3 border-2 rounded-lg text-left transition-all",
                            goals.includes(goal.id)
                              ? "border-indigo-500 bg-indigo-950/50"
                              : "border-indigo-500/30 bg-slate-800/30 hover:border-indigo-500/50"
                          )}
                        >
                          <div className="text-xl mb-1">{goal.icon}</div>
                          <div className="font-medium text-xs text-slate-200">{goal.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-200 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Tracking Mode
                    </Label>
                    <RadioGroup
                      value={mode}
                      onValueChange={(value) => setMode(value as "cycle" | "pregnancy")}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg">
                        <RadioGroupItem value="cycle" id="edit-cycle" />
                        <Label htmlFor="edit-cycle" className="flex-1 cursor-pointer text-slate-200">
                          Cycle Tracking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg">
                        <RadioGroupItem value="pregnancy" id="edit-pregnancy" />
                        <Label htmlFor="edit-pregnancy" className="flex-1 cursor-pointer text-slate-200">
                          Pregnancy
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {mode === "pregnancy" ? (
                    <div className="space-y-3">
                      <Label className="text-slate-200">Trimester</Label>
                      <RadioGroup value={trimester} onValueChange={(value) => setTrimester(value as "first" | "second" | "third")}>
                        <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg">
                          <RadioGroupItem value="first" id="edit-first" />
                          <Label htmlFor="edit-first" className="cursor-pointer text-slate-200">First Trimester</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg">
                          <RadioGroupItem value="second" id="edit-second" />
                          <Label htmlFor="edit-second" className="cursor-pointer text-slate-200">Second Trimester</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-indigo-500/30 bg-slate-800/30 rounded-lg">
                          <RadioGroupItem value="third" id="edit-third" />
                          <Label htmlFor="edit-third" className="cursor-pointer text-slate-200">Third Trimester</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Last Period Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal border-indigo-500/30 bg-slate-800/50 text-slate-200",
                                !lastPeriodDate && "text-slate-500"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {lastPeriodDate ? format(lastPeriodDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-slate-900 border-indigo-500/30" align="start">
                            <Calendar
                              mode="single"
                              selected={lastPeriodDate}
                              onSelect={(date) => setLastPeriodDate(date)}
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
                            value={cycleLength}
                            onChange={(e) => setCycleLength(e.target.value)}
                            className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="periodLength" className="text-slate-200">
                            Period Length (days)
                          </Label>
                          <Input
                            id="periodLength"
                            type="number"
                            value={periodLength}
                            onChange={(e) => setPeriodLength(e.target.value)}
                            className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <Card className="border-indigo-500/30 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-200">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-slate-200">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-200">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

