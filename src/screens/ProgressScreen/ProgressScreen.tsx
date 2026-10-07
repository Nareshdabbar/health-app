
import { router } from "expo-router";
import { useTheme } from "@/src/theme/ThemeContext";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { createProgressStyles } from "./ProgressScreen.styles";
import { GlucometerTabContent } from "./tabs/GlucometerTabContent";
import { ProgressTabContent } from "./tabs/ProgressTabContent";
import { WeighingTabContent } from "./tabs/WeighingTabContent";

export const ProgressScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createProgressStyles(tokens), [tokens]);
  const [activeSubTab, setActiveSubTab] = useState("Progress");

  const subTabs = ["Progress", "Glucometer", "Weighing"];

  const handleCardPress = (metricName: string) => {
    if (metricName === "Heart Rate") {
      router.push("/(routes)/heart-rate" as any);
      return;
    }

    if (metricName === "Steps") {
      router.push("/(routes)/walk-count" as any);
      return;
    }

    if (metricName === "BLE Test") {
      router.push("/(routes)/ble-test" as any);
      return;
    }

    Alert.alert(
      "Detailed View",
      `Opening deep analytics and history for ${metricName}.`,
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Your Health Data</Text>

      <View style={styles.subTabContainer}>
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveSubTab(tab)}
              style={[
                styles.subTabButton,
                isActive && styles.activeSubTab,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.subTabText,
                  {
                    color: isActive
                      ? tokens.colors.textPrimary
                      : tokens.colors.textSecondary,
                    fontWeight: isActive ? "700" : "500",
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {activeSubTab === "Progress" && (
        <ProgressTabContent
          styles={styles}
          tokens={tokens}
          onCardPress={handleCardPress}
        />
      )}

      {activeSubTab === "Glucometer" && (
        <GlucometerTabContent styles={styles} tokens={tokens} />
      )}

      {activeSubTab === "Weighing" && (
        <WeighingTabContent styles={styles} tokens={tokens} />
      )}
    </ScrollView>
  );
};
