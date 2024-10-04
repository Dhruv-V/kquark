import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { theme } from "@/styles/theme";

type DateTimePickerFieldProps = {
  name: string;
  title: string;
  control: Control<any>;
  errors?: FieldErrors<any>;
  style?: any;
  errorStyle?: any;
  format?: "countdown" | "date" | "datetime" | "time";
  minDate?: Date;
  maxDate?: Date;
};

const DateTimePickerField = ({
  name,
  title,
  control,
  errors,
  style,
  errorStyle,
  format,
  minDate,
  maxDate,
}: DateTimePickerFieldProps) => {
  return (
    <View style={[styles.inputField, style]}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode={format ?? "date"}
              display={"spinner"}
              onChange={(e, date) => {
                if (format === "time") onChange(date?.toISOString());
                else onChange(date?.toISOString().split("T")[0]);
              }}
              // dateFormat={"longdate"}
              style={{ height: "100%", width: "100%" }}
              textColor={theme.colors["text-grey3"]}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          );
        }}
      />
      {errors && errors[name]?.message && (
        <Text style={[styles.errorText, errorStyle]}>{`${errors[name].message}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginVertical: 6,
    // backgroundColor: theme.colors["bg-grey"],
    backgroundColor: "transparent",
    borderRadius: 20,
    // paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: theme.colors["text-grey1"],
    width: "100%",
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default DateTimePickerField;
