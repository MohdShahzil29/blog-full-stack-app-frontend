import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ titleButton, loading, handelSubmit }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handelSubmit}>
      <Text style={styles.buttonText}>
        {loading ? "Please wait..." : titleButton}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
});

export default SubmitButton;
