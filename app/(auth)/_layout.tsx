import { useTheme } from "@/src/theme/ThemeContext";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: tokens.colors.background,
          // paddingTop: insets.top,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 16, // Globally clears bottom navigation buttons/gestures for all auth screens
        },
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
