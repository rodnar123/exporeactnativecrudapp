import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HouseholdDetails from "@/components/HouseholdDetails";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Housedetails = () => {
  const navigation = useNavigation();

  const handleHouseholdDetails = () => {
    (navigation as any).navigate("screens/address");
  };
  return (
    <View>
      <HouseholdDetails />

      <Button
        icon="home"
        mode="contained"
        onPress={() => handleHouseholdDetails()}
      >
        Enter Address Details
      </Button>
    </View>
  );
};

export default Housedetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
