import { inject } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type MutationOptions, useMutation } from "@tanstack/vue-query";
import type { AxiosError } from "axios";

type Payload = {
  userName: string;
  device: any;
};

type Response = {
  publicKey: {
    allowCredentials: string[];
    challenge: string;
  };
};

export const useAuthChallengeMutation = (options: MutationOptions<Response, AxiosError, Payload>) => {
  // https://test.smartfleet.kz/api/auth/public/challenge

  const httpClient = inject(httpClientProviderKey);
  if (!httpClient) {
    throw new Error("Http Client is not provided");
  }

  return useMutation<Response, AxiosError, Payload>({
    mutationFn: async (payload: Payload) => {
      const { data } = await httpClient.post<Response>("/auth/public/challenge", {
        data: payload,
      });
      return data;
    },
    ...options,
  });
};
