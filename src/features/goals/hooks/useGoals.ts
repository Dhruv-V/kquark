import { useAction } from "@/lib/hooks";
import { goalService } from "../services";

export function useGoals() {
  const getGoals = useAction(goalService.getGoals, {
    immediate: false,
  });

  return {
    getGoals,
  };
}
