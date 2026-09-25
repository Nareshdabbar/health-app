import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { OtpField } from "../../components/atoms/OtpField/OtpField";
import { useTheme } from "../../theme/ThemeContext";
import { createOtpVerifyStyles } from "./OtpVerifyScreen.styles";

export interface OtpVerifyScreenProps {
  phoneNumber: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const OtpVerifyScreen: React.FC<OtpVerifyScreenProps> = ({
  phoneNumber,
  onVerifySuccess,
  onBack,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createOtpVerifyStyles(tokens), [tokens]);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(45);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length < 4) {
      setError("Please enter all 4 digits");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      onVerifySuccess();
    }, 500);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(45);
    setOtp("");
    setError("");
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
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>← Edit Number</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>📲</Text>
            </View>
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              Code sent via SMS to{" "}
              <Text style={styles.boldPhone}>{phoneNumber}</Text>
            </Text>
          </View>

          <Card variant="elevated" style={styles.card}>
            <Text style={styles.prompt}>Enter 4-digit security code:</Text>

            <OtpField
              length={4}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                if (error) setError("");
              }}
              isError={!!error}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.demoTip}
              onPress={() => setOtp("1234")}
              activeOpacity={0.7}
            >
              <Text style={styles.demoTipText}>
                💡 Demo code: <Text style={{ fontWeight: "800" }}>1234</Text>{" "}
                (Tap to auto-fill)
              </Text>
            </TouchableOpacity>

            <Button
              label={loading ? "Authenticating..." : "Verify & Continue"}
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleVerify}
              loading={loading}
            />

            <View style={styles.resendRow}>
              {countdown > 0 ? (
                <Text style={styles.timerText}>
                  Resend code in {countdown}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <Text style={styles.resendBtn}>Resend Verification Code</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
