import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "./Menu/FooterMenu";
import axios from "axios";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const { user, Token } = state;
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);

  const handelUpdateUserData = async () => {
    try {
      const { data } = await axios.put(
        "http://192.168.102.77:8000/api/v1/auth/update-user",
        { name, email, password }
      );
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updateUser });
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            style={{ height: 200, width: 200 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name: </Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email: </Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            editable={false}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password: </Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Role: </Text>
        <TextInput style={styles.inputBox} value={state?.user.role} />
      </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handelUpdateUserData}
          >
            <Text style={styles.updateBtnText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
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
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
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
  },
});

export default Account;
