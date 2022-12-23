import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

export default function RegistrationScreen() {
  const image = require("../assets/BGphoto.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>

    
    
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  
});
