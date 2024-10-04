import { theme } from "@/styles/theme";
import { Text, TouchableOpacity, type GestureResponderEvent, StyleSheet, View } from "react-native";
import Loader from "./Loader";

type TouchableButtonType = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
  icon?: () => React.JSX.Element;
  loadingState?: boolean;
  iconPosition?: string;
};

const TouchableButton = ({
  onPress,
  onPressIn,
  onPressOut,
  title,
  disabled = false,
  style,
  textStyle,
  icon,
  loadingState = false,
  iconPosition = "right",
}: TouchableButtonType) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.button, style, disabled && styles.disabledButton]}
    >
      {icon && iconPosition === "left" ? (
        <View style={[styles.icon, { marginRight: 10 }]}>{loadingState ? <Loader /> : icon()}</View>
      ) : null}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {icon && iconPosition === "right" ? (
        <View style={[styles.icon, { marginLeft: 10 }]}>{loadingState ? <Loader /> : icon()}</View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.colors["bg-blue"],
  },
  text: {
    color: theme.colors["text-grey3"],
    fontWeight: "600",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: theme.colors["border-grey"],
  },
  icon: {
    alignSelf: "center",
  },
});

export default TouchableButton;
