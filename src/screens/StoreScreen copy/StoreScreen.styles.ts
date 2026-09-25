import { Dimensions, StyleSheet } from "react-native";
import { ThemeTokens } from "../../theme/tokens";

export const createStoreStyles = (tokens: ThemeTokens) => {
  const { width } = Dimensions.get("window");
  const cardWidth = (width - tokens.spacing.lg * 2 - tokens.spacing.sm * 2) / 3;

  return StyleSheet.create({
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
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.md,
    },
    brandTitle: {
      fontSize: tokens.fontSize.lg,
      fontWeight: "900",
      color: tokens.colors.textPrimary,
      letterSpacing: -0.5,
    },
    cartBtn: {
      width: 40,
      height: 40,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.colors.surfaceElevated,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: tokens.colors.border,
      position: "relative",
    },
    cartBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      backgroundColor: tokens.colors.primary,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    cartBadgeText: {
      color: tokens.colors.white,
      fontSize: 9,
      fontWeight: "800",
    },
    heroBanner: {
      marginBottom: tokens.spacing.lg,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      overflow: "hidden",
    },
    heroContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    heroTitle: {
      fontSize: tokens.fontSize.base,
      fontWeight: "800",
      color: tokens.colors.white,
      lineHeight: 20,
    },
    heroSub: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: 4,
    },
    heroCta: {
      marginTop: 10,
      backgroundColor: tokens.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: tokens.radius.sm,
      alignSelf: "flex-start",
    },
    heroCtaText: {
      color: tokens.colors.white,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    heroImage: {
      width: 90,
      height: 90,
      borderRadius: tokens.radius.md,
    },
    bannerFooter: {
      marginTop: tokens.spacing.md,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.1)",
      alignItems: "center",
    },
    footerText: {
      fontSize: 10,
      color: tokens.colors.primary,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.sm,
    },
    sectionTitle: {
      fontSize: tokens.fontSize.base,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    categoriesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
    },
    categoryCard: {
      width: cardWidth,
      backgroundColor: tokens.colors.surfaceElevated,
      borderRadius: tokens.radius.md,
      padding: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    activeCategoryCard: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.surfaceSubtle,
    },
    categoryImageWrapper: {
      width: "100%",
      height: 65,
      borderRadius: tokens.radius.sm,
      overflow: "hidden",
      marginBottom: 6,
    },
    categoryImage: {
      width: "100%",
      height: "100%",
    },
    categoryText: {
      fontSize: 11,
      fontWeight: "700",
      color: tokens.colors.textSecondary,
      textAlign: "center",
    },
    activeCategoryText: {
      color: tokens.colors.primary,
    },
    productsGrid: {
      gap: tokens.spacing.md,
    },
    productCard: {
      padding: tokens.spacing.md,
      gap: 10,
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    productThumbnail: {
      width: 64,
      height: 64,
      borderRadius: tokens.radius.md,
    },
    productName: {
      fontSize: tokens.fontSize.xs + 1,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      marginTop: 4,
    },
    productDesc: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      lineHeight: 16,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontSize: 10,
      fontWeight: "700",
      color: tokens.colors.textMuted,
    },
    cardBottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
    },
    priceLabel: {
      fontSize: 9,
      color: tokens.colors.textSecondary,
    },
    priceValue: {
      fontSize: tokens.fontSize.sm,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
    },
    originalPrice: {
      fontSize: 11,
      color: tokens.colors.textMuted,
      textDecorationLine: "line-through",
    },
  });
};
