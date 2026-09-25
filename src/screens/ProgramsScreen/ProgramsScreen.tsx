import React, { useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { useTheme } from "../../theme/ThemeContext";
import { ClinicalProgram } from "../../types/fitness";
import { createProgramsStyles } from "./ProgramsScreen.styles";

const CLINICAL_PROGRAMS: ClinicalProgram[] = [
  {
    id: "prog_1",
    title: "Metabolic Health Care Program",
    description:
      "Holistic cellular metabolic optimization with proactive bio-marker monitoring and dedicated lifestyle counseling.",
    duration: "6 MONTHS",
    badge: "METABOLIC ACCELERATION",
    rating: 4.9,
    reviewsCount: 1200,
    monthlyPrice: 1899,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    category: "metabolism",
    features: [
      "2x Next-Gen Continuous CGM Sensors",
      "Dedicated Precision Fitness & Mobility Coach",
      "At-home HbA1c & Lipid Metabolic testing kit",
    ],
  },
  {
    id: "prog_2",
    title: "Strength & Functional Mobility",
    description:
      "Targeted muscle-mass building to expand physiological glucose sinks and reverse peripheral insulin resistance.",
    duration: "12 WEEKS",
    badge: "INSULIN RECEPTOR FOCUS",
    rating: 4.8,
    reviewsCount: 840,
    monthlyPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    category: "metabolism",
    features: [
      "Physiotherapist-led corrective biomechanics",
      "Postprandial glucose uptake workout scheduling",
      "Posture correction & skeletal alignment diagnostics",
    ],
  },
  {
    id: "prog_3",
    title: "Clinical Diabetes Remission",
    description:
      "Physician-supervised glycemic normalization targeting complete elimination of sulfonylureas and reduction in insulin dosage.",
    duration: "12 MONTHS",
    badge: "HBA1C < 5.7% TARGET",
    rating: 4.95,
    reviewsCount: 2310,
    monthlyPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
    category: "diabetes",
    features: [
      "Weekly 1-on-1 Diabetologist Video Consultations",
      "Bi-weekly Microbiome & Ketone Analysis",
      "Personalized Low-Glycemic Index Meal Plans",
    ],
  },
];

export const ProgramsScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createProgramsStyles(tokens), [tokens]);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Protocols" },
    { id: "metabolism", label: "Metabolism" },
    { id: "diabetes", label: "Diabetes Reversal" },
  ];

  const filteredPrograms = CLINICAL_PROGRAMS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Clinical Care Protocols</Text>
          <Text style={styles.sub}>
            Supervised by Diabetologists, Nutritionists & Physiologists
          </Text>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.pill,
                activeCategory === cat.id && styles.activePill,
              ]}
              onPress={() => setActiveCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pillText,
                  activeCategory === cat.id && styles.activePillText,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Programs List */}
        <View style={styles.programsList}>
          {filteredPrograms.map((prog) => (
            <Card key={prog.id} variant="elevated" style={styles.programCard}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.progTitle}>{prog.title}</Text>
                  <Text style={styles.progSub}>{prog.duration}</Text>
                </View>
                {prog.badge && <Badge label={prog.badge} variant="target" />}
              </View>

              <Text style={styles.progDesc}>{prog.description}</Text>

              {/* Protocol Features List */}
              {prog.features && prog.features.length > 0 && (
                <View style={styles.featuresBox}>
                  {prog.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Protocol Metrics Bento */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>RATING</Text>
                  <Text style={styles.statVal}>
                    ★ {prog.rating} ({prog.reviewsCount})
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>DURATION</Text>
                  <Text
                    style={[
                      styles.statVal,
                      { color: tokens.colors.primaryDark },
                    ]}
                  >
                    {prog.duration}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>PROTOCOL</Text>
                  <Text style={styles.statVal}>Clinical</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.priceLabel}>
                    All-inclusive subscription
                  </Text>
                  <Text style={styles.priceText}>
                    ₹{prog.monthlyPrice?.toLocaleString()}/mo
                  </Text>
                </View>
                <Button
                  label="Enroll with Care Team"
                  variant="primary"
                  size="sm"
                  onPress={() =>
                    Alert.alert(
                      "Program Enrollment",
                      `Successfully enrolled in ${prog.title}`,
                    )
                  }
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
