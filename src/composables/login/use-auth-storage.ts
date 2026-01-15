import { useLocalStorage } from "@vueuse/core";
import {
  accessTokenKey,
  clientInfoKey,
  refreshTokenKey,
  tokenExpiresKey,
  userInfoKey,
} from "@/composables/login/auth-storage-keys.ts";
import type { ClientInfo, UserInfo } from "@/api/auth/types.ts";

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

  const clientInfoStorage = useLocalStorage<ClientInfo>(clientInfoKey, {
    id: "",
    type: null,
    department: {
      children: [],
      admChildren: [],
      funcChildren: [],
      departmentId: "",
    },
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

  const setClientInfo = (clientInfo: ClientInfo) => {
    clientInfoStorage.value = clientInfo;
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
    clientInfoStorage.value = {
      id: "",
      type: null,
      department: {
        children: [],
        admChildren: [],
        funcChildren: [],
        departmentId: "",
      },
    };
  };

  return {
    checkIsExpiredToken,
    checkHasTokens,
    accessTokenStorage,
    refreshTokenStorage,
    expiresTokenStorage,
    clientInfoStorage,
    setUserInfo,
    setClientInfo,
    userInfoStorage,
    clearStorage,
  };
};
