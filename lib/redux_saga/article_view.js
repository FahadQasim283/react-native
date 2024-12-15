import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesRequest } from "./actions";

const ArticleViewScreen = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticlesRequest());
  }, [dispatch]);

  const renderArticle = ({ item }) => (
    <View style={styles.articleCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By: {item.author}</Text>
      <Text style={styles.url} numberOfLines={1} ellipsizeMode="tail">
        {item.url}
      </Text>
      <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Articles</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticle}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#EAEFF1",  
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#2C3E50",  
    textAlign: "center",
    textTransform: "uppercase",  
  },
  listContent: {
    paddingBottom: 20,
  },
  articleCard: {
    marginVertical: 12,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#BDC3C7",  
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#34495E",  
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7F8C8D",  
    marginBottom: 6,
  },
  url: {
    fontSize: 16,
    color: "#2980B9",  
    textDecorationLine: "underline",
    marginBottom: 8,
  },
  tags: {
    fontSize: 14,
    fontWeight: "500",
    color: "#27AE60",  
  },
});
export default ArticleViewScreen;

