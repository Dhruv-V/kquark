import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "@/styles/theme";
import Login from "../auth-stack/Login";
import CreateUser from "../auth-stack/CreateUser";
import ConfirmSignUp from "../auth-stack/ConfirmSignup";
import ForgotPassword from "../auth-stack/ForgotPassword";
import ConfirmForgotPassword from "../auth-stack/ConfirmForgotPassword";
import OnBoarding from "../auth-stack/OnBoarding";
import pattern from "@/assets/media/pattern.png";
import LottieView from "lottie-react-native";
export type RootStackParamList = {
  Login: undefined;
  CreateUser: undefined;
  ForgotPassword: undefined;
  ConfirmForgotPassword: { email: string };
  ConfirmSignUp: { email: string };
  OnBoarding: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  const { width, height } = useWindowDimensions();
  const styles = AuthStyles(width, height);
  return (
    <View style={{ backgroundColor: "red", flex: 1, zIndex: 5 }}>
      <Stack.Navigator
        screenOptions={(e: any) => {
          console.log(e);
          return {
            title: " ",
            headerStyle: { backgroundColor: theme.colors["bg-header"] },
            cardStyle: { backgroundColor: theme.colors.card },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
            ...(e?.route?.name === "OnBoarding" && { headerShown: false }),
          };
        }}
      >
        {/* <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"CreateUser"} component={CreateUser} />
        <Stack.Screen name={"ConfirmSignUp"} component={ConfirmSignUp} />
        <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
        <Stack.Screen name={"ConfirmForgotPassword"} component={ConfirmForgotPassword} /> */}
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      </Stack.Navigator>
      {/* <Image source={pattern} style={styles.pattern} /> */}
      {/* <View style={styles.animationWrapper}>
        <LottieView
          source={require("../../assets/media/thinking.json")} // Use the downloaded Lottie animation
          autoPlay
          loop
          style={styles.animation}
        />
      </View> */}
    </View>
  );
};

export default AuthNavigator;

const AuthStyles = (width: any, height: any) =>
  StyleSheet.create({
    pattern: {
      position: "absolute",
      bottom: 0,
    },
    animation: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: -1,
      pointerEvents: "none",
    },
    animationWrapper: {
      position: "absolute",
      bottom: -30,
      right: 0,
      width: width * 0.6,
      height: height * 0.4,
      zIndex: 0,
      pointerEvents: "none",
    },
  });
