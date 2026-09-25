import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createVitalsStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    scrollContent: {
      padding: tokens.spacing.lg,
      paddingBottom: 90,
      maxWidth: 480,
      alignSelf: "center",
      width: "100%",
    },
    header: {
      marginBottom: tokens.spacing.lg,
    },
    title: {
      fontSize: tokens.fontSize.xl,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
      fontWeight: "500",
    },
    bentoRow: {
      flexDirection: "row",
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.lg,
    },
    bentoCard: {
      flex: 1,
      backgroundColor: tokens.colors.surfaceElevated,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    bentoLabel: {
      fontSize: 9,
      fontWeight: "800",
      color: tokens.colors.textSecondary,
      letterSpacing: 0.5,
    },
    bentoVal: {
      fontSize: tokens.fontSize.lg,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginVertical: 4,
    },
    bentoDelta: {
      fontSize: tokens.fontSize.xs - 1,
      color: tokens.colors.primaryDark,
      fontWeight: "700",
    },
    sectionTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    sectionTitle: {
      fontSize: tokens.fontSize.md,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    sectionSubtitle: {
      fontSize: tokens.fontSize.xs - 1,
      color: tokens.colors.textSecondary,
      marginTop: 1,
    },
    logButton: {
      backgroundColor: tokens.colors.obsidian,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: tokens.radius.md,
    },
    logBtnText: {
      color: tokens.colors.white,
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
    },
    timelineList: {
      gap: tokens.spacing.md,
    },
    logCard: {
      gap: tokens.spacing.sm,
      padding: tokens.spacing.md,
    },
    logTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logTitle: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    logTime: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      fontWeight: "600",
    },
    badgeRow: {
      alignSelf: "flex-start",
    },
    logImpact: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      lineHeight: 18,
    },
    metricTagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 2,
    },
    metricTag: {
      backgroundColor: tokens.colors.surfaceSubtle,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    metricTagText: {
      fontSize: tokens.fontSize.xs - 1,
      fontWeight: "700",
      color: tokens.colors.primaryDark,
    },
  });
