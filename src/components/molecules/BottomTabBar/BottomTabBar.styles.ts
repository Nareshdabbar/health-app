import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createBottomTabBarStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: tokens.colors.surface,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
      paddingVertical: 8,
      paddingHorizontal: 12,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
    },
    tabIcon: {
      fontSize: 20,
      marginBottom: 3,
    },
    tabLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: tokens.colors.textMuted,
    },
    tabLabelActive: {
      color: tokens.colors.primary,
      fontWeight: '800',
    },
    quickLogWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    quickLogButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: tokens.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 5,
    },
    quickLogIcon: {
      fontSize: 24,
      color: '#003730',
      fontWeight: '900',
    },
  });
