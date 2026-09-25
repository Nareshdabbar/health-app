import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createAvatarStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    image: {
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.colors.surfaceSubtle,
    },
    size_sm: {
      width: 32,
      height: 32,
    },
    size_md: {
      width: 44,
      height: 44,
    },
    size_lg: {
      width: 56,
      height: 56,
    },
    size_xl: {
      width: 72,
      height: 72,
    },
    onlineDot: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: tokens.colors.primary,
      borderWidth: 2,
      borderColor: tokens.colors.surface,
    },
  });
