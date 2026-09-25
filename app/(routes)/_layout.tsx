// E:\app\app\(routes)\_layout.tsx
import { useTheme } from "@/src/theme/ThemeContext";
import { Stack } from "expo-router";

export default function RoutesLayout() {
  const { tokens } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Set to true if you want a native header back button
        contentStyle: {
          backgroundColor: tokens.colors.background,
        },
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="consult" />
      <Stack.Screen name="programs" />
    </Stack>
  );
}
