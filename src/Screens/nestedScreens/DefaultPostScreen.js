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
import { Feather } from "@expo/vector-icons";

const Item = ({ title, source, photoLocation, navigation }) => (
  <View style={styles.item}>
    <Image style={styles.img} source={{ uri: source }} />
    <Text style={styles.title}>{title}</Text>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Feather
          name="message-circle"
          size={24}
          color="#BDBDBD"
          style={{ marginRight: 9 }}
          onPress={() => navigation.navigate("CommentsScreen")}
        />
        <Text style={{ ...styles.title, color: "#BDBDBD" }}>0</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={{ marginRight: 9 }}
        />
        <Text style={styles.title}>{photoLocation}</Text>
      </View>
    </View>
  </View>
);

export const DefaultPostScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({ item }) => (
    <Item
      navigation={navigation}
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
  item: {
    marginBottom: 34,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 11,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
});
