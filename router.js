import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { RegistrationScreen, LoginScreen } from "./src/Screens/auth";
import { ProfileScreen } from "./src/Screens/ProfileScreen";
import { CommentsScreen } from "./src/Screens/CommentsScreen";
import { CreatePostsScreen } from "./src/Screens/CreatePostsScreen";
import { pallete } from "./src/helpers/variables";

const AuthStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      <Tab.Navigator
        initialRouteName="Comment"
        barStyle={{ backgroundColor: "tomato", paddingBottom: 16 }}
        activeColor={pallete.white}
        labeled={false}
      >
        <Tab.Screen
          name="Comment"
          component={CommentsScreen}
          labeled={false}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid-outline"
                color={color}
                size={36}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={36} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={36}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
};