import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather, EvilIcons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { authLogout } from "../../redux/auth/authOperations";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

   const { email, nickname, userPhoto } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const logOut = () => {
    dispatch(authLogout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Публикации</Text>
        <TouchableOpacity
          style={styles.logOut}
          activeOpacity={0.6}
          onPress={logOut}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.userWrapper}>
        {userPhoto && <Image style={styles.img} source={{ uri: userPhoto }} />}
        <View>
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                height: 240,
                width: 343,
                borderRadius: 8,
              }}
            />
            <Text style={styles.postName}>{item.title}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 11,
              }}
            >
              <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", { postId: item.id })
                  }
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
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
  logOut: {
    position: "absolute",
    bottom: 11,
    right: 21,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  img: {
    height: 60,
    width: 60,
    marginRight: 8,
  },

  userName: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "700",
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: "rgba(33, 33, 33, 0.8)",
  },
  postName: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
