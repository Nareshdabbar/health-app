import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

export interface IconButtonProps {
  icon: React.ReactNode | string; // Allow both React elements and strings/emojis
  onPress: () => void;
  ariaLabel?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  ariaLabel,
  style,
}) => {
  const { tokens } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={ariaLabel}
      style={[
        {
          width: 36,
          height: 36,
          borderRadius: tokens.radius.full,
          backgroundColor: tokens.colors.surfaceSubtle,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: tokens.colors.border,
        },
        style,
      ]}
    >
      {typeof icon === "string" ? (
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};
