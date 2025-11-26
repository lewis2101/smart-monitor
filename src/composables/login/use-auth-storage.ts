import { useLocalStorage } from "@vueuse/core";
import { accessTokenKey, refreshTokenKey, tokenExpires } from "@/composables/login/auth-storage-keys.ts";

export const useAuthStorage = () => {
  const accessTokenStorage = useLocalStorage(accessTokenKey, "");
  const refreshTokenStorage = useLocalStorage(refreshTokenKey, "");
  const expiresTokenStorage = useLocalStorage(tokenExpires, "");

  const checkHasTokens = () => accessTokenStorage.value && refreshTokenStorage.value;

  const checkIsExpiredToken = () => {
    const expired = Number(expiresTokenStorage.value || 0);

    if (Number.isNaN(expired)) {
      return true;
    }
    return Date.now() >= expired;
  };

  return {
    checkIsExpiredToken,
    checkHasTokens,
    accessTokenStorage,
    refreshTokenStorage,
    expiresTokenStorage,
  };
};
