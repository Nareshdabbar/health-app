import { useCallback, useEffect, useState } from "react";

import {
  healthConnectService,
  type HeartRateReading,
  type HealthConnectStatus,
} from "@/src/services/health/healthConnect.service";

interface UseHeartRateResult {
  bpm: number | null;
  time: string | null;
  samples: HeartRateReading["samples"];
  status: HealthConnectStatus | "checking";
  hasPermission: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

const DEFAULT_LOOKBACK_MINUTES = 30;

export const useHeartRate = (): UseHeartRateResult => {
  const [status, setStatus] = useState<HealthConnectStatus | "checking">(
    "checking",
  );

  const [hasPermission, setHasPermission] = useState(false);

  const [reading, setReading] = useState<HeartRateReading>({
    bpm: null,
    time: null,
    samples: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      setError(null);

      const healthConnectStatus = await healthConnectService.getStatus();

      setStatus(healthConnectStatus);

      if (healthConnectStatus === "unavailable") {
        setError("Health Connect is not available.");
        return false;
      }

      const initialized = await healthConnectService.initialize();

      if (!initialized) {
        setError("Health Connect could not be initialized.");
        return false;
      }

      setStatus("available");

      return true;
    } catch (initializationError) {
      console.error(
        "Health Connect initialization failed:",
        initializationError,
      );

      setStatus("unavailable");
      setError("Health Connect is not available.");

      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const initialized = await initialize();

      if (!initialized) {
        return;
      }

      const permission = await healthConnectService.hasHeartRatePermission();

      setHasPermission(permission);

      if (!permission) {
        setReading({
          bpm: null,
          time: null,
          samples: [],
        });
        return;
      }

      const startTime = new Date(
        Date.now() - DEFAULT_LOOKBACK_MINUTES * 60 * 1000,
      );

      const latestReading =
        await healthConnectService.readLatestHeartRate(startTime);

      setReading(latestReading);
    } catch (refreshError) {
      console.error("Heart rate refresh failed:", refreshError);

      setError("Unable to read heart rate data.");
    } finally {
      setIsLoading(false);
    }
  }, [initialize]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const initialized = await initialize();

      if (!initialized) {
        return false;
      }

      const granted = await healthConnectService.requestHeartRatePermission();

      setHasPermission(granted);

      if (granted) {
        await refresh();
      }

      return granted;
    } catch (permissionError) {
      console.error("Heart rate permission request failed:", permissionError);

      setError("Unable to request heart rate permission.");

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [initialize, refresh]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return {
    bpm: reading.bpm,
    time: reading.time,
    samples: reading.samples,
    status,
    hasPermission,
    isLoading,
    error,
    requestPermission,
    refresh,
  };
};
