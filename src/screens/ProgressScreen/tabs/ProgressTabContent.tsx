// src/screens/ProgressScreen/tabs/ProgressTabContent.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  styles: any;
  tokens: any;
  onCardPress: (metric: string) => void;
}

export const ProgressTabContent: React.FC<Props> = ({
  styles,
  tokens,
  onCardPress,
}) => {
  return (
    <>
      {/* Calorie Consumed Card */}
      <TouchableOpacity
        style={styles.cardLarge}
        onPress={() => onCardPress("Calories")}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Calorie Consumed</Text>

          <View style={styles.chartDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dotActive} />
          </View>
        </View>

        <Text style={styles.cardMainValue}>
          -- <Text style={styles.unitText}>cal</Text>
        </Text>

        <View style={styles.macrosRow}>
          <MacroItem
            label="Protein"
            value="0 g"
            color="#3B82F6"
            styles={styles}
          />
          <MacroItem
            label="Carbs"
            value="0 g"
            color="#A855F7"
            styles={styles}
          />
          <MacroItem label="Fats" value="0 g" color="#8B5CF6" styles={styles} />
          <MacroItem
            label="Fiber"
            value="0 g"
            color="#F59E0B"
            styles={styles}
          />
        </View>
      </TouchableOpacity>

      {/* Heart Rate Card */}
      <TouchableOpacity
        style={styles.cardLarge}
        onPress={() => onCardPress("Heart Rate")}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardTitle}>Heart Rate</Text>
            <Text
              style={{
                color: tokens.colors.textSecondary,
                fontSize: tokens.fontSize.xs,
                marginTop: 3,
              }}
            >
              Camera PPG measurement
            </Text>
          </View>

          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: tokens.colors.primarySubtle,
            }}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color={tokens.colors.primary}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: tokens.spacing.md,
          }}
        >
          <Text style={styles.cardMainValue}>--</Text>
          <Text
            style={[
              styles.unitText,
              {
                marginLeft: tokens.spacing.xs,
              },
            ]}
          >
            BPM
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: tokens.spacing.sm,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: tokens.colors.primary,
              marginRight: 6,
            }}
          />

          <Text
            style={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            Tap to measure your heart rate
          </Text>
        </View>
      </TouchableOpacity>

      {/* Steps & Weight Row */}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => onCardPress("Steps")}
          activeOpacity={0.9}
        >
          <Text style={styles.cardTitle}>Steps</Text>

          <Text style={[styles.cardMainValue, { marginVertical: 16 }]}>--</Text>

          <View style={styles.stepDotsRow}>
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <View style={styles.stepDotActive} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => onCardPress("Weight")}
          activeOpacity={0.9}
        >
          <Text style={styles.cardTitle}>Weight</Text>

          <Text
            style={[styles.cardMainValue, { color: tokens.colors.textPrimary }]}
          >
            50 <Text style={styles.unitText}>kg</Text>
          </Text>

          <View style={styles.weightBarContainer}>
            <View style={styles.weightBarFill} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Fasting Blood Sugar & Sleep Row */}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => onCardPress("Blood Sugar")}
          activeOpacity={0.9}
        >
          <Text style={styles.cardTitle}>Fasting blood sugar</Text>

          <Text style={[styles.cardMainValue, { marginTop: 24 }]}>
            -- <Text style={styles.unitText}>mg/dl</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => onCardPress("Sleep")}
          activeOpacity={0.9}
        >
          <Text style={styles.cardTitle}>Sleep</Text>

          <Text style={[styles.cardMainValue, { marginTop: 24 }]}>
            -- <Text style={styles.unitText}>hr</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function MacroItem({
  label,
  value,
  color,
  styles,
}: {
  label: string;
  value: string;
  color: string;
  styles: any;
}) {
  return (
    <View style={styles.macroItem}>
      <View style={styles.macroIndicatorRow}>
        <View style={[styles.macroBar, { backgroundColor: color }]} />
        <Text style={styles.macroLabel}>{label}</Text>
      </View>

      <Text style={styles.macroValue}>{value}</Text>
    </View>
  );
}
