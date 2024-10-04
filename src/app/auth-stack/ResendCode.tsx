import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import { theme } from "@/styles/theme";
import TouchableButton from "@/lib/components/TouchableButton";
import { userService } from "@/features/user";
import { useAuth } from "@/features/user/hooks/useAuth";
import { useError } from "@/features/user/hooks/useError";
import Feather from "@expo/vector-icons/Feather";

type ResendCodeType = {
  email: string;
};

export const ResendCode = ({ email }: ResendCodeType) => {
  const { resendSignUp } = useAuth();
  const { setError } = useError();
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (resendSignUp.error) {
      setError({ message: resendSignUp.error, show: true });
    }
    if (resendSignUp.success) {
      setTimeLeft(60);
      setCanResend(false);
    }
  }, [resendSignUp.loading]);

  const handleResendClick = async () => {
    try {
      resendSignUp.reset();
      await resendSignUp.execute(email);
      // setTimeLeft(60);
      // setCanResend(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {canResend ? "You can resend the code now" : `Resend code in ${timeLeft}s`}
      </Text>
      <TouchableButton
        title="Resend Code"
        onPress={handleResendClick}
        disabled={!canResend}
        style={styles.button}
        textStyle={styles.buttonText}
        icon={() => <Feather name="refresh-cw" size={20} color={theme.colors["text-grey3"]} />}
        loadingState={resendSignUp.loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  timerText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 10,
    fontFamily: theme.fonts.secondary,
  },
  button: {
    backgroundColor: theme.colors["bg-blue"],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors["text-grey3"],
    fontWeight: "600",
    fontFamily: theme.fonts.secondary,
  },
});

export default ResendCode;
