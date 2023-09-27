import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import FooterMenu from "./Menu/FooterMenu";

const Myposts = () => {
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  //get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://192.168.102.77:8000/api/v1/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPost);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});
export default Myposts;