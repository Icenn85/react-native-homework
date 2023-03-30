import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const initialState = {
//   title: "",
//   location: "",
// };

export default function CreatePostsScreen({ navigation }) {
  // const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [type, setType] = useState(CameraType.back);
   const [hasPermission, setHasPermission] = useState(null);
  
const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
        let location = await Location.getCurrentPositionAsync({});
        
        setLocation(location);
        
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };


  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const uniquePostId = Date.now().toString();
      console.log("photo", photo);
      const createPost = await addDoc(collection(db, "posts"), {
        photo,
        photoName,
        locationName,
        location: location.coords,
        userId,
        nickname,
      });
    } catch (error) {
      console.error("Error adding post: ", error);
    }
    
  };
  const sendPhoto = () => {
    uploadPostToServer();
    // uploadPhotoToServer();
    navigation.navigate("DefaultScreen");
    resetForm();
  };

  const uploadPhotoToServer = async () => {
    try {
      // console.log(`photo`, photo);
      const response = await fetch(photo);
      // console.log(`response`, response);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = await ref(storage, `postImages/${uniquePostId}.jpeg`);
      await uploadBytes(storageRef, file).then(() => {
        console.log(`photo is uploaded`);
      });

      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.error("Error adding photo: ", error);
    }
    
    
  };

  const resetForm = () => {
    setPhotoName("");
    setLocationName(null);
    setPhoto(null);
  };

  const onKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.containerHeader}>
            <Text style={styles.title}>Создать публикацию</Text>
            <TouchableOpacity
              style={styles.btnArrowLeft}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("DefaultScreen")}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          </View>
          <Camera
            style={styles.camera}
            ref={setCamera}
            type={type}
            onCameraReady={onCameraReady}
          >
            <TouchableOpacity
              style={styles.cameraTypeBtn}
              onPress={toggleCameraType}
            >
              <MaterialIcons name="flip-camera-ios" size={30} color="#F6F6F6" />
            </TouchableOpacity>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 240, width: 343 }}
                />
              </View>
            )}
            <TouchableOpacity onPress={takePhoto} style={styles.iconCam}>
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity style={styles.pickImg} onPress={pickImage}>
            <Text
              style={{
                ...styles.pickImgTitle,
                color: "#BDBDBD",
              }}
            >
              Загрузите фото
            </Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              placeholder="Название..."
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={setPhotoName}
              value={photoName}
            />
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Местность..."
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={setLocationName}
              value={locationName}
            />
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.iconLoc}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
            }}
            activeOpacity={0.7}
            onPress={sendPhoto}
          >
            <Text
              style={{
                ...styles.btnText,
                color: photo ? "#FFF" : "#BDBDBD",
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.iconTrash} onPress={resetForm}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  containerHeader: {
    position: "relative",
    height: 88,
    borderBottomColor: "rgba(0, 0, 0,0.1 )",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.408,
    paddingTop: 55,
    paddingBottom: 11,
    color: "#212121",
  },
  btnArrowLeft: {
    position: "absolute",
    top: 54,
  },
  camera: {
    height: 300,
    marginTop: 32,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraTypeBtn: {
    position: "absolute",
    top: 10,
    right: 13,
    opacity: 0.6,
  },
  takePhotoContainer: {
    position: "absolute",
  },
  iconCam: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  pickImg: {
    marginBottom: 8,
  },
  pickImgTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputContainer: {
    position: "relative",
    marginTop: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  iconLoc: {
    position: "absolute",
    top: 75,
    left: 0,
    color: "#BDBDBD",
  },
  button: {
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  btnText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  iconTrash: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginTop: 120,
    marginLeft: 153,
  },
});
