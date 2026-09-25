import { StyleSheet } from 'react-native';
import { ThemeTokens } from '../../../theme/tokens';

export const createGlucoseChartStyles = (tokens: ThemeTokens) =>
  StyleSheet.create({
    container: {
      marginVertical: 6,
      backgroundColor: tokens.colors.surfaceSubtle,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    targetZoneLabel: {
      fontSize: tokens.fontSize.xs,
      fontWeight: '700',
      color: tokens.colors.primaryDark,
    },
    rangeText: {
      fontSize: 10,
      fontWeight: '700',
      color: tokens.colors.textMuted,
    },
    chartArea: {
      height: 90,
      justifyContent: 'center',
      position: 'relative',
    },
    corridorBackground: {
      position: 'absolute',
      top: 15,
      bottom: 15,
      left: 0,
      right: 0,
      backgroundColor: tokens.colors.primarySubtle,
      borderRadius: tokens.radius.sm,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: tokens.colors.accentMint,
      borderStyle: 'dashed',
    },
    corridorTag: {
      position: 'absolute',
      right: 6,
      top: 4,
      fontSize: 9,
      fontWeight: '800',
      color: tokens.colors.primaryDark,
    },
    barsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: '100%',
      paddingHorizontal: 8,
      paddingTop: 10,
      zIndex: 2,
    },
    pointColumn: {
      alignItems: 'center',
      flex: 1,
    },
    barWrapper: {
      height: 60,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    },
    bar: {
      width: 14,
      borderRadius: 7,
      backgroundColor: tokens.colors.primary,
    },
    spikeBar: {
      backgroundColor: tokens.colors.warning,
    },
    currentBar: {
      backgroundColor: tokens.colors.primaryDark,
      borderWidth: 2,
      borderColor: tokens.colors.accentMint,
    },
    pointValueText: {
      fontSize: 9,
      fontWeight: '800',
      color: tokens.colors.textPrimary,
      marginBottom: 3,
    },
    timeLabelText: {
      fontSize: 9,
      fontWeight: '600',
      color: tokens.colors.textMuted,
      marginTop: 6,
    },
    currentTimeText: {
      color: tokens.colors.primaryDark,
      fontWeight: '800',
    },
  });
