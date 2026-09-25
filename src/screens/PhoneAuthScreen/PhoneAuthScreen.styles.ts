import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createPhoneAuthStyles = (tokens: ThemeTokens) =>
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
      paddingHorizontal: 16,
    },
    formCard: {
      gap: tokens.spacing.lg,
      padding: tokens.spacing.xl,
    },
    inputLabel: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    phoneInputRow: {
      flexDirection: "row",
      gap: 10,
    },
    countryCodeBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: tokens.colors.borderStrong,
      borderRadius: tokens.radius.md,
      paddingHorizontal: 12,
      gap: 6,
    },
    flag: {
      fontSize: 16,
    },
    countryCode: {
      fontSize: tokens.fontSize.base,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    textInput: {
      flex: 1,
      backgroundColor: tokens.colors.surface,
      borderWidth: 1.5,
      borderColor: tokens.colors.borderStrong,
      borderRadius: tokens.radius.md,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: tokens.fontSize.md,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    helperText: {
      fontSize: 11,
      color: tokens.colors.primaryDark,
      fontWeight: "600",
    },
    securityBadge: {
      marginTop: tokens.spacing.xl,
      alignItems: "center",
    },
    securityText: {
      fontSize: 11,
      color: tokens.colors.textSecondary,
      textAlign: "center",
    },
  });
