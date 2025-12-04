/**
 * Utility functions for cycle tracking and phase calculation
 */

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

/**
 * Parse a date string (YYYY-MM-DD) into a Date object in local timezone
 * This prevents timezone issues when comparing dates
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  // Month is 0-indexed in JavaScript Date
  return new Date(year, month - 1, day);
}

/**
 * Get the start of day for a date in local timezone
 */
export function getLocalDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Calculate days between two dates (date-only, ignoring time)
 */
export function daysBetweenDates(date1: Date, date2: Date): number {
  const d1 = getLocalDateOnly(date1);
  const d2 = getLocalDateOnly(date2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export interface CycleInfo {
  phase: CyclePhase;
  dayInCycle: number;
  daysUntilNextPeriod: number;
  cycleProgress: number;
}

/**
 * Calculate the current cycle phase and day
 */
export function calculateCycleInfo(
  lastPeriodDate: Date | string,
  cycleLength = 28,
  periodLength = 5,
  referenceDate?: Date
): CycleInfo {
  // Parse the date properly to avoid timezone issues
  const lastPeriod = typeof lastPeriodDate === 'string' 
    ? parseLocalDate(lastPeriodDate)
    : getLocalDateOnly(lastPeriodDate);
  
  const today = referenceDate ? getLocalDateOnly(referenceDate) : getLocalDateOnly(new Date());
  const daysSinceLastPeriod = daysBetweenDates(lastPeriod, today);

  // Calculate current day in cycle (1-based)
  const dayInCycle = (daysSinceLastPeriod % cycleLength) + 1;

  // Calculate days until next period
  const daysUntilNextPeriod = cycleLength - dayInCycle + 1;

  // Calculate cycle progress percentage
  const cycleProgress = (dayInCycle / cycleLength) * 100;

  // Determine phase
  let phase: CyclePhase;
  if (dayInCycle <= periodLength) {
    phase = "menstrual";
  } else if (dayInCycle <= 13) {
    phase = "follicular";
  } else if (dayInCycle <= 16) {
    phase = "ovulation";
  } else {
    phase = "luteal";
  }

  return {
    phase,
    dayInCycle,
    daysUntilNextPeriod,
    cycleProgress,
  };
}

/**
 * Get phase information
 */
export function getPhaseInfo(phase: CyclePhase) {
  const phaseData = {
    menstrual: {
      name: "Menstrual Phase",
      moonEmoji: "🌑",
      color: "bg-slate-800 text-slate-200 border-slate-600",
      description: "Rest and renewal",
      energy: "Low energy - honor your need for rest",
      recommendations: [
        "Focus on gentle movement",
        "Prioritize rest and recovery",
        "Stay hydrated",
        "Light yoga or walking",
      ],
    },
    follicular: {
      name: "Follicular Phase",
      moonEmoji: "🌒",
      color: "bg-indigo-900 text-indigo-200 border-indigo-600",
      description: "Energy is rising",
      energy: "Building energy - embrace new challenges",
      recommendations: [
        "Try new workouts",
        "Increase workout intensity",
        "Good time for strength training",
        "Higher energy levels",
      ],
    },
    ovulation: {
      name: "Ovulation Phase",
      moonEmoji: "🌕",
      color: "bg-purple-900 text-purple-200 border-purple-600",
      description: "Peak power time",
      energy: "High energy - peak performance window",
      recommendations: [
        "Push for personal bests",
        "High-intensity workouts",
        "Maximum strength potential",
        "Great for competitions",
      ],
    },
    luteal: {
      name: "Luteal Phase",
      moonEmoji: "🌘",
      color: "bg-violet-900 text-violet-200 border-violet-600",
      description: "Winding down",
      energy: "Moderate energy - steady and strong",
      recommendations: [
        "Moderate intensity workouts",
        "Focus on consistency",
        "Listen to your body",
        "Pilates and yoga work well",
      ],
    },
  };

  return phaseData[phase];
}

/**
 * Get recommended workout intensity for phase
 */
export function getRecommendedIntensity(
  phase: CyclePhase
): "low" | "medium" | "high" {
  const intensityMap: Record<CyclePhase, "low" | "medium" | "high"> = {
    menstrual: "low",
    follicular: "high",
    ovulation: "high",
    luteal: "medium",
  };

  return intensityMap[phase];
}

/**
 * Calculate predicted next period date
 */
export function predictNextPeriod(
  lastPeriodDate: Date,
  cycleLength = 28
): Date {
  const nextPeriod = new Date(lastPeriodDate);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  return nextPeriod;
}

/**
 * Calculate predicted ovulation date
 */
export function predictOvulation(
  lastPeriodDate: Date,
  cycleLength = 28
): Date {
  const ovulation = new Date(lastPeriodDate);
  // Ovulation typically occurs 14 days before next period
  ovulation.setDate(ovulation.getDate() + cycleLength - 14);
  return ovulation;
}

/**
 * Get the cycle phase for a specific date
 * Used by the calendar to show phases for each day
 */
export function getPhaseForDate(
  date: Date,
  lastPeriodDate: Date | string,
  cycleLength = 28,
  periodLength = 5
): CyclePhase | null {
  // Parse the date properly to avoid timezone issues
  const lastPeriod = typeof lastPeriodDate === 'string' 
    ? parseLocalDate(lastPeriodDate)
    : getLocalDateOnly(lastPeriodDate);
  
  const checkDate = getLocalDateOnly(date);
  const daysSinceLastPeriod = daysBetweenDates(lastPeriod, checkDate);

  // Don't show phases for dates before the last period
  if (daysSinceLastPeriod < 0) return null;

  // Calculate current day in cycle (1-based)
  const dayInCycle = (daysSinceLastPeriod % cycleLength) + 1;

  // Determine phase
  if (dayInCycle <= periodLength) return "menstrual";
  if (dayInCycle <= 13) return "follicular";
  if (dayInCycle <= 16) return "ovulation";
  return "luteal";
}

