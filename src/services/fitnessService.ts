import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  UserProfile,
  FitnessGoals,
  BiomarkerProgress,
  MetabolicHabit,
  TimelineLogItem,
  Consultation,
} from '../types/fitness';

export const INITIAL_USER: UserProfile = {
  id: 'current_user',
  name: 'Priya Sharma',
  phone: '+91 98765 43210',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSmq8DMibESzJ1RnBQqCneATKqDXW-aJnjcwvfvKn9tUXdmNG80K1JeDA0fQqNXm66ry4D_CfU6u2vyenc3h0uPGvrX99XTgeTnqu-X7N_8xeAAUZQcjhLE54Dj_YwqK4grZch3LrqtlnyFi7-9hd2lmTm5_nZmiYLTe8-EwaI_OOTgizZPszR8_H1OWgXNpHPaItBks75HtyyBPOQX-Zg2gvLSfEWkXkm7yyz2cTa0CooRMxDLHo',
  clinicalPlan: 'Comprehensive Diabetes Reversal Care',
  isCarePlanActive: true,
  memberSince: 'Jan 2026',
};

export const INITIAL_GOALS: FitnessGoals = {
  stepGoal: 10000,
  burnGoal: 650,
  sleepGoalHours: 8,
  waterGoalMl: 3000,
  targetGlucoseMin: 70,
  targetGlucoseMax: 140,
  timeInRangeGoal: 80,
};

export const INITIAL_BIOMARKERS: BiomarkerProgress = {
  currentGlucose: 104,
  glucoseTrend: 'flat',
  glucoseStatus: 'in-target',
  lastSyncTime: '9m ago',
  timeInRangePercent: 92,
  standardDeviation: 11,
  steps: 7420,
  burnCalories: 480,
  sleepHours: 7,
  sleepMinutes: 25,
  sleepScore: 84,
  estimatedHbA1c: 5.8,
  avgGlucose: 112,
  weeklyStability: 96.2,
  glucoseCurvePoints: [
    { time: '06:00', value: 92 },
    { time: '07:15', value: 95 },
    { time: '08:30', value: 128, label: 'Breakfast', isSpike: true },
    { time: '09:45', value: 118 },
    { time: '11:00', value: 99 },
    { time: '12:30', value: 102 },
    { time: '13:30', value: 120, label: 'Lunch', isSpike: true },
    { time: '14:45', value: 108 },
    { time: '16:00', value: 104, label: 'Now' },
  ],
};

export const INITIAL_HABITS: MetabolicHabit[] = [
  {
    id: 'habit_1',
    title: 'Morning Cinnamon Water',
    time: '07:30 AM • Fasting State',
    subtext: 'Regulates dawn spike sensitivity',
    completed: true,
    icon: 'water_drop',
  },
  {
    id: 'habit_2',
    title: 'Pre-lunch Apple Cider Vinegar',
    time: 'Pending • Insulin sensitivity aid',
    subtext: 'Dampens postprandial glucose spike by 30%',
    completed: false,
    icon: 'liquor',
    badge: 'NOW',
  },
  {
    id: 'habit_3',
    title: 'Evening Resistance Workout',
    time: 'Scheduled for 6:00 PM • Muscle Glycogen Depletion',
    subtext: 'Expand physiological glucose sink',
    completed: false,
    icon: 'fitness_center',
  },
];

export const INITIAL_TIMELINE: TimelineLogItem[] = [
  {
    id: 'log_1',
    type: 'meal',
    title: 'Quinoa Bowl & Grilled Paneer',
    time: '1:30 PM • Lunch',
    badge: 'Low Glycemic Load',
    badgeType: 'target',
    impactText: '+18 mg/dL spike',
    metrics: ['Duration: 42m', 'Tolerated', 'Protein: 28g'],
    icon: 'restaurant',
    timestamp: Date.now() - 1000 * 60 * 180,
  },
  {
    id: 'log_2',
    type: 'glucose',
    title: 'Fasting Blood Sugar Test: 98 mg/dL',
    time: '10:15 AM • Fingerstick Cal',
    badge: 'Optimal',
    badgeType: 'target',
    impactText: 'CGM Sensor calibration aligned (Diff: 2 mg/dL)',
    metrics: ['Diff: 2 mg/dL', 'Sensor #8491'],
    icon: 'water_drop',
    timestamp: Date.now() - 1000 * 60 * 360,
  },
  {
    id: 'log_3',
    type: 'sleep',
    title: 'Morning Sleep: 7h 40m - REM 22%',
    time: '7:00 AM • Biometric Sync',
    badge: 'Recovery High',
    badgeType: 'purple',
    impactText: 'Dawn Phenom: Mild',
    metrics: ['Deep: 1h 38m', 'HRV: 64 ms', 'Efficiency: 92%'],
    icon: 'bedtime',
    timestamp: Date.now() - 1000 * 60 * 540,
  },
  {
    id: 'log_4',
    type: 'medication',
    title: 'Metformin 500mg taken with dinner',
    time: 'Yesterday • 8:45 PM',
    badge: 'Completed',
    badgeType: 'neutral',
    impactText: 'Prescribed insulin sensitizer • Logged on schedule',
    metrics: ['On Schedule', 'Doctor Prescribed'],
    icon: 'medication',
    timestamp: Date.now() - 1000 * 60 * 1300,
  },
];

