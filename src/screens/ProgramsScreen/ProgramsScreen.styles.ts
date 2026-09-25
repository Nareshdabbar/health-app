import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createProgramsStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    screenContainer: {
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
    },
    sub: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
    pillsRow: {
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.lg,
    },
    pill: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    activePill: {
      backgroundColor: tokens.colors.obsidian,
      borderColor: tokens.colors.obsidian,
    },
    pillText: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
    },
    activePillText: {
      color: tokens.colors.white,
    },
    programsList: {
      gap: tokens.spacing.lg,
    },
    programCard: {
      gap: tokens.spacing.md,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: tokens.spacing.sm,
    },
    progTitle: {
      fontSize: tokens.fontSize.md + 1,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    progSub: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primaryDark,
      fontWeight: "600",
      marginTop: 2,
    },
    progDesc: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
      lineHeight: 20,
    },
    featuresBox: {
      backgroundColor: tokens.colors.surfaceSubtle,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      gap: 6,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    featureRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    featureCheck: {
      fontSize: 12,
      fontWeight: "800",
      color: tokens.colors.primary,
    },
    featureText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textPrimary,
      fontWeight: "600",
    },
    statsRow: {
      flexDirection: "row",
      gap: tokens.spacing.sm,
      backgroundColor: tokens.colors.surfaceSubtle,
      padding: 10,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    statBox: {
      flex: 1,
    },
    statLabel: {
      fontSize: 8,
      fontWeight: "800",
      color: tokens.colors.textSecondary,
    },
    statVal: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginTop: 2,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
    },
    priceLabel: {
      fontSize: 10,
      color: tokens.colors.textSecondary,
    },
    priceText: {
      fontSize: tokens.fontSize.md,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
  });
