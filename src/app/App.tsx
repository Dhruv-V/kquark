import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigators/AppNavigator";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@/providers/amplify/amplify-provider";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "./AppLoading";

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "space-grotesk": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
      "space-grotesk-semibold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
      "space-grotesk-medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
      inter: require("../assets/fonts/Inter-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AmplifyProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </AmplifyProvider>
  );
}

export default App;
