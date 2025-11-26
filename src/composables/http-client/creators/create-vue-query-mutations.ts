import { type MutationOptions, useMutation } from "@tanstack/vue-query";
import { computed, inject, type MaybeRefOrGetter, toValue } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type HttpCallOption, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function createVueQueryMutations<RawData, Payload, Response, Err>(options: {
  httpClientOptions: HttpCallOption<Payload>;
  mutationOptions?: () => MutationOptions<Response, Err, Payload>;
}) {
  return (params?: MaybeRefOrGetter<RawData>, client?: HttpClient) => {
    const { httpClientOptions, mutationOptions } = options;
    const httpClient = client || inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const p = computed(() => toValue(params));
    const config = useEndpointBuilder<Payload>(httpClientOptions);

    return useMutation<Response, Err, Payload>({
      mutationFn: async (data) => {
        const response = await httpClient.call<Payload, Response>(
          {
            ...config,
            params: p.value,
          },
          data,
        );
        return response.data;
      },
      ...mutationOptions?.(),
    });
  };
}
