import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen () {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};