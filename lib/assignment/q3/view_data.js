import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import ArticalViewScreen from "../q1/articals_view";

const fetchService = async (url, method, body = null, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      retries -= 1;
      if (retries === 0) {
        Alert.alert("Error", "Failed to perform operation. Please try again.");
        throw error;
      }
    }
  }
};

const BASE_URL = "http://localhost:8081/articals";

const ViewApiData = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchArticles = async () => {
    try {
      const fetchedArticles = await fetchService(BASE_URL, "GET");
      setArticles(fetchedArticles);
    } catch (error) {
      console.log("errrorrrr",error)
    }
  };

  const createArticle = async () => {
    if (!title || !author) {
      Alert.alert("Error", "Please fill in both fields!");
      return;
    }
    try {
      const newArticle = await fetchService(BASE_URL, "POST", {
        title,
        author,
      });
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
      setTitle("");
      setAuthor("");
      Alert.alert("Success", "Article created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const updateArticle = async (id) => {
    try {
      const updatedArticle = await fetchService(`${BASE_URL}/${id}`, "PUT", {
        title: "Updated Title",
        author: "Updated Author",
      });
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? updatedArticle : article
        )
      );
      Alert.alert("Success", "Article updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // Delete an article
  const deleteArticle = async (id) => {
    try {
      await fetchService(`${BASE_URL}/${id}`, "DELETE");
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
      Alert.alert("Success", "Article deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Articles Management</Text>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Article Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Author Name"
          value={author}
          onChangeText={setAuthor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchArticles}>
          <Text style={styles.buttonText}>Fetch Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={createArticle}>
          <Text style={styles.buttonText}>Create Article</Text>
        </TouchableOpacity>
      </View>
          <ArticalViewScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "#555",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallButton: {
    padding: 5,
    flex: 1,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5733",
  },
});

export default ViewApiData;
