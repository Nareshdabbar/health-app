import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createConsultStyles = (tokens: ThemeTokens) =>
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
    headerContainer: {
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
    activeRoomCard: {
      marginBottom: tokens.spacing.xl,
    },
    roomHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.md,
    },
    liveIndicator: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    livePulse: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: tokens.colors.primary,
    },
    liveText: {
      color: tokens.colors.primary,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    timeTag: {
      color: tokens.colors.textMuted,
      fontSize: tokens.fontSize.xs,
    },
    docRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: tokens.spacing.lg,
    },
    roomDocName: {
      fontSize: tokens.fontSize.md,
      fontWeight: "800",
      color: tokens.colors.white,
    },
    roomDocSpecialty: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primary,
      fontWeight: "600",
      marginTop: 2,
    },
    roomDocHospital: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textMuted,
      marginTop: 2,
    },
    roomActions: {
      marginTop: 4,
    },
    dirHeader: {
      marginBottom: tokens.spacing.md,
    },
    dirTitle: {
      fontSize: tokens.fontSize.md + 2,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    dirSub: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
    specFilter: {
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.lg,
    },
    specBtn: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    activeSpecBtn: {
      backgroundColor: tokens.colors.obsidian,
      borderColor: tokens.colors.obsidian,
    },
    specText: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
    },
    activeSpecText: {
      color: tokens.colors.white,
    },
    doctorsList: {
      gap: tokens.spacing.md,
    },
    doctorCard: {
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
    },
    doctorHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    doctorName: {
      fontSize: tokens.fontSize.base,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    doctorRole: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primaryDark,
      fontWeight: "600",
      marginTop: 2,
    },
    doctorHospital: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
    doctorBio: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      lineHeight: 18,
    },
    doctorFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
    },
    slotLabel: {
      fontSize: 10,
      color: tokens.colors.textSecondary,
    },
    slotTime: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
  });
