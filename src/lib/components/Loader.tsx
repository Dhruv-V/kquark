// Loader.js
import React, { Children } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={theme.colors["text-grey3"]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
