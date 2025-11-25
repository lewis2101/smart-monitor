import type { AxiosRequestConfig } from "axios";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";

const commonOptions: AxiosRequestConfig = {};

export const useEndpointBuilder = <D>(overrideOptions: HttpCallOption<D>): HttpCallOption<D> => {
  return {
    ...commonOptions,
    ...overrideOptions,
  };
};
