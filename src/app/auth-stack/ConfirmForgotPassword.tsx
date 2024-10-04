import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import type { RootStackParamList } from "../navigators/AuthNavigator";
import type { StackScreenProps } from "@react-navigation/stack";
import { theme } from "@/styles/theme";
import InputField from "@/lib/components/InputField";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { userService } from "@/features/user";
import { useAuth } from "@/features/user/hooks/useAuth";
import { useError } from "@/features/user/hooks/useError";
import { useEffect } from "react";
import TouchableButton from "@/lib/components/TouchableButton";
export const ConfirmForgotPassword = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "ConfirmForgotPassword">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const email = route.params?.email ?? "";
  const { forgotPasswordSubmit } = useAuth();
  const { setError: setErrorPopup } = useError();

  const confirm = async (data: any) => {
    const { code, password } = data;
    try {
      forgotPasswordSubmit.reset();
      await forgotPasswordSubmit.execute(email, code, password);
      // navigation.navigate("Login");
    } catch (err: any) {
      console.log(err);
      setError("password", {
        message: err?.message ?? "Unknown error occurred",
        type: "Manual",
      });
    }
  };
  useEffect(() => {
    if (forgotPasswordSubmit.success) {
      navigation.navigate("Login");
    }
    if (forgotPasswordSubmit.error) {
      setErrorPopup({ message: forgotPasswordSubmit.error ?? "", show: true });
    }
  }, [forgotPasswordSubmit.loading]);

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Reset Your Password</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Enter the code you received and set a new password
          </Text>
        </View>
        <View style={styles.form}>
          <InputField
            title="Code"
            name="code"
            control={control}
            style={styles.inputField}
            errorStyle={{ color: theme.colors.error }}
            placeholder="Enter the code"
            errors={errors}
          />
          <InputField
            title="New Password"
            name="password"
            control={control}
            isPassword
            style={styles.inputField}
            errorStyle={{ color: theme.colors.error }}
            placeholder="Enter your new password"
            errors={errors}
          />
        </View>
        <TouchableButton
          title={"RESET"}
          onPress={handleSubmit(confirm)}
          loadingState={forgotPasswordSubmit.loading}
          icon={() => (
            <MaterialIcons name="lock-reset" size={22} color={theme.colors["text-grey3"]} />
          )}
          style={styles.button}
        />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    // textAlign: "center",
    fontFamily: theme.fonts.secondary,
    color: theme.colors.textSecondary,
  },
  inputField: {
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.colors["bg-blue"],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
    fontFamily: theme.fonts.secondary,
    color: theme.colors["text-grey3"],
  },
});

export default ConfirmForgotPassword;
