import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Item = ({ title, source, photoLocation }) => (
  <View style={styles.item}>
    <Image style={styles.img} source={{ uri: source }} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{photoLocation}</Text>
  </View>
);

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      source={item.photo}
      photoLocation={item.photoLocation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <AntDesign name="user" size={35} color="black" />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.email}>Email</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  nameContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
  },
  item: {},
  title: {
    fontSize: 16,
    lineHeight: 19,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
});
