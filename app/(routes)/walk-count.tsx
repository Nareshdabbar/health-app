import { router } from "expo-router";
import { WalkCountScreen } from "@/src/screens/WalkCountScreen/WalkCountScreen";

export default function WalkCountRoute() {
  return <WalkCountScreen onBack={() => router.back()} />;
}
