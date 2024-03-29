import React, { useState, useEffect } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const image = require("../../assets/BGphoto.jpg");

  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
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
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    dispatch(authLogin(state));
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
                paddingBottom: isShowKeyBoard ? 32 : 144,
                width: dimensions.width,
              }}
            >
              <View>
                <Text style={styles.title}>Войти</Text>
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
                  <Text style={styles.btnTitle}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.bottomText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
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
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    position: "relative",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formBg: {
    height: 550,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    alignItems: "center",
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
