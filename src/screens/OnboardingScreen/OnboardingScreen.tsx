import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { useTheme } from "../../theme/ThemeContext";
import { createOnboardingStyles } from "./OnboardingScreen.styles";

export interface OnboardingScreenProps {
  onComplete: () => void;
  onLoginPress: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onLoginPress,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createOnboardingStyles(tokens), [tokens]);

  const [slide, setSlide] = useState(0);

  const slides = [
    {
      badge: "FDA & CE APPROVED CGM",
      title: "Precision Continuous Glucose Monitoring",
      subtitle:
        "Stream real-time interstitial glucose fluctuations with sub-minute bio-telemetry algorithms.",
      icon: "📡",
      highlight: "92% Time In Target",
    },
    {
      badge: "CLINICAL PROTOCOLS",
      title: "Multidisciplinary Physician Care",
      subtitle:
        "Daily consultations and meal review by senior diabetologists, clinical dietitians, and metabolic coaches.",
      icon: "🩺",
      highlight: "Direct Video Consults",
    },
    {
      badge: "METABOLIC ACCELERATION",
      title: "Sustainably Reverse Type 2 Diabetes",
      subtitle:
        "Target HbA1c below 5.7%, eliminate high-dose pharmacology, and regain peak biological vitality.",
      icon: "⚡",
      highlight: "Average HbA1c drop of 1.4%",
    },
  ];

  const current = slides[slide];

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.brand}>METABOLIX</Text>
        <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7}>
          <Text style={styles.skipBtn}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <View style={styles.slideCard}>
        <View style={styles.iconCircle}>
          <Text style={styles.emoji}>{current.icon}</Text>
        </View>

        <Badge label={current.badge} variant="target" style={styles.badge} />
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>

        <View style={styles.highlightPill}>
          <Text style={styles.highlightText}>✓ {current.highlight}</Text>
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, slide === i && styles.activeDot]} />
        ))}
      </View>

      {/* Footer Controls */}
      <View style={styles.footer}>
        {slide < slides.length - 1 ? (
          <Button
            label="Next"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => setSlide(slide + 1)}
          />
        ) : (
          <Button
            label="Start Metabolic Evaluation"
            variant="primary"
            size="lg"
            fullWidth
            onPress={onComplete}
          />
        )}
      </View>
    </View>
  );
};
