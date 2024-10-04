import { StyleSheet, View } from "react-native";
import React from "react";

import { Button, Text, TextInput } from "react-native-paper";

const Address = () => {
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  return (
    <View style={styles.container}>
      <Text variant="labelLarge">Address</Text>
      <TextInput
        mode="outlined"
        label="Street"
        placeholder="Street"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="City"
        placeholder="City"
        style={styles.input}
      />
      <View>
        <TextInput
          mode="outlined"
          label="Zip Code"
          placeholder="Zip Code"
          contentStyle={styles.input}
        />
      </View>

      <Button icon="home" mode="contained" style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 15,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333", // Dark text for contrast
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4CAF50", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginTop: 20,
  },
});
