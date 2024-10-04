import { config } from "@/config";
import { attachBearerToken, HTTP } from "@/lib/http";

import { goals } from "@/dummy/goals";
import { userStore } from "@/features/user/store";

class Goals {
  private api: HTTP;
  constructor() {
    this.api = new HTTP(new URL("onboarding", config.apiUrl));
    this.api.useRequestInterceptor(
      attachBearerToken(() => userStore.getState().session.accessToken)
    );
  }

  async getGoals() {
    // return await
    return goals;
  }
}

export default new Goals();
