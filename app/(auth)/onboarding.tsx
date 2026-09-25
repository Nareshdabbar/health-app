// E:\app\app\(auth)\onboarding.tsx
import { OnboardingScreen } from "@/src/screens/OnboardingScreen/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, useRouter } from "expo-router";

export default function OnboardingRoute() {
  const router = useRouter();

  const handleFinishOrSkip = async () => {
    try {
      await AsyncStorage.setItem("@has_completed_onboarding", "true");
      router.replace("/(auth)/login" as Href);
    } catch (error) {
      console.error("Failed to save onboarding state:", error);
      router.replace("/(auth)/login" as Href);
    }
  };

  return (
    <OnboardingScreen
      onComplete={handleFinishOrSkip}
      onLoginPress={handleFinishOrSkip}
    />
  );
}
