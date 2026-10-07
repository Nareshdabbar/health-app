
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

// const DEFAULT_LOOKBACK_MINUTES = 30;
const DEFAULT_LOOKBACK_MINUTES = 24 * 60;

const EMPTY_READING: HeartRateReading = {
  bpm: null,
  time: null,
  samples: [],
};

export const useHeartRate = (): UseHeartRateResult => {
  const [status, setStatus] =
    useState<HealthConnectStatus | "checking">("checking");

  const [hasPermission, setHasPermission] = useState(false);

  const [reading, setReading] =
    useState<HeartRateReading>(EMPTY_READING);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const initializeHealthConnect = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      console.log("Heart Rate: checking Health Connect status");

      const healthConnectStatus =
        await healthConnectService.getStatus();

      console.log(
        "Heart Rate: Health Connect status:",
        healthConnectStatus,
      );

      setStatus(healthConnectStatus);

      if (healthConnectStatus === "unavailable") {
        setError("Health Connect is not available.");
        return false;
      }

      console.log("Heart Rate: initializing Health Connect");

      const initialized =
        await healthConnectService.initialize();

      console.log(
        "Heart Rate: initialize result:",
        initialized,
      );

      if (!initialized) {
        setError("Health Connect could not be initialized.");
        return false;
      }

      setStatus("available");

      return true;
    } catch (initializationError) {
      console.error(
        "Heart Rate: Health Connect initialization failed:",
        initializationError,
      );

      setStatus("unavailable");
      setError("Health Connect is not available.");

      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("Heart Rate: starting refresh");

      const initialized =
        await initializeHealthConnect();

      if (!initialized) {
        console.log(
          "Heart Rate: refresh stopped because initialization failed",
        );
        return;
      }

      const permission =
        await healthConnectService.hasHeartRatePermission();

      console.log(
        "Heart Rate: permission state:",
        permission,
      );

      setHasPermission(permission);

      if (!permission) {
        console.log(
          "Heart Rate: permission is not granted",
        );

        setReading(EMPTY_READING);
        return;
      }

      const startTime = new Date(
        Date.now() -
          DEFAULT_LOOKBACK_MINUTES * 60 * 1000,
      );

      console.log(
        "Heart Rate: reading latest heart rate",
      );

      const latestReading =
        await healthConnectService.readLatestHeartRate(
          startTime,
          new Date(),
        );

      console.log(
        "Heart Rate: reading received:",
        latestReading,
      );

      setReading(latestReading);
    } catch (refreshError) {
      console.error(
        "Heart Rate: refresh failed:",
        refreshError,
      );

      setError("Unable to read heart rate data.");
    } finally {
      setIsLoading(false);
    }
  }, [initializeHealthConnect, isLoading]);

  const requestPermission = useCallback(
    async (): Promise<boolean> => {
      if (isLoading) {
        return false;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log(
          "Heart Rate: starting permission request",
        );

        const initialized =
          await initializeHealthConnect();

        if (!initialized) {
          console.log(
            "Heart Rate: permission request stopped because initialization failed",
          );

          return false;
        }

        const granted =
          await healthConnectService.requestHeartRatePermission();

        console.log(
          "Heart Rate: permission result:",
          granted,
        );

        setHasPermission(granted);

        if (!granted) {
          setReading(EMPTY_READING);
          return false;
        }

        console.log(
          "Heart Rate: permission granted, reading data now",
        );

        const startTime = new Date(
          Date.now() -
            DEFAULT_LOOKBACK_MINUTES * 60 * 1000,
        );

        const latestReading =
          await healthConnectService.readLatestHeartRate(
            startTime,
            new Date(),
          );

        console.log(
          "Heart Rate: first reading after permission:",
          latestReading,
        );

        setReading(latestReading);

        return true;
      } catch (permissionError) {
        console.error(
          "Heart Rate: permission request failed:",
          permissionError,
        );

        setError(
          "Unable to request heart rate permission.",
        );

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [initializeHealthConnect, isLoading],
  );

  useEffect(() => {
    void initializeHealthConnect();
  }, [initializeHealthConnect]);

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
