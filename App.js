// import { NavigationContainer } from "@react-navigation/native";
// import { UserRoleProvider } from "./lib/assignment/q2/usercontext";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { AdminScreen, HomeScreen, UserScreen } from "./lib/assignment/q2/home";
// import CustomDrawer from "./lib/assignment/q2/customdrawer";
// import LoginPage from "./lib/assignment/q2/login";

// const Drawer = createDrawerNavigator();
// const App = () => {
//   return (
//     <UserRoleProvider>
//       <NavigationContainer>
//         <Drawer.Navigator
//           drawerContent={(props) => <CustomDrawer {...props} />}
//         >
//           <Drawer.Screen name="Home" component={HomeScreen} />
//           <Drawer.Screen name="User " component={UserScreen} />
//           <Drawer.Screen name="Admin" component={AdminScreen} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </UserRoleProvider>
//   );
// };
// export default App;

import { Provider } from "react-redux";
import ArticleViewScreen from "./lib/redux_saga/article_view";
import store from "./lib/redux_saga/store";
const App = () => (
  <Provider store={store}>
    <ArticleViewScreen />
  </Provider>
);
export default App;
