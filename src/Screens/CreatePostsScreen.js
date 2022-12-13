import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Button,
  Image,
} from "react-native";

import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const initialPost = {
  photo: "",
  title: "",
  photoLocation: "",
  currentLocation: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [shouldPublish, setShouldPublish] = useState(false);
  const [post, setPost] = useState(initialPost);
  const [errorMsg, setErrorMsg] = useState(null);

  // Camera
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setPost((prevState) => ({
        ...prevState,
        currentLocation: location.coords,
      }));
      let text;
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
    })();

    (async () => {
      requestPermission();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const photoHandler = (uri) => {
    setPost((prevState) => ({ ...prevState, photo: uri }));
    setShouldPublish(true);
  };

  const inputHandlerTitle = (title) => {
    setPost((prevState) => ({ ...prevState, title }));
    setShouldPublish(true);
  };

  const inputHandlerLocation = (photoLocation) => {
    setPost((prevState) => ({ ...prevState, photoLocation }));
    setShouldPublish(true);
  };

  const onFocusKeyboard = () => {
    setIsShowKeyboard(true);
  };

  const onCreate = () => {
    if (shouldPublish) {
      navigation.navigate("DefaultPostScreen", post);
      setPost(initialPost);
    }
  };

  const onDelete = () => {
    setPost(initialPost);
  };

  const onRemovePhoto = () => {
    setPost((prevState) => ({ ...prevState, photo: null }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.photoContainer}>
            <View style={styles.container}>
              {post.photo ? (
                <Image
                  source={{ uri: post.photo }}
                  style={{ height: "100%", width: "100%", borderRadius: 8 }}
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={CameraType.back}
                  ref={(ref) => {
                    setCameraRef(ref);
                  }}
                  autoFocus={Camera.Constants.AutoFocus.on}
                >
                  <View style={styles.photoView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={async () => {
                        if (cameraRef) {
                          const { uri } = await cameraRef.takePictureAsync();
                          photoHandler(uri);
                          await MediaLibrary.createAssetAsync(uri);
                        }
                      }}
                    >
                      <View style={styles.takePhotoOut}>
                        <FontAwesome name="camera" size={24} color="gray" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          </View>
          <View style={styles.loadPhoto}>
            <TouchableOpacity onPress={onRemovePhoto}>
              <Text style={styles.loadPhoto_text}>
                {post.photo ? "Редактировать фото" : "Загрузите фото"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={post.title}
              onChangeText={inputHandlerTitle}
              placeholder={"Название..."}
              placeholderTextColor={"#BDBDBD"}
              style={styles.input}
              onFocus={onFocusKeyboard}
              onBlur={() => setIsShowKeyboard(false)}
            />
            <View>
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={{ position: "absolute" }}
              />
              <TextInput
                value={post.photoLocation}
                onChangeText={inputHandlerLocation}
                placeholder={"Местность..."}
                placeholderTextColor={"#BDBDBD"}
                style={{ ...styles.input, paddingLeft: 28 }}
                onFocus={onFocusKeyboard}
                onBlur={() => setIsShowKeyboard(false)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={
              shouldPublish
                ? styles.btn
                : { ...styles.btn, backgroundColor: "#F6F6F6" }
            }
            onPress={onCreate}
          >
            <Text
              style={
                shouldPublish
                  ? styles.btn__text
                  : { ...styles.btn__text, color: "#BDBDBD" }
              }
            >
              Опубликовать
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              alignContent: "flex-end",
              paddingBottom: 34,
            }}
          >
            <TouchableOpacity
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#F6F6F6",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onDelete}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    height: 240,
    width: "100%",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  loadPhoto: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  loadPhoto_text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputContainer: {
    marginTop: 48,
    alignSelf: "flex-start",
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 15,
    marginBottom: 32,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
    width: "100%",
  },
  btn__text: {
    color: "#fff",
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  button: { alignSelf: "center", justifyContent: "center" },

  takePhotoOut: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
