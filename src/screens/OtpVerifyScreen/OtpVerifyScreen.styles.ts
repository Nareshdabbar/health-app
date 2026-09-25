import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createOtpVerifyStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    container: {
      padding: tokens.spacing.xl,
      maxWidth: 480,
      alignSelf: "center",
      width: "100%",
      flex: 1,
      justifyContent: "center",
    },
    backBtn: {
      position: "absolute",
      top: 20,
      left: 20,
      padding: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    backArrow: {
      fontSize: tokens.fontSize.base,
      fontWeight: "700",
      color: tokens.colors.primaryDark,
    },
    header: {
      alignItems: "center",
      marginBottom: tokens.spacing.xl,
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: tokens.colors.primarySubtle,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: tokens.spacing.lg,
    },
    iconEmoji: {
      fontSize: 28,
    },
    title: {
      fontSize: tokens.fontSize.xl,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
      textAlign: "center",
      lineHeight: 18,
    },
    boldPhone: {
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    card: {
      gap: tokens.spacing.lg,
      padding: tokens.spacing.xl,
    },
    prompt: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      textAlign: "center",
    },
    errorText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.error,
      textAlign: "center",
      fontWeight: "600",
    },
    demoTip: {
      backgroundColor: tokens.colors.primarySubtle,
      padding: 10,
      borderRadius: tokens.radius.md,
      alignItems: "center",
    },
    demoTipText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primaryDark,
    },
    resendRow: {
      alignItems: "center",
      marginTop: 4,
    },
    timerText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
    },
    resendBtn: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.primary,
    },
  });
