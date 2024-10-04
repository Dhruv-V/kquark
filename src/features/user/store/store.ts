import { create } from "zustand";

type UserState = {
  session: {
    accessToken?: string;
  };
  profile: {
    name?: string;
    email?: string;
  };
  isAuthenticated: boolean;
  isNewUser: boolean;
  onBoardingValues: any;
  error: { message: any; show: boolean };
};

export type Action = {
  setIsAuthenticated: (isAuthenticated: UserState["isAuthenticated"]) => void;
  setIsNewUser: (lastName: UserState["isNewUser"]) => void;
  setOnBoardingValues: (e: any) => void;
  setError: ({ message, show }: UserState["error"]) => void;
};

export const userStore = create<UserState & Action>((set: any) => ({
  session: {},
  profile: {},
  isAuthenticated: false,
  isNewUser: false,
  onBoardingValues: {},
  error: { message: "", show: false },
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set(() => ({ isAuthenticated: isAuthenticated })),
  setIsNewUser: (isNewUser: boolean) => set(() => ({ isNewUser: isNewUser })),
  setOnBoardingValues: (e: any) => set(() => ({ onBoardingValues: e })),
  setError: ({ message, show }: UserState["error"]) =>
    set(() => ({ error: { message: message, show } })),
}));
