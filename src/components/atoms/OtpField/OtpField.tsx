import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createOtpFieldStyles } from './OtpField.styles';

export interface OtpFieldProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  isError?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const OtpField: React.FC<OtpFieldProps> = ({
  length = 4,
  value,
  onChange,
  isError = false,
  style,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createOtpFieldStyles(tokens), [tokens]);
  const inputs = useRef<Array<any>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (!cleaned) return;

    const newOtp = value.split('');
    newOtp[index] = cleaned[cleaned.length - 1];
    const joined = newOtp.join('').slice(0, length);
    onChange(joined);

    if (index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<any>, index: number) => {
    if (e.nativeEvent?.key === 'Backspace') {
      const newOtp = value.split('');
      if (newOtp[index]) {
        newOtp[index] = '';
        onChange(newOtp.join(''));
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {digits.map((digit, index) => {
        const isFocused = focusedIndex === index;
        return (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              isError && styles.inputError,
              digit ? styles.inputFilled : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            textAlign="center"
          />
        );
      })}
    </View>
  );
};
