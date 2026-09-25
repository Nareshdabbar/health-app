import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createIconButtonStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 18,
    },
  });
