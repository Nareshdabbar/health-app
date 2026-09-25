import React, { useEffect, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { createSplashScreenStyles } from "./SplashScreen.styles";

export interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createSplashScreenStyles(tokens), [tokens]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.regulatoryBadge}>
          <View style={styles.regDot} />
          <Text style={styles.regulatoryText}>
            CLINICAL PROTOCOL • ISO 13485
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onFinish}
        style={styles.centerArea}
      >
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🩸</Text>
        </View>

        <Text style={styles.appName}>METABOLIX</Text>
        <Text style={styles.tagline}>Precision Metabolic Architecture</Text>
        <Text style={styles.subtagline}>
          Real-time interstitial glucose telemetry & physician-led diabetes
          reversal
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomArea}>
        <View style={styles.progressTrack}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.statusText}>Initializing Secure Bio-Stream...</Text>

        <TouchableOpacity onPress={onFinish} style={styles.skipButton}>
          <Text style={styles.skipText}>Tap to Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
