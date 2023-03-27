import React, { useCallback } from "react";
import { Main } from "./components/Main";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();



export default function App() {
  
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../react-native-project/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../react-native-project/fonts/Raleway-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

 if (!fontsLoaded) {
   return null;
 }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
});
