import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../../theme/tokens";

export const createLogModalStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 75, // Keeps it lifted right above the bottom nav bar
    },
    dismissArea: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    popupCard: {
      width: "90%",
      maxWidth: 360,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.radius.xl,
      paddingVertical: 24,
      paddingHorizontal: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
      position: "relative",
    },
    modalTitle: {
      fontSize: tokens.fontSize.md,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginBottom: 20,
      textAlign: "center",
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      gap: 16,
    },
    gridItem: {
      width: "30%",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    iconCircle: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    iconEmoji: {
      fontSize: 24,
    },
    itemLabel: {
      fontSize: tokens.fontSize.xs,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      letterSpacing: 0.5,
    },
    pointerTriangle: {
      position: "absolute",
      bottom: -10,
      alignSelf: "center",
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: tokens.colors.surface,
    },
  });
