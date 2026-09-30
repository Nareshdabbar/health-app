// src/hooks/useWalkSensor.ts

import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useWalkSensor = (isTracking: boolean = false) => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [sessionSteps, setSessionSteps] = useState(0);

  useEffect(() => {
    let subscription: Pedometer.Subscription | undefined;

    const startTracking = async () => {
      if (!isTracking) {
        setSessionSteps(0);
        setIsPedometerAvailable("checking");
        return;
      }

      try {
        const permission = await Pedometer.requestPermissionsAsync();

        if (!permission.granted) {
          console.log("Activity recognition permission denied.");
          setIsPedometerAvailable("permission_denied");
          return;
        }

        const available = await Pedometer.isAvailableAsync();

        if (!available) {
          console.log("Pedometer is not available on this device.");
          setIsPedometerAvailable("false");
          return;
        }

        setIsPedometerAvailable("true");

        if (Platform.OS === "ios") {
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);

          const todaySteps = await Pedometer.getStepCountAsync(
            startOfDay,
            new Date(),
          );

          if (todaySteps) {
            setSessionSteps(todaySteps.steps);
          }
        }

        subscription = Pedometer.watchStepCount((result) => {
          if (typeof result.steps === "number") {
            setSessionSteps(result.steps);
          }
        });
      } catch (error) {
        console.log("Pedometer sensor initialization failed:", error);
        setIsPedometerAvailable("false");
      }
    };

    startTracking();

    return () => {
      subscription?.remove();
    };
  }, [isTracking]);

  return {
    isPedometerAvailable,
    sessionSteps,
    resetSession: () => setSessionSteps(0),
  };
};
