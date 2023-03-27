import React, { useState } from "react";
import { authLogout } from "../../redux/auth/authOperations";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import {
  Feather, AntDesign,
  EvilIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase/config";
// import { db } from "../../firebase/config";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const image = require("../../assets/BGphoto.jpg");

  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

  const { userId, nickname, userPhoto } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };


  // const getUserPosts = async () => {
  //   const q = query(collection(db, "posts"), where("userId", "==", userId));
  //   await onSnapshot(q, (data) => {
  //     setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   });
  // };

  useEffect(() => {
    getUserPosts();
  }, []);


  const logOut = () => {
    dispatch(authLogout());
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.formBg}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: userPhoto }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
              }}
            />
            <TouchableOpacity style={styles.delIcon}>
              <Image source={require("../../assets/delete.png")} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logOut}
            activeOpacity={0.6}
            onPress={logOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>{nickname}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ height: 240, borderRadius: 8 }}
                />
                <View style={styles.imageDetails}>
                  <Text style={styles.name}>{item.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("CommentsScreen", {
                            postId: item.id,
                          })
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 24,
                        }}
                      >
                        <EvilIcons name="comment" size={24} color="#BDBDBD" />
                        <Text
                          style={{
                            marginLeft: 6,
                            color: item.comments ? "#212121" : "#BDBDBD",
                          }}
                        >
                          {item.comments || 0}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AntDesign name="like2" size={24} color="#BDBDBD" />
                        <Text
                          style={{
                            marginLeft: 6,
                            color: item.likes ? "#212121" : "#BDBDBD",
                          }}
                        >
                          {item.likes || 0}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MapScreen", {
                          location: item.location,
                        })
                      }
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text
                        style={{
                          marginLeft: 3,
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        {item.location.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
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
    height: 650,
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
  delIcon: {
    top: -45,
    left: 101,
  },
  logOut: {
    position: "absolute",
    top: 22,
    right: 16,
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
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 32,
    height: "100%",
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
  },
});
