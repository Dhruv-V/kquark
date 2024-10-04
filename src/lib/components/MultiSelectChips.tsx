import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface MultipleSelectChipsType {
  control: any;
  label?: string;
  name: string;
  style?: any;
  data: string[];
  value: string[];
}

const MultipleSelectChips = ({
  control,
  label,
  name,
  style,
  data,
  value,
}: MultipleSelectChipsType) => {
  const [selectedChips, setSelectedChips] = useState<string[]>(value ?? []);

  const handleSelectChip = (chip: string, onChange: any) => {
    // debugger;
    if (selectedChips?.includes(chip)) {
      const chips = selectedChips.filter((item) => item !== chip);
      setSelectedChips(chips ?? []);
      onChange(chips);
    } else {
      setSelectedChips([...(selectedChips ?? []), chip]);
      onChange([...(selectedChips ?? []), chip]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>hello</Text>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.chipContainer}>
            {data.map((chip) => (
              <Chip
                key={chip}
                selected={value?.includes(chip)}
                onPress={() => handleSelectChip(chip, onChange)}
                style={[styles.chip, value?.includes(chip) && styles.chipSelected]}
                textStyle={value?.includes(chip) ? styles.chipTextSelected : styles.chipText}
              >
                {chip}
              </Chip>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    // marginBottom: 10,
    color: theme.colors["text-grey1"],
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    flex: 1,
    paddingLeft: 5,
    paddingRight: 10,
  },
  chip: {
    margin: 6,
    paddingVertical: 3,
    backgroundColor: theme.colors["bg-grey"],
  },
  chipSelected: {
    backgroundColor: theme.colors["bg-green"],
  },
  chipText: {
    color: theme.colors["text-grey1"],
    fontFamily: theme.fonts.secondary,
    fontSize: 20,
    fontWeight: 400,
  },
  chipTextSelected: {
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
    fontSize: 20,
    fontWeight: 400,
  },
});

export default MultipleSelectChips;
