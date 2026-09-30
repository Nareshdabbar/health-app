
import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../../theme/tokens";

export const createHeartRateCardStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    card: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: 16,
      marginBottom: tokens.spacing.lg,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
      marginRight: 10,
    },

    title: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: 0.5,
    },

    subtitle: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },

    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.primarySubtle,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: tokens.radius.full,
    },

    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.primary,
      marginRight: 5,
    },

    liveText: {
      fontSize: 9,
      fontWeight: "800",
      color: tokens.colors.primary,
      letterSpacing: 0.5,
    },

    readingSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      marginBottom: 14,
    },

    heartVisual: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
      marginRight: 16,
    },

    readingContent: {
      flex: 1,
    },

    readingRow: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    heartRate: {
      fontSize: tokens.fontSize.display,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -1,
    },

    bpm: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      marginLeft: 7,
    },

    statusText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 1,
    },

    instructionBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.surfaceSubtle,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: 12,
      marginBottom: 12,
    },

    instructionContent: {
      flex: 1,
      marginLeft: 10,
    },

    instructionTitle: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
      marginBottom: 2,
    },

    instructionText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      lineHeight: 17,
    },

    measureButton: {
      height: 44,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },

    measureButtonText: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.white,
    },
  });
