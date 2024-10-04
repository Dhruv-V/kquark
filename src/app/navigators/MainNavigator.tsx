import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Dashboard from "../app-tabs/home-stack/Home";
import Goals from "../app-tabs/goals-stack/Goals";
import Profile from "../app-tabs/profile-stack/Profile";
import { MyTabBar } from "./TabBar";
import { theme } from "@/styles/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export type RootStackParamList = {
  Dashboard: undefined;
  Goals: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();

const screenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: "transparent",
  },
  tabBarActiveBackgroundColor: "transparent",
  tabBarInactiveBackgroundColor: "transparent",
};

const MainNavigator = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const tabOptions = (title: string): BottomTabNavigationOptions => {
    return {
      tabBarIcon: ({ focused }) => {
        const color = "black";
        return (
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              ...(focused ? { transform: [{ scale: scaleAnim }] } : {}),
            }}
          >
            {title === "DashBoard" ? (
              <AntDesign size={24} name="home" color={theme.colors.text} />
            ) : title === "Goals" ? (
              <FontAwesome5 name="clipboard-list" size={24} color={theme.colors.text} />
            ) : (
              <AntDesign name="user" size={24} color={theme.colors.text} />
            )}
            {/* <Text style={styles(focused).tabTitle}>{title}</Text> */}
          </Animated.View>
        );
      },
    };
  };
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} screenOptions={screenOptions}>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ ...tabOptions("DashBoard") }} />
      <Tab.Screen name="Goals" component={Goals} options={{ ...tabOptions("Goals") }} />
      <Tab.Screen name="Profile" component={Profile} options={{ ...tabOptions("Profile") }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = (focused: boolean) =>
  StyleSheet.create({
    tabTitle: { fontSize: 12, fontWeight: "500", color: "black" },
  });
