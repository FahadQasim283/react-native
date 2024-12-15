import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useUserRole } from "./usercontext";
import { StyleSheet } from "react-native";
import { getDatabase,ref,onValue } from "firebase/database";
import databaseApp from "../../db/firebase";
import ViewApiData from "../q3/view_data";

const HomeScreen = ({ navigation }) => {
  const [getUserData, setUser] = useState([]);
  const { userRole } = useUserRole();
  console.log(getUserData);
  return (
    <View>
      <ViewApiData/>
    </View>
  );
};

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}> USER SCREEN DASHBOARD </Text>
    </View>
  );
};
const AdminScreen = () => {
  return (
    <View>
      <Text>Welcome to the Admin Screen!</Text>
    </View>
  );
};
export { HomeScreen, UserScreen, AdminScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
});
