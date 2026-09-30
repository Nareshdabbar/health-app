
// src/screens/WalkCountScreen/WalkCountScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWalkSensor } from "@/src/hooks/useWalkSensor";
import { useTheme } from "@/src/theme/ThemeContext";
import { createWalkCountScreenStyles } from "./WalkCountScreen.styles";

export interface WalkCountScreenProps {
  onBack?: () => void;
}

const DAILY_GOAL = 10000;

export const WalkCountScreen: React.FC<WalkCountScreenProps> = ({
  onBack,
}) => {
  const { tokens } = useTheme();

  const styles = useMemo(
    () => createWalkCountScreenStyles(tokens),
    [tokens],
  );

  const { sessionSteps, isPedometerAvailable } = useWalkSensor(true);

  const progress = Math.min(sessionSteps / DAILY_GOAL, 1);
  const remainingSteps = Math.max(DAILY_GOAL - sessionSteps, 0);

  const progressPercent = Math.round(progress * 100);

  const formatSteps = (value: number) => value.toLocaleString();

  const getStatus = () => {
    if (isPedometerAvailable === "checking") {
      return "Checking activity sensor...";
    }

    if (isPedometerAvailable === "permission_denied") {
      return "Activity permission is required";
    }

    if (isPedometerAvailable === "false") {
      return "Step counting is not available on this device";
    }

    if (sessionSteps >= DAILY_GOAL) {
      return "Daily step goal completed";
    }

    return "Walking activity is being tracked";
  };

  const isSensorReady = isPedometerAvailable === "true";

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={tokens.colors.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Walk Count</Text>
          <Text style={styles.headerSubtitle}>
            Daily activity tracking
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="footsteps-outline"
                size={28}
                color={tokens.colors.primary}
              />
            </View>

            <View style={styles.liveBadge}>
              <View
                style={[
                  styles.liveDot,
                  {
                    backgroundColor: isSensorReady
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  },
                ]}
              />

              <Text style={styles.liveBadgeText}>
                {isSensorReady ? "LIVE" : "SYNCING"}
              </Text>
            </View>
          </View>

          <Text style={styles.heroLabel}>STEPS TODAY</Text>

          <View style={styles.stepsRow}>
            {isPedometerAvailable === "checking" ? (
              <ActivityIndicator
                size="large"
                color={tokens.colors.primary}
              />
            ) : (
              <Text style={styles.stepsValue}>
                {formatSteps(sessionSteps)}
              </Text>
            )}
          </View>

          <Text style={styles.goalText}>
            Daily goal: {formatSteps(DAILY_GOAL)} steps
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressPercent}>
              {progressPercent}% complete
            </Text>

            <Text style={styles.remainingText}>
              {remainingSteps > 0
                ? `${formatSteps(remainingSteps)} remaining`
                : "Goal reached"}
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIconCircle}>
            <Ionicons
              name={
                isSensorReady
                  ? "checkmark-circle-outline"
                  : "information-circle-outline"
              }
              size={22}
              color={tokens.colors.primary}
            />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              {isSensorReady ? "Step tracking active" : "Step tracking"}
            </Text>

            <Text style={styles.statusText}>{getStatus()}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons
              name="walk-outline"
              size={20}
              color={tokens.colors.primary}
            />

            <Text style={styles.infoTitle}>How it works</Text>
          </View>

          <Text style={styles.infoText}>
            MetaHealth uses your phone's built-in activity sensor to
            count walking steps. Keep your phone with you while
            walking for the most consistent count.
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Ionicons
              name="footsteps-outline"
              size={20}
              color={tokens.colors.primary}
            />

            <Text style={styles.metricValue}>
              {formatSteps(sessionSteps)}
            </Text>

            <Text style={styles.metricLabel}>Current steps</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons
              name="flag-outline"
              size={20}
              color={tokens.colors.primary}
            />

            <Text style={styles.metricValue}>
              {formatSteps(DAILY_GOAL)}
            </Text>

            <Text style={styles.metricLabel}>Daily target</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
