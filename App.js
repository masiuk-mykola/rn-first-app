import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./src/Screens/LoginScreen";
import { RegistrationScreen } from "./src/Screens/RegistrationScreen";
import { Home } from "./src/Screens/Home";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
const MainStack = createStackNavigator();

const useRoute = (user) => {
  if (user) {
    return (
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  } else {
    return (
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const [user, setUser] = useState(null);
  const routing = useRoute(user);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  onAuthStateChanged(auth, (user) => setUser(user));

  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        {routing}
      </NavigationContainer>
    </Provider>
  );
}
