"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Sparkles, Sun, Moon, Dumbbell, Heart, Brain } from "lucide-react"

interface EducationModalProps {
  open: boolean
  onClose: () => void
}

export function EducationModal({ open, onClose }: EducationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Understanding Your Cycle</DialogTitle>
          <DialogDescription>Learn how to optimize your workouts with your hormones</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="phases" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="hormones">Hormones</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="phases" className="space-y-4 mt-4">
            <Card className="border-red-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-red-500" />
                  <CardTitle>Menstrual Phase (Days 1-5)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Your period begins. Estrogen and progesterone are at their lowest, which can lead to fatigue and lower
                  energy.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Workouts:</p>
                  <p className="text-sm text-muted-foreground">
                    Gentle yoga, walking, light stretching. Focus on rest and recovery.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <CardTitle>Follicular Phase (Days 6-13)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Estrogen rises, boosting energy, mood, and strength. You'll feel more motivated and capable.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Workouts:</p>
                  <p className="text-sm text-muted-foreground">
                    HIIT, strength training, try new exercises. This is your power phase!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <CardTitle>Ovulation Phase (Days 14-16)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Peak estrogen and testosterone. You're at your strongest and most energetic point in your cycle.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Workouts:</p>
                  <p className="text-sm text-muted-foreground">
                    Maximum intensity HIIT, heavy lifting, competitive sports. Push your limits!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-purple-500" />
                  <CardTitle>Luteal Phase (Days 17-28)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Progesterone rises then falls. Energy decreases, you may experience PMS symptoms and cravings.
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Workouts:</p>
                  <p className="text-sm text-muted-foreground">
                    Moderate cardio, pilates, yoga. Focus on steady-state and mind-body connection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hormones" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Estrogen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">
                  Rises during follicular phase and peaks at ovulation. Increases energy, strength, and endurance.
                </p>
                <p className="text-sm text-muted-foreground">
                  When estrogen is high, you can handle more intense workouts and recover faster.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-purple-500" />
                  Progesterone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Rises during luteal phase. Can increase body temperature and fatigue.</p>
                <p className="text-sm text-muted-foreground">
                  When progesterone is high, focus on moderate intensity and prioritize recovery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                  Testosterone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Peaks during ovulation. Enhances muscle building and strength.</p>
                <p className="text-sm text-muted-foreground">
                  Take advantage of this peak by doing your heaviest lifts during ovulation.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Training Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Listen to Your Body</p>
                  <p className="text-sm text-muted-foreground">
                    Every cycle is different. If you need rest, take it. There's no shame in modifying workouts.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Track Your Symptoms</p>
                  <p className="text-sm text-muted-foreground">
                    Notice patterns in energy, strength, and mood. Use this data to plan your training.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Nutrition Matters</p>
                  <p className="text-sm text-muted-foreground">
                    Increase carbs during luteal phase, focus on iron during menstruation, and protein throughout.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Recovery is Training</p>
                  <p className="text-sm text-muted-foreground">
                    Rest days are when your body adapts and gets stronger. Don't skip them!
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Consistency Over Intensity</p>
                  <p className="text-sm text-muted-foreground">
                    Working with your cycle leads to better long-term results than pushing through every day.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
