import { PhoneAuthScreen } from "@/src/screens/PhoneAuthScreen/PhoneAuthScreen";
import { useRouter } from "expo-router";

export default function LoginRoute() {
  const router = useRouter();
  return (
    <PhoneAuthScreen
      onSendOtp={(phone) => router.push("/(auth)/otp")}
      onBack={() => router.back()}
    />
  );
}
