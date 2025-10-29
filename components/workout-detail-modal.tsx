"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Flame, CheckCircle2, Play, SkipForward } from "lucide-react"

interface Workout {
  id: string
  title: string
  duration: string
  intensity: "low" | "medium" | "high"
  calories: string
  description: string
  exercises: string[]
}

interface WorkoutDetailModalProps {
  workout: Workout | null
  open: boolean
  onClose: () => void
  onComplete: (workoutId: string) => void
}

export function WorkoutDetailModal({ workout, open, onClose, onComplete }: WorkoutDetailModalProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  if (!workout) return null

  const handleStart = () => {
    setIsStarted(true)
    setCurrentExercise(0)
  }

  const handleNext = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleComplete = () => {
    onComplete(workout.id)
    setIsStarted(false)
    setCurrentExercise(0)
    setIsCompleted(false)
    onClose()
  }

  const progressPercent = ((currentExercise + 1) / workout.exercises.length) * 100

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{workout.title}</DialogTitle>
          <DialogDescription>{workout.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Workout Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-pink-500" />
              <span>{workout.duration}</span>
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

          {!isStarted && !isCompleted && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Exercises in this workout:</h4>
                <div className="space-y-2">
                  {workout.exercises.map((exercise, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-medium">
                        {idx + 1}
                      </div>
                      <span>{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleStart} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                <Play className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </div>
          )}

          {isStarted && !isCompleted && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {currentExercise + 1} of {workout.exercises.length}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">Current Exercise</div>
                <h3 className="text-2xl font-bold text-balance">{workout.exercises[currentExercise]}</h3>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">
                  {currentExercise < workout.exercises.length - 1 ? (
                    <>
                      <SkipForward className="mr-2 h-4 w-4" />
                      Next Exercise
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Finish Workout
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Workout Complete!</h3>
                <p className="text-muted-foreground">Great job! You completed {workout.title}</p>
              </div>
              <Button onClick={handleComplete} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
