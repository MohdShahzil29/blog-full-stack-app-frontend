import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  //handle delete prompt
  const handleDeletePromt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  //delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`http://192.168.102.77:8000/api/v1/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}> Total Post {posts?.length}</Text>
      {posts?.map((post, i) => {
        return (
          <View style={styles.card} key={i}>
            {myPostScreen && (
              <View>
                <Text style={{ textAlign: "right" }} >
                  <FontAwesome5 name="trash" color={"red"}  onPress={() => handleDeletePromt(post?._id)}/>
                </Text>
              </View>
            )}

            <Text style={styles.title}> title: {post.title}</Text>
            <Text style={styles.desc}>{post.description}</Text>
            <View style={styles.footer}>
              {post?.postedBy?.name && (
                <Text>
                  {" "}
                  <FontAwesome5 name="user" /> {"  "}
                  {post?.postedBy?.name}
                </Text>
              )}
              <Text>
                {" "}
                <FontAwesome5 name="clock" />{" "}
                {moment(post?.createdAt).format("DD:MM:YYYY")}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
