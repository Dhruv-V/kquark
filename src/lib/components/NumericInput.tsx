import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View, StyleSheet } from "react-native";

interface NumericInputPrefixSuffix {
  control: any;
  label: string;
  name: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  style?: any;
}

export const NumericInput = ({
  control,
  label,
  name,
  prefix,
  suffix,
  placeholder,
  style,
}: NumericInputPrefixSuffix) => {
  const [val, setVal] = useState("");

  const handleChange = (text: string) => {
    // Allow only numeric input
    const numericValue = text.replace(/[^0-9]/g, "");
    setVal(numericValue);
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.container}>
            {prefix && <Text style={styles.prefixSuffix}>{prefix}</Text>}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={value}
              onChangeText={(e) => {
                handleChange(e);
                onChange(e);
              }}
              placeholder={placeholder}
            />
            {suffix && <Text style={styles.prefixSuffix}>{suffix}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "#ccc",
    width: "80%",
  },
  input: {
    flex: 1,
    padding: 6,
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
    fontSize: 20,
    width: 200,
  },
  prefixSuffix: {
    fontSize: 16,
    color: theme.colors["text-grey1"],
    paddingHorizontal: 6,
  },
});
