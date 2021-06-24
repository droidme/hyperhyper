import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  HomeScreen,
  AddMapScreen,
  MapScreen
} from "./screens";
import { ThemeProvider } from "react-native-elements";

const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: '#172B46',
  },
};

const globalScreenOptions = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  backgroundColor: "white"
};

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
          <Stack.Screen name="AddMap" component={AddMapScreen}></Stack.Screen>
          <Stack.Screen name="Map" component={MapScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
