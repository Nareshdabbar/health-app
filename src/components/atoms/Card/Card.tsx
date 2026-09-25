// src/components/atoms/Card/Card.tsx
import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";
import { createCardStyles } from "./Card.styles";

export type CardVariant = "elevated" | "flat" | "obsidian";

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "elevated",
  style,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createCardStyles(tokens), [tokens]);

  return (
    <View style={[styles.base, styles[`variant_${variant}`], style]}>
      {children}
    </View>
  );
};
