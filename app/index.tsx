// E:\app\app\index.tsx
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, isLoading: authLoading } = useAuth();
  const { tokens } = useTheme();

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    AsyncStorage.getItem("@has_completed_onboarding")
      .then((value) => {
        setHasCompletedOnboarding(value === "true");
      })
      .catch(() => {
        setHasCompletedOnboarding(false);
      });
  }, []);

  if (authLoading || hasCompletedOnboarding === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: tokens.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={tokens.colors.primary} />
      </View>
    );
  }

  // 1. If user is logged in, go straight to home tabs
  if (user) {
    return <Redirect href={"/(tabs)/home" as Href} />;
  }

  // 2. If onboarding was already completed before (e.g. user logged out), skip splash & onboarding and go STRAIGHT to login!
  if (hasCompletedOnboarding) {
    return <Redirect href={"/(auth)/login" as Href} />;
  }

  // 3. Brand new installation: show custom splash screen first, which leads to onboarding
  return <Redirect href={"/(auth)/splash" as Href} />;
}
