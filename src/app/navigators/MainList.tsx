import React, { useRef, useState, useCallback, useEffect } from "react";
import { Animated, FlatList, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "@/styles/theme";
import MainSections from "../app-tabs/MainSections";

const MainList = () => {
  const [selectedTab, setSelectedTab] = useState<"home" | "goals" | "profile">("home");

  // Animation values for each tab
  const homeAnim = useRef(new Animated.Value(1)).current;
  const goalsAnim = useRef(new Animated.Value(0)).current;
  const profileAnim = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const currentIndex = useRef(0);

  const flatListRef = useRef<any>(null);

  // Function to scroll to a specific index
  const scrollToIndex = (index: number) => {
    flatListRef?.current?.scrollToIndex({ index, animated: true });
  };

  const screens = ["home", "goals", "profile"];

  // Handle tab clicks
  const onTabClick = (tab: "home" | "goals" | "profile") => {
    setSelectedTab(tab);

    const index = screens.indexOf(tab);
    console.log("index : ", index);
    scrollToIndex(index);
    Animated.parallel([
      Animated.timing(homeAnim, {
        toValue: tab === "home" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(goalsAnim, {
        toValue: tab === "goals" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(profileAnim, {
        toValue: tab === "profile" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const viewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== currentIndex.current) {
        currentIndex.current = newIndex;
        onTabClick(viewableItems[0].item);
        console.log("1");
      }
    }
  }, []);

  const interpolateStyle = (animation: Animated.Value) => ({
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(44,44,44,0)", "rgba(44,44,44,1)"],
    }),
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors["bg-grey"], theme.colors["text-grey1"]],
    }),
    borderWidth: animation.interpolate({
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

  // Select "home" tab initially
  useEffect(() => {
    onTabClick("home");
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={styles.navigatorContainer}>
        <Pressable onPress={() => onTabClick("home")}>
          <Animated.View style={[styles.iconContainer, interpolateStyle(homeAnim)]}>
            <AntDesign size={24} name="home" color={theme.colors.text} />
          </Animated.View>
        </Pressable>
        <Pressable onPress={() => onTabClick("goals")}>
          <Animated.View style={[styles.iconContainer, interpolateStyle(goalsAnim)]}>
            <FontAwesome5 name="clipboard-list" size={24} color={theme.colors.text} />
          </Animated.View>
        </Pressable>
        <Pressable onPress={() => onTabClick("profile")}>
          <Animated.View style={[styles.iconContainer, interpolateStyle(profileAnim)]}>
            <AntDesign name="user" size={24} color={theme.colors.text} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "rgba(44,44,44,.7)",
    borderColor: theme.colors["border-grey"],
    borderWidth: 2,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    borderRadius: 50,
    alignSelf: "center",
  },
  iconContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default MainList;
