import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-web";
export default function App() {
  const [getProduct, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/product").then((response) => {
      response.json().then((result) => {
        setProduct(result);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={getProduct}
        renderItem={({ item }) => <Text> {item.id} </Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
