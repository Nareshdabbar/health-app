import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createOtpFieldStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: tokens.spacing.md,
      marginVertical: tokens.spacing.lg,
    },
    input: {
      width: 62,
      height: 66,
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.colors.surface,
      borderWidth: 2,
      borderColor: tokens.colors.borderStrong,
      fontSize: 26,
      fontWeight: '800',
      color: tokens.colors.textPrimary,
      textAlign: 'center',
    },
    inputFocused: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primarySubtle,
    },
    inputFilled: {
      borderColor: tokens.colors.textPrimary,
    },
    inputError: {
      borderColor: tokens.colors.error,
      backgroundColor: tokens.colors.errorSubtle,
    },
  });
