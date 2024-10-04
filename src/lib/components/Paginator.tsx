import { Animated, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { theme } from "@/styles/theme";

const Paginator = ({
  data,
  currentItem,
  dotStyle,
}: {
  data: any;
  currentItem: number;
  dotStyle?: any;
}) => {
  const { width } = useWindowDimensions();
  const styles = sheetStyles(width, data?.length ?? 1);
  return (
    <View
      style={{
        flexDirection: "row",
        // height: 64,
        alignItems: "center",
        justifyContent: "center",
        width: width,
      }}
    >
      {data.map((_: any, i: number) => {
        const visited = i <= currentItem ? styles.markedDot : "";
        return <Animated.View style={[styles.dot, visited, dotStyle]} key={i.toString()} />;
      })}
    </View>
  );
};

export default Paginator;

const sheetStyles = (width: any, noOfItems: number) =>
  StyleSheet.create({
    dot: {
      height: 3,
      width: width / noOfItems - 10,
      // borderRadius: 2,
      backgroundColor: "#B0B0B0",
      margin: 0,
    },
    markedDot: {
      backgroundColor: theme.colors["bg-blue"], // Ensure the active dot has the proper background color
      // transition: "background-color 0.3s ease-in-out", // Smooth transition for color change
    },
  });
