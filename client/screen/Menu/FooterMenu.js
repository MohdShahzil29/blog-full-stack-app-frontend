import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
const FooterMenu = () => {
  const navigation = useNavigation();
  // hooks 
  const route = useRoute()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5 name="home" style={styles.icon} color={route.name === "Home" && "red"} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5 name="plus-circle" style={styles.icon} color={route.name === "Post" && "red"} />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Mypost")}>
        <FontAwesome5 name="list" style={styles.icon}  color={route.name === "Mypost" && "red"}/>
        <Text>My Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5 name="user-circle" style={styles.icon} color={route.name === "Account" && "red"} />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  icon: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 24,
  },
});

export default FooterMenu;
