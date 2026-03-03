import schema from "@/instant.schema";
import { init } from "@instantdb/react-native";

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

// ID for app: my-temp-app
if (!APP_ID) {
  throw new Error("You need to set your app id");
}

export const db = init({ appId: APP_ID, schema: schema });

export function useProfile() {
  const { user, error: userError } = db.useAuth();

  const { data, error } = db.useQuery(
    user?.id
      ? {
          profiles: {
            $: { where: { "user.id": user.id } },
          },
        }
      : null,
  );

  if (userError) {
    return { profile: undefined, error: userError };
  }
  if (!user) {
    return { profile: undefined, error: null };
  }

  return {
    profile: data?.profiles?.[0],
    error,
  };
}
