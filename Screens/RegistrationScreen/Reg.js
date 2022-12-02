import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { RegBtn } from "./RegBtn/RegBtn";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const Reg = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [credentials, setCredentials] = useState(initialState);

  const [fontsLoaded] = useFonts({
    "Roboto-400": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-500": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const loginHandler = (login) =>
    setCredentials((prevState) => ({ ...prevState, login }));
  const emailHandler = (email) =>
    setCredentials((prevState) => ({ ...prevState, email }));
  const passwordHandler = (password) =>
    setCredentials((prevState) => ({ ...prevState, password }));

  const onLogin = () => {
    console.log(credentials);
    setCredentials(initialState);
    Keyboard.dismiss();
  };
  const showPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/RegistrationBG.jpg")}
        style={styles.image}
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          onLayout={onLayoutRootView}
        >
          <View style={styles.regContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.inputsContainer}>
                <View style={styles.img_placeholder}>
                  <TouchableOpacity>
                    <View style={styles.img_plhrd_circle}>
                      <View style={styles.img_plhrd_1}></View>
                      <View style={styles.img_plhrd_2}></View>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Регистрация</Text>
                <TextInput
                  value={credentials.login}
                  onChangeText={loginHandler}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                  style={styles.input}
                />
                <TextInput
                  value={credentials.email}
                  onChangeText={emailHandler}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  style={styles.input}
                />
                <View>
                  <TextInput
                    value={credentials.password}
                    onChangeText={passwordHandler}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isShowPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.input_btn}
                    onPress={showPassword}
                  >
                    <Text style={styles.input__text}>Показать</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
            <RegBtn onPress={onLogin} />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  regContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    fontFamily: "Roboto-400",
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    color: "#212121",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  inputsContainer: {
    marginBottom: 16,
  },
  btn__text: {
    color: "#fff",
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    fontFamily: "Roboto-500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
  img_placeholder: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  link: {
    marginBottom: 78,
  },
  link__text: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
  },
  img_plhrd_circle: {
    left: 107,
    top: 81,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
    alignItems: "center",
  },
  img_plhrd_1: {
    top: 6,
    borderWidth: 1,
    borderColor: "#FF6C00",
    height: 12,
  },
  img_plhrd_2: {
    top: -1,
    borderWidth: 1,
    borderColor: "#FF6C00",
    width: 12,
  },
  input_btn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  input__text: {
    color: "#1B4371",
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 19,
  },
});
