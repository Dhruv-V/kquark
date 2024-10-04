import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, type ReactNode } from "react";
import { theme } from "@/styles/theme";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const ErrorPopup = ({
  errorText,
  show,
  onClose,
}: {
  errorText: string;
  show: boolean;
  onClose: () => void;
}) => {
  const { height, width } = useWindowDimensions();
  const bounce = useRef(new Animated.Value(-100)).current;
  const lineWidth = useRef(new Animated.Value(0)).current; // Animated value for line width
  const styles = popupStyle(height, width);

  const onPopupClose = () => {
    fadeOutPopup();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const animatedLineWidth = lineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.75], // Full width of the popup
  });

  useEffect(() => {
    if (show) {
      // Animate line width to represent duration
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false, // Use native driver is not supported for width animation
      }).start(() => {
        onPopupClose();
      });
    }
  }, [show]);
  useEffect(() => {
    Animated.timing(bounce, {
      toValue: 0,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const fadeOutPopup = () => {
    Animated.timing(bounce, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={[styles.errorContainer, { transform: [{ translateY: bounce }] }]}>
      <View style={styles.innerContent}>
        <Text style={styles.text}>{errorText}</Text>
        <TouchableHighlight style={{ width: "10%", alignItems: "center" }} onPress={onPopupClose}>
          <AntDesign name="closecircle" size={18} color={theme.colors["text-grey1"]} />
        </TouchableHighlight>
      </View>
      <Animated.View style={[styles.line, { width: animatedLineWidth }]} />
    </Animated.View>
  );
};

export default ErrorPopup;

const popupStyle = (height: any, width: any) =>
  StyleSheet.create({
    errorContainer: {
      height: 0.05 * height,
      width: 0.8 * width,
      position: "absolute",
      top: 50,
      backgroundColor: theme.colors["bg-grey"],
      marginHorizontal: "auto",
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors["border-grey"],
      // borderColor: theme.colors.error,
      zIndex: 100,
    },
    innerContent: {
      flexDirection: "row",
      alignItems: "center",
      // justifyContent: "space-between",
      padding: 10,
    },
    text: {
      color: theme.colors["text-grey3"],
      fontFamily: theme.fonts.primary,
      textAlign: "center",
      width: "90%",
    },
    line: {
      height: 2, // Height of the line
      // backgroundColor: theme.colors.error,
      backgroundColor: "#FF7F7F",
      alignSelf: "stretch",
      marginTop: -1,
      marginLeft: 4,
    },
  });
