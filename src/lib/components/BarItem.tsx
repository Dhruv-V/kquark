import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/styles/theme";

const BarItem = ({
  item,
  count,
  onPress,
  barClicked,
}: {
  item: string;
  count: any;
  onPress: () => void;
  barClicked: boolean;
}) => {
  const style =
    item === "Not Started"
      ? { backgroundColor: theme.colors["light-blue"] }
      : item === "In Progress"
        ? { backgroundColor: theme.colors["bg-blue"] }
        : item === "Completed"
          ? { backgroundColor: theme.colors["dark-green"] }
          : item === "All"
            ? { backgroundColor: "#7A82F4" }
            : { backgroundColor: "transparent" };
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.item,
        !barClicked
          ? { backgroundColor: theme.colors["bg-grey"], borderColor: theme.colors["border-grey"] }
          : { backgroundColor: theme.colors["bg-grey"], borderColor: theme.colors["text-grey1"] },
        item === "All" ? { width: 100 } : {},
      ]}
    >
      <Text style={[styles.text]}>{item}</Text>
      <View style={[style, styles.countWrapper]}>
        <Text style={[styles.text]}>{count[item]}</Text>
      </View>
    </Pressable>
  );
};

export default BarItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    width: 150,
    flexDirection: "row",
    marginRight: 10,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: theme.colors["text-grey3"],
    fontFamily: theme.fonts.secondary,
    fontWeight: "500",
    // padding: 2,
    borderRadius: 5,
    alignSelf: "center",
  },
  countWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: 25,
    height: 25,
  },
});
