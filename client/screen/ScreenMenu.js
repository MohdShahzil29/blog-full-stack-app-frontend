import { View, Text } from "react-native";
import React, { useContext } from "react";
import Home from "./Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/authContext";
import HeadersMenu from "./Menu/HeadersMenu";
import Post from "./Post";
import About from "./About";
import Account from "./Account";
import Myposts from "./Myposts";

const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  const [state] = useContext(AuthContext);
  const authUser = state?.user && state.Token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {authUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: `Hi ${state?.user.name}`, headerRight: () => <HeadersMenu /> }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ title: "Back", headerRight: () => <HeadersMenu /> }}
          />
          <Stack.Screen
            name="Mypost"
            component={Myposts}
            options={{ title: "Back", headerRight: () => <HeadersMenu /> }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ title: "Back", headerRight: () => <HeadersMenu /> }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
