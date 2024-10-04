import { theme } from "@/styles/theme";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Topbar } from "./Topbar";
import { GoalTile } from "./GoalTile";
import { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import BarItem from "@/lib/components/BarItem";
import { useGoals } from "@/features/goals/hooks/useGoals";
import { useError } from "@/features/user/hooks/useError";
import Loader from "@/lib/components/Loader";
import useForceUpdate from "@/lib/hooks/useForceUpdate";
import { GoalModal } from "./GoalModal";

const Goals = ({ navigation, params }: any) => {
  const { width, height } = useWindowDimensions();
  const { getGoals } = useGoals();
  const [isPressed, setIsPressed] = useState(false);
  const forceUpdate = useForceUpdate();
  const { setError } = useError();
  const styles = goalStyles(height, width);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusCount, setStatusCount] = useState({
    "Not Started": 0,
    "In Progress": 0,
    Completed: 0,
  });
  const [goals, setGoals] = useState<any>([]);
  const [barClicked, setBarClicked] = useState<any>({
    All: true,
    "Not Started": false,
    "In Progress": false,
    Completed: false,
  });
  const handlePress = (goal: any) => {
    setSelectedGoal(goal);
    setModalVisible(true); // Show modal when a goal is pressed
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const updateCount = () => {
    const newState = { All: goals.length, "Not Started": 0, "In Progress": 0, Completed: 0 };
    goals?.forEach((goal: any) => {
      switch (goal.status) {
        case "Completed":
          newState["Completed"]++;
          break;
        case "In Progress":
          newState["In Progress"]++;
          break;
        case "Not Started":
          newState["Not Started"]++;
          break;
        default:
          break;
      }
    });
    setStatusCount(newState);
  };
  const onBarPress = (item: string) => {
    const newItem: any = {
      ...barClicked,
    };
    newItem[item] = !newItem[item];
    setBarClicked(newItem);
  };

  useEffect(() => {
    if (goals.length) updateCount();
  }, [goals]);

  const getAllGoals = async () => {
    try {
      const goalsArr = await getGoals.execute();
      if (goalsArr?.length) setGoals(goalsArr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllGoals();
  }, []);

  useEffect(() => {
    if (getGoals.error) {
      setError({ message: getGoals.error, show: true });
    }
  }, [getGoals.loading]);

  if (getGoals.loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <>
      {selectedGoal && modalVisible && (
        <GoalModal visible={modalVisible} onClose={closeModal} goal={selectedGoal} />
      )}
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "92%",
          }}
        >
          <Topbar />
          <ScrollView contentContainerStyle={{ gap: 20, marginTop: 20 }} bounces={false}>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.sectionText}>All Goals</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.createButton,
                    pressed && { transform: [{ scale: 1.02 }] }, // Darken on press
                  ]}
                  onPressIn={() => setIsPressed(true)}
                  onPressOut={() => setIsPressed(false)}
                >
                  <Ionicons name="create-outline" size={16} color={theme.colors["text-grey3"]} />
                  <Text style={styles.createText}>Create New Goal</Text>
                </Pressable>
              </View>
              <ScrollView horizontal contentContainerStyle={styles.sectionView}>
                {goals?.map((goal: any) => {
                  return (
                    <GoalTile
                      key={goal.title}
                      style={{ minWidth: width * 0.4 }}
                      goal={goal}
                      onPress={() => handlePress(goal)}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.sectionText}>Not Started</Text>
              <ScrollView horizontal contentContainerStyle={styles.sectionView}>
                {goals
                  ?.filter((item: any) => item.status === "Not Started")
                  ?.map((goal: any) => {
                    return (
                      <GoalTile
                        key={goal.title}
                        style={{ minWidth: width * 0.4 }}
                        goal={goal}
                        onPress={() => handlePress(goal)}
                      />
                    );
                  })}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.sectionText}>In Progress</Text>
              <ScrollView horizontal contentContainerStyle={styles.sectionView}>
                {goals
                  ?.filter((item: any) => item.status === "In Progress")
                  ?.map((goal: any) => {
                    return (
                      <GoalTile
                        key={goal.title}
                        style={{ minWidth: width * 0.4 }}
                        goal={goal}
                        onPress={() => handlePress(goal)}
                      />
                    );
                  })}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.sectionText}>Completed</Text>
              <ScrollView horizontal contentContainerStyle={styles.sectionView}>
                {goals
                  ?.filter((item: any) => item.status === "Completed")
                  ?.map((goal: any) => {
                    return (
                      <GoalTile
                        key={goal.title}
                        style={{ minWidth: width * 0.4 }}
                        goal={goal}
                        onPress={() => handlePress(goal)}
                      />
                    );
                  })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Goals;

const goalStyles = (height: any, width: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    goalsContainer: { flex: 15, width: "100%" },
    text: {
      fontSize: 24,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
    },
    listContainer: {
      paddingHorizontal: 10,
      // paddingTop: 10,
      marginBottom: 30,
      // marginTop: 20,
    },
    createButton: {
      // paddingTop: 20,
      // paddingBottom: 10,
      paddingHorizontal: 10,
      alignItems: "center",
      flexDirection: "row",
      alignSelf: "flex-start",
      gap: 5,
    },
    createText: {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.secondary,
      fontWeight: "400", // Adds a bit more emphasis to the text
    },
    barList: { padding: 10, marginVertical: 10 },
    sectionView: {
      height: height * 0.25,
      minWidth: width * 0.5,
      gap: 15,
      marginLeft: 5,
    },
    sectionText: {
      color: theme.colors["text-grey3"],
      fontFamily: theme.fonts.secondary,
      fontSize: 20,
      paddingLeft: 10,
      paddingBottom: 5,
      fontWeight: "600",
    },
  });
