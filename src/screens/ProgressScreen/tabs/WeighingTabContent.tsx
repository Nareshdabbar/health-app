// src/screens/ProgressScreen/tabs/WeighingTabContent.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  styles: any;
  tokens: any;
}

export const WeighingTabContent: React.FC<Props> = ({ styles, tokens }) => {
  return (
    <View style={styles.subScreenContainer}>
      <View
        style={[
          styles.cardLarge,
          { alignItems: "center", paddingVertical: 32 },
        ]}
      >
        <Ionicons
          name="scale-outline"
          size={48}
          color={tokens.colors.primary}
          style={{ marginBottom: 16 }}
        />
        <Text style={[styles.cardTitle, { fontSize: 18, marginBottom: 8 }]}>
          Weight Log History
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
          Current Recorded Weight:{" "}
          <Text style={{ fontWeight: "700", color: tokens.colors.textPrimary }}>
            50 kg
          </Text>
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
            Update Weight
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
