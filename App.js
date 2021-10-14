import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutPage";
import ManageScreen from "./screens/ManagePage";
import CameraPage from "./screens/CameraPage";
import ItemsPage from "./screens/ItemsPage"
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Manage" component={ManageScreen} />
        <Drawer.Screen name="Images" component={CameraPage} />
        <Drawer.Screen name="Items" component={ItemsPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
