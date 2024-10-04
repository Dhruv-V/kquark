import { MMKV } from "react-native-mmkv";
import RNFS from "react-native-fs";

const USER_DIRECTORY = `${RNFS.DocumentDirectoryPath}/myAppData`;

type StorageType = {
  id: string;
  path: string;
  encryptionKey: string;
  onBoardingForm?: string;
};

export const storage = new MMKV({
  id: `user-storage`,
  path: `${USER_DIRECTORY}/storage`,
  encryptionKey: "kquark",
} as StorageType);
