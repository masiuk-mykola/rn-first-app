import { useState } from "react";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
};

const warningState = {
  email: false,
  password: false,
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const LoginScreen = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [credentials, setCredentials] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowWarning, setIsShowWarning] = useState(warningState);

  const dispatch = useDispatch();

  const emailHandler = (email) =>
    setCredentials((prevState) => ({ ...prevState, email }));
  const passwordHandler = (password) =>
    setCredentials((prevState) => ({ ...prevState, password }));

  const onFocusKeyboard = () => {
    setIsShowWarning(warningState);
    setIsShowKeyboard(true);
  };

  const onLogin = () => {
    console.log(credentials);

    if (credentials.email === "") {
      setIsShowWarning((prevState) => ({ ...prevState, email: true }));
    }
    if (credentials.password === "") {
      setIsShowWarning((prevState) => ({ ...prevState, password: true }));
    }

    setCredentials(initialState);
    Keyboard.dismiss();

    if (credentials.email !== "" || credentials.password !== "") {
      dispatch(authSignInUser(credentials));
      // navigation.navigate("Home");
    }
  };
  const showPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/RegistrationBG.jpg")}
        style={{
          width: windowWidth,
          height: windowHeight,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        // onLayout={onLayoutRootView}
      >
        <View style={styles.regContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.inputsContainer}>
              <Text style={styles.title}>??????????</Text>

              <TextInput
                value={credentials.email}
                onChangeText={emailHandler}
                placeholder={
                  isShowWarning.email
                    ? "????????????????????, ?????????????? ??????????"
                    : "?????????? ?????????????????????? ??????????"
                }
                placeholderTextColor={
                  isShowWarning.email ? "#FF6C00" : "#BDBDBD"
                }
                style={isShowWarning.email ? styles.warningInput : styles.input}
                onFocus={onFocusKeyboard}
                onBlur={() => setIsShowKeyboard(false)}
              />
              <View>
                <TextInput
                  value={credentials.password}
                  onChangeText={passwordHandler}
                  placeholder={
                    isShowWarning.email
                      ? "????????????????????, ?????????????? ????????????"
                      : "????????????"
                  }
                  secureTextEntry={isShowPassword}
                  placeholderTextColor={
                    isShowWarning.password ? "#FF6C00" : "#BDBDBD"
                  }
                  style={
                    isShowWarning.password ? styles.warningInput : styles.input
                  }
                  onFocus={onFocusKeyboard}
                  onBlur={() => setIsShowKeyboard(false)}
                />
                <TouchableOpacity
                  style={styles.input_btn}
                  onPress={showPassword}
                >
                  <Text style={styles.input__text}>????????????????</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isShowKeyboard ? null : (
              <View>
                <TouchableOpacity style={styles.btn} onPress={onLogin}>
                  <Text style={styles.btn__text}>??????????</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                  <Text style={styles.link__text}>
                    ?????? ?????????????????{" "}
                    <Text
                      style={styles.link__text}
                      onPress={() => navigation.navigate("RegistrationScreen")}
                    >
                      {" "}
                      ????????????????????????????????????
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  warningInput: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF6C00",
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
    marginBottom: 32,
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
    marginTop: 32,
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
