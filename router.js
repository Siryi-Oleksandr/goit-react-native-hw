import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
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
        initialRouteName="Home"
        barStyle={styles.tabBar}
        activeColor={pallete.accent}
        labeled={false}
        shifting={true}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          labeled={false}
          options={{
            // tabBarBadgeStyle: { backgroundColor: pallete.accent },
            // tabBarActiveTintColor: pallete.accent,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={24} />
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
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: pallete.white,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.grey,
  },
});

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
