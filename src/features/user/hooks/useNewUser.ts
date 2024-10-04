import { userStore } from "../store";

export function useIsNewUser() {
  return { isNewUser: userStore().isNewUser, setIsNewUser: userStore().setIsNewUser };
}
