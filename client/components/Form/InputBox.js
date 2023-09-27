import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const InputBox = ({
  titleInput,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  autoCorrect,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text>{titleInput}</Text>
      <TextInput
        style={styles.boxInput}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        autoCorrect={false}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
});

export default InputBox;
