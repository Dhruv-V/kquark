import { userStore } from "../store";

export function useProfile() {
  return userStore().profile;
}
