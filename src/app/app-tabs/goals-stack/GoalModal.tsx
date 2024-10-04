import { theme } from "@/styles/theme";
import { Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import LottieView from "lottie-react-native";

export const GoalModal = ({
  visible,
  onClose,
  goal,
}: {
  visible: boolean;
  onClose: () => void;
  goal: any;
}) => {
  const { width, height } = useWindowDimensions();
  const styles = modalStyles(height, width);
  const renderStars = (priority: string) => {
    switch (priority) {
      case "Low":
        return <MaterialIcons name="star" size={24} color={theme.colors["bg-green"]} />;
      case "Medium":
        return (
          <>
            <MaterialIcons name="star" size={24} color={theme.colors["bg-blue"]} />
            <MaterialIcons name="star" size={24} color={theme.colors["bg-blue"]} />
          </>
        );
      case "High":
        return (
          <>
            <MaterialIcons name="star" size={24} color={theme.colors["error"]} />
            <MaterialIcons name="star" size={24} color={theme.colors["error"]} />
            <MaterialIcons name="star" size={24} color={theme.colors["error"]} />
          </>
        );
      default:
        return null;
    }
  };

  const bgColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return theme.colors["light-blue"];
      case "In Progress":
        return theme.colors["bg-blue"];
      case "Completed":
        return theme.colors["bg-green"];
      default:
        return theme.colors["bg-grey"];
    }
  };
  const statusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <MaterialCommunityIcons
            name="progress-star"
            size={24}
            color={theme.colors["text-grey3"]}
          />
        );
      case "Not Started":
        return <Entypo name="new" size={24} color={theme.colors["text-grey3"]} />;
      case "Completed":
        return (
          <Ionicons name="checkmark-done-circle" size={24} color={theme.colors["text-grey3"]} />
        );
    }
  };

  return (
    <Modal
      style={{ height: "50%", position: "absolute", bottom: 0 }}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.wrapper}>
        <View style={styles.closeBtn}></View>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close-outline" size={24} color={theme.colors["text-grey3"]} />
        </Pressable>
        <View style={{ height: 0.3 * height }}>
          <Image style={styles.mainImage} source={{ uri: goal.image }} />
          <LinearGradient
            colors={["transparent", theme.colors.background]} // Fading from transparent to the background color
            style={styles.gradient}
          />
          <LottieView
            source={require("../../../assets/media/Animation - 1727423509453.json")} // Use the downloaded Lottie animation
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <View style={styles.contentSection}>
          <View style={styles.topSection}>
            <Text style={styles.title}>{goal.title}</Text>
            <Text style={styles.category}>{goal.category}</Text>
          </View>
          <Text style={styles.desc}>{goal.description}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.prioritySection}>
              <View style={styles.starsContainer}>{renderStars(goal.priorityLevel)}</View>
              <Text style={styles.priorityLabel}>{goal.priorityLevel} Priority</Text>
            </View>
            <View
              style={[
                styles.prioritySection,
                { backgroundColor: bgColor(goal.status), paddingHorizontal: 20 },
              ]}
            >
              {statusIcon(goal.status)}
              <Text style={styles.priorityLabel}>{goal.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = (height: any, width: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    closeBtn: {
      height: 24,
      width: 24,
      backgroundColor: "rgba(0,0,0,.2)",
      borderRadius: 12,
      alignItems: "flex-end",
      zIndex: 2,
      position: "absolute",
      right: 10,
      top: 50,
    },
    mainImage: { height: 0.3 * height, width: width },
    gradient: {
      bottom: 100,
      height: 100, // Adjust height for how much you want the fade
      width: "100%",
      zIndex: 1,
    },
    topSection: {
      //   bottom: 100,
      margin: 10,
    },
    title: {
      color: theme.colors["text-grey3"],
      fontFamily: theme.fonts.primaryMedium,
      fontSize: 24,
    },
    category: {
      paddingTop: 3,
      color: theme.colors["text-grey1"],
      fontFamily: theme.fonts.secondary,
      fontSize: 16,
      fontWeight: "600",
    },
    desc: {
      padding: 10,
      color: theme.colors["text-grey2"],
      fontFamily: theme.fonts.primary,
      fontSize: 16,
    },
    contentSection: {},
    prioritySection: {
      margin: 10,
      padding: 10,
      width: "auto",
      backgroundColor: theme.colors["bg-grey"],
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    priorityTitle: {
      color: theme.colors["text-grey3"],
      fontSize: 16,
      fontFamily: theme.fonts.primary,
      fontWeight: "400",
    },
    priorityLabel: {
      color: theme.colors["text-grey2"],
      fontSize: 14,
      fontFamily: theme.fonts.secondary,
      fontWeight: "600",
    },
    starsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    animation: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 3,
      pointerEvents: "none",
    },
  });
