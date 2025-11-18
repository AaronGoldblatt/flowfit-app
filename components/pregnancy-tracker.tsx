"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Baby, AlertCircle, Play, Clock, Flame, BookOpen } from "lucide-react"
import { getProfile } from "@/actions/profile"

interface UserProfile {
  name: string
  trimester?: string
  mode: "cycle" | "pregnancy"
}

interface PregnancyWorkout {
  id: string
  title: string
  duration: string
  intensity: "low" | "medium"
  calories: string
  description: string
  exercises: string[]
  trimester: string
  benefits: string[]
  precautions: string[]
}

interface TrimesterInfo {
  name: string
  weeks: string
  focus: string
  description: string
  tips: string[]
  safeActivities: string[]
  avoid: string[]
}

export function PregnancyTracker() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<PregnancyWorkout | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: profileData } = await getProfile()
        if (profileData) {
          setProfile({
            name: profileData.name,
            trimester: profileData.trimester || "first",
            mode: profileData.mode as "cycle" | "pregnancy",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        setProfile({ name: "User", trimester: "first", mode: "pregnancy" })
      }
    }

    loadProfile()
  }, [])

  const trimesterInfo: Record<string, TrimesterInfo> = {
    first: {
      name: "First Trimester",
      weeks: "Weeks 1-12",
      focus: "Gentle Movement & Energy Conservation",
      description:
        "Your body is working hard to support early pregnancy. Focus on gentle activities and listen to your body's signals.",
      tips: [
        "Stay hydrated throughout your workout",
        "Avoid overheating - exercise in cool environments",
        "Take breaks whenever you feel tired",
        "Focus on maintaining fitness rather than improving it",
      ],
      safeActivities: ["Walking", "Swimming", "Prenatal Yoga", "Light Strength Training", "Stretching"],
      avoid: [
        "Contact sports",
        "Activities with fall risk",
        "Hot yoga or saunas",
        "Exercises lying flat on your back after 12 weeks",
      ],
    },
    second: {
      name: "Second Trimester",
      weeks: "Weeks 13-26",
      focus: "Building Strength & Endurance",
      description:
        "Often called the 'golden period' - energy returns and you can maintain a more active routine while your bump is still manageable.",
      tips: [
        "Strengthen your core and pelvic floor",
        "Modify exercises as your belly grows",
        "Use support belts if needed",
        "Continue regular, moderate exercise",
      ],
      safeActivities: [
        "Prenatal Strength Training",
        "Swimming & Water Aerobics",
        "Stationary Cycling",
        "Modified Pilates",
        "Brisk Walking",
      ],
      avoid: ["Exercises on your back", "Heavy lifting", "High-impact activities", "Deep twisting movements"],
    },
    third: {
      name: "Third Trimester",
      weeks: "Weeks 27-40",
      focus: "Preparation & Comfort",
      description:
        "Focus on exercises that prepare you for labor while staying comfortable. Gentle movement helps with common discomforts.",
      tips: [
        "Practice breathing techniques for labor",
        "Focus on pelvic floor exercises",
        "Use props for support and comfort",
        "Short, frequent sessions may be easier",
      ],
      safeActivities: ["Gentle Prenatal Yoga", "Walking", "Swimming", "Pelvic Floor Exercises", "Birth Ball Exercises"],
      avoid: ["Lying flat on back", "Balance-challenging poses", "Intense cardio", "Overhead heavy lifting"],
    },
  }

  const pregnancyWorkouts: PregnancyWorkout[] = [
    {
      id: "pw1",
      title: "First Trimester Gentle Flow",
      duration: "20 min",
      intensity: "low",
      calories: "80-100",
      description: "Gentle movements to ease nausea and maintain flexibility",
      exercises: ["Cat-Cow Stretch", "Pelvic Tilts", "Gentle Side Bends", "Seated Breathing"],
      trimester: "first",
      benefits: ["Reduces nausea", "Improves circulation", "Maintains flexibility", "Promotes relaxation"],
      precautions: ["Stop if you feel dizzy", "Avoid overheating", "Stay hydrated"],
    },
    {
      id: "pw2",
      title: "First Trimester Walking Routine",
      duration: "25 min",
      intensity: "low",
      calories: "100-120",
      description: "Easy-paced walking to boost energy and mood",
      exercises: ["Warm-up Walk", "Steady Pace", "Arm Swings", "Cool Down Stretches"],
      trimester: "first",
      benefits: ["Boosts energy", "Improves mood", "Maintains cardiovascular health", "Low impact"],
      precautions: ["Walk on flat, even surfaces", "Wear supportive shoes", "Bring water"],
    },
    {
      id: "pw3",
      title: "Second Trimester Strength Builder",
      duration: "30 min",
      intensity: "medium",
      calories: "150-180",
      description: "Build strength for carrying your growing baby",
      exercises: ["Modified Squats", "Wall Push-ups", "Bicep Curls", "Lateral Raises", "Pelvic Floor"],
      trimester: "second",
      benefits: ["Builds strength", "Supports posture", "Prepares for labor", "Reduces back pain"],
      precautions: ["Avoid lying flat", "Use lighter weights", "Breathe throughout"],
    },
    {
      id: "pw4",
      title: "Second Trimester Aqua Fitness",
      duration: "35 min",
      intensity: "medium",
      calories: "180-200",
      description: "Water-based exercises for low-impact cardio",
      exercises: ["Water Walking", "Leg Lifts", "Arm Circles", "Treading Water", "Floating Stretches"],
      trimester: "second",
      benefits: ["Reduces swelling", "Low impact on joints", "Keeps you cool", "Full body workout"],
      precautions: ["Avoid diving", "Stay in comfortable water temperature", "Use pool edge for support"],
    },
    {
      id: "pw5",
      title: "Third Trimester Labor Prep",
      duration: "25 min",
      intensity: "low",
      calories: "90-110",
      description: "Exercises to prepare your body for birth",
      exercises: ["Deep Squats", "Pelvic Tilts", "Kegel Exercises", "Hip Circles", "Breathing Practice"],
      trimester: "third",
      benefits: ["Prepares for labor", "Strengthens pelvic floor", "Opens hips", "Practices breathing"],
      precautions: ["Use support for balance", "Stop if contractions start", "Stay comfortable"],
    },
    {
      id: "pw6",
      title: "Third Trimester Gentle Yoga",
      duration: "20 min",
      intensity: "low",
      calories: "80-100",
      description: "Relaxing poses for comfort and flexibility",
      exercises: ["Child's Pose", "Cat-Cow", "Side-Lying Stretches", "Butterfly Pose", "Savasana"],
      trimester: "third",
      benefits: ["Reduces discomfort", "Promotes relaxation", "Improves sleep", "Gentle stretching"],
      precautions: ["Use pillows for support", "Avoid deep twists", "Listen to your body"],
    },
  ]

  if (!profile || profile.mode !== "pregnancy") {
    return (
      <div className="space-y-6">
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle>Pregnancy Programs</CardTitle>
            <CardDescription>This feature is only available in pregnancy mode</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const currentTrimester = profile.trimester || "first"
  const trimesterData = trimesterInfo[currentTrimester]
  const trimesterWorkouts = pregnancyWorkouts.filter((w) => w.trimester === currentTrimester)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Pregnancy Fitness</h2>
        <p className="text-muted-foreground mt-1">Safe, effective workouts for your journey</p>
      </div>

      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="guide">Trimester Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-6">
          {/* Current Trimester Card */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                    <Baby className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{trimesterData.name}</CardTitle>
                    <CardDescription>{trimesterData.weeks}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-purple-50">
                  {trimesterData.focus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{trimesterData.description}</p>
            </CardContent>
          </Card>

          {/* Safety Notice */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-700" />
                <CardTitle className="text-base text-yellow-900">Important Safety Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-900">
                Always consult with your healthcare provider before starting any exercise program during pregnancy. Stop
                exercising and contact your doctor if you experience any concerning symptoms.
              </p>
            </CardContent>
          </Card>

          {/* Workouts */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Workouts</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {trimesterWorkouts.map((workout) => (
                <Card key={workout.id} className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{workout.title}</CardTitle>
                        <CardDescription className="mt-1">{workout.description}</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          workout.intensity === "medium"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {workout.intensity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                      <p className="text-sm font-medium">Exercises:</p>
                      <div className="flex flex-wrap gap-2">
                        {workout.exercises.map((exercise, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Benefits:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {workout.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Heart className="h-3 w-3 text-pink-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Play className="mr-2 h-4 w-4" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          {/* Trimester Overview */}
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <CardTitle>{trimesterData.name} Guide</CardTitle>
              </div>
              <CardDescription>{trimesterData.weeks}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Focus Area</h4>
                <p className="text-sm text-muted-foreground">{trimesterData.focus}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Exercise Tips</h4>
                <ul className="space-y-2">
                  {trimesterData.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Safe Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {trimesterData.safeActivities.map((activity, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Activities to Avoid</h4>
                <div className="flex flex-wrap gap-2">
                  {trimesterData.avoid.map((activity, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Trimesters Overview */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Your Pregnancy Journey</CardTitle>
              <CardDescription>What to expect in each trimester</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(trimesterInfo).map(([key, info]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 ${
                    key === currentTrimester ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{info.name}</h4>
                    {key === currentTrimester && <Badge className="bg-purple-500">Current</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{info.weeks}</p>
                  <p className="text-sm">{info.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Warning Signs */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-700" />
                <CardTitle className="text-base text-red-900">When to Stop Exercising</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-900 mb-3">
                Contact your healthcare provider immediately if you experience:
              </p>
              <ul className="space-y-1 text-sm text-red-900">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Vaginal bleeding or fluid leakage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Chest pain or severe shortness of breath</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Dizziness, headache, or blurred vision</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Muscle weakness or calf pain/swelling</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Regular painful contractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5" />
                  <span>Decreased fetal movement</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
