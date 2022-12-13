import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostScreen } from "./nestedScreens/DefaultPostScreen";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";

const NestedScreens = createStackNavigator();
export const PostsScreen = () => {
  return (
    <NestedScreens.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NestedScreens.Screen
        name="DefaultPostScreen"
        component={DefaultPostScreen}
      />
      <NestedScreens.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={
          {
            //   headerTitleAlign: "center",
            //   headerStyle: {
            //     height: 88,
            //     borderBottomWidth: 1,
            //     borderBottomColor: "#B3B3B3",
            //   },
            //   headerTitleStyle: {
            //     fontWeight: "bold",
            //     lineHeight: 22,
            //   },
          }
        }
      />
      {/* <NestedScreens.Screen name="MapScreen" component={MapScreen} /> */}
    </NestedScreens.Navigator>
  );
};
