import { Home } from "../Screens/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";

const MainStack = createStackNavigator();

export const authorization = (authObj) => {
  if (!authObj) {
    return (
      <MainStack.Navigator initialRouteName="LoginScreen">
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
  } else
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
};
