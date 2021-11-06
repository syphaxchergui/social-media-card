import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MyCardProvider } from "./src/context/MyCardProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import QRCodeScreen from "./src/screens/QRCodeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import DetailsHistoryScreen from "./src/screens/DetailsHistoryScreen";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
          let label;
          if (route.name === "Home") {
            label = "MyCard";
          } else if (route.name === "QRCode") {
            label = "QR Code";
          } else if (route.name === "History") {
            label = "Historique";
          }
          if (focused)
            return <Text style={{ fontSize: 12, color: color }}>{label}</Text>;
          return null;
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-bonfire" : "ios-bonfire-outline";
          } else if (route.name === "QRCode") {
            iconName = focused ? "ios-qr-code-sharp" : "ios-qr-code-outline";
          } else if (route.name === "History") {
            iconName = focused ? "ios-list-sharp" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return (
            <Ionicons name={iconName} size={focused ? 24 : 20} color={color} />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
      
      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='QRCode' component={QRCodeScreen} />
      <Tab.Screen name='History' component={HistoryScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeTab' component={HomeTabs} />
        <Stack.Screen name='DetailsHistory' component={DetailsHistoryScreen} />
      </Stack.Navigator>
      <StatusBar style={"auto"} />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <SafeAreaProvider>
      <MyCardProvider>
        <App />
      </MyCardProvider>
    </SafeAreaProvider>
  );
};
