import React, { useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createBadgeStyles } from './Badge.styles';

export type BadgeVariant = 'target' | 'attention' | 'purple' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  withDot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'target',
  withDot = false,
  style,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createBadgeStyles(tokens), [tokens]);

  return (
    <View style={[styles.base, styles[`variant_${variant}`], style]}>
      {withDot && (
        <View style={[styles.dot, styles[`variant_${variant}_dot`]]} />
      )}
      <Text style={[styles.label, styles[`variant_${variant}_text`]]}>
        {label}
      </Text>
    </View>
  );
};
