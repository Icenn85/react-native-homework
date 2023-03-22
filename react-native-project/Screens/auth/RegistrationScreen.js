import React, { useState, useEffect } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { authRegistration } from "../../redux/auth/authOperations";


const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const image = require("../../assets/BGphoto.jpg");

  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isLoginOnFocused, setIsLoginOnFocused] = useState(false);
  const [isEmailOnFocused, setIsEmailOnFocused] = useState(false);
  const [isPassordOnFocused, setIsPassordOnFocused] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width - 5 * 2,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 5 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  const onKeyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyBoard(false);
    setState(initialState);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyBoard(false);
    dispatch(authRegistration({...state}));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formBg,
                paddingBottom: isShowKeyBoard ? 32 : 78,
                width: dimensions.width,
              }}
            >
              <View style={styles.avatar}>
                <TouchableOpacity>
                  <Image
                    style={styles.addBtn}
                    source={require("../../assets/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isLoginOnFocused ? "#fff" : "#F6F6F6",
                    borderColor: isLoginOnFocused ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Логин"
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setIsLoginOnFocused(true);
                  }}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isEmailOnFocused ? "#fff" : "#F6F6F6",
                    borderColor: isEmailOnFocused ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Адрес электронной почты"
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setIsEmailOnFocused(true);
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  secureTextEntry={true}
                  style={{
                    ...styles.input,
                    backgroundColor: isPassordOnFocused ? "#fff" : "#F6F6F6",
                    borderColor: isPassordOnFocused ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setIsPassordOnFocused(true);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity>
                  <Text style={styles.passwordInput}>Показать</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

  const styles = StyleSheet.create({
    container: {
      position: "reletive",
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      position: "reletive",
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    formBg: {
      height: 600,
      backgroundColor: "#fff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 92,
      alignItems: "center",
    },
    avatar: {
      position: "absolute",
      top: -60,
      width: 120,
      height: 120,
      borderRadius: 16,
      backgroundColor: "#F6F6F6",
    },
    addBtn: {
      top: 81,
      left: 107,
    },
    title: {
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 35,
      fontSize: 30,
      textAlign: "center",
      letterSpacing: 0.01,
      marginBottom: 32,
      color: "#212121",
    },
    input: {
      height: 50,
      width: 370,
      padding: 16,
      borderWidth: 1,
      backgroundColor: "#F6F6F6",
      borderColor: "#E8E8E8",
      borderRadius: 8,
      marginHorizontal: 16,
    },
    passwordInput: {
      position: "absolute",
      top: -34,
      right: 32,
      fontSize: 16,
      color: "#1B4371",
    },
    button: {
      height: 50,
      width: 370,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FF6C00",
      marginTop: 43,
      marginBottom: 16,
      borderRadius: 100,
    },
    btnTitle: {
      fontFamily: "RobotoRegular",
      fontSize: 16,
      lineHeight: 20,
      color: "#fff",
      textAlign: "center",
    },
    bottomText: {
      color: "#1B4371",
      fontSize: 16,
      textAlign: "center",
      fontSize: 16,
      lineHeight: 19,
    },
  });
  
