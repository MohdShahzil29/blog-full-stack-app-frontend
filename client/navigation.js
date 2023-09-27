import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./screen/ScreenMenu";
import { PostProvider } from "./context/PostContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
