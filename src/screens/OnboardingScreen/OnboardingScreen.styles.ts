import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../theme/tokens';

export const createOnboardingStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
      justifyContent: 'space-between',
      padding: tokens.spacing.xl,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: tokens.spacing.sm,
    },
    brand: {
      fontSize: tokens.fontSize.lg,
      fontWeight: '900',
      color: tokens.colors.primaryDark,
      letterSpacing: 2,
    },
    skipBtn: {
      fontSize: tokens.fontSize.base,
      fontWeight: '700',
      color: tokens.colors.textPrimary,
    },
    slideCard: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: tokens.spacing.lg,
      flex: 1,
    },
    iconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: tokens.colors.primarySubtle,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: tokens.spacing.xl,
      shadowColor: tokens.colors.primary,
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 3,
    },
    emoji: {
      fontSize: 44,
    },
    badge: {
      marginBottom: tokens.spacing.md,
    },
    title: {
      fontSize: tokens.fontSize.xxl,
      fontWeight: '800',
      color: tokens.colors.textPrimary,
      textAlign: 'center',
      lineHeight: 30,
      marginBottom: tokens.spacing.md,
    },
    subtitle: {
      fontSize: tokens.fontSize.base,
      color: tokens.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: tokens.spacing.xl,
    },
    highlightPill: {
      backgroundColor: tokens.colors.primarySubtle,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: tokens.radius.full,
      borderWidth: 1,
      borderColor: tokens.colors.accentMint,
    },
    highlightText: {
      fontSize: tokens.fontSize.xs,
      fontWeight: '800',
      color: tokens.colors.primaryDark,
    },
    dotsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginVertical: tokens.spacing.xl,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: tokens.colors.borderStrong,
    },
    activeDot: {
      width: 28,
      backgroundColor: tokens.colors.primary,
    },
    footer: {
      paddingBottom: tokens.spacing.lg,
    },
  });
