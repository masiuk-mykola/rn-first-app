import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const PostsScreen = ({ route }) => {
  console.log("route.params", route.params);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  // console.log(posts);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>PostsScreen</Text>
    </View>
  );
};
