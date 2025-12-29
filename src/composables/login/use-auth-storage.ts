import { useLocalStorage } from "@vueuse/core";
import {
  accessTokenKey,
  refreshTokenKey,
  tokenExpiresKey,
  userInfoKey,
} from "@/composables/login/auth-storage-keys.ts";
import type { UserInfo } from "@/api/auth/types.ts";

export const useAuthStorage = () => {
  const accessTokenStorage = useLocalStorage(accessTokenKey, "");
  const refreshTokenStorage = useLocalStorage(refreshTokenKey, "");
  const expiresTokenStorage = useLocalStorage(tokenExpiresKey, "");

  const userInfoStorage = useLocalStorage<UserInfo>(userInfoKey, {
    id: "",
    firstName: "",
    lastName: "",
    role: null,
    username: "",
  });

  const checkHasTokens = () => accessTokenStorage.value && refreshTokenStorage.value;

  const checkIsExpiredToken = () => {
    const expired = Number(expiresTokenStorage.value || 0);

    if (Number.isNaN(expired)) {
      return true;
    }
    return Date.now() >= expired;
  };

  const setUserInfo = (user: UserInfo) => {
    userInfoStorage.value = user;
  };

  const clearStorage = () => {
    accessTokenStorage.value = "";
    refreshTokenStorage.value = "";
    expiresTokenStorage.value = "";
    userInfoStorage.value = {
      id: "",
      firstName: "",
      lastName: "",
      role: null,
      username: "",
    };
  };

  return {
    checkIsExpiredToken,
    checkHasTokens,
    accessTokenStorage,
    refreshTokenStorage,
    expiresTokenStorage,
    setUserInfo,
    userInfoStorage,
    clearStorage,
  };
};
