import { useAction } from "@/lib/hooks";
import { userStore } from "../store";
import { onBoardingService } from "../services";

export function useOnboarding() {
  const getOnboardingQuestions = useAction(onBoardingService.getOnBoardingQuestions, {
    immediate: false,
  });

  return {
    OnBoardingValues: userStore().onBoardingValues,
    setOnBoardingValues: userStore().setOnBoardingValues,
    getOnboardingQuestions,
  };
}
