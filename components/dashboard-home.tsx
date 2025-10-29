"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Flame, Droplets, Play, CheckCircle2 } from "lucide-react"

export function DashboardHome() {
  // Mock data - in real app this would come from AI recommendations
  const currentPhase = {
    name: "Follicular",
    day: 8,
    color: "text-accent",
    bgColor: "bg-accent/10",
    icon: Flame,
    description: "Energy is rising! Perfect time for strength training.",
  }

  const todayWorkout = {
    type: "Strength Training",
    duration: "35 min",
    intensity: "Moderate-High",
    focus: "Upper Body & Core",
    exercises: [
      { name: "Push-ups", sets: "3x12", completed: true },
      { name: "Dumbbell Rows", sets: "3x10", completed: true },
      { name: "Plank Hold", sets: "3x45s", completed: false },
      { name: "Shoulder Press", sets: "3x12", completed: false },
    ],
  }

  const insights = [
    {
      icon: Sparkles,
      title: "Peak Performance Window",
      description: "Your strength is 25% higher this week",
      color: "text-accent",
    },
    {
      icon: Droplets,
      title: "Hydration Reminder",
      description: "Drink extra water during this phase",
      color: "text-blue-500",
    },
  ]

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground">Good morning, Sarah! 🌸</h1>
        <p className="text-muted-foreground mt-1">Let's make today amazing</p>
      </div>

      {/* Current Phase Card */}
      <Card className={`p-6 border-2 ${currentPhase.bgColor} border-accent/30`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <currentPhase.icon className={`w-5 h-5 ${currentPhase.color}`} />
              <h3 className="font-bold text-lg">{currentPhase.name} Phase</h3>
            </div>
            <p className="text-sm text-muted-foreground">Day {currentPhase.day} of your cycle</p>
          </div>
          <Badge className="bg-accent text-foreground">Active</Badge>
        </div>
        <p className="text-sm text-balance">{currentPhase.description}</p>
      </Card>

      {/* AI Insights */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Insights
        </h2>
        {insights.map((insight, i) => (
          <Card key={i} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-surface-secondary ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Today's Workout */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Today's Workout</h2>
        <Card className="p-6 border-2 border-primary/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-xl text-primary">{todayWorkout.type}</h3>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span>{todayWorkout.duration}</span>
                <span>•</span>
                <span>{todayWorkout.intensity}</span>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <Play className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium">Focus: {todayWorkout.focus}</p>
            <div className="space-y-2">
              {todayWorkout.exercises.map((exercise, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${exercise.completed ? "text-success fill-success/20" : "text-muted"}`}
                    />
                    <span className="text-sm">{exercise.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{exercise.sets}</span>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary-dark text-white">Start Workout</Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-xs text-muted-foreground mt-1">Workouts</div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-secondary">85%</div>
          <div className="text-xs text-muted-foreground mt-1">Consistency</div>
          <div className="text-xs text-muted-foreground">Rate</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">420</div>
          <div className="text-xs text-muted-foreground mt-1">Total</div>
          <div className="text-xs text-muted-foreground">Minutes</div>
        </Card>
      </div>
    </div>
  )
}
