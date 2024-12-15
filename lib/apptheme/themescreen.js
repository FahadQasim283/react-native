import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "./themecontext";

const ThemeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View
      style={[styles.container, theme === "light" ? styles.light : styles.dark]}
    >
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#333333",
  },
});
export default ThemeScreen;
