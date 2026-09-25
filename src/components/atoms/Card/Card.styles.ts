// E:\app\src\components\atoms\Card\Card.styles.ts
import { StyleSheet } from "react-native";
import { ThemeTokens } from "../../../theme/tokens";

export const createCardStyles = (tokens: ThemeTokens, mode?: string) =>
  StyleSheet.create({
    base: {
      borderRadius: tokens.radius.xl,
      padding: tokens.spacing.lg,
    },
    variant_elevated: {
      backgroundColor: tokens.colors.surfaceElevated,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    variant_flat: {
      backgroundColor: tokens.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    variant_obsidian: {
      // Fallback cleanly using your existing token variables or theme mode string
      backgroundColor:
        mode === "light" ? "#111827" : tokens.colors.obsidianCard,
      borderWidth: 1,
      borderColor: tokens.colors.borderStrong,
    },
  });
