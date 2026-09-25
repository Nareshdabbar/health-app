// src/screens/HomeScreen/HomeScreen.tsx
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "../../components/atoms/Avatar/Avatar";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { GlucoseChart } from "../../components/molecules/GlucoseChart/GlucoseChart";
import { LogModal } from "../../components/organisms/LogModal/LogModal";
import {
  useBiomarkers,
  useHabits,
  useScanSensor,
  useToggleHabit,
} from "../../hooks/useFitnessData";
import { useTheme } from "../../theme/ThemeContext";
import { createHomeScreenStyles } from "./HomeScreen.styles";

export const HomeScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createHomeScreenStyles(tokens), [tokens]);

  const [nfcScanning, setNfcScanning] = useState(false);
  const [nfcSuccessMsg, setNfcSuccessMsg] = useState<string | null>(null);
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);

  const { data: biomarkers } = useBiomarkers();
  const { data: habits = [] } = useHabits();
  const toggleMutation = useToggleHabit();
  const scanMutation = useScanSensor();

  const glucoseValue = biomarkers?.currentGlucose || 108;
  const tir = biomarkers?.timeInRangePercent || 92;

  const handleNfcScan = async () => {
    if (nfcScanning) return;
    setNfcScanning(true);
    try {
      await scanMutation.mutateAsync(glucoseValue);
      setNfcSuccessMsg(
        "✓ Synced with CGM bio-sensor: 108 mg/dL (Interstitial)",
      );
      setTimeout(() => setNfcSuccessMsg(null), 3000);
    } finally {
      setNfcScanning(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top greeting / status banner with Quick Log Action Button */}
        <View style={styles.topStatus}>
          <View>
            <Text style={styles.greeting}>Good morning, Rajesh</Text>
            <Text style={styles.clinicalStatus}>Metabolic Phase Active</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Badge label="OPTIMAL" variant="target" withDot={true} />
            <TouchableOpacity
              style={{
                backgroundColor: tokens.colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}
              onPress={() => setIsLogModalVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
                + Log
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* NFC Success Toast */}
        {nfcSuccessMsg && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{nfcSuccessMsg}</Text>
          </View>
        )}

        {/* 1. Programs Navigation Banner Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(routes)/programs" as any)}
        >
          <Card
            variant="elevated"
            style={[
              styles.cgmCard,
              { backgroundColor: tokens.colors.surfaceSubtle },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Badge
                  label="ACTIVE PROGRAM"
                  variant="target"
                  style={{ alignSelf: "flex-start", marginBottom: 6 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: tokens.colors.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  90-Day Metabolic Reversal Track
                </Text>
                <Text
                  style={{ fontSize: 13, color: tokens.colors.textSecondary }}
                >
                  Phase 2: Acceleration & Glycemic Control • Day 42 of 90
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: tokens.colors.primary,
                  fontWeight: "bold",
                }}
              >
                →
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* 2. Continuous Interstitial Glucose (CGM) Card */}
        <Card variant="elevated" style={styles.cgmCard}>
          <View style={styles.cgmHeader}>
            <View style={styles.cgmTagRow}>
              <View style={styles.liveDot} />
              <Text style={styles.cgmTagText}>LIVE CGM BIO-STREAM</Text>
            </View>
            <Text style={styles.timeAgo}>Synced just now</Text>
          </View>

          <View style={styles.readingRow}>
            <Text style={styles.glucoseNumber}>{glucoseValue}</Text>
            <View style={styles.glucoseMeta}>
              <Text style={styles.unitText}>mg/dL</Text>
              <View style={styles.trendRow}>
                <Text style={styles.trendArrow}>→</Text>
                <Text style={styles.trendLabel}>STABLE</Text>
              </View>
            </View>
          </View>

          <GlucoseChart currentValue={glucoseValue} />

          <View style={styles.cgmFooter}>
            <View style={styles.tirBox}>
              <Text style={styles.tirLabel}>Time in Range (70-140):</Text>
              <Text style={styles.tirValue}>{tir}%</Text>
            </View>

            <TouchableOpacity
              style={styles.nfcButton}
              onPress={handleNfcScan}
              activeOpacity={0.8}
              disabled={nfcScanning}
            >
              <Text style={styles.nfcBtnText}>
                {nfcScanning ? "Scanning..." : "📡 Scan CGM"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 3. Three-Column Biomarker Bento */}
        <View style={styles.bentoGrid}>
          <View style={styles.bentoItem}>
            <Text style={styles.bentoLabel}>ACTIVE BURN</Text>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {biomarkers?.burnCalories || 480}
              </Text>
              <Text style={styles.bentoUnit}>kcal</Text>
            </View>
            <Text style={styles.bentoSub}>Target: 800</Text>
          </View>

          <View style={styles.bentoItem}>
            <Text style={styles.bentoLabel}>STEPS TODAY</Text>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {(biomarkers?.steps || 7420).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.bentoSub}>Goal: 10,000</Text>
          </View>

          <View style={styles.bentoItem}>
            <Text style={styles.bentoLabel}>SLEEP RECOVERY</Text>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {biomarkers?.sleepHours || 7}h {biomarkers?.sleepMinutes || 25}m
              </Text>
            </View>
            <Text style={styles.bentoSub}>
              Score: {biomarkers?.sleepScore || 84}%
            </Text>
          </View>
        </View>

        {/* 4. Physician Clinical Recommendation */}
        <Card variant="obsidian" style={styles.docCard}>
          <View style={styles.docHeader}>
            <Avatar
              uri="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"
              size="md"
              withOnlineDot={true}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.docName}>Dr. Sneha Roy, MD</Text>
              <Text style={styles.docTitle}>
                Lead Metabolic Endocrinologist
              </Text>
            </View>
            <Badge label="TODAY'S NOTE" variant="target" />
          </View>

          <Text style={styles.docQuote}>
            "Excellent post-lunch glucose regulation at 108 mg/dL. Before
            dinner, complete 15 min of Zone-2 brisk walking to clear hepatic
            glycogen."
          </Text>

          <View style={styles.docFooter}>
            <Button
              label="Join Video Room (4:30 PM)"
              variant="primary"
              size="sm"
              onPress={() => router.push("/(routes)/consult" as any)}
              leftIconName="🎥"
            />
          </View>
        </Card>

        {/* 5. Daily Metabolic Protocol (Habits) */}
        <View style={styles.habitsSection}>
          <View style={styles.habitsHeader}>
            <Text style={styles.sectionTitle}>Daily Metabolic Habits</Text>
            <Text style={styles.sectionCount}>
              {habits.filter((h) => h.completed).length}/{habits.length || 3}{" "}
              Done
            </Text>
          </View>

          {habits.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.habitRow,
                item.completed && styles.habitCompletedRow,
              ]}
              onPress={() =>
                toggleMutation.mutate({
                  id: item.id,
                  completed: !item.completed,
                })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxActive,
                ]}
              >
                {item.completed && <Text style={styles.checkMark}>✓</Text>}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.habitTitle,
                    item.completed && styles.habitTitleDone,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.habitMeta}>
                  {item.time} • {item.subtext}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Log Action Modal */}
      <LogModal
        visible={isLogModalVisible}
        onClose={() => setIsLogModalVisible(false)}
        onSelectCategory={(categoryId) => {
          console.log("Selected logging category:", categoryId);
          // Handle specific log category selection navigation if needed
        }}
      />
    </View>
  );
};
