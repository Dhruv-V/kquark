import { useAction } from "@/lib/hooks";
import { userService } from "../services";

export function useAuth() {
  const login = useAction(userService.signIn, { immediate: false });
  const signup = useAction(userService.signUp, { immediate: false });
  const confirmSignup = useAction(userService.confirmSignup, { immediate: false });
  const forgotPassword = useAction(userService.forgotPassword, { immediate: false });
  const forgotPasswordSubmit = useAction(userService.forgotPasswordSubmit, { immediate: false });
  const resendSignUp = useAction(userService.resendSignUp, { immediate: false });

  return { login, signup, confirmSignup, forgotPassword, forgotPasswordSubmit, resendSignUp };
}
