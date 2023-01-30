import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  // KeyboardAvoidingView,
  // Dimensions,
} from "react-native";

export default function RegistrationScreen() {
  const image = require("../assets/BGphoto.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.formBg}>
          <View style={styles.avatar}>
            <TouchableOpacity>
              <Image
                style={styles.addBtn}
                source={require("../assets/add.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>Регистрация</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  formBg: {
    position: "absolute",
    top: 263,
    width: "100%",
    height: 750,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 107,
    bottom: 14,
  },
  title: {
    fontFamily: "RobotoBold",
    lineHeight: 35,
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
  },
});
