import { ChannelScreen } from "@/components/screens/ChannelScreen";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Channel() {
  const { channel } = useLocalSearchParams();

  if (!channel) return <Text style={{ color: "red" }}>Channel not found</Text>;

  return <ChannelScreen channel={channel as string} />;
}
