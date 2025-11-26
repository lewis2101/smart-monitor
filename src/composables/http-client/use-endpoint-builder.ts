import type { AxiosRequestConfig } from "axios";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";

const commonOptions: AxiosRequestConfig = {};

export const useEndpointBuilder = <D>(overrideOptions: HttpCallOption<D>): HttpCallOption<D> => {
  const { accessTokenStorage } = useAuthStorage();

  return {
    ...commonOptions,
    headers: {
      Authorization: `Bearer ${accessTokenStorage.value}`,
    },
    ...overrideOptions,
  };
};
