import { theme } from "@/styles/theme";
import { useRef, useState } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from "react-native";

type InputFieldPropsType = {
  name: string;
  title: string;
  onValueChange?: (text: string) => void;
  onFieldBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  control: Control<any>;
  errors?: FieldErrors<any>;
  isPassword?: boolean;
  showValidation?: boolean;
  style?: any;
  errorStyle?: any;
  placeholder?: string;
  wrapperStyle?: any;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  prefix?: string;
  suffix?: string;
  customValidation?: string;
  error?: string;
};

export const InputField = ({
  name,
  title,
  onValueChange,
  onFieldBlur,
  control,
  isPassword = false,
  errors,
  showValidation = true,
  style,
  errorStyle,
  placeholder,
  wrapperStyle,
  defaultValue,
  minLength,
  maxLength,
  required = false,
  prefix,
  suffix,
  customValidation,
  error,
}: InputFieldPropsType) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.inputField, wrapperStyle]}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.container}>
              {prefix && <Text style={styles.prefixSuffix}>{prefix}</Text>}
              <TextInput
                ref={inputRef}
                style={[styles.input, style]}
                value={value}
                maxLength={maxLength}
                defaultValue={defaultValue}
                onChangeText={(text) => {
                  onChange(text);
                  onValueChange && onValueChange(text);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                  onBlur();
                  onFieldBlur && onFieldBlur(e);
                  setIsFocused(false);
                }}
                placeholder={placeholder ?? ""}
                placeholderTextColor={theme.colors["text-grey1"]}
                secureTextEntry={isPassword}
              />
              {suffix && <Text style={styles.prefixSuffix}>{suffix}</Text>}
            </View>
          </>
        )}
      />
      {errors && errors[name]?.message && showValidation && (
        <Text style={[styles.errorText, errorStyle]}>{`${errors[name].message}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    left: 2,
    top: -24,
    fontSize: 16,
    zIndex: 2,
    fontFamily: theme.fonts.secondary,
    color: theme.colors["text-grey2"],
  },
  inputField: {
    marginVertical: 20,
  },
  input: {
    borderColor: theme.colors["border-grey"],
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: theme.colors["bg-grey"],
    color: theme.colors["text-grey1"],
    fontFamily: theme.fonts.secondary,
    flexGrow: 1,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: 4,
    fontFamily: theme.fonts.secondary,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "#ccc",
    width: "80%",
    justifyContent: "center",
  },
  prefixSuffix: {
    fontSize: 16,
    color: theme.colors["text-grey1"],
    paddingHorizontal: 6,
  },
});

export default InputField;
