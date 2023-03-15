import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createStackNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          alignItems: "center",
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#ff6c00",
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публикации",
          tabBarItemStyle: {
            height: 40,
            alignSelf: "center",
            marginRight: 31,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Создать публикацию",
          tabBarItemStyle: {
            height: 40,
            alignSelf: "center",
            marginRight: 31,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 40,
            alignSelf: "center",
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};