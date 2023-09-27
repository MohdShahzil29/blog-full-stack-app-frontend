import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  //statesss
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://192.168.102.77:8000/api/v1/post/get-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inintal  posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };