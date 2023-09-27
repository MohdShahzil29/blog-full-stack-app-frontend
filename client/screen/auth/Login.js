import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import InputBox from "../../components/Form/InputBox";
import SubmitButton from "./../../components/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);

  const handelSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill the all detail");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "http://192.168.102.77:8000/api/v1/auth/login",
        { email, password }
      );
      alert(data?.message);
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      navigation.navigate("Home");
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  //temp function to check local storage data

  const getLcoalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==> ", data);
  };

  getLcoalStorageData();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          titleInput={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          titleInput={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        titleButton={"Login"}
        loading={loading}
        handelSubmit={handelSubmit}
      />
      <Text style={styles.loginContainer}>
        Do not have Account please!
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  loginContainer: {
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    color: "red",
  },
});

export default Login;
