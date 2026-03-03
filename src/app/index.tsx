import { AuthScreen } from "@/components/screens/AuthScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { View } from "react-native";
import { db } from "../../utils";

function App() {
  // const { isLoading, error, data } = db.useQuery({
  //   colors: {
  //     $: { where: { id: selectId } },
  //   },
  // });
  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <db.SignedIn>
        <HomeScreen />
      </db.SignedIn>
      <db.SignedOut>
        <AuthScreen />
      </db.SignedOut>
    </View>
  );
}

export default App;
