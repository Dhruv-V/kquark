import { useForm } from "react-hook-form";
import { StyleSheet, Text, View, ScrollView, Keyboard, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import type { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigators/AuthNavigator";
import { theme } from "@/styles/theme";
import InputField from "@/lib/components/InputField";
import { userService } from "@/features/user";
import { useAuth } from "@/features/user/hooks/useAuth";
import { useError } from "@/features/user/hooks/useError";
import { useEffect } from "react";
import TouchableButton from "@/lib/components/TouchableButton";

export const ForgotPassword = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "ForgotPassword">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const { forgotPassword } = useAuth();
  const { setError: setErrorPopup } = useError();

  const sendCode = async (data: any) => {
    try {
      forgotPassword.reset();
      await forgotPassword.execute(data?.email);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Failed to send email. Please try again.",
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const { email } = getValues();
    if (forgotPassword.success && email) {
      navigation.navigate("ConfirmForgotPassword", {
        email: email,
      });
    }
    if (forgotPassword.error) {
      setErrorPopup({ message: forgotPassword.error ?? "", show: true });
    }
  }, [forgotPassword.success]);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.topContainer}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Forgot Password</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Enter your email to receive the code
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <InputField
          title="Email"
          name="email"
          control={control}
          errors={errors}
          style={styles.inputField}
          errorStyle={[styles.errorText, { color: theme.colors.error }]}
          placeholder="Enter your Email"
        />
        <TouchableButton
          title={"Send Email"}
          style={styles.button}
          onPress={handleSubmit(sendCode)}
          icon={() => <Feather name="send" size={18} color={theme.colors["text-grey3"]} />}
          loadingState={forgotPassword.loading}
        />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  topContainer: { flex: 1, padding: 20, justifyContent: "space-around" },
  container: {
    flex: 0.6,
    justifyContent: "center",
  },
  header: {
    flex: 0.4,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "medium",
    marginBottom: 10,
    fontFamily: theme.fonts.secondary,
  },
  inputField: {},
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
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  sendEmail: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
    fontFamily: theme.fonts.secondary,
    color: theme.colors["text-grey3"],
  },
});

export default ForgotPassword;
