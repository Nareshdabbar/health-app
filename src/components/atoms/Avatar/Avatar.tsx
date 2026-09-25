import React, { useMemo } from 'react';
import { View, Image, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createAvatarStyles } from './Avatar.styles';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  uri: string;
  size?: AvatarSize;
  withOnlineDot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 'md',
  withOnlineDot = false,
  style,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createAvatarStyles(tokens), [tokens]);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri }}
        style={[styles.image, styles[`size_${size}`]]}
        resizeMode="cover"
      />
      {withOnlineDot && <View style={styles.onlineDot} />}
    </View>
  );
};
