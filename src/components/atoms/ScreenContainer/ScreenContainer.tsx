import { useTheme } from "@/src/theme/ThemeContext";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  includeBottom?: boolean; // Option to clear bottom navigation buttons too
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  includeBottom = false,
}) => {
  const insets = useSafeAreaInsets();
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top : 8,
          paddingBottom: includeBottom && insets.bottom > 0 ? insets.bottom : 0,
          backgroundColor: tokens.colors.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
