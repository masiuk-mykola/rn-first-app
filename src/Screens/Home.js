import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { PostsScreen } from "./PostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { MapScreen } from "./nestedScreens/MapScreen";
// import { PhotoCamera } from "../components/Camera";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const moveBack = () => {
    console.log("back");
  };
  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#B3B3B3",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          lineHeight: 22,
        },
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 63,
          borderTopWidth: 1,
          borderTopColor: "#B3B3B3",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"grid"} size={size} color={color} />
          ),
          title: "Публикации",
          headerRight: ({ color }) => (
            <Ionicons
              style={{ marginRight: 20 }}
              name="exit-outline"
              size={24}
              color={color}
              onPress={() => alert("This is a button!")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ size }) => {
            return (
              <View style={styles.plusBtn}>
                <Feather name={"plus"} size={size} color={"#fff"} />
              </View>
            );
          },
          title: "Создать публикацию",
          tabBarStyle: {
            display: "none",
          },
          // headerLeft: ({ color }) => (
          //   <Feather
          //     style={{ marginLeft: 20 }}
          //     name="arrow-left"
          //     size={24}
          //     color={color}
          //     onPress={moveBack}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name={"user"} size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name={"map"} size={size} color={color} />
          ),
          headerShown: false,
        }}
      /> */}
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 20,
  },
  plusBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
