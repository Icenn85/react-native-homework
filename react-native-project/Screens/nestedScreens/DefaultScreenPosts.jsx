import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather, EvilIcons, SimpleLineIcons } from "@expo/vector-icons";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Публикации</Text>
        <TouchableOpacity
          style={styles.logOut}
          activeOpacity={0.6}
          onPress={() => {}}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.userWrapper}>
        <Image
          style={styles.img}
          source={require("../../assets/userPhoto.jpg")}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
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
            <Text style={styles.postName}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 11,
              }}
            >
              <>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", { postId: item.id })
                  }
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text style={{ marginLeft: 6, color: "#BDBDBD" }}>0</Text>
                </TouchableOpacity>
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
                    {item.locationName}
                  </Text>
                </TouchableOpacity>
              </>
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
});
