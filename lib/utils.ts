import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Goal mapping utility
export const GOAL_LABELS: Record<string, string> = {
  strength: "Build Strength",
  endurance: "Improve Endurance",
  flexibility: "Increase Flexibility",
  weight: "Manage Weight",
  energy: "Boost Energy",
  stress: "Reduce Stress",
}

export function getGoalLabel(goalId: string): string {
  return GOAL_LABELS[goalId] || goalId.charAt(0).toUpperCase() + goalId.slice(1)
}
