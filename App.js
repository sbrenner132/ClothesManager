import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutPage";
import ManageScreen from "./screens/ManagePage";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Clothes Manager" }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Manage" component={ManageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
