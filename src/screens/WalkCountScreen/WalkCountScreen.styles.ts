
// src/screens/WalkCountScreen/WalkCountScreen.styles.ts

import { ThemeTokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const createWalkCountScreenStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
    },

    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.surface,
    },

    headerTextContainer: {
      marginLeft: 12,
      flex: 1,
    },

    headerTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },

    headerSubtitle: {
      marginTop: 2,
      fontSize: 13,
      color: tokens.colors.textSecondary,
    },

    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
    },

    heroCard: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 24,
      padding: 22,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    },

    heroTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    iconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
    },

    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: tokens.colors.primarySubtle,
    },

    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginRight: 6,
    },

    liveBadgeText: {
      fontSize: 11,
      fontWeight: "800",
      color: tokens.colors.primary,
      letterSpacing: 0.5,
    },

    heroLabel: {
      marginTop: 24,
      fontSize: 12,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      letterSpacing: 1,
    },

    stepsRow: {
      minHeight: 72,
      justifyContent: "center",
      marginTop: 4,
    },

    stepsValue: {
      fontSize: 52,
      lineHeight: 62,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -1,
    },

    goalText: {
      marginTop: 2,
      fontSize: 14,
      color: tokens.colors.textSecondary,
    },

    progressTrack: {
      width: "100%",
      height: 10,
      marginTop: 22,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: tokens.colors.border,
    },

    progressFill: {
      height: "100%",
      borderRadius: 5,
      backgroundColor: tokens.colors.primary,
    },

    progressFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
    },

    progressPercent: {
      fontSize: 13,
      fontWeight: "700",
      color: tokens.colors.primary,
    },

    remainingText: {
      fontSize: 13,
      color: tokens.colors.textSecondary,
    },

    statusCard: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      padding: 16,
      borderRadius: 18,
      backgroundColor: tokens.colors.surface,
    },

    statusIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
    },

    statusContent: {
      flex: 1,
      marginLeft: 12,
    },

    statusTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },

    statusText: {
      marginTop: 3,
      fontSize: 13,
      lineHeight: 18,
      color: tokens.colors.textSecondary,
    },

    infoCard: {
      marginTop: 16,
      padding: 18,
      borderRadius: 18,
      backgroundColor: tokens.colors.surfaceSubtle,
    },

    infoHeader: {
      flexDirection: "row",
      alignItems: "center",
    },

    infoTitle: {
      marginLeft: 8,
      fontSize: 15,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },

    infoText: {
      marginTop: 10,
      fontSize: 13,
      lineHeight: 20,
      color: tokens.colors.textSecondary,
    },

    metricsRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 16,
    },

    metricCard: {
      flex: 1,
      minHeight: 110,
      padding: 16,
      borderRadius: 18,
      backgroundColor: tokens.colors.surface,
      justifyContent: "space-between",
    },

    metricValue: {
      marginTop: 8,
      fontSize: 20,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },

    metricLabel: {
      marginTop: 2,
      fontSize: 12,
      color: tokens.colors.textSecondary,
    },
  });
