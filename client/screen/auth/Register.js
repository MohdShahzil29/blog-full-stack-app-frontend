import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Handel submit button
  const handelSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill the all detail");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "http://192.168.102.77:8000/api/v1/auth/register",
        { name, email, password }
      );
      alert(data?.message);
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox titleInput={"Name"} value={name} setValue={setName} />
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
        titleButton={"Submit"}
        loading={loading}
        handelSubmit={handelSubmit}
      />
      <Text style={styles.loginContainer}>
        Have an already account! Please
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Login
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
export default Register;
