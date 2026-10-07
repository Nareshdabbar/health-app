import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { useHeartRate } from "../../hooks/useHeartRate";
import { useTheme } from "../../theme/ThemeContext";
import { createHeartRateScreenStyles } from "./HeartRateScreen.styles";

export const HeartRateScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = createHeartRateScreenStyles(tokens);

  const {
    bpm,
    time,
    samples,
    status,
    hasPermission,
    isLoading,
    error,
    requestPermission,
    refresh,
  } = useHeartRate();

  const formatReadingTime = (value: string | null) => {
    if (!value) {
      return "No recent reading";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Recent reading";
    }

    return `Last reading • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const handleRefresh = async () => {
    await refresh();
  };

  if (status === "checking") {
    return (
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />

            <Text style={styles.stateTitle}>Checking Health Connect</Text>

            <Text style={styles.stateText}>
              Checking whether heart-rate health data is available on this
              device.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (status === "unavailable") {
    return (
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Heart Rate</Text>

            <Text style={styles.subtitle}>Smartwatch & health data</Text>
          </View>

          <View style={styles.stateCard}>
            <View style={styles.stateIconCircle}>
              <Ionicons
                name="heart-dislike-outline"
                size={30}
                color={tokens.colors.primary}
              />
            </View>

            <Text style={styles.stateTitle}>Health Connect unavailable</Text>

            <Text style={styles.stateText}>
              MetaHealth could not access Android Health Connect on this device.
            </Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleRefresh}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={tokens.colors.white} />
              ) : (
                <Ionicons
                  name="refresh-outline"
                  size={19}
                  color={tokens.colors.white}
                />
              )}

              <Text style={styles.startButtonText}>
                {isLoading ? "Checking..." : "Check Again"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Heart Rate</Text>

            <Text style={styles.subtitle}>Smartwatch & health data</Text>
          </View>

          <View style={styles.stateCard}>
            <View style={styles.stateIconCircle}>
              <Ionicons
                name="heart-outline"
                size={30}
                color={tokens.colors.primary}
              />
            </View>

            <Text style={styles.stateTitle}>Allow heart-rate access</Text>

            <Text style={styles.stateText}>
              MetaHealth reads heart-rate measurements stored in Android Health
              Connect from compatible watches and health apps.
            </Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleRequestPermission}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={tokens.colors.white} />
              ) : (
                <Ionicons
                  name="shield-checkmark-outline"
                  size={19}
                  color={tokens.colors.white}
                />
              )}

              <Text style={styles.startButtonText}>
                {isLoading ? "Requesting..." : "Allow Heart Rate Access"}
              </Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.infoCard}>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={tokens.colors.primary}
              />

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Access issue</Text>

                <Text style={styles.infoText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Heart Rate</Text>

          <Text style={styles.subtitle}>Smartwatch & health data</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusTitleRow}>
              <View style={styles.statusIconCircle}>
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={tokens.colors.primary}
                />
              </View>

              <View>
                <Text style={styles.statusTitle}>LATEST READING</Text>

                <Text style={styles.statusSubtitle}>
                  {formatReadingTime(time)}
                </Text>
              </View>
            </View>

            <View style={styles.readyBadge}>
              <View style={styles.readyDot} />

              <Text style={styles.readyText}>
                {bpm !== null ? "SYNCED" : "NO DATA"}
              </Text>
            </View>
          </View>

          <View style={styles.readingRow}>
            <Text style={styles.readingValue}>{bpm ?? "--"}</Text>

            <Text style={styles.readingUnit}>BPM</Text>
          </View>

          {bpm === null && (
            <Text style={styles.noDataText}>
              No heart-rate measurements were found in Health Connect during the
              last 30 minutes.
            </Text>
          )}

          {bpm !== null && (
            <Text style={styles.dataSourceText}>
              Reading provided by Android Health Connect.
            </Text>
          )}
        </View>

        <View style={styles.sourceCard}>
          <View style={styles.sourceIconCircle}>
            <Ionicons
              name="watch-outline"
              size={22}
              color={tokens.colors.primary}
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Health Connect</Text>

            <Text style={styles.infoText}>
              Compatible watches and health apps can send heart-rate
              measurements to Health Connect. MetaHealth reads those
              measurements here.
            </Text>
          </View>
        </View>

        <View style={styles.dataSummaryCard}>
          <View style={styles.dataSummaryRow}>
            <View style={styles.dataSummaryIcon}>
              <Ionicons
                name="pulse-outline"
                size={20}
                color={tokens.colors.primary}
              />
            </View>

            <View style={styles.dataSummaryContent}>
              <Text style={styles.dataSummaryTitle}>Health data</Text>

              <Text style={styles.dataSummaryText}>
                {samples.length > 0
                  ? `${samples.length} heart-rate sample${
                      samples.length === 1 ? "" : "s"
                    } found`
                  : "No heart-rate samples found"}
              </Text>
            </View>
          </View>
        </View>

        {error && (
          <View style={styles.infoCard}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={tokens.colors.primary}
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Could not read data</Text>

              <Text style={styles.infoText}>{error}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleRefresh}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={tokens.colors.white} />
          ) : (
            <Ionicons
              name="sync-outline"
              size={19}
              color={tokens.colors.white}
            />
          )}

          <Text style={styles.startButtonText}>
            {isLoading ? "Reading Health Data..." : "Read Health Data"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
