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

const HEALTH_CONNECT_PROVIDER_PACKAGE = "com.google.android.apps.healthdata";

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

const isPermissionGranted = (
  permissions: (Permission | unknown)[],
  requiredPermission: Permission,
): boolean => {
  return permissions.some(
    (permission) =>
      JSON.stringify(permission) === JSON.stringify(requiredPermission),
  );
};

export const healthConnectService = {
  async getStatus(): Promise<HealthConnectStatus> {
    const status = await getSdkStatus(HEALTH_CONNECT_PROVIDER_PACKAGE);

    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
      return "available";
    }

    if (
      status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      return "needs_initialization";
    }

    return "unavailable";
  },

  async initialize(): Promise<boolean> {
    return initialize(HEALTH_CONNECT_PROVIDER_PACKAGE);
  },

  // async requestHeartRatePermission(): Promise<boolean> {
  //   const grantedPermissions = await requestPermission([HEART_RATE_PERMISSION]);

  //   return isPermissionGranted(grantedPermissions, HEART_RATE_PERMISSION);
  // },

async requestHeartRatePermission(): Promise<boolean> {
  console.log("Health Connect: requesting heart rate permission");

  const grantedPermissions = await requestPermission([
    HEART_RATE_PERMISSION,
  ]);

  console.log(
    "Health Connect: permission request returned",
    grantedPermissions,
  );

  return isPermissionGranted(
    grantedPermissions,
    HEART_RATE_PERMISSION,
  );
},

  async hasHeartRatePermission(): Promise<boolean> {
    const grantedPermissions = await getGrantedPermissions();

    return isPermissionGranted(grantedPermissions, HEART_RATE_PERMISSION);
  },

  openSettings(): void {
    openHealthConnectSettings();
  },

  async readLatestHeartRate(
    startTime: Date,
    endTime: Date = new Date(),
  ): Promise<HeartRateReading> {
    const result: ReadRecordsResult<"HeartRate"> = await readRecords(
      "HeartRate",
      {
        timeRangeFilter: {
          operator: "between",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      },
    );

    const samples: HeartRateSample[] = result.records
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
          new Date(second.time).getTime() - new Date(first.time).getTime(),
      );

    const latestSample = samples[0];

    return {
      bpm: latestSample?.bpm ?? null,
      time: latestSample?.time ?? null,
      samples,
    };
  },
};
