import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../theme/tokens';

export const createSplashScreenStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: tokens.spacing.xxl,
      paddingHorizontal: tokens.spacing.lg,
    },
    topArea: {
      alignItems: 'center',
      marginTop: 20,
    },
    regulatoryBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: tokens.colors.surfaceSubtle,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: tokens.radius.full,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      gap: 6,
    },
    regDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: tokens.colors.accentMint,
    },
    regulatoryText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    centerArea: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    logoBox: {
      width: 108,
      height: 108,
      borderRadius: 28,
      backgroundColor: tokens.colors.primarySubtle,
      borderWidth: 2,
      borderColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: tokens.spacing.lg,
      shadowColor: tokens.colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 6,
    },
    logoEmoji: {
      fontSize: 48,
    },
    appName: {
      fontSize: 32,
      fontWeight: '900',
      letterSpacing: 3,
      color: tokens.colors.primaryDark,
      marginBottom: tokens.spacing.xs,
    },
    tagline: {
      fontSize: tokens.fontSize.md,
      fontWeight: '600',
      color: tokens.colors.textPrimary,
      textAlign: 'center',
      marginBottom: tokens.spacing.xs,
    },
    subtagline: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.textSecondary,
      textAlign: 'center',
      maxWidth: 280,
      lineHeight: 20,
    },
    bottomArea: {
      width: '100%',
      alignItems: 'center',
      gap: tokens.spacing.md,
    },
    progressTrack: {
      width: 160,
      height: 4,
      borderRadius: 2,
      backgroundColor: tokens.colors.border,
      overflow: 'hidden',
    },
    progressBar: {
      width: '75%',
      height: '100%',
      borderRadius: 2,
      backgroundColor: tokens.colors.primary,
    },
    statusText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.textSecondary,
      fontWeight: '600',
    },
    skipButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    skipText: {
      fontSize: tokens.fontSize.sm,
      fontWeight: '700',
      color: tokens.colors.primary,
    },
  });
