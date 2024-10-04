import { zodResolver } from "@hookform/resolvers/zod";
import type { StackScreenProps } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { z } from "zod";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { RootStackParamList } from "../navigators/AuthNavigator";
import { theme } from "@/styles/theme";
import InputField from "@/lib/components/InputField";
import { userService } from "@/features/user";
import { useAuth } from "@/features/user/hooks/useAuth";
import { useEffect } from "react";
import { useError } from "@/features/user/hooks/useError";
import Loader from "@/lib/components/Loader";
import TouchableButton from "@/lib/components/TouchableButton";
import LottieView from "lottie-react-native";

const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 letters"),
  confirmPassword: z.string(),
});

type CreateUserType = z.infer<typeof CreateUserSchema>;

const CreateUser = ({ route, navigation }: StackScreenProps<RootStackParamList, "CreateUser">) => {
  const { signup } = useAuth();
  const { setError: setErrorPopup } = useError();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<CreateUserType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(CreateUserSchema),
  });

  const onValueChange = (text: string) => {
    const password = getValues().password;
    if (password !== text)
      setError("confirmPassword", {
        type: "Manual",
        message: "Passwords do not match.",
      });
    else setError("confirmPassword", {});
  };

  const onValueChangePass = (text: string) => {
    const password = getValues().confirmPassword;
    if (password !== text)
      setError("confirmPassword", {
        type: "Manual",
        message: "Passwords do not match.",
      });
    else setError("confirmPassword", {});
  };

  const handleSignUp = async (data: CreateUserType) => {
    const { email, password } = data;
    try {
      signup.reset();
      const result = await signup.execute({
        username: email,
        password,
        // attributes: {},
      });
      // console.log(result);
      // navigation.navigate("ConfirmSignUp", { email });
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  useEffect(() => {
    const { email } = getValues();
    if (email && signup.success) {
      navigation.navigate("ConfirmSignUp", { email });
    }
    if (signup.error) {
      // if (error.code === 'UsernameExistsException') {
      setErrorPopup({ message: signup.error, show: true });
    }
  }, [signup.loading]);

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
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
          Sign Up to get started with your transformational journey
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <InputField
          control={control}
          name="email"
          title="Email"
          errors={errors}
          placeholder="Enter your Email"
        />
        <InputField
          control={control}
          name="password"
          title="Password"
          errors={errors}
          isPassword={true}
          onValueChange={onValueChangePass}
          placeholder="Enter a strong password"
        />
        <InputField
          control={control}
          name="confirmPassword"
          title="Confirm Password"
          errors={errors}
          isPassword={true}
          onValueChange={onValueChange}
          placeholder="Re-enter your password"
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableButton
          title={"CREATE"}
          loadingState={signup.loading}
          icon={() => <AntDesign name="arrowright" size={20} color={theme.colors["text-grey3"]} />}
          onPress={handleSubmit(handleSignUp)}
          style={{ width: "100%" }}
        />
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.signInText, { color: theme.colors["text-grey2"] }]}>
            Already have an account. Sign In instead ?
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
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
    fontFamily: theme.fonts.secondary,
  },
  formContainer: {
    // flexGrow: 1,
    // justifyContent: "center",
  },
  inputField: {
    marginVertical: 12,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderRadius: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.colors["bg-blue"],
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: { alignItems: "center", marginTop: 20 },
  signInText: { padding: 4, fontSize: 16, fontFamily: theme.fonts.secondary },
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

export default CreateUser;
