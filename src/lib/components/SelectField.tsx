import { useEffect, useState, type SyntheticEvent } from "react";
import { Controller, type Control, type UseFormRegister } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type OptionsType = { label: string; value: string | number };

type SelectFieldPropsType = {
  name: string;
  title: string;
  onValueChange?: (value: any, index: number) => void;
  options: OptionsType[];
  onFieldBlur?: (e: SyntheticEvent) => void;
  control: Control<any>;
};

export const SelectField = ({
  name,
  title,
  options,
  onValueChange,
  onFieldBlur,
  control,
}: SelectFieldPropsType) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View style={styles.selectField}>
        <Text style={styles.label}>{title}</Text>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              onValueChange={(value: any, index: number) => {
                onChange(value, index);
                onValueChange && onValueChange(value, index);
              }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              // placeholder={{ label: "Select an option...", value: null }}
              items={options?.length ? [...options] : []}
              value={value}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    color: "#000",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    color: "#000",
  },
});
