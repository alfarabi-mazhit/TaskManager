import { TaskProvider } from "@/contexts/TaskContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootNavigation() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loaded) {
      timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
