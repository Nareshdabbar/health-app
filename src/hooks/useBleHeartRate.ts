
import { useCallback, useEffect, useRef, useState } from "react";
import {
  PermissionsAndroid,
  Platform,
} from "react-native";

import {
  bleHeartRateService,
  type BleDeviceInfo,
} from "@/src/services/health/bleHeartRate.service";

interface UseBleHeartRateResult {
  devices: BleDeviceInfo[];
  isScanning: boolean;
  connectedDeviceId: string | null;
  error: string | null;
  startScan: () => Promise<void>;
  stopScan: () => void;
  connect: (deviceId: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

const requestBluetoothPermissions =
  async (): Promise<boolean> => {
    if (Platform.OS !== "android") {
      return true;
    }

    if (Platform.Version >= 31) {
      const result =
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

      const scanGranted =
        result[
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        ] === PermissionsAndroid.RESULTS.GRANTED;

      const connectGranted =
        result[
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ] === PermissionsAndroid.RESULTS.GRANTED;

      console.log("BLE: Bluetooth scan permission:", scanGranted);
      console.log(
        "BLE: Bluetooth connect permission:",
        connectGranted,
      );

      return scanGranted && connectGranted;
    }

    const locationResult =
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

    const locationGranted =
      locationResult ===
      PermissionsAndroid.RESULTS.GRANTED;

    console.log(
      "BLE: location permission:",
      locationGranted,
    );

    return locationGranted;
  };

export const useBleHeartRate =
  (): UseBleHeartRateResult => {
    const [devices, setDevices] = useState<
      BleDeviceInfo[]
    >([]);
    const [isScanning, setIsScanning] =
      useState(false);
    const [connectedDeviceId, setConnectedDeviceId] =
      useState<string | null>(null);
    const [error, setError] = useState<string | null>(
      null,
    );

    const stopScanRef = useRef<(() => void) | null>(
      null,
    );

    const stopScan = useCallback(() => {
      stopScanRef.current?.();
      stopScanRef.current = null;
      setIsScanning(false);
    }, []);

    const startScan = useCallback(async () => {
      stopScan();

      setDevices([]);
      setError(null);

      try {
        const permissionsGranted =
          await requestBluetoothPermissions();

        if (!permissionsGranted) {
          setError(
            "Bluetooth permission is required to scan for devices.",
          );
          return;
        }

        setIsScanning(true);

        stopScanRef.current =
          bleHeartRateService.scanForDevices(
            (device) => {
              setDevices((currentDevices) => {
                if (
                  currentDevices.some(
                    (currentDevice) =>
                      currentDevice.id === device.id,
                  )
                ) {
                  return currentDevices;
                }

                return [...currentDevices, device];
              });
            },
          );

        setTimeout(() => {
          stopScan();
        }, 10000);
      } catch (scanError) {
        console.error(
          "BLE: permission/scan failed:",
          scanError,
        );

        setIsScanning(false);
        setError(
          "Unable to start Bluetooth scanning.",
        );
      }
    }, [stopScan]);

    const connect = useCallback(
      async (deviceId: string) => {
        try {
          stopScan();
          setError(null);

          await bleHeartRateService.connectAndDiscover(
            deviceId,
          );

          setConnectedDeviceId(deviceId);
        } catch (connectionError) {
          console.error(
            "BLE: connection failed:",
            connectionError,
          );

          setConnectedDeviceId(null);
          setError(
            "Unable to connect to this Bluetooth device.",
          );
        }
      },
      [stopScan],
    );

    const disconnect = useCallback(async () => {
      if (!connectedDeviceId) {
        return;
      }

      await bleHeartRateService.disconnect(
        connectedDeviceId,
      );

      setConnectedDeviceId(null);
    }, [connectedDeviceId]);

    useEffect(() => {
      return () => {
        stopScanRef.current?.();
        stopScanRef.current = null;
      };
    }, []);

    return {
      devices,
      isScanning,
      connectedDeviceId,
      error,
      startScan,
      stopScan,
      connect,
      disconnect,
    };
  };
