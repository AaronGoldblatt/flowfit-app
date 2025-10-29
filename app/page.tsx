"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { MainApp } from "@/components/main-app"

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
  }

  return <MainApp />
}
