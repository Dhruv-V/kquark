import { config } from "@/config";
import { attachBearerToken, HTTP } from "@/lib/http";
import { userStore } from "../store";
import { Auth } from "aws-amplify";

class UserService {
  private api: HTTP;

  constructor() {
    this.api = new HTTP(new URL("user", config.apiUrl));

    this.api.useRequestInterceptor(
      attachBearerToken(() => userStore.getState().session.accessToken)
    );
  }

  async signIn(credentials: { username: string; password: string }) {
    return await Auth.signIn({
      ...credentials,
      // options: { authFlowType: "USER_PASSWORD_AUTH" },
    });
  }
  async forgotPasswordSubmit(email: string, code: string, password: string) {
    return await Auth.forgotPasswordSubmit(email, code, password);
  }

  async confirmSignup(email: string, code: string) {
    return await Auth.confirmSignUp(email, code);
  }
  async signUp(credentials: { username: string; password: string }) {
    return await Auth.signUp({
      ...credentials,
    });
  }
  async forgotPassword(email: string) {
    return Auth.forgotPassword(email);
  }
  async resendSignUp(email: string) {
    return Auth.resendSignUp(email);
  }
}

export default new UserService();
