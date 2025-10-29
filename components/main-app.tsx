"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Calendar, TrendingUp, User, Menu, Moon } from "lucide-react"
import { HomeDashboard } from "@/components/home-dashboard"
import { CycleTracker } from "@/components/cycle-tracker"
import { PregnancyTracker } from "@/components/pregnancy-tracker"
import { ProgressView } from "@/components/progress-view"
import { ProfileView } from "@/components/profile-view"

export function MainApp() {
  const [activeTab, setActiveTab] = useState<"home" | "cycle" | "progress" | "profile">("home")
  const [isPregnancyMode, setIsPregnancyMode] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem("flowfit-profile")
    if (storedProfile) {
      const profile = JSON.parse(storedProfile)
      setIsPregnancyMode(profile.mode === "pregnancy")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] pb-20">
      {/* Header */}
      <header className="bg-[#1e293b]/80 backdrop-blur-sm border-b border-[#475569] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] rounded-full flex items-center justify-center moon-glow">
              <Moon className="h-5 w-5 text-[#e0e7ff]" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#e0e7ff] via-[#a78bfa] to-[#8b5cf6] bg-clip-text text-transparent">
              FlowFit
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="text-[#e0e7ff] hover:bg-[#334155]">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "home" && <HomeDashboard />}
        {activeTab === "cycle" && (isPregnancyMode ? <PregnancyTracker /> : <CycleTracker />)}
        {activeTab === "progress" && <ProgressView />}
        {activeTab === "profile" && <ProfileView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b]/90 backdrop-blur-sm border-t border-[#475569]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-around">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("home")}
            className={
              activeTab === "home"
                ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb]"
                : "text-[#cbd5e1] hover:bg-[#334155] hover:text-[#e0e7ff]"
            }
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === "cycle" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("cycle")}
            className={
              activeTab === "cycle"
                ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb]"
                : "text-[#cbd5e1] hover:bg-[#334155] hover:text-[#e0e7ff]"
            }
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === "progress" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("progress")}
            className={
              activeTab === "progress"
                ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb]"
                : "text-[#cbd5e1] hover:bg-[#334155] hover:text-[#e0e7ff]"
            }
          >
            <TrendingUp className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("profile")}
            className={
              activeTab === "profile"
                ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb]"
                : "text-[#cbd5e1] hover:bg-[#334155] hover:text-[#e0e7ff]"
            }
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </div>
  )
}
