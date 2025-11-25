import { type MutationOptions, useMutation } from "@tanstack/vue-query";
import { inject } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function useVueQueryMutations<RawData, Payload, Response, Err>(options: {
  httpClientOptions: HttpCallOption<Payload>;
  mutationOptions?: () => MutationOptions<Response, Err, Payload>;
}) {
  return () => {
    const { httpClientOptions, mutationOptions } = options;
    const httpClient = inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const config = useEndpointBuilder<Payload>(httpClientOptions);

    return useMutation<Response, Err, Payload>({
      mutationFn: async (data) => {
        const response = await httpClient.call<RawData, Payload, Response>(config, data);
        return response.data;
      },
      ...mutationOptions?.(),
    });
  };
}
