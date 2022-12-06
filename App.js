import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { authorization } from "./src/components/authorization";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const auth = authorization(null); //TODO Змінити на true для входу на Home

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {auth}
    </NavigationContainer>
  );
}
