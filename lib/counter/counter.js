import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CounterContext } from "./countercontext";

const Counter = () => {
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
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
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Counter;
