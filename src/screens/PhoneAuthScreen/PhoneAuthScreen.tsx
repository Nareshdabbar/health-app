import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { useTheme } from "../../theme/ThemeContext";
import { createPhoneAuthStyles } from "./PhoneAuthScreen.styles";

export interface PhoneAuthScreenProps {
  onSendOtp: (phoneNumber: string) => void;
  onBack: () => void;
}

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({
  onSendOtp,
  onBack,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createPhoneAuthStyles(tokens), [tokens]);

  const [phone, setPhone] = useState("9876543210");
  const [countryCode] = useState("+91");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!phone || phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendOtp(`${countryCode} ${phone}`);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: tokens.colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔐</Text>
            </View>
            <Text style={styles.title}>Clinical Access Portal</Text>
            <Text style={styles.subtitle}>
              Enter your mobile number to receive a secure 4-digit verification
              code.
            </Text>
          </View>

          <Card variant="elevated" style={styles.formCard}>
            <Text style={styles.inputLabel}>Mobile Phone Number</Text>
            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
              </View>
              <TextInput
                style={styles.textInput}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholder="98765 43210"
                placeholderTextColor={tokens.colors.textMuted}
                maxLength={10}
              />
            </View>

            <Text style={styles.helperText}>
              Demo credentials pre-filled. Tap Get Verification OTP.
            </Text>

            <Button
              label={loading ? "Generating OTP..." : "Get Verification OTP"}
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleSubmit}
              loading={loading}
            />
          </Card>

          <View style={styles.securityBadge}>
            <Text style={styles.securityText}>
              🔒 256-Bit HIPAA & ABDM Compliant Health Data Encryption
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
