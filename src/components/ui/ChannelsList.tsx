import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { db } from "../../../utils";

export default function ChannelsList() {
  const { isLoading, error, data } = db.useQuery({ channels: {} });
  const router = useRouter();

  if (isLoading) {
    return <Text>Is loading...</Text>;
  }
  if (error) {
    return <Text>We have an error...</Text>;
  }

  return (
    <View style={{ borderWidth: 1, borderColor: "lightgray", padding: 12 }}>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
        Available channels
      </Text>

      <View style={{ marginTop: 20 }}>
        {data.channels.map((channel) => (
          <Pressable
            key={channel.id}
            onPress={() => {
              router.push({
                pathname: "/[channel]",
                params: { channel: channel.id },
              });
            }}
            style={{
              padding: 10,
              backgroundColor: "lightgreen",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 17 }}>{channel.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
