import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createBadgeStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: tokens.radius.full,
      alignSelf: 'flex-start',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 5,
    },
    label: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },
    // Variants
    variant_target: {
      backgroundColor: tokens.colors.primarySubtle,
    },
    variant_target_text: {
      color: tokens.colors.primaryDark,
    },
    variant_target_dot: {
      backgroundColor: tokens.colors.primary,
    },
    variant_attention: {
      backgroundColor: tokens.colors.warningSubtle,
    },
    variant_attention_text: {
      color: tokens.colors.warning,
    },
    variant_attention_dot: {
      backgroundColor: tokens.colors.warning,
    },
    variant_purple: {
      backgroundColor: tokens.colors.purpleSubtle,
    },
    variant_purple_text: {
      color: tokens.colors.purple,
    },
    variant_purple_dot: {
      backgroundColor: tokens.colors.purple,
    },
    variant_neutral: {
      backgroundColor: tokens.colors.surfaceSubtle,
    },
    variant_neutral_text: {
      color: tokens.colors.textSecondary,
    },
    variant_neutral_dot: {
      backgroundColor: tokens.colors.textMuted,
    },
  });
