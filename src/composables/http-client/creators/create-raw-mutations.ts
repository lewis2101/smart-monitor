import { computed, inject, type MaybeRefOrGetter, toValue } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type HttpCallOption, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function createRawMutations<RawData, Payload, Response>(options: {
  httpClientOptions: HttpCallOption<Payload>;
}) {
  return (params?: MaybeRefOrGetter<RawData>, client?: HttpClient) => {
    const { httpClientOptions } = options;
    const httpClient = client || inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const p = computed(() => toValue(params));
    const config = useEndpointBuilder<Payload>(httpClientOptions);

    return {
      mutateAsync: async (data: Payload): Promise<Response> => {
        const response = await httpClient.call<Payload, Response>(
          {
            ...config,
            params: p.value,
          },
          data,
        );
        return response.data;
      },
    };
  };
}
