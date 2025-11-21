import { inject } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";

type RawData = undefined;

type Payload = {
  username: string;
  password: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
  changePass: boolean;
  clientInfo: null;
  expiry: number;
  isDeviceRegistered: boolean;
  partners: null;
  permissions: string[];
  userInfo: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  userOptions: {
    isOrderOnFullScreen: false;
    lang: string;
    sfChartsSubpages: string[];
    sideBarColor: string;
    sideBarDark: boolean;
    sideBarNav: boolean;
    sideBarType: boolean;
  };
};

export const useAuthUseMutation = (hooks: { onSuccess: () => Promise<void> | void }) => {
  const httpClient = inject(httpClientProviderKey);
  if (!httpClient) {
    throw new Error("Http Client is not provided");
  }

  return useMutation<Response, AxiosError, Payload>({
    mutationFn: async ({ username, password }: Payload) => {
      const { data } = await httpClient.post<Response>("/auth/login", {
        data: { username, password },
      });
      return data;
    },
    onSuccess: hooks.onSuccess,
  });
};
