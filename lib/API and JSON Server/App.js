import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getMovies = async () => {
    try {
      //  const response= await  fetch("https://reactnative.dev/movies.json");
      //    const result = await response.json();

      axios.get("http://localhost:3000/patients").then((result) => {
        console.log(result.data);
        //setData(result.data)
      });

      setData(result.movies);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
