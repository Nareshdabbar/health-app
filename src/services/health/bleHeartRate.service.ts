import {
  BleManager,
  Device,
  type Characteristic,
} from "@sfourdrinier/react-native-ble-plx";

const bleManager = new BleManager();

export interface BleDeviceInfo {
  id: string;
  name: string | null;
  localName: string | null;
  rssi: number | null;
  manufacturerData: string | null;
  serviceUUIDs: string[];
  serviceData: Record<string, string>;
}

export interface BleCharacteristicInfo {
  serviceUUID: string;
  characteristicUUID: string;
  isReadable: boolean;
  isNotifiable: boolean;
  isIndicatable: boolean;
  isWritableWithResponse: boolean;
  isWritableWithoutResponse: boolean;
}

export interface BleServiceInfo {
  uuid: string;
  characteristics: BleCharacteristicInfo[];
}

export interface BleDiscoveryResult {
  device: BleDeviceInfo;
  services: BleServiceInfo[];
}

const mapCharacteristic = (
  serviceUUID: string,
  characteristic: Characteristic,
): BleCharacteristicInfo => ({
  serviceUUID,
  characteristicUUID: characteristic.uuid,
  isReadable: characteristic.isReadable,
  isNotifiable: characteristic.isNotifiable,
  isIndicatable: characteristic.isIndicatable,
  isWritableWithResponse: characteristic.isWritableWithResponse,
  isWritableWithoutResponse: characteristic.isWritableWithoutResponse,
});

const mapDevice = (device: Device): BleDeviceInfo => ({
  id: device.id,
  name: device.name ?? null,
  localName: device.localName ?? null,
  rssi: device.rssi ?? null,
  manufacturerData: device.manufacturerData ?? null,
  serviceUUIDs: device.serviceUUIDs ?? [],
  serviceData: device.serviceData ?? {},
});

export const bleHeartRateService = {
  scanForDevices(onDeviceFound: (device: BleDeviceInfo) => void): () => void {
    const seenDevices = new Set<string>();

    bleManager.startDeviceScan(
      null,
      {
        // allowDuplicates: false,
        allowDuplicates: true,
      },
      (error, device: Device | null) => {
        if (error) {
          console.log("BLE: scan error:", error.message);
          return;
        }

        if (!device) {
          return;
        }

        if (seenDevices.has(device.id)) {
          return;
        }

        seenDevices.add(device.id);

        const deviceInfo = mapDevice(device);

        console.log("BLE: device advertisement:", {
          id: deviceInfo.id,
          name: deviceInfo.name,
          localName: deviceInfo.localName,
          rssi: deviceInfo.rssi,
          manufacturerData: deviceInfo.manufacturerData,
          serviceUUIDs: deviceInfo.serviceUUIDs,
          serviceData: deviceInfo.serviceData,
        });

        onDeviceFound(deviceInfo);
      },
    );

    console.log("BLE: scanning started");

    return () => {
      bleManager.stopDeviceScan();

      console.log("BLE: scanning stopped");
    };
  },

  async connectAndDiscover(deviceId: string): Promise<BleDiscoveryResult> {
    console.log("BLE: connecting to device:", deviceId);

    const device = await bleManager.connectToDevice(deviceId);

    console.log("BLE: connected");

    const discoveredDevice =
      await device.discoverAllServicesAndCharacteristics();

    console.log("BLE: services and characteristics discovered");

    const services = await discoveredDevice.services();

    const serviceInfo: BleServiceInfo[] = [];

    for (const service of services) {
      console.log("BLE: SERVICE:", service.uuid);

      const characteristics = await discoveredDevice.characteristicsForService(
        service.uuid,
      );

      const mappedCharacteristics = characteristics.map((characteristic) =>
        mapCharacteristic(service.uuid, characteristic),
      );

      serviceInfo.push({
        uuid: service.uuid,
        characteristics: mappedCharacteristics,
      });

      for (const characteristic of mappedCharacteristics) {
        console.log("BLE: CHARACTERISTIC:", characteristic);
      }
    }

    const deviceInfo = mapDevice(discoveredDevice);

    console.log("BLE: discovery complete:", {
      device: deviceInfo,
      serviceCount: serviceInfo.length,
    });

    return {
      device: deviceInfo,
      services: serviceInfo,
    };
  },

  async disconnect(deviceId: string): Promise<void> {
    try {
      await bleManager.cancelDeviceConnection(deviceId);

      console.log("BLE: disconnected:", deviceId);
    } catch (error) {
      console.log("BLE: disconnect failed:", error);
    }
  },
};
