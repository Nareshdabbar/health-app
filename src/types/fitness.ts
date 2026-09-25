export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  clinicalPlan: string;
  isCarePlanActive: boolean;
  memberSince: string;
}

export interface FitnessGoals {
  stepGoal: number;
  burnGoal: number;
  sleepGoalHours: number;
  waterGoalMl: number;
  targetGlucoseMin: number;
  targetGlucoseMax: number;
  timeInRangeGoal: number;
}

export interface GlucosePoint {
  time: string;
  value: number;
  label?: string;
  isSpike?: boolean;
}

export interface BiomarkerProgress {
  currentGlucose: number;
  glucoseTrend: "flat" | "up" | "down";
  glucoseStatus: "in-target" | "elevated" | "low";
  lastSyncTime: string;
  timeInRangePercent: number;
  standardDeviation: number;
  steps: number;
  burnCalories: number;
  sleepHours: number;
  sleepMinutes: number;
  sleepScore: number;
  estimatedHbA1c: number;
  avgGlucose: number;
  weeklyStability: number;
  glucoseCurvePoints: GlucosePoint[];
}

export interface MetabolicHabit {
  id: string;
  title: string;
  time: string;
  subtext: string;
  completed: boolean;
  icon: string;
  badge?: string;
}

export interface TimelineLogItem {
  id: string;
  type:
    | "meal"
    | "glucose"
    | "sleep"
    | "medication"
    | "workout"
    | "weight"
    | "vitals"
    | "report";
  title: string;
  time: string;
  badge: string;
  badgeType: "target" | "attention" | "purple" | "blue" | "neutral";
  impactText: string;
  details?: string;
  metrics: string[];
  icon: string;
  timestamp: number;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  degrees: string;
  experience: string;
  rating: number;
  avatar: string;
  availableToday: boolean;
  bio: string;
}

export interface Consultation {
  id: string;
  doctorName: string;
  specialty: string;
  doctorAvatar: string;
  date: string;
  timeSlot: string;
  mode: "video" | "chat";
  status: "confirmed" | "completed" | "cancelled";
  autoShareCgm: boolean;
  createdAt: number;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: string; // <-- Add this line
  rating: number;
  reviewsCount: number;
  image: string;
  isBestseller?: boolean;
}

export interface ClinicalProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  monthlyPrice: number;
  image: string;
  category: "diabetes" | "metabolism" | "pcos" | "vitals";
  features: string[];
  isPopular?: boolean;
}
