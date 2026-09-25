import React, { useMemo } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";
import { createLogModalStyles } from "./LogModal.styles";

export interface LogModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

const LOG_OPTIONS = [
  {
    id: "meal",
    label: "FOOD",
    icon: "🥗",
    gradientColors: ["#10B981", "#047857"],
  },
  {
    id: "glucose",
    label: "SUGAR",
    icon: "🩸",
    gradientColors: ["#8B5CF6", "#6D28D9"],
  },
  {
    id: "medication",
    label: "MEDICINE",
    icon: "💊",
    gradientColors: ["#0EA5E9", "#0369A1"],
  },
  {
    id: "sleep",
    label: "SLEEP",
    icon: "🌙",
    gradientColors: ["#FB923C", "#C2410C"],
  },
  {
    id: "workout",
    label: "FITNESS",
    icon: "🏃",
    gradientColors: ["#3B82F6", "#1D4ED8"],
  },
  {
    id: "vitals",
    label: "VITALS",
    icon: "🫀",
    gradientColors: ["#6366F1", "#4338CA"],
  },
  {
    id: "reports",
    label: "REPORTS",
    icon: "📋",
    gradientColors: ["#F59E0B", "#B45309"],
  },
  {
    id: "weight",
    label: "WEIGHT",
    icon: "⚖️",
    gradientColors: ["#EF4444", "#B91C1C"],
  },
];

export const LogModal: React.FC<LogModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createLogModalStyles(tokens), [tokens]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Click outside to dismiss */}
        <TouchableOpacity
          style={styles.dismissArea}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.popupCard}>
          <Text style={styles.modalTitle}>What would you like to log?</Text>

          <ScrollView
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          >
            {LOG_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                activeOpacity={0.8}
                onPress={() => {
                  if (onSelectCategory) onSelectCategory(item.id);
                  onClose();
                }}
              >
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.gradientColors[0] },
                  ]}
                >
                  <Text style={styles.iconEmoji}>{item.icon}</Text>
                </View>
                <Text style={styles.itemLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Small pointer triangle pointing down to the + button */}
          <View style={styles.pointerTriangle} />
        </View>
      </View>
    </Modal>
  );
};
