import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

const HeadersMenu = () => {
  const [state, setState] = useContext(AuthContext);

  const handelLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Log out successfully");
  };
  return (
    <View>
      <TouchableOpacity onPress={handelLogout}>
        <FontAwesome5 name="sign-out-alt" color={"red"} style={styles.icon} />
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

export default HeadersMenu;
