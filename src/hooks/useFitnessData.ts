import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  INITIAL_BIOMARKERS,
  INITIAL_HABITS,
  INITIAL_TIMELINE,
  INITIAL_CONSULTATION,
  subscribeToBiomarkers,
  subscribeToHabits,
  subscribeToTimeline,
  subscribeToConsultations,
  toggleHabitInFirebase,
  addTimelineLogInFirebase,
  scanSensorInFirebase,
  updateDailyStepsInFirebase,
  bookConsultationInFirebase,
  resetAllDemoData,
} from '../services/fitnessService';
import {
  BiomarkerProgress,
  MetabolicHabit,
  TimelineLogItem,
  Consultation,
} from '../types/fitness';

export function useBiomarkers() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToBiomarkers((data) => {
      queryClient.setQueryData(['biomarkers'], data);
    });
    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<BiomarkerProgress>({
    queryKey: ['biomarkers'],
    queryFn: async () => INITIAL_BIOMARKERS,
    initialData: INITIAL_BIOMARKERS,
    staleTime: Infinity,
  });
}

export function useHabits() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToHabits((data) => {
      queryClient.setQueryData(['habits'], data);
    });
    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<MetabolicHabit[]>({
    queryKey: ['habits'],
    queryFn: async () => INITIAL_HABITS,
    initialData: INITIAL_HABITS,
    staleTime: Infinity,
  });
}

export function useTimeline() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToTimeline((data) => {
      queryClient.setQueryData(['timeline'], data);
    });
    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<TimelineLogItem[]>({
    queryKey: ['timeline'],
    queryFn: async () => INITIAL_TIMELINE,
    initialData: INITIAL_TIMELINE,
    staleTime: Infinity,
  });
}

export function useConsultations() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToConsultations((data) => {
      queryClient.setQueryData(['consultations'], data);
    });
    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<Consultation[]>({
    queryKey: ['consultations'],
    queryFn: async () => [INITIAL_CONSULTATION],
    initialData: [INITIAL_CONSULTATION],
    staleTime: Infinity,
  });
}

// Mutations
export function useToggleHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      await toggleHabitInFirebase(id, completed);
      return { id, completed };
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['habits'] });
      const previousHabits = queryClient.getQueryData<MetabolicHabit[]>(['habits']);
      if (previousHabits) {
        queryClient.setQueryData<MetabolicHabit[]>(
          ['habits'],
          previousHabits.map((h) => (h.id === id ? { ...h, completed } : h))
        );
      }
      return { previousHabits };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(['habits'], context.previousHabits);
      }
    },
  });
}

export function useAddTimelineLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Omit<TimelineLogItem, 'id'>) => {
      return await addTimelineLogInFirebase(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
      queryClient.invalidateQueries({ queryKey: ['biomarkers'] });
    },
  });
}

export function useScanSensor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (currentVal: number) => {
      return await scanSensorInFirebase(currentVal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biomarkers'] });
    },
  });
}

export function useUpdateSteps() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stepsToAdd: number) => {
      await updateDailyStepsInFirebase(stepsToAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biomarkers'] });
    },
  });
}

export function useBookConsultation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (consultation: Omit<Consultation, 'id'>) => {
      return await bookConsultationInFirebase(consultation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
    },
  });
}

export function useResetDemoData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await resetAllDemoData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biomarkers'] });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
    },
  });
}
