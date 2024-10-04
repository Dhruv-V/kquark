import { userStore } from "../store";

export function useIsAuthenticated() {
  return {
    isAuthenticated: userStore().isAuthenticated,
    setIsAuthenticated: userStore().setIsAuthenticated,
  };
}
