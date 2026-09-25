// src/screens/ProgressScreen/ProgressScreen.tsx
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

      {/* Sub-navigation Tabs */}
      <View style={styles.subTabContainer}>
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveSubTab(tab)}
              style={[styles.subTabButton, isActive && styles.activeSubTab]}
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

      {/* Render Sub-Tab Content Dynamically Based on Click */}
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
