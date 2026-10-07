
import {
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  openHealthConnectSettings,
  readRecords,
  requestPermission,
  SdkAvailabilityStatus,
} from "react-native-health-connect";

import type {
  Permission,
  ReadRecordsResult,
} from "react-native-health-connect";

const HEALTH_CONNECT_PROVIDER_PACKAGE =
  "com.google.android.apps.healthdata";

const HEART_RATE_PERMISSION: Permission = {
  accessType: "read",
  recordType: "HeartRate",
};

export interface HeartRateSample {
  bpm: number;
  time: string;
}

export interface HeartRateReading {
  bpm: number | null;
  time: string | null;
  samples: HeartRateSample[];
}

export type HealthConnectStatus =
  | "available"
  | "unavailable"
  | "needs_initialization";

const isHeartRatePermission = (
  permission: unknown,
): boolean => {
  if (!permission || typeof permission !== "object") {
    return false;
  }

  const value = permission as {
    accessType?: unknown;
    recordType?: unknown;
  };

  return (
    value.accessType === "read" &&
    value.recordType === "HeartRate"
  );
};

export const healthConnectService = {
  async getStatus(): Promise<HealthConnectStatus> {
    const status = await getSdkStatus(
      HEALTH_CONNECT_PROVIDER_PACKAGE,
    );

    console.log("Health Connect SDK status:", status);

    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
      return "available";
    }

    if (
      status ===
      SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      return "needs_initialization";
    }

    return "unavailable";
  },

  async initialize(): Promise<boolean> {
    const result = await initialize(
      HEALTH_CONNECT_PROVIDER_PACKAGE,
    );

    console.log(
      "Health Connect initialized:",
      result,
    );

    return result;
  },

  async requestHeartRatePermission(): Promise<boolean> {
    console.log(
      "Health Connect: requesting heart rate permission",
    );

    const permissions = await requestPermission([
      HEART_RATE_PERMISSION,
    ]);

    console.log(
      "Health Connect: permission request returned",
      permissions,
    );

    const granted = permissions.some(
      isHeartRatePermission,
    );

    console.log(
      "Health Connect: heart rate permission granted:",
      granted,
    );

    return granted;
  },

  async hasHeartRatePermission(): Promise<boolean> {
    const grantedPermissions =
      await getGrantedPermissions();

    console.log(
      "Health Connect: currently granted permissions:",
      grantedPermissions,
    );

    const granted = grantedPermissions.some(
      isHeartRatePermission,
    );

    console.log(
      "Health Connect: has heart rate permission:",
      granted,
    );

    return granted;
  },

  openSettings(): void {
    openHealthConnectSettings();
  },

  async readLatestHeartRate(
    startTime: Date,
    endTime: Date = new Date(),
  ): Promise<HeartRateReading> {
    console.log(
      "Health Connect: reading heart rate records",
      {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    );

    const result: ReadRecordsResult<"HeartRate"> =
      await readRecords("HeartRate", {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      });

    console.log(
      "Health Connect: heart rate records returned:",
      result.records.length,
    );

    console.log(
      "Health Connect: raw heart rate records:",
      result.records,
    );

    const samples: HeartRateSample[] =
      result.records
        .flatMap((record) => record.samples)
        .filter(
          (sample) =>
            typeof sample.beatsPerMinute === "number" &&
            typeof sample.time === "string",
        )
        .map((sample) => ({
          bpm: sample.beatsPerMinute,
          time: sample.time,
        }))
        .sort(
          (first, second) =>
            new Date(second.time).getTime() -
            new Date(first.time).getTime(),
        );

    const latestSample = samples[0];

    console.log(
      "Health Connect: parsed heart rate samples:",
      samples.length,
    );

    console.log(
      "Health Connect: latest heart rate:",
      latestSample?.bpm ?? null,
    );

    return {
      bpm: latestSample?.bpm ?? null,
      time: latestSample?.time ?? null,
      samples,
    };
  },
};
