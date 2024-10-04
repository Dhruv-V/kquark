import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Goals from "./goals-stack/Goals";
import Home from "./home-stack/Home";
import Profile from "./profile-stack/Profile";

type MainSectionsType = {
  selectedTab: "home" | "profile" | "goals";
};

const MainSections = ({ selectedTab }: MainSectionsType) => {
  switch (selectedTab) {
    case "home":
      return <Home />;
    case "goals":
      return <Goals />;
    case "profile":
      return <Profile />;
  }
};

export default MainSections;

const styles = StyleSheet.create({});
