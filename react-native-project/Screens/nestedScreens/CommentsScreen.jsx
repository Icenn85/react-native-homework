import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);

  const { postId, photo, item } = route.params;

  const { nickname } = useSelector((state) => state.auth);

  const createComment = async () => {
    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      nickname,
    });
    Keyboard.dismiss();
    // await addCommentsNum();
  };

  // const addCommentsNum = async () => {
  //   if (allComments !== 0) {
  //     const comNum = await allComments.length;
  //     return await updateDoc(doc(db, "posts", postId), {
  //       commentsNumber: comNum,
  //     });
  //   }
  // };

  const getAllComments = async () => {
    await onSnapshot(
      collection(doc(db, "posts", postId), "comments"),
      (data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    //  addCommentsNum();
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.img}>
          <Image
            source={{ uri: photo }}
            style={{ height: 240, borderRadius: 8 }}
          />
        </View>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nickname}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={{ marginTop: "auto" }}>
        <TextInput
          style={styles.input}
          value={comment}
          placeholder="Комментировать..."
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.sendBtnUp}
          activeOpacity={0.7}
          onPress={createComment}
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 32,
    justifyContent: "flex-end",
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
