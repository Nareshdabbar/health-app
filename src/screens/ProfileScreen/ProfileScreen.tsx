// E:\app\app\(routes)/profile.tsx
import { Button } from "@/src/components/atoms/Button/Button";
import { useAuth } from "@/src/context/AuthContext";
import { createProfileStyles } from "@/src/screens/ProfileScreen/ProfileScreen.styles";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { tokens } = useTheme();
  const router = useRouter();

  // Memoize styles using theme tokens
  const styles = useMemo(() => createProfileStyles(tokens), [tokens]);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login" as Href);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tokens.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Profile Card / Identity */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.border,
          },
        ]}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: tokens.colors.textPrimary }]}>
            Rajesh Kumar
          </Text>
          <Text
            style={[styles.userMeta, { color: tokens.colors.textSecondary }]}
          >
            {user?.phone || "+91 98765 43210"}
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: tokens.colors.surfaceSubtle },
            ]}
          >
            <Text style={[styles.badgeText, { color: tokens.colors.primary }]}>
              Acceleration Phase • Day 42
            </Text>
          </View>
        </View>
      </View>

      {/* Biometric & Health Parameters Section */}
      <Text style={[styles.sectionTitle, { color: tokens.colors.textPrimary }]}>
        Health Metrics
      </Text>
      <View
        style={[
          styles.metricsGrid,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.border,
          },
        ]}
      >
        <View style={styles.metricItem}>
          <Text
            style={[styles.metricLabel, { color: tokens.colors.textSecondary }]}
          >
            Weight
          </Text>
          <Text
            style={[styles.metricValue, { color: tokens.colors.textPrimary }]}
          >
            74.5 <Text style={styles.metricUnit}>kg</Text>
          </Text>
        </View>
        <View
          style={[
            styles.metricDivider,
            { backgroundColor: tokens.colors.border },
          ]}
        />
        <View style={styles.metricItem}>
          <Text
            style={[styles.metricLabel, { color: tokens.colors.textSecondary }]}
          >
            Height
          </Text>
          <Text
            style={[styles.metricValue, { color: tokens.colors.textPrimary }]}
          >
            178 <Text style={styles.metricUnit}>cm</Text>
          </Text>
        </View>
        <View
          style={[
            styles.metricDivider,
            { backgroundColor: tokens.colors.border },
          ]}
        />
        <View style={styles.metricItem}>
          <Text
            style={[styles.metricLabel, { color: tokens.colors.textSecondary }]}
          >
            Blood Group
          </Text>
          <Text
            style={[styles.metricValue, { color: tokens.colors.textPrimary }]}
          >
            O+
          </Text>
        </View>
      </View>

      {/* Settings / Menu Options */}
      <Text style={[styles.sectionTitle, { color: tokens.colors.textPrimary }]}>
        Preferences & Care
      </Text>
      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.border,
          },
        ]}
      >
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="fitness-outline"
            size={20}
            color={tokens.colors.primary}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, { color: tokens.colors.textPrimary }]}>
            Connected CGM & Devices
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={tokens.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color={tokens.colors.primary}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, { color: tokens.colors.textPrimary }]}>
            Clinical Reports & Lab Tests
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={tokens.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={tokens.colors.primary}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, { color: tokens.colors.textPrimary }]}>
            Reminders & Glucose Alerts
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={tokens.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={tokens.colors.primary}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, { color: tokens.colors.textPrimary }]}>
            Privacy & Data Sharing
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={tokens.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Logout Action Footer */}
      <View style={styles.logoutSection}>
        <Button
          label="Log Out of Portal"
          variant="primary"
          fullWidth
          onPress={handleLogout}
        />
        <Text
          style={[styles.versionText, { color: tokens.colors.textSecondary }]}
        >
          Metabolic Portal v1.0.4 (Build 142)
        </Text>
      </View>
    </ScrollView>
  );
}
