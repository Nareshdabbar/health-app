import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../../theme/tokens";

export const createHeaderStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
      zIndex: 10,
    },
    leftCol: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.md,
    },
    titleGroup: {
      justifyContent: "center",
    },
    title: {
      fontSize: tokens.fontSize.lg,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "600",
      color: tokens.colors.primaryDark,
      marginTop: 2,
    },
    actionsGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.sm,
    },
  });
