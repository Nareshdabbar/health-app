// E:\app\app\(auth)\otp.tsx
import { useAuth } from "@/src/context/AuthContext";
import { OtpVerifyScreen } from "@/src/screens/OtpVerifyScreen/OtpVerifyScreen";
import { Href, useRouter } from "expo-router";

export default function OtpRoute() {
  const router = useRouter();
  const { login } = useAuth();

  const handleVerifySuccess = async () => {
    try {
      // Save session locally via AsyncStorage context
      await login("+91 9876543210");
      // Replaces stack so back button won't return to auth flow
      router.replace("/(tabs)/home" as Href);
    } catch (error) {
      console.error("Local session persistence error:", error);
      router.replace("/(tabs)/home" as Href);
    }
  };

  const handleBack = () => {
    router.back(); // Goes back to the login screen
  };

  return (
    <OtpVerifyScreen
      phoneNumber="+91 9876543210"
      onVerifySuccess={handleVerifySuccess}
      onBack={handleBack}
    />
  );
}
