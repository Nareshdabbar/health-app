// E:\app\src\components\organisms\WellnessHub\WellnessHub.styles.ts
import { ThemeTokens } from "@/src/theme/tokens";
import { StyleSheet } from "react-native";

export const createWellnessStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 110, // Generous padding for bottom tab bar clearance
    },
    screenTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginBottom: 16,
    },
    segmentContainer: {
      flexDirection: "row",
      backgroundColor: tokens.colors.surfaceSubtle || "#E5E7EB",
      borderRadius: 30,
      padding: 4,
      marginBottom: 20,
    },
    segmentButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 26,
    },
    activeSegment: {
      backgroundColor: tokens.colors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    segmentText: {
      fontSize: 14,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
    },
    activeSegmentText: {
      color: tokens.colors.textPrimary,
    },
    tabContent: {
      gap: 24,
    },
    nutritionCard: {
      borderRadius: 24,
      padding: 20,
      overflow: "hidden",
      backgroundColor: "#4C1D95", // Deep purple theme from reference
    },
    calorieInfoBox: {
      marginBottom: 16,
    },
    calorieHeaderTitle: {
      color: "#E9D5FF",
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 4,
    },
    calorieValue: {
      color: "#FFFFFF",
      fontSize: 38,
      fontWeight: "900",
      marginBottom: 16,
    },
    macroList: {
      gap: 8,
      width: "65%",
    },
    macroRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    macroLabel: {
      color: "#D8B4FE",
      fontSize: 12,
      fontWeight: "700",
    },
    macroVal: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    insightNote: {
      color: "#C4B5FD",
      fontSize: 10,
      fontStyle: "italic",
      marginTop: 12,
    },
    trackActionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 30,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    trackText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "700",
    },
    logMealBtn: {
      backgroundColor: "#6D28D9",
      paddingVertical: 8,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    logMealBtnText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    sectionHeading: {
      fontSize: 18,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
      marginTop: 4,
    },
    horizontalScroll: {
      gap: 14,
    },
    recipeCard: {
      width: 155,
      height: 200,
      borderRadius: 18,
      overflow: "hidden",
    },
    recipeImageBackground: {
      flex: 1,
      justifyContent: "flex-end",
      padding: 12,
    },
    recipeGradientOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    recipeTitle: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      zIndex: 1,
    },
    carbGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 14,
    },
    carbCategoryCard: {
      width: "48%",
      height: 140,
      borderRadius: 18,
      overflow: "hidden",
    },
    carbCategoryText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      zIndex: 1,
    },
    mindfulHeroCard: {
      height: 230,
      borderRadius: 24,
      overflow: "hidden",
      justifyContent: "flex-end",
    },
    heroOverlay: {
      padding: 20,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    heroSub: {
      color: "#E5E7EB",
      fontSize: 11,
      fontWeight: "600",
      marginBottom: 4,
    },
    heroTitle: {
      color: "#FFFFFF",
      fontSize: 19,
      fontWeight: "800",
      marginBottom: 14,
    },
    playNowBtn: {
      backgroundColor: "#7C3AED",
      alignSelf: "flex-start",
      paddingVertical: 8,
      paddingHorizontal: 24,
      borderRadius: 20,
    },
    playNowText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    meditationCard: {
      width: 165,
    },
    meditationThumb: {
      width: 165,
      height: 120,
      borderRadius: 16,
      marginBottom: 8,
      resizeMode: "cover",
    },
    meditationName: {
      fontSize: 13,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    meditationSessions: {
      fontSize: 11,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
  });
