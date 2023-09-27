import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "./Menu/FooterMenu";
import axios from "axios";
import { PostContext } from "../context/PostContext";

const Post = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useContext(PostContext)

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title ");
      }
      if (!description) {
        alert("Please add post  description");
      }
      const { data } = await axios.post(
        "http://192.168.102.77:8000/api/v1/post/create-post",
        {
          title,
          description,
        }
      );
      setLoading(false);
      alert(data?.message);
      setPosts([...posts, data?.post])
      navigation.navigate("Home");
    } catch (error) {
      alert(error?.response?.data?.message || error?.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.heading}>Create a post</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Add Your Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Add Your Description"
          multiline={true}
          numberOfLines={6}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity style={styles.updateBtn} onPress={handlePost}>
          <Text style={styles.updateBtnText}>Create Post</Text>
        </TouchableOpacity>
      </View>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  updateBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Post;
