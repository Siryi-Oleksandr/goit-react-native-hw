import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RegistrationScreen, LoginScreen } from "./src/Screens/auth";
import {
  CreatePostsScreen,
  PostsScreen,
  CommentsScreen,
  ProfileScreen,
  Home,
  MapScreen,
} from "./src/Screens/main";
import { pallete } from "./src/helpers/variables";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

export const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
          // initialParams={{ orientation }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            // headerRight: () => LogOut(),
            headerShown: false,
          }}
        />

        <HomeStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <HomeStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerTitleAlign: "center" }}
        />
      </HomeStack.Navigator>

      // <Tab.Navigator
      //   initialRouteName="Home"
      //   barStyle={styles.tabBar}
      //   activeColor={pallete.accent}
      //   labeled={false}
      //   shifting={true}
      // >
      //   <Tab.Screen
      //     name="Home"
      //     component={Home}
      //     labeled={false}
      //     options={{
      //       tabBarIcon: ({ color }) => (
      //         <MaterialCommunityIcons
      //           name="view-grid-outline"
      //           color={color}
      //           size={24}
      //         />
      //       ),
      //     }}
      //   />
      //   <Tab.Screen
      //     name="Create"
      //     component={CreatePostsScreen}
      //     options={{
      //       tabBarIcon: ({ color }) => (
      //         <MaterialCommunityIcons name="plus" color={color} size={24} />
      //       ),
      //     }}
      //   />
      //   <Tab.Screen
      //     name="Profile"
      //     component={ProfileScreen}
      //     options={{
      //       tabBarIcon: ({ color }) => (
      //         <MaterialCommunityIcons
      //           name="account-outline"
      //           color={color}
      //           size={24}
      //         />
      //       ),
      //     }}
      //   />
      // </Tab.Navigator>
    );
  }
};

function LogOut() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginRight: 16,
      }}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <Icon name="sign-out" size={24} color={pallete.gray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: pallete.white,
    // paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.gray,
  },
});
