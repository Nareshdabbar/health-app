import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createButtonStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: tokens.radius.lg,
      gap: tokens.spacing.sm,
    },
    fullWidth: {
      width: '100%',
    },
    // Sizes
    size_sm: {
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    size_md: {
      paddingVertical: 12,
      paddingHorizontal: 18,
    },
    size_lg: {
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    // Variants
    variant_primary: {
      backgroundColor: tokens.colors.primary,
    },
    variant_primary_text: {
      color: '#003730',
      fontWeight: '800',
    },
    variant_obsidian: {
      backgroundColor: tokens.colors.obsidian,
    },
    variant_obsidian_text: {
      color: tokens.colors.white,
      fontWeight: '700',
    },
    variant_outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: tokens.colors.borderStrong,
    },
    variant_outline_text: {
      color: tokens.colors.textPrimary,
      fontWeight: '700',
    },
    variant_ghost: {
      backgroundColor: 'transparent',
    },
    variant_ghost_text: {
      color: tokens.colors.primaryDark,
      fontWeight: '700',
    },
    disabled: {
      opacity: 0.5,
    },
    text_sm: {
      fontSize: tokens.fontSize.sm,
    },
    text_md: {
      fontSize: tokens.fontSize.base,
    },
    text_lg: {
      fontSize: tokens.fontSize.md,
    },
    iconText: {
      fontSize: 16,
    },
  });
