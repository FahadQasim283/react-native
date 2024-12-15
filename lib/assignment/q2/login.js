import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserRole } from "./usercontext";

export default LoginPage = () => {
  const { setUserRole } = useUserRole();
  const navigation = useNavigation();
  const handleLogin = (role) => {
    setUserRole(role);
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Login Page</Text>
          <Button title="Login as Admin" onPress={() => handleLogin("admin")} />
          <br/>
      <Button title="Login as User" onPress={() => handleLogin("user")} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
