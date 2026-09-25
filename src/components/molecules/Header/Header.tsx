// E:\app\src\components\molecules\Header\Header.tsx
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeContext";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { createHeaderStyles } from "./Header.styles";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onSearchPress,
  onNotificationPress,
}) => {
  const { tokens, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createHeaderStyles(tokens), [tokens]);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Handle profile / avatar press internally
  const handleProfilePress = () => {
    router.push("/(routes)/profile" as Href);
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.leftCol}
        onPress={handleProfilePress}
        activeOpacity={0.7}
      >
        <Avatar
          uri="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
          size="sm"
          withOnlineDot={true}
        />
        <View style={styles.titleGroup}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.actionsGroup}>
        {/* Dark Mode Toggle Icon */}
        <IconButton
          icon={
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={20}
              color={tokens.colors.textPrimary}
            />
          }
          onPress={toggleTheme}
          ariaLabel="Toggle theme"
        />

        {/* Search Icon */}
        {onSearchPress && (
          <IconButton
            icon={
              <Ionicons
                name="search-outline"
                size={20}
                color={tokens.colors.textPrimary}
              />
            }
            onPress={onSearchPress}
            ariaLabel="Search"
          />
        )}

        {/* Notifications Icon */}
        {onNotificationPress && (
          <IconButton
            icon={
              <Ionicons
                name="notifications-outline"
                size={20}
                color={tokens.colors.textPrimary}
              />
            }
            onPress={onNotificationPress}
            ariaLabel="Notifications"
          />
        )}
      </View>
    </View>
  );
};
