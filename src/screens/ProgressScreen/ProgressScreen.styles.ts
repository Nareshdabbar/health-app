// src/screens/ProgressScreen/ProgressScreen.styles.ts
import { ThemeTokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const createProgressStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 100,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginBottom: 16,
    },
    subTabContainer: {
      flexDirection: "row",
      backgroundColor: tokens.colors.surface,
      borderRadius: 16,
      padding: 4,
      marginBottom: 20,
    },
    subTabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 12,
    },
    activeSubTab: {
      backgroundColor: tokens.colors.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    subTabText: {
      fontSize: 14,
    },
    cardLarge: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    cardHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    cardMainValue: {
      fontSize: 24,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      marginBottom: 16,
    },
    unitText: {
      fontSize: 14,
      fontWeight: "500",
    },
    chartDots: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.border,
    },
    dotActive: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: tokens.colors.primary,
    },
    macrosRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: "rgba(0,0,0,0.04)",
      paddingTop: 14,
    },
    macroItem: {
      gap: 4,
    },
    macroIndicatorRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    macroBar: {
      width: 3,
      height: 12,
      borderRadius: 2,
    },
    macroLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: tokens.colors.textSecondary,
    },
    macroValue: {
      fontSize: 14,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      paddingLeft: 9,
    },
    rowContainer: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 16,
    },
    cardHalf: {
      flex: 1,
      backgroundColor: tokens.colors.surface,
      borderRadius: 20,
      padding: 18,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
      minHeight: 140,
    },
    stepDotsRow: {
      flexDirection: "row",
      gap: 6,
    },
    stepDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.border,
    },
    stepDotActive: {
      width: 14,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.primary,
    },
    weightBarContainer: {
      width: "100%",
      height: 6,
      backgroundColor: "rgba(0,0,0,0.05)",
      borderRadius: 3,
      overflow: "hidden",
    },
    weightBarFill: {
      width: "40%",
      height: "100%",
      borderRadius: 3,
      backgroundColor: tokens.colors.primary,
    },
  });
