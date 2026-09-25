// src/screens/HomeScreen/HomeScreen.styles.ts
import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createHomeScreenStyles = (tokens: ThemeTokens) =>
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
    topStatus: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.lg,
    },
    greeting: {
      fontSize: tokens.fontSize.xl,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -0.4,
    },
    clinicalStatus: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
    toast: {
      backgroundColor: tokens.colors.obsidian,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: tokens.radius.md,
      marginBottom: tokens.spacing.md,
    },
    toastText: {
      color: tokens.colors.primary,
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
    },
    cgmCard: {
      marginBottom: tokens.spacing.lg,
    },
    cgmHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    cgmTagRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.primarySubtle,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: tokens.radius.full,
    },
    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.primary,
      marginRight: 6,
    },
    cgmTagText: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "800",
      color: tokens.colors.primaryDark,
      letterSpacing: 0.3,
    },
    timeAgo: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
    },
    readingRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginVertical: 4,
    },
    glucoseNumber: {
      fontSize: tokens.fontSize.display,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -1,
    },
    glucoseMeta: {
      marginLeft: 10,
    },
    unitText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
      fontWeight: "600",
    },
    trendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      marginTop: 2,
    },
    trendArrow: {
      fontSize: 12,
      fontWeight: "800",
      color: tokens.colors.primary,
    },
    trendLabel: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "800",
      color: tokens.colors.primary,
    },
    cgmFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    tirBox: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 6,
    },
    tirLabel: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
    },
    tirValue: {
      fontSize: tokens.fontSize.base,
      fontWeight: "800",
      color: tokens.colors.primaryDark,
    },
    nfcButton: {
      backgroundColor: tokens.colors.obsidian,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: tokens.radius.md,
    },
    nfcBtnText: {
      color: tokens.colors.white,
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
    },
    bentoGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: tokens.spacing.lg,
    },
    bentoItem: {
      flex: 1,
      backgroundColor: tokens.colors.surface,
      padding: 12,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    bentoLabel: {
      fontSize: 10,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      marginBottom: 4,
    },
    bentoMain: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 2,
    },
    bentoNumber: {
      fontSize: 16,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    bentoUnit: {
      fontSize: 10,
      color: tokens.colors.textSecondary,
    },
    bentoSub: {
      fontSize: 10,
      color: tokens.colors.textSecondary,
      marginTop: 4,
    },
    docCard: {
      padding: 16,
      marginBottom: tokens.spacing.lg,
    },
    docHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    // Explicit high-contrast light text colors for dark/obsidian cards
    docName: {
      fontSize: tokens.fontSize.md,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    docTitle: {
      fontSize: tokens.fontSize.xs,
      color: "rgba(255, 255, 255, 0.7)",
    },
    docQuote: {
      fontSize: tokens.fontSize.sm,
      fontStyle: "italic",
      color: "#FFFFFF",
      marginBottom: 16,
      lineHeight: 20,
    },
    docFooter: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    habitsSection: {
      marginTop: tokens.spacing.sm,
    },
    habitsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.md,
    },
    sectionTitle: {
      fontSize: tokens.fontSize.md,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    sectionCount: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
    },
    habitRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.surface,
      padding: 12,
      borderRadius: tokens.radius.md,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      gap: 12,
    },
    habitCompletedRow: {
      opacity: 0.6,
      backgroundColor: tokens.colors.surfaceSubtle,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: tokens.radius.sm,
      borderWidth: 2,
      borderColor: tokens.colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxActive: {
      backgroundColor: tokens.colors.primary,
      borderColor: tokens.colors.primary,
    },
    checkMark: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: "800",
    },
    habitTitle: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    habitTitleDone: {
      textDecorationLine: "line-through",
      color: tokens.colors.textSecondary,
    },
    habitMeta: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
  });
