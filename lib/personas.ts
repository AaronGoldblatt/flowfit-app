/**
 * User persona definitions and utilities
 */

export type PersonaType = "student" | "professional" | "athlete" | "new_mother" | "busy_parent" | "wellness_enthusiast"

export interface PersonaInfo {
  id: PersonaType
  label: string
  icon: string
  description: string
  motivationalMessage: string
  focusAreas: string[]
}

export const PERSONAS: Record<PersonaType, PersonaInfo> = {
  student: {
    id: "student",
    label: "College Student",
    icon: "🎓",
    description: "Balancing fitness with classes, studying, and social life",
    motivationalMessage: "Stay energized through exams and campus life!",
    focusAreas: ["Quick workouts", "Stress relief", "Energy management", "Flexible scheduling"],
  },
  professional: {
    id: "professional",
    label: "Career Professional",
    icon: "💼",
    description: "Managing wellness alongside a demanding career",
    motivationalMessage: "Power through your workday with balanced fitness!",
    focusAreas: ["Early morning workouts", "Stress reduction", "Posture improvement", "Work-life balance"],
  },
  athlete: {
    id: "athlete",
    label: "Competitive Athlete",
    icon: "🏆",
    description: "Training for peak performance and competition",
    motivationalMessage: "Optimize your training with cycle awareness!",
    focusAreas: ["Performance optimization", "Strength gains", "Competition prep", "Recovery timing"],
  },
  new_mother: {
    id: "new_mother",
    label: "New Mother",
    icon: "👶",
    description: "Rebuilding strength and wellness postpartum",
    motivationalMessage: "Gentle progress is still progress - you're amazing!",
    focusAreas: ["Postpartum recovery", "Pelvic floor health", "Energy restoration", "Self-care"],
  },
  busy_parent: {
    id: "busy_parent",
    label: "Busy Parent",
    icon: "👨‍👩‍👧",
    description: "Fitting in fitness while caring for your family",
    motivationalMessage: "Every workout counts - you're setting a great example!",
    focusAreas: ["Time-efficient workouts", "Home exercises", "Family activities", "Stress relief"],
  },
  wellness_enthusiast: {
    id: "wellness_enthusiast",
    label: "Wellness Enthusiast",
    icon: "🌿",
    description: "Holistic approach to mind-body health and balance",
    motivationalMessage: "Honor your body's natural rhythms and cycles!",
    focusAreas: ["Mind-body connection", "Holistic health", "Natural wellness", "Intuitive movement"],
  },
}

export function getPersonaInfo(personaId?: string): PersonaInfo | null {
  if (!personaId || !(personaId in PERSONAS)) return null
  return PERSONAS[personaId as PersonaType]
}

export function getPersonaLabel(personaId?: string): string {
  const persona = getPersonaInfo(personaId)
  return persona?.label || "Not set"
}

export function getPersonaMotivation(personaId?: string): string {
  const persona = getPersonaInfo(personaId)
  return persona?.motivationalMessage || "Stay consistent with your fitness journey!"
}

