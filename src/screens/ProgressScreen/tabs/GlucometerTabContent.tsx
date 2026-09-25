// src/screens/ProgressScreen/tabs/GlucometerTabContent.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  styles: any;
  tokens: any;
}

export const GlucometerTabContent: React.FC<Props> = ({ styles, tokens }) => {
  return (
    <View style={styles.subScreenContainer}>
      <View
        style={[
          styles.cardLarge,
          { alignItems: "center", paddingVertical: 32 },
        ]}
      >
        <Ionicons
          name="pulse"
          size={48}
          color={tokens.colors.primary}
          style={{ marginBottom: 16 }}
        />
        <Text style={[styles.cardTitle, { fontSize: 18, marginBottom: 8 }]}>
          Continuous Glucose Tracking
        </Text>
        <Text
          style={[
            styles.subTabText,
            {
              textAlign: "center",
              color: tokens.colors.textSecondary,
              marginBottom: 20,
            },
          ]}
        >
          No active CGM device connected or recent glucometer scan logged today.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: tokens.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
            + Log Blood Sugar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
