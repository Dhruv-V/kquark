import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface MCQType {
  control: any;
  label: string;
  name: string;
  style?: any;
  choices: string[];
}

const Choice = ({ label, onSelect, isSelected }: any) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(label)}
      style={[
        styles.choice,
        isSelected
          ? { backgroundColor: theme.colors["bg-green"], borderWidth: 2 }
          : { borderColor: theme.colors["text-grey1"] },
      ]}
    >
      <Text
        style={{
          color: isSelected ? theme.colors.text : theme.colors["text-grey1"],
          fontSize: 20,
          fontFamily: theme.fonts.secondary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const MCQInput = ({ control, choices, label, name, style }: MCQType) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleSelectChoice = (label: string) => {
    setSelectedChoice(label);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          {choices.map((choice) => (
            <Choice
              key={choice}
              label={choice}
              onSelect={(e: string) => {
                handleSelectChoice(e);
                onChange(e);
              }}
              isSelected={value === choice}
            />
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 20,
    flex: 1,
    width: "80%",
  },
  choice: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    margin: 6,
    fontFamily: theme.fonts.secondary,
    fontSize: 20,
    borderWidth: 1,
    borderColor: theme.colors["text-grey1"],
  },
});

export default MCQInput;
