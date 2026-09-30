
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";
import { createHeartRateCardStyles } from "./HeartRateCard.styles";

interface HeartRateCardProps {
  heartRate?: number;
  onMeasure?: () => void;
}

export const HeartRateCard: React.FC<HeartRateCardProps> = ({
  heartRate = 72,
  onMeasure,
}) => {
  const { tokens } = useTheme();
  const styles = createHeartRateCardStyles(tokens);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="heart"
              size={18}
              color={tokens.colors.primary}
            />
          </View>

          <View>
            <Text style={styles.title}>HEART RATE</Text>
            <Text style={styles.subtitle}>Camera PPG measurement</Text>
          </View>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>READY</Text>
        </View>
      </View>

      <View style={styles.readingSection}>
        <View style={styles.heartVisual}>
          <Ionicons
            name="heart"
            size={42}
            color={tokens.colors.primary}
          />
        </View>

        <View style={styles.readingContent}>
          <View style={styles.readingRow}>
            <Text style={styles.heartRate}>{heartRate}</Text>
            <Text style={styles.bpm}>BPM</Text>
          </View>

          <Text style={styles.statusText}>Resting heart rate</Text>
        </View>
      </View>

      <View style={styles.instructionBox}>
        <Ionicons
          name="finger-print-outline"
          size={20}
          color={tokens.colors.primary}
        />

        <View style={styles.instructionContent}>
          <Text style={styles.instructionTitle}>
            Measure with your camera
          </Text>
          <Text style={styles.instructionText}>
            Place your fingertip gently over the rear camera and flash.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.measureButton}
        onPress={onMeasure}
        activeOpacity={0.8}
      >
        <Ionicons
          name="heart-outline"
          size={17}
          color={tokens.colors.white}
        />
        <Text style={styles.measureButtonText}>Measure Heart Rate</Text>
      </TouchableOpacity>
    </View>
  );
};
