import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostScreen } from "./nestedScreens/DefaultPostScreen";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";

const NestedScreens = createStackNavigator();
export const PostsScreen = () => {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        name="DefaultPostScreen"
        component={DefaultPostScreen}
        options={{ headerShown: false }}
      />
      <NestedScreens.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreens.Screen name="MapScreen" component={MapScreen} />
    </NestedScreens.Navigator>
  );
};
