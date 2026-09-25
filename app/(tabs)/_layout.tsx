// E:\app\app\(tabs)\_layout.tsx
import { Header } from "@/src/components/molecules/Header/Header";
import { useTheme } from "@/src/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.background }}>
      {/* Global Header present across all tabs */}
      <Header
        title="Metabolic Portal"
        subtitle="Day 42 • Acceleration Phase"
        onNotificationPress={() =>
          Alert.alert(
            "Clinical Notifications",
            "All vitals optimal. No acute glycemic deviations detected in last 24h.",
          )
        }
      />

      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: tokens.colors.surface,
            borderTopColor: tokens.colors.border,
            height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          tabBarActiveTintColor: tokens.colors.primary,
          tabBarInactiveTintColor: tokens.colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="vitals"
          options={{
            title: "Vitals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pulse-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wellness"
          options={{
            title: "Wellness",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: "Store",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

// // E:\app\app\(tabs)\_layout.tsx
// import { Header } from "@/src/components/molecules/Header/Header";
// import { useTheme } from "@/src/theme/ThemeContext";
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { Alert, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function TabsLayout() {
//   const { tokens } = useTheme();
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={{ flex: 1, backgroundColor: tokens.colors.background }}>
//       {/* Global Header present across all tabs */}
//       <Header
//         title="Metabolic Portal"
//         subtitle="Day 42 • Acceleration Phase"
//         // onSearchPress={() => Alert.alert("Search", "Global search triggered")}
//         onNotificationPress={() =>
//           Alert.alert(
//             "Clinical Notifications",
//             "All vitals optimal. No acute glycemic deviations detected in last 24h.",
//           )
//         }
//       />

//       <Tabs
//         initialRouteName="home"
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: tokens.colors.surface,
//             borderTopColor: tokens.colors.border,
//             height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
//             paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
//           },
//           tabBarActiveTintColor: tokens.colors.primary,
//           tabBarInactiveTintColor: tokens.colors.textSecondary,
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: "600",
//           },
//         }}
//       >
//         <Tabs.Screen
//           name="home"
//           options={{
//             title: "Home",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="programs"
//           options={{
//             title: "Programs",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="fitness-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="vitals"
//           options={{
//             title: "Vitals",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="pulse-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="consult"
//           options={{
//             title: "Consult",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="chatbubbles-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="store"
//           options={{
//             title: "Store",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="cart-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </View>
//   );
// }
