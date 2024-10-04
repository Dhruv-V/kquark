import { Animated, StyleSheet, Text, View, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { theme } from "@/styles/theme";

const AppLoading = () => {
  const headingScale = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate heading
    Animated.timing(headingScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    Animated.timing(subtitleOpacity, {
      toValue: 1,
      duration: 800,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.Text
        style={[
          styles.heading,
          {
            transform: [{ scale: headingScale }],
          },
        ]}
      >
        Kquark
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
          },
        ]}
      >
        Let's Begin Your Transformational Journey.
      </Animated.Text>
    </Animated.View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  heading: {
    fontSize: 40,
    color: "white",
    fontWeight: "700",
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 20,
    color: "#dcdcdc",
    textAlign: "center",
    opacity: 0, // Initial opacity is set to 0
  },
});
