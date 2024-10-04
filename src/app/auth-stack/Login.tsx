// Login.tsx
import React, { useEffect, useState } from "react";
import type { StackScreenProps } from "@react-navigation/stack";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import type { RootStackParamList } from "../navigators/AuthNavigator";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";
import { theme } from "@/styles/theme";
import InputField from "@/lib/components/InputField";
import { useAuth } from "@/features/user/hooks/useAuth";
import ErrorPopup from "@/lib/components/ErrorPopup";
import AntDesign from "@expo/vector-icons/AntDesign";
import Loader from "@/lib/components/Loader";
import { useError } from "@/features/user/hooks/useError";
import LottieView from "lottie-react-native";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

type LoginFormType = z.infer<typeof LoginSchema>;

const Login = ({ route, navigation }: StackScreenProps<RootStackParamList, "Login">) => {
  const { login, resendSignUp } = useAuth();
  const [showErrors, setShowErrors] = useState(false);
  const { setError: setErrorPopup } = useError();
  const { setIsAuthenticated } = useIsAuthenticated();
  const [show, setShow] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onValueChange = () => {
    setShowErrors(false);
  };

  useEffect(() => {
    const values = getValues();
    if (login.success) {
      setIsAuthenticated(true);
    }
    if (login.error) {
      setErrorPopup({ message: login?.error ?? "", show: true });
      if (typeof login.error === "string" && login?.error?.includes("not confirmed")) {
        resendSignUp.execute(values.email);
      }
    }
  }, [login.success]);

  useEffect(() => {
    const values = getValues();
    if (resendSignUp.success) {
      navigation.navigate("ConfirmSignUp", { email: values.email });
    }
    if (resendSignUp.error) {
      setErrorPopup({ message: resendSignUp.error, show: true });
    }
  }, [resendSignUp.loading]);

  const signInFlow = async (data: LoginFormType) => {
    setShowErrors(true);
    setShow(true);
    try {
      const result = await login.execute({ username: data.email, password: data.password });
    } catch (err: any) {
      console.log("error");
      setError(
        "password",
        {
          message: err?.message ?? "Unknown error occurred",
          type: "Manual",
        },
        { shouldFocus: true }
      );
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.heading}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <View>
              <Text style={[styles.title, { color: theme.colors.text }]}>Kquark</Text>
              <Text style={[styles.subText, { color: theme.colors["text-grey1"] }]}>
                Powered by GSA
              </Text>
            </View>
            <View style={styles.animationWrapper}>
              <LottieView
                source={require("../../assets/media/brain.json")} // Use the downloaded Lottie animation
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          </View>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Welcome Back! Sign In to your Account
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          bounces={false}
        >
          <View style={styles.form}>
            <InputField
              control={control}
              title="Email"
              name="email"
              errors={errors}
              errorStyle={{ color: theme.colors.error }}
              placeholder="Enter your Email"
              onValueChange={onValueChange}
              showValidation={showErrors}
            />

            <InputField
              control={control}
              title="Password"
              name="password"
              isPassword={true}
              errors={errors}
              errorStyle={{ color: theme.colors.error }}
              placeholder="Enter your password"
              onValueChange={onValueChange}
              showValidation={showErrors}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowErrors(true);
                handleSubmit(signInFlow)();
              }}
              disabled={login.loading}
            >
              <Text style={[styles.buttonText, { color: theme.colors["text-grey3"] }]}>LOGIN</Text>
              {login.loading ? (
                <Loader />
              ) : (
                <MaterialIcons name="arrow-forward" size={20} color={theme.colors["text-grey3"]} />
              )}
            </TouchableOpacity>
            <View style={styles.footerLinks}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CreateUser");
                }}
                style={styles.linkButton}
              >
                <Text style={[styles.linkText, { color: theme.colors.notification }]}>
                  New User? Create new account.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
                style={styles.linkButton}
              >
                <Text style={[styles.linkText, { color: theme.colors.notification }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  heading: {
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    // marginBottom: 10,
    fontFamily: theme.fonts.primary,
  },
  subText: {
    marginBottom: 15,
    fontSize: 14,
    fontFamily: theme.fonts.secondary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "medium",
    marginBottom: 10,
    fontFamily: theme.fonts.secondary,
  },
  form: {
    width: "100%",
  },
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
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
    fontFamily: theme.fonts.secondary,
  },
  footer: {
    paddingVertical: 20,
    width: "100%",
  },
  footerLinks: {
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  linkButton: {
    // padding: 4,
  },
  linkText: {
    fontSize: 16,
    fontFamily: theme.fonts.secondary,
  },
  animation: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    pointerEvents: "none",
  },
  animationWrapper: {
    width: 100,
    height: 100,
    pointerEvents: "none",
  },
});

export default Login;
