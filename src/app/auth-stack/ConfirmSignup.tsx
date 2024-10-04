import type { StackScreenProps } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import type { RootStackParamList } from "../navigators/AuthNavigator";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";
import { theme } from "@/styles/theme";
import InputField from "@/lib/components/InputField";
import TouchableButton from "@/lib/components/TouchableButton";
import ResendCode from "./ResendCode";
import { useIsNewUser } from "@/features/user/hooks/useNewUser";
import { userService } from "@/features/user";
import { useAuth } from "@/features/user/hooks/useAuth";
import { useError } from "@/features/user/hooks/useError";
import Loader from "@/lib/components/Loader";
import AntDesign from "@expo/vector-icons/AntDesign";

const ConfirmSignUp = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "ConfirmSignUp">) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm();
  const { confirmSignup } = useAuth();
  const { setError: setErrorPopup } = useError();
  const [tries, setTries] = useState(0);
  const { setIsAuthenticated } = useIsAuthenticated();
  const { setIsNewUser } = useIsNewUser();
  const email = route?.params?.email ?? "";

  useEffect(() => {
    if (confirmSignup.success) {
      setIsNewUser(true);
      navigation.navigate("OnBoarding");
      confirmSignup.reset();
    }
    if (confirmSignup.error) {
      setErrorPopup({ message: confirmSignup.error, show: true });
      setError("retry", {
        type: "Manual",
        message: `${3 - (tries + 1)} Attempts left.`,
      });
      setTries((prev) => prev + 1);
      if (tries >= 2) {
        navigation.navigate("Login");
        setTries(0);
      }
      confirmSignup.reset();
    }
  }, [confirmSignup.loading]);

  const verificationFlow = async () => {
    try {
      const data = getValues();
      await confirmSignup.execute(email, data.code);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Confirm Your Account</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Enter the code sent to your email
        </Text>

        <View style={styles.form}>
          <InputField
            title="Code"
            control={control}
            errors={errors}
            name="code"
            placeholder="Enter the code"
          />

          <TouchableButton
            onPress={() => verificationFlow()}
            title="Verify"
            style={[styles.button, { backgroundColor: theme.colors["bg-blue"] }]}
            textStyle={{ color: theme.colors["text-grey3"] }}
            loadingState={confirmSignup.loading}
            icon={() => (
              <AntDesign name="arrowright" size={20} color={theme.colors["text-grey3"]} />
            )}
          />
        </View>

        <View style={styles.footer}>
          <Text
            style={{ color: theme.colors["text-grey3"], fontFamily: theme.fonts.secondary }}
          >{`${errors["retry"]?.message ?? ""}`}</Text>
          <ResendCode email={email} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.primary,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: theme.fonts.secondary,
  },
  form: {
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: theme.fonts.secondary,
  },
});

export default ConfirmSignUp;
