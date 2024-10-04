import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";
import { theme } from "@/styles/theme";

const Home = () => {
  const { setIsAuthenticated } = useIsAuthenticated();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 24,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary,
  },
});
