<script src="http://localhost:8097"></script>;
import React, { useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";

export default function ProfileScreen() {
  const image = require("../../assets/BGphoto.jpg");

  const [userPosts, setUserPosts] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.formBg}>
          <View style={styles.avatar}>
            <TouchableOpacity>
              <Image
                style={styles.deleteBtn}
                source={require("../../assets/delete.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Name</Text>
          <FlatList
            data={userPosts}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.key}</Text>
            )}
          />
          <View>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formBg: {
    height: 700,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 147,
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
  deleteBtn: {
    top: 75,
    left: 101,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 35,
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
    marginBottom: 33,
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
