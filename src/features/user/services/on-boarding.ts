import { config } from "@/config";
import { attachBearerToken, HTTP } from "@/lib/http";
import { userStore } from "../store";
import onboardingQuestions from "@/dummy/onboarding-config";

class OnBoarding {
  private api: HTTP;
  constructor() {
    this.api = new HTTP(new URL("onboarding", config.apiUrl));
    this.api.useRequestInterceptor(
      attachBearerToken(() => userStore.getState().session.accessToken)
    );
  }

  async getOnBoardingQuestions() {
    // return await
    return onboardingQuestions;
  }
}

export default new OnBoarding();
