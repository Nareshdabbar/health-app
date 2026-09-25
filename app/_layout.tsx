// E:\app\app\_layout.tsx
// import { ScreenContainer } from "@/src/components/atoms/ScreenContainer/ScreenContainer";
// import { AuthProvider } from "@/src/context/AuthContext";
// import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// const queryClient = new QueryClient();

// function MainNavigator() {
//   const { mode, tokens } = useTheme();
//   const isDark = mode === "dark";

//   return (
//     <>
//       {/* Fixed: Removed unsupported backgroundColor property */}
//       <StatusBar style={isDark ? "light" : "dark"} />

//       <ScreenContainer>
//         <Stack
//           screenOptions={{
//             headerShown: false,
//             contentStyle: { backgroundColor: tokens.colors.background },
//           }}
//         >
//           <Stack.Screen name="index" />
//           <Stack.Screen name="(auth)" />
//           <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(routes)" />
//         </Stack>
//       </ScreenContainer>
//     </>
//   );
// }

// export default function RootLayout() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SafeAreaProvider>
//         <ThemeProvider>
//           <AuthProvider>
//             <MainNavigator />
//           </AuthProvider>
//         </ThemeProvider>
//       </SafeAreaProvider>
//     </QueryClientProvider>
//   );
// }

import { ScreenContainer } from "@/src/components/atoms/ScreenContainer/ScreenContainer";
import { AuthProvider } from "@/src/context/AuthContext";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { mode, tokens } = useTheme();
  const isDark = mode === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <StatusBar
              barStyle={isDark ? "dark-content" : "light-content"}
              // backgroundColor={isDark ? "red" : "#2e78b7"}
            />
            <ScreenContainer>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#F8FAFC" },
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </ScreenContainer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
