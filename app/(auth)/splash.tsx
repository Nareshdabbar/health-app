import { SplashScreen } from "@/src/screens/SplashScreen/SplashScreen";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function SplashRoute() {
  const router = useRouter();

  const handleFinish = useCallback(() => {
    router.replace("/(auth)/onboarding");
  }, [router]);

  return <SplashScreen onFinish={handleFinish} />;
}
