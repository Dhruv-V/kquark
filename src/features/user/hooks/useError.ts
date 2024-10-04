import { userStore } from "../store";

export function useError() {
  return { error: userStore().error, setError: userStore().setError };
}
