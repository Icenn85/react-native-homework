import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, Image, FlatList } from "react-native";

export default function DefaultScreenPosts({ route }) {
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
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 240, borderRadius: 8, borderColor: "tomato" }}
            />
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
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginTop: 32,
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
