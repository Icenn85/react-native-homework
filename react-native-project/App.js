
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

// import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("../react-native-project/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Regular": require("../react-native-project/fonts/Roboto-Regular.ttf"),
  // });



  return <LoginScreen />;
  // <RegistrationScreen />
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
