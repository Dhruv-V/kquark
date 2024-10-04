import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export const Topbar = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable>
        <Entypo name="menu" size={36} color={theme.colors["text-grey3"]} />
      </Pressable>
      <Pressable>
        <View
          style={{
            height: 19,
            width: 19,
            backgroundColor: theme.colors.error,
            position: "absolute",
            zIndex: 2,
            top: 0,
            right: 0,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors["text-grey3"],
              fontFamily: theme.fonts.secondary,
              fontWeight: "600",
            }}
          >
            1
          </Text>
        </View>
        <Ionicons
          name="notifications-circle-outline"
          size={36}
          color={theme.colors["text-grey3"]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  createButton: {
    backgroundColor: theme.colors["bg-green"],
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15, // Slightly less rounded
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors["text-grey1"],
    flexDirection: "row",
    gap: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createText: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
    fontWeight: "bold", // Adds a bit more emphasis to the text
  },
});
