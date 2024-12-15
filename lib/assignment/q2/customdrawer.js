import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useUserRole } from './usercontext';

const CustomDrawer = (props) => {
  const { userRole, setUserRole } = useUserRole();

  const handleLogout = () => {
    setUserRole("user"); 
    props.navigation.navigate("User");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmc3_t-xwu-K0e3GTGE3LeaKlv1UYe9QcETQ&s",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Maryam Malik</Text>
      </View>
      <DrawerItemList {...props} />
      {userRole === "admin" && (
        <DrawerItem
          label="Admin Panel"
          onPress={() => props.navigation.navigate("Admin")}
        />
      )}
      <DrawerItem
        label="Logout"
        onPress={handleLogout} // Use the handleLogout function
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawer;