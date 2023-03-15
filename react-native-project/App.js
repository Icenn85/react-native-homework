import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";



export default function App() {
  const routing = useRoute(true);
  
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("../react-native-project/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Regular": require("../react-native-project/fonts/Roboto-Regular.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) { 
  //   return null;
  // }

  return (
    // <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
    // </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
