// Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";
import { useIsNewUser } from "@/features/user/hooks/useNewUser";
import MainList from "./MainList";
import { theme } from "@/styles/theme";
import { useError } from "@/features/user/hooks/useError";
import ErrorPopup from "@/lib/components/ErrorPopup";

const AppNavigator = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const { isNewUser } = useIsNewUser();
  const { error, setError } = useError();

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: theme.colors.background }}>
      {error.message && error.show ? (
        <ErrorPopup
          onClose={() => setError({ message: "", show: false })}
          show={error.show}
          errorText={
            typeof error.message === "string"
              ? error.message
              : JSON.stringify(error?.message ?? "An unknown error occurred")
          }
        />
      ) : null}
      {/* <ImageBackground style={styles.bgImage} source={theme.colors.backgroundImg} /> */}
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        {/* <MainNavigator /> */}
      </NavigationContainer>
      {/* <MainList /> */}
    </View>
    // </View>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  bgImage: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
});
