import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useOnboarding } from "@/features/user/hooks/useOnBoarding";
import { theme } from "@/styles/theme";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";

const ProfilePage = () => {
  let { OnBoardingValues } = useOnboarding();
  const { setIsAuthenticated } = useIsAuthenticated();

  const { name, dob, height, salary, satisfaction, country, interests, contactTime }: any =
    OnBoardingValues.name
      ? OnBoardingValues
      : {
          contactTime: "2024-09-18T07:28:20.000Z",
          country: "USA",
          dob: "2024-09-16",
          height: "12",
          interests: ["Technology", "Finance"],
          name: "Dhruv",
          salary: "200",
          satisfaction: 4,
        };

  const formatContactTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };

  // Animated value for sections
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsAuthenticated(false)} style={styles.logoutButton}>
        <MaterialIcons name="logout" size={20} color={theme.colors["text-grey3"]} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: theme.colors["bg-grey"],
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: theme.colors["border-grey"],
    backgroundColor: theme.colors["bg-grey"],
  },
  name: {
    fontSize: 24,
    color: theme.colors.text,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: theme.fonts.primary,
  },
  info: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: theme.colors["bg-grey"],
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  rowItem: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  section: {
    marginBottom: 20,
    backgroundColor: theme.colors["bg-grey"],
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: theme.colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderColor: theme.colors["text-grey3"],
    borderWidth: 1,
  },
  chipText: {
    color: theme.colors.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: theme.colors["text-grey3"],
    fontSize: 16,
    marginLeft: 8,
    fontFamily: theme.fonts.secondary,
  },
});

export default ProfilePage;
