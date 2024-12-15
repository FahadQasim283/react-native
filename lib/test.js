// import React, { useEffect, useState, createContext, useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Switch,
//   TextInput,
//   Button,
//   Alert,
// } from "react-native";
// import { ref, get, push } from "firebase/database";
// import database from "./firebase";

// const Drawer = createDrawerNavigator();
// const ThemeContext = createContext();

// // Theme Provider
// function ThemeProvider({ children }) {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const toggleTheme = () => setIsDarkMode((prev) => !prev);

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// function useTheme() {
//   return useContext(ThemeContext);
// }

// // Add User Screen
// function AddUserScreen() {
//   const { isDarkMode } = useTheme();
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [language, setLanguage] = useState("");

//   const handleAddUser = async () => {
//     if (name && age && language) {
//       try {
//         const newUserRef = ref(database, "students");
//         await push(newUserRef, {
//           name,
//           age: parseInt(age, 10),
//           language,
//         });
//         Alert.alert("Success", "User added successfully!");
//         setName("");
//         setAge("");
//         setLanguage("");
//       } catch (error) {
//         console.error("Error adding user:", error);
//         Alert.alert("Error", "Failed to add user. Please try again.");
//       }
//     } else {
//       Alert.alert("Validation Error", "Please fill in all fields.");
//     }
//   };

//   return (
//     <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
//       <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
//         Add New User
//       </Text>
//       <TextInput
//         style={isDarkMode ? styles.darkInput : styles.lightInput}
//         placeholder="Name"
//         placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={isDarkMode ? styles.darkInput : styles.lightInput}
//         placeholder="Age"
//         placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
//         keyboardType="numeric"
//         value={age}
//         onChangeText={setAge}
//       />
//       <TextInput
//         style={isDarkMode ? styles.darkInput : styles.lightInput}
//         placeholder="Language"
//         placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
//         value={language}
//         onChangeText={setLanguage}
//       />
//       <Button title="Add User" onPress={handleAddUser} />
//     </View>
//   );
// }

// // Home Screen
// function Home() {
//   const { isDarkMode } = useTheme();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const snapshot = await get(ref(database, "students"));
//         if (snapshot.exists()) {
//           const dataList = snapshot.val();
//           setData(Object.values(dataList));
//         } else {
//           console.log("No data available");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={isDarkMode ? styles.darkItem : styles.lightItem}>
//       <Text style={isDarkMode ? styles.darkText : styles.lightText}>
//         Name: {item.name}
//       </Text>
//       <Text style={isDarkMode ? styles.darkText : styles.lightText}>
//         Age: {item.age}
//       </Text>
//       <Text style={isDarkMode ? styles.darkText : styles.lightText}>
//         Language: {item.language}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
//       <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
//         Users
//       </Text>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// // App Component
// export default function App() {
//   return (
//     <ThemeProvider>
//       <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Add User" component={AddUserScreen} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   lightContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//   },
//   darkContainer: {
//     flex: 1,
//     backgroundColor: "#121212",
//     padding: 10,
//   },
//   lightHeading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   darkHeading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   lightInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   darkInput: {
//     borderWidth: 1,
//     borderColor: "#555",
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#1e1e1e",
//     color: "#fff",
//   },
// });
//q2

import React, { useState, useEffect, createContext, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv5lsLHulVU1ycZpPDKnVrLp7mG1lhTf8",
  authDomain: "language-learning-a5270.firebaseapp.com",
  databaseURL:
    "https://language-learning-a5270-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "language-learning-a5270",
  storageBucket: "language-learning-a5270.appspot.com",
  messagingSenderId: "201037258550",
  appId: "1:201037258550:web:09a2d9d11ae9458b45dd97",
  measurementId: "G-PXKPZT62MD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Context for User Role Management
const UserContext = createContext();

function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // Default role is null (not logged in)
  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

// Screens
function LoginScreen({ navigation }) {
  const { setUserRole } = useUser();

  const handleLogin = (role) => {
    setUserRole(role);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Button title="Login as User" onPress={() => handleLogin("user")} />
      <Button title="Login as Admin" onPress={() => handleLogin("admin")} />
    </View>
  );
}

function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database, "students"));
        if (snapshot.exists()) {
          const dataList = snapshot.val();
          setData(Object.values(dataList));
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Data</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Language: {item.language}</Text>
          </View>
        )}
      />
    </View>
  );
}

function AddDataScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("");

  const handleAddData = async () => {
    if (!name || !age || !language) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      const newDataRef = ref(database, "students");
      await push(newDataRef, {
        name,
        age: parseInt(age, 10),
        language,
      });
      Alert.alert("Success", "Data added successfully");
      setName("");
      setAge("");
      setLanguage("");
    } catch (error) {
      console.error("Error adding data:", error);
      Alert.alert("Error", "Failed to add data");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Language"
        value={language}
        onChangeText={setLanguage}
      />
      <Button title="Add Data" onPress={handleAddData} />
    </View>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  const { userRole, setUserRole } = useUser();

  const handleLogout = () => {
    setUserRole(null);
    Alert.alert("Logged Out", "You have been logged out.");
    props.navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>User Name</Text>
        <Text style={styles.role}>Role: {userRole}</Text>
      </View>
      <DrawerItem
        label="View Data"
        onPress={() => props.navigation.navigate("Home")}
      />
      {userRole === "admin" && (
        <DrawerItem
          label="Add Data"
          onPress={() => props.navigation.navigate("AddData")}
        />
      )}
      <Button title="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

// Main App
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="AddData" component={AddDataScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dataItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "gray",
  },
});
