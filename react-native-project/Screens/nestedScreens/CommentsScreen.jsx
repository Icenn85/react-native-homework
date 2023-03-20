import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen () {
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState(null);

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={{ marginTop: "auto" }}>
        <TextInput
          style={styles.input}
          placeholder="Комментировать..."
          onChangeText={() => {}}
        />
        <TouchableOpacity
          style={styles.sendBtnUp}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    position: "relative",
    height: 50,
    paddingLeft: 16,
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  sendBtnUp: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 8,
    bottom: 8,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 100,
  },
});
