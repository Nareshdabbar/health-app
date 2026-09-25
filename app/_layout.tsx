// E:\app\app\_layout.tsx
import { ScreenContainer } from "@/src/components/atoms/ScreenContainer/ScreenContainer";
import { AuthProvider } from "@/src/context/AuthContext";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

// Create an inner component so `useTheme()` can successfully access ThemeContext
function MainNavigator() {
  const { mode, tokens } = useTheme();
  const isDark = mode === "dark";

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={tokens.colors.background}
      />
      <ScreenContainer>
        <Stack
          screenOptions={{
            headerShown: false,
            // Fixed: Replaced hardcoded "#F8FAFC" with dynamic theme token background
            contentStyle: { backgroundColor: tokens.colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(routes)" />
        </Stack>
      </ScreenContainer>
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
