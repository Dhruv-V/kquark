import { theme } from "@/styles/theme";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export const GoalTile = ({
  goal,
  onPress,
  style,
}: {
  goal: any;
  onPress: () => void;
  style?: any;
}) => {
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Not Started":
        return theme.colors["light-blue"];
      case "In Progress":
        return theme.colors["bg-blue"];
      case "Completed":
        return theme.colors["bg-green"];
      default:
        return theme.colors["light-blue"];
    }
  };

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[styles.tileContainer, { borderLeftColor: getStatusColor(goal.status) }, style]}
      >
        <LinearGradient
          colors={["transparent", theme.colors.background]} // Fading from transparent to the background color
          start={{ x: 1, y: 0 }} // Start of the gradient
          end={{ x: 0, y: 1 }} // End of the gradient
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            borderRadius: 10,
            zIndex: 2,
          }}
        />
        {goal.image && <Image source={{ uri: goal.image }} style={styles.imageBackground} />}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "baseline",
            zIndex: 3,
            paddingLeft: 10,
            paddingRight: 30,
          }}
        >
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.category}>{goal.category}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  tileContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors["bg-grey"],
    borderRadius: 8,
    marginBottom: 10,
    borderColor: theme.colors["border-grey"],
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary,
    marginRight: 5,
  },
  category: {
    fontSize: 12,
    color: theme.colors["text-grey1"],
    fontFamily: theme.fonts.secondary,
    marginBottom: 5,
  },
});
