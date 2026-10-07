import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createHeartRateScreenStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },

    content: {
      flex: 1,
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

    cameraCard: {
      backgroundColor: tokens.colors.surfaceElevated,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      overflow: "hidden",
      marginBottom: tokens.spacing.md,
    },

    cameraPreviewContainer: {
      height: 320,
      position: "relative",
      overflow: "hidden",
      backgroundColor: tokens.colors.obsidian,
    },

    cameraPreview: {
      ...StyleSheet.absoluteFill,
    },

    cameraPlaceholder: {
      minHeight: 300,
      alignItems: "center",
      justifyContent: "center",
      padding: tokens.spacing.lg,
      backgroundColor: tokens.colors.surfaceSubtle,
    },

    cameraIconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
      marginBottom: tokens.spacing.md,
    },

    cameraTitle: {
      fontSize: tokens.fontSize.lg,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.xs,
      textAlign: "center",
    },

    cameraText: {
      maxWidth: 300,
      textAlign: "center",
      fontSize: tokens.fontSize.xs,
      lineHeight: 18,
      color: tokens.colors.textSecondary,
    },

    fingerGuide: {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 210,
      height: 170,
      marginLeft: -105,
      marginTop: -85,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: tokens.spacing.md,
    },

    fingerGuideCornerTopLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 30,
      height: 30,
      borderTopWidth: 3,
      borderLeftWidth: 3,
      borderColor: tokens.colors.white,
      borderTopLeftRadius: tokens.radius.md,
    },

    fingerGuideCornerTopRight: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 30,
      height: 30,
      borderTopWidth: 3,
      borderRightWidth: 3,
      borderColor: tokens.colors.white,
      borderTopRightRadius: tokens.radius.md,
    },

    fingerGuideCornerBottomLeft: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 30,
      height: 30,
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderColor: tokens.colors.white,
      borderBottomLeftRadius: tokens.radius.md,
    },

    fingerGuideCornerBottomRight: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 30,
      height: 30,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      borderColor: tokens.colors.white,
      borderBottomRightRadius: tokens.radius.md,
    },

    fingerGuideTitle: {
      marginTop: tokens.spacing.sm,
      fontSize: tokens.fontSize.sm,
      fontWeight: "800",
      color: tokens.colors.white,
      textAlign: "center",
    },

    fingerGuideText: {
      marginTop: tokens.spacing.xs,
      fontSize: tokens.fontSize.xs,
      lineHeight: 17,
      color: tokens.colors.white,
      textAlign: "center",
      opacity: 0.9,
    },

    measuringBadge: {
      position: "absolute",
      top: tokens.spacing.md,
      right: tokens.spacing.md,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.surface,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.radius.full,
    },

    measuringDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: tokens.colors.primary,
      marginRight: 6,
    },

    measuringText: {
      fontSize: 9,
      fontWeight: "800",
      color: tokens.colors.primary,
      letterSpacing: 0.5,
    },

    statusCard: {
      backgroundColor: tokens.colors.surfaceElevated,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },

    statusHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    statusTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    statusIconCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.primarySubtle,
      marginRight: tokens.spacing.sm,
    },

    statusTitle: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: 0.5,
    },

    statusSubtitle: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },

    readyBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.primarySubtle,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: 5,
      borderRadius: tokens.radius.full,
    },

    readyDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.primary,
      marginRight: 5,
    },

    readyText: {
      fontSize: 9,
      fontWeight: "800",
      color: tokens.colors.primary,
      letterSpacing: 0.5,
    },

    readingRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginTop: tokens.spacing.md,
    },

    readingValue: {
      fontSize: tokens.fontSize.display,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      letterSpacing: -1,
    },

    readingUnit: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      marginLeft: 7,
    },

    infoCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: tokens.colors.surfaceSubtle,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },

    infoContent: {
      flex: 1,
      marginLeft: tokens.spacing.sm,
    },

    infoTitle: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
      marginBottom: 2,
    },

    infoText: {
      fontSize: tokens.fontSize.xs,
      lineHeight: 17,
      color: tokens.colors.textSecondary,
    },

    startButton: {
      minHeight: 46,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginTop: "auto",
    },

    startButtonText: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "700",
      color: tokens.colors.white,
    },
  });
