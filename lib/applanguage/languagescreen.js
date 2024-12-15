import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LanguageContext } from "./langaugecontext";

const LanguageScreen = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Language: {language}</Text>
      <Button
        title="Switch to French"
        onPress={() => changeLanguage("French")}
      />
      <br />
      <Button
        title="Switch to Spanish"
        onPress={() => changeLanguage("Spanish")}
      />
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
});

export default LanguageScreen;