export const INITIAL_CONSULTATION: Consultation = {
  id: 'consult_1',
  doctorName: 'Dr. Sneha Roy',
  specialty: 'Senior Diabetologist & Endocrinologist',
  doctorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiX642i6Fs7CNvhdazyWvrXQbWCYpWgJEpjjIqWtknFV8qx7OYRPNiCSEbBV3O4zuoTYz1cT8BLp_sm01tdFGCJETxjl-Pn7YBPLH_P2mbMpN83OcxBzXMAUS_nLBVdtABPR6zKe4yGELz7SJiyguvqK9wMlxHFtApyFAL0L9O-IroNlmupBhfkRo6psJut1sHriRIgkZ1EbixpppJivbYPGsasuGHbxipuGrKBFGHhHr1ZALXxkk',
  date: 'Today, 24 Oct',
  timeSlot: '4:30 PM',
  mode: 'video',
  status: 'confirmed',
  autoShareCgm: true,
  createdAt: Date.now(),
};

// Subscriptions & Sync
export function subscribeToBiomarkers(callback: (data: BiomarkerProgress) => void) {
  const docRef = doc(db, 'biomarkers', 'current_progress');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as BiomarkerProgress);
    } else {
      // Seed initial
      setDoc(docRef, INITIAL_BIOMARKERS).catch(console.error);
      callback(INITIAL_BIOMARKERS);
    }
  }, (error) => {
    console.warn('Firestore biomarkers subscription fallback to local cache:', error);
    callback(INITIAL_BIOMARKERS);
  });
}

export function subscribeToHabits(callback: (habits: MetabolicHabit[]) => void) {
  const colRef = collection(db, 'habits');
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const habits = snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as MetabolicHabit));
      callback(habits);
    } else {
      // Seed initial
      INITIAL_HABITS.forEach((h) => {
        setDoc(doc(db, 'habits', h.id), h).catch(console.error);
      });
      callback(INITIAL_HABITS);
    }
  }, (error) => {
    console.warn('Firestore habits subscription fallback:', error);
    callback(INITIAL_HABITS);
  });
}

export function subscribeToTimeline(callback: (logs: TimelineLogItem[]) => void) {
  const colRef = collection(db, 'timeline_logs');
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const logs = snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as TimelineLogItem));
      // Sort newest first
      logs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      callback(logs);
    } else {
      // Seed initial
      INITIAL_TIMELINE.forEach((t) => {
        setDoc(doc(db, 'timeline_logs', t.id), t).catch(console.error);
      });
      callback(INITIAL_TIMELINE);
    }
  }, (error) => {
    console.warn('Firestore timeline subscription fallback:', error);
    callback(INITIAL_TIMELINE);
  });
}

export function subscribeToConsultations(callback: (consultations: Consultation[]) => void) {
  const colRef = collection(db, 'consultations');
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list = snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as Consultation));
      callback(list);
    } else {
      setDoc(doc(db, 'consultations', INITIAL_CONSULTATION.id), INITIAL_CONSULTATION).catch(console.error);
      callback([INITIAL_CONSULTATION]);
    }
  }, (error) => {
    console.warn('Firestore consultations subscription fallback:', error);
    callback([INITIAL_CONSULTATION]);
  });
}

// Mutations
export async function toggleHabitInFirebase(id: string, completed: boolean) {
  const habitRef = doc(db, 'habits', id);
  await updateDoc(habitRef, { completed });
}

export async function addTimelineLogInFirebase(logItem: Omit<TimelineLogItem, 'id'>) {
  const colRef = collection(db, 'timeline_logs');
  const docRef = await addDoc(colRef, {
    ...logItem,
    timestamp: Date.now(),
  });
  return docRef.id;
}

export async function scanSensorInFirebase(currentVal: number) {
  const nextVal = Math.min(135, Math.max(88, currentVal + (Math.random() > 0.5 ? 3 : -2)));
  const docRef = doc(db, 'biomarkers', 'current_progress');
  await updateDoc(docRef, {
    currentGlucose: nextVal,
    lastSyncTime: 'Just now',
  });
  return nextVal;
}

export async function updateDailyStepsInFirebase(additionalSteps: number) {
  const docRef = doc(db, 'biomarkers', 'current_progress');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const cur = snap.data() as BiomarkerProgress;
    const newSteps = (cur.steps || 0) + additionalSteps;
    const newBurn = (cur.burnCalories || 0) + Math.round(additionalSteps * 0.04);
    await updateDoc(docRef, {
      steps: newSteps,
      burnCalories: newBurn,
    });
  }
}

export async function bookConsultationInFirebase(consultation: Omit<Consultation, 'id'>) {
  const colRef = collection(db, 'consultations');
  const res = await addDoc(colRef, {
    ...consultation,
    createdAt: Date.now(),
  });
  return res.id;
}

export async function resetAllDemoData() {
  await setDoc(doc(db, 'biomarkers', 'current_progress'), INITIAL_BIOMARKERS);
  for (const h of INITIAL_HABITS) {
    await setDoc(doc(db, 'habits', h.id), h);
  }
  for (const t of INITIAL_TIMELINE) {
    await setDoc(doc(db, 'timeline_logs', t.id), t);
  }
}
