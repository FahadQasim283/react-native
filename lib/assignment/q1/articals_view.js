import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, FlatList, TextInput } from "react-native";
import { getDatabase, ref, set, onValue } from "firebase/database";
import databaseApp from "../../db/firebase";

const database = getDatabase(databaseApp);

const ArticalViewScreen = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const articlesRef = ref(database, "articles/");
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      const articlesList = data ? Object.values(data) : [];
      setArticles(articlesList);
    });
  }, []);

  const addArticle = () => {
    const newArticle = {
      id: Date.now().toString(),
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      title,
      url,
    };
    const articleRef = ref(database, "articles/" + newArticle.id);
    set(articleRef, newArticle)
      .then(() => {
        console.log("Article added successfully!");
        setTitle("");
        setAuthor("");
        setUrl("");
        setTags("");
      })
      .catch((error) => {
        console.error("Error adding article: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Articles</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>By: {item.author}</Text>
            <Text style={styles.url}>{item.url}</Text>
            <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  article: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "gray",
  },
  url: {
    fontSize: 14,
    color: "blue",
  },
  tags: {
    fontSize: 12,
    color: "green",
  },
});
export default ArticalViewScreen;
