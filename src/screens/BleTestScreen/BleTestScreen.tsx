import { useBleHeartRate } from "@/src/hooks/useBleHeartRate";
import { useTheme } from "@/src/theme/ThemeContext";

import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

export const BleTestScreen = () => {
  const { tokens } = useTheme();

  const {
    devices,
    isScanning,
    connectedDeviceId,
    error,
    startScan,
    stopScan,
    connect,
    disconnect,
  } = useBleHeartRate();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: tokens.colors.background,
      }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          color: tokens.colors.textPrimary,
        }}
      >
        Bluetooth Test
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontSize: 14,
          color: tokens.colors.textSecondary,
        }}
      >
        Scan nearby BLE devices and inspect their advertisement data.
      </Text>

      <Pressable
        onPress={isScanning ? stopScan : startScan}
        style={{
          marginTop: 20,
          minHeight: 50,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.colors.primary,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: tokens.colors.surface,
          }}
        >
          {isScanning ? "Stop Scan" : "Scan for Devices"}
        </Text>
      </Pressable>

      {error ? (
        <View
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 14,
            backgroundColor: tokens.colors.surfaceSubtle,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: tokens.colors.textPrimary,
            }}
          >
            {error}
          </Text>
        </View>
      ) : null}

      {connectedDeviceId ? (
        <View
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 16,
            backgroundColor: tokens.colors.surface,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="bluetooth"
              size={22}
              color={tokens.colors.primary}
            />

            <Text
              style={{
                marginLeft: 8,
                fontSize: 15,
                fontWeight: "700",
                color: tokens.colors.textPrimary,
              }}
            >
              Connected
            </Text>
          </View>

          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: tokens.colors.textSecondary,
            }}
          >
            {connectedDeviceId}
          </Text>

          <Pressable
            onPress={disconnect}
            style={{
              marginTop: 14,
              minHeight: 44,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: tokens.colors.surfaceSubtle,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: tokens.colors.textPrimary,
              }}
            >
              Disconnect
            </Text>
          </Pressable>
        </View>
      ) : null}

      <Text
        style={{
          marginTop: 24,
          marginBottom: 10,
          fontSize: 13,
          fontWeight: "800",
          letterSpacing: 0.8,
          color: tokens.colors.textSecondary,
        }}
      >
        DEVICES FOUND ({devices.length})
      </Text>

      {devices.length === 0 ? (
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: tokens.colors.surface,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: tokens.colors.textSecondary,
            }}
          >
            {isScanning
              ? "Scanning for nearby Bluetooth devices..."
              : "No devices found yet."}
          </Text>
        </View>
      ) : (
        devices.map((device) => (
          <View
            key={device.id}
            style={{
              marginBottom: 12,
              padding: 16,
              borderRadius: 16,
              backgroundColor: tokens.colors.surface,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="watch-outline"
                size={24}
                color={tokens.colors.primary}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: tokens.colors.textPrimary,
                  }}
                >
                  {device.name ?? "Unknown device"}
                </Text>

                {device.localName && device.localName !== device.name ? (
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12,
                      color: tokens.colors.textSecondary,
                    }}
                  >
                    Local name: {device.localName}
                  </Text>
                ) : null}

                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 11,
                    color: tokens.colors.textSecondary,
                  }}
                >
                  ID: {device.id}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    color: tokens.colors.textSecondary,
                  }}
                >
                  RSSI:{" "}
                  {device.rssi !== null ? `${device.rssi} dBm` : "Unavailable"}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    color: tokens.colors.textSecondary,
                  }}
                >
                  Service UUIDs:{" "}
                  {device.serviceUUIDs.length > 0
                    ? device.serviceUUIDs.join(", ")
                    : "None advertised"}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    color: tokens.colors.textSecondary,
                  }}
                  selectable
                >
                  Manufacturer data: {device.manufacturerData ?? "None"}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    color: tokens.colors.textSecondary,
                  }}
                  selectable
                >
                  Service data:{" "}
                  {Object.keys(device.serviceData).length > 0
                    ? JSON.stringify(device.serviceData)
                    : "None"}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => connect(device.id)}
              disabled={connectedDeviceId === device.id}
              style={{
                marginTop: 14,
                minHeight: 42,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  connectedDeviceId === device.id
                    ? tokens.colors.surfaceSubtle
                    : tokens.colors.primarySubtle,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: tokens.colors.primary,
                }}
              >
                {connectedDeviceId === device.id
                  ? "Connected"
                  : "Connect & Inspect"}
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
};
