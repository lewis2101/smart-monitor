import { type MutationOptions, useMutation } from "@tanstack/vue-query";
import { inject } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";

export function useVueQueryMutations<RawData, Payload, Response>(options: {
  httpClientOptions: HttpCallOption;
  mutationOptions?: () => MutationOptions<Response, Error, Payload>;
}) {
  return () => {
    const { httpClientOptions, mutationOptions } = options;
    const httpClient = inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    return useMutation<Response, Error, Payload>({
      mutationFn: async (data) => {
        const response = await httpClient.call<RawData, Payload, Response>(httpClientOptions, data);
        return response.data;
      },
      ...mutationOptions?.(),
    });
  };
}
