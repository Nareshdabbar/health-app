import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Card } from "../../components/atoms/Card/Card";
import { useBiomarkers, useTimeline } from "../../hooks/useFitnessData";
import { useTheme } from "../../theme/ThemeContext";
import { createVitalsStyles } from "./VitalsScreen.styles";

export interface VitalsScreenProps {
  onOpenLogModal?: () => void;
}

export const VitalsScreen: React.FC<VitalsScreenProps> = ({
  onOpenLogModal,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createVitalsStyles(tokens), [tokens]);

  const { data: biomarkers } = useBiomarkers();
  const { data: timeline = [] } = useTimeline();

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Biomarker Telemetry</Text>
          <Text style={styles.subtitle}>
            Continuous Interstitial Glycemic Analytics & Lab Trends
          </Text>
        </View>

        {/* 3 Metrics Bento Grid */}
        <View style={styles.bentoRow}>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>AVG GLUCOSE</Text>
            <Text style={styles.bentoVal}>{biomarkers?.avgGlucose || 112}</Text>
            <Text style={styles.bentoDelta}>mg/dL • Optimal</Text>
          </View>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>TIME IN RANGE</Text>
            <Text style={styles.bentoVal}>
              {biomarkers?.timeInRangePercent || 92}%
            </Text>
            <Text style={styles.bentoDelta}>Target: &gt;70%</Text>
          </View>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>EST. HBA1C</Text>
            <Text style={styles.bentoVal}>
              {biomarkers?.estimatedHbA1c || 5.8}%
            </Text>
            <Text style={styles.bentoDelta}>-0.4% this mo</Text>
          </View>
        </View>

        {/* Chronological Timeline Section */}
        <View style={styles.sectionTitleRow}>
          <View>
            <Text style={styles.sectionTitle}>Metabolic Event Timeline</Text>
            <Text style={styles.sectionSubtitle}>
              Recent spikes, meals, and workouts
            </Text>
          </View>
          {onOpenLogModal && (
            <TouchableOpacity
              style={styles.logButton}
              onPress={onOpenLogModal}
              activeOpacity={0.8}
            >
              <Text style={styles.logBtnText}>+ Log Event</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.timelineList}>
          {timeline.map((item) => (
            <Card key={item.id} variant="elevated" style={styles.logCard}>
              <View style={styles.logTop}>
                <Text style={styles.logTitle}>{item.title}</Text>
                <Text style={styles.logTime}>{item.time}</Text>
              </View>

              <View style={styles.badgeRow}>
                <Badge
                  label={item.badge}
                  variant={
                    item.badgeType === "attention" ? "attention" : "target"
                  }
                />
              </View>

              <Text style={styles.logImpact}>{item.impactText}</Text>

              {item.metrics && item.metrics.length > 0 && (
                <View style={styles.metricTagRow}>
                  {item.metrics.map((m, idx) => (
                    <View key={idx} style={styles.metricTag}>
                      <Text style={styles.metricTagText}>{m}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
