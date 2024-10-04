import React, { useRef, useEffect } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { theme } from "@/styles/theme"; // Assuming you're using a theme file for colors

export const MyTabBar = ({ state, descriptors, navigation }: any) => {
  const animations = state.routes.map(() => useRef(new Animated.Value(0)).current);

  // Animate the selected tab on first mount (initially select "home")
  useEffect(() => {
    animateTab(state.index);
  }, []);

  const animateTab = (index: number) => {
    animations.forEach((anim: any, idx: any) => {
      Animated.timing(anim, {
        toValue: index === idx ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleTabPress = (index: number, routeName: string) => {
    const isFocused = state.index === index;

    if (!isFocused) {
      animateTab(index);
      navigation.navigate(routeName);
    }
  };

  const interpolateStyle = (animation: Animated.Value) => ({
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(44,44,44,0)", "black"],
    }),
    borderBottomColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors["bg-grey"], theme.colors["text-grey1"]],
    }),
    // borderRightColor: animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [theme.colors["bg-grey"], theme.colors["text-grey1"]],
    // }),
    // borderLeftColor: animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [theme.colors["bg-grey"], theme.colors["text-grey1"]],
    // }),
    borderBottomWidth: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.1],
        }),
      },
    ],
  });

  return (
    <View style={styles.navigatorContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const Icon = options.tabBarIcon;

        return (
          <Pressable
            key={route.key}
            onPress={() => handleTabPress(index, route.name)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                interpolateStyle(animations[index]),
                { backgroundColor: "transparent" },
              ]}
            >
              {Icon ? <Icon /> : null}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    position: "absolute",
    bottom: 10,
    // backgroundColor: theme.colors["text-grey1"],
    // borderBottomColor: theme.colors["border-grey"],
    // borderTopColor: "transparent",
    // borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    borderRadius: 50,
    alignSelf: "center",
  },
  iconContainer: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
