// src/screens/HomeScreen/HomeScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [selectedLogType, setSelectedLogType] = useState<string | null>(null);

  // Subtle pulse animation for the Quick Action Toolbar
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

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

  const handleOpenLogModal = (type?: string) => {
    setSelectedLogType(type || null);
    setIsLogModalVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top greeting & status */}
        <View style={styles.topStatus}>
          <View>
            <Text style={styles.greeting}>Good morning, Rajesh</Text>
            <Text style={styles.clinicalStatus}>Metabolic Control Phase</Text>
          </View>
          <Badge label="OPTIMAL" variant="target" withDot={true} />
        </View>

        {/* NFC Success Toast */}
        {nfcSuccessMsg && (
          <View style={styles.toast}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={tokens.colors.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.toastText}>{nfcSuccessMsg}</Text>
          </View>
        )}

        {/* Quick Log Toolbar Card */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Card variant="elevated" style={styles.quickLogCard}>
            <View style={styles.quickLogHeader}>
              <View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Text style={styles.quickLogTitle}>Quick Data Logging</Text>
                  <View style={styles.liveDot} />
                </View>
                <Text style={styles.quickLogSubtitle}>
                  Tap a metric to log instantly
                </Text>
              </View>
              <TouchableOpacity
                style={styles.expandMenuBtn}
                onPress={() => handleOpenLogModal()}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="flash-outline"
                  size={14}
                  color={tokens.colors.primary}
                />
                <Text style={styles.expandMenuText}>Open Hub</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.logActionsRow}>
              {["meal", "glucose", "insulin", "workout"].map((type) => {
                const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
                  meal: "restaurant-outline",
                  glucose: "water-outline",
                  insulin: "medical-outline",
                  workout: "fitness-outline",
                };
                return (
                  <TouchableOpacity
                    key={type}
                    style={styles.logActionItem}
                    onPress={() => handleOpenLogModal(type)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.logIconCircle,
                        { backgroundColor: tokens.colors.primarySubtle },
                      ]}
                    >
                      <Ionicons
                        name={icons[type]}
                        size={18}
                        color={tokens.colors.primary}
                      />
                    </View>
                    <Text style={styles.logActionLabel}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        </Animated.View>

        {/* 1. Continuous Interstitial Glucose (CGM) Card */}
        <Card variant="elevated" style={styles.cgmCard}>
          <View style={styles.cgmHeader}>
            <View style={styles.cgmTagRow}>
              <View style={styles.liveDot} />
              <Text style={styles.cgmTagText}>LIVE CGM TELEMETRY</Text>
            </View>
            <Text style={styles.timeAgo}>Updated live</Text>
          </View>

          <View style={styles.readingRow}>
            <Text style={styles.glucoseNumber}>{glucoseValue}</Text>
            <View style={styles.glucoseMeta}>
              <Text style={styles.unitText}>mg/dL</Text>
              <View style={styles.trendRow}>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={tokens.colors.primary}
                />
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
              <Ionicons
                name="radio-outline"
                size={14}
                color={tokens.colors.white}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.nfcBtnText}>
                {nfcScanning ? "Scanning..." : "Scan Sensor"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 2. Active Clinical Program Card */}
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
                  Phase 2: Glycemic Control • Day 42 of 90
                </Text>
              </View>
              <View
                style={[
                  styles.iconButtonCircle,
                  { backgroundColor: tokens.colors.primarySubtle },
                ]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={tokens.colors.primary}
                />
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        {/* 3. Three-Column Biomarker Bento */}
        <View style={styles.bentoGrid}>
          <View style={styles.bentoItem}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabel}>ACTIVE BURN</Text>
              <Ionicons
                name="flame-outline"
                size={14}
                color={tokens.colors.primary}
              />
            </View>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {biomarkers?.burnCalories || 480}
              </Text>
              <Text style={styles.bentoUnit}>kcal</Text>
            </View>
            <Text style={styles.bentoSub}>Target: 800</Text>
          </View>

          <View style={styles.bentoItem}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabel}>STEPS TODAY</Text>
              <Ionicons
                name="footsteps-outline"
                size={14}
                color={tokens.colors.primary}
              />
            </View>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {(biomarkers?.steps || 7420).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.bentoSub}>Goal: 10,000</Text>
          </View>

          <View style={styles.bentoItem}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabel}>RECOVERY</Text>
              <Ionicons
                name="moon-outline"
                size={14}
                color={tokens.colors.primary}
              />
            </View>
            <View style={styles.bentoMain}>
              <Text style={styles.bentoNumber}>
                {biomarkers?.sleepHours || 7}h
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
            <Badge label="NOTE" variant="target" />
          </View>

          <Text style={styles.docQuote}>
            "Excellent post-lunch glucose regulation at 108 mg/dL. Before
            dinner, complete 15 min of brisk walking."
          </Text>

          <View style={styles.docFooter}>
            <Button
              label="Join Video Consultation (4:30 PM)"
              variant="primary"
              size="sm"
              onPress={() => router.push("/(routes)/consult" as any)}
              leftIconName="video"
            />
          </View>
        </Card>

        {/* 5. Daily Metabolic Habits Protocol */}
        <View style={styles.habitsSection}>
          <View style={styles.habitsHeader}>
            <Text style={styles.sectionTitle}>Daily Protocols</Text>
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
                {item.completed && (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                )}
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
          console.log(
            "Selected logging category:",
            categoryId,
            selectedLogType,
          );
          setIsLogModalVisible(false);
        }}
      />
    </View>
  );
};
