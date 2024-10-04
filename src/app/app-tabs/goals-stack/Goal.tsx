import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export const GoalDetails = ({ route }: any) => {
  const goal = route.params.goal;
  console.log(route.params.goal);
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Not Started":
        return theme.colors["bg-grey"];
      case "In Progress":
        return theme.colors["bg-blue"];
      case "Completed":
        return theme.colors["bg-green"];
      default:
        return theme.colors["bg-grey"];
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{goal.title}</Text>
      <Text style={styles.category}>Category: {goal.category}</Text>
      <Text style={styles.description}>{goal.description}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timeframe:</Text>
        <Text style={styles.text}>
          Start Date: {goal.timeframe.startDate} - End Date: {goal.timeframe.endDate}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Priority:</Text>
        <Text style={styles.priorityText}>{goal.priorityLevel}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <Text style={[styles.status, { color: getStatusColor(goal.status) }]}>{goal.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motivation:</Text>
        <Text style={styles.text}>{goal.motivation}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Obstacles:</Text>
        {goal.obstacles.map((obstacle: any, index: number) => (
          <Text key={index} style={styles.text}>
            - {obstacle}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources:</Text>
        {goal.resources.map((resource: any, index: number) => (
          <Text key={index} style={styles.text}>
            - {resource}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Associated KPIs:</Text>
        {goal.associatedKPIs.map((kpi: any, index: number) => (
          <Text key={index} style={styles.text}>
            - {kpi}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milestones:</Text>
        {goal.milestones.map((milestone: any, index: number) => (
          <Text key={index} style={styles.text}>
            {milestone.title} - {milestone.deadline}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Related Goals:</Text>
        {goal.relatedGoals.map((relatedGoal: any, index: number) => (
          <Text key={index} style={styles.text}>
            - {relatedGoal}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coach Assignment:</Text>
        {goal.coachAssignment.map((coach: any, index: number) => (
          <Text key={index} style={styles.text}>
            - {coach}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Setting:</Text>
        <Text style={styles.text}>{goal.privacySetting}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: theme.colors["text-grey1"],
    fontFamily: theme.fonts.secondary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: theme.colors["text-grey2"],
    fontFamily: theme.fonts.secondary,
    marginBottom: 15,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: theme.colors["text-grey3"],
    fontFamily: theme.fonts.primary,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
  },
  priorityText: {
    fontSize: 14,
    color: theme.colors.error, // Customize based on priority level
    fontFamily: theme.fonts.secondary,
  },
  status: {
    fontSize: 14,
    fontFamily: theme.fonts.secondary,
  },
});
