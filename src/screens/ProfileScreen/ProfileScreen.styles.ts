// E:\app\src\screens\ProfileScreen\ProfileScreen.styles.ts
import { ThemeTokens } from "@/src/theme/tokens"; // Adjust path to your theme tokens if needed
import { StyleSheet } from "react-native";

export const createProfileStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      marginBottom: 24,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      marginRight: 16,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 2,
    },
    userMeta: {
      fontSize: 13,
      marginBottom: 8,
    },
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: "600",
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 10,
      marginTop: 4,
    },
    metricsGrid: {
      flexDirection: "row",
      borderRadius: 16,
      borderWidth: 1,
      padding: 16,
      marginBottom: 24,
      justifyContent: "space-between",
      alignItems: "center",
    },
    metricItem: {
      flex: 1,
      alignItems: "center",
    },
    metricLabel: {
      fontSize: 12,
      marginBottom: 4,
    },
    metricValue: {
      fontSize: 18,
      fontWeight: "700",
    },
    metricUnit: {
      fontSize: 12,
      fontWeight: "400",
    },
    metricDivider: {
      width: 1,
      height: 32,
    },
    menuContainer: {
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
      marginBottom: 32,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(150,150,150,0.15)",
    },
    menuIcon: {
      marginRight: 14,
    },
    menuText: {
      flex: 1,
      fontSize: 14,
      fontWeight: "500",
    },
    logoutSection: {
      alignItems: "center",
    },
    versionText: {
      fontSize: 12,
      marginTop: 16,
    },
  });
