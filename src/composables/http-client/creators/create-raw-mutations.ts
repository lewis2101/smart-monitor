import { computed, inject, type MaybeRefOrGetter, toValue } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type CapacitorHttpOptions, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function createRawMutations<RawData, Payload, Response>(options: {
  httpClientOptions: CapacitorHttpOptions<Payload>;
}) {
  return ({
    params,
    client,
    getUrl,
  }: {
    params?: MaybeRefOrGetter<RawData>;
    client?: HttpClient;
    getUrl?: (url: string) => string;
    keys?: MaybeRefOrGetter[];
  }) => {
    const { httpClientOptions } = options;
    const httpClient = client || inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const p = computed(() => toValue(params));

    return {
      mutateAsync: async (data: Payload): Promise<Response> => {
        const config = useEndpointBuilder<Payload>(httpClientOptions);
        const url = getUrl?.(httpClientOptions.url) || httpClientOptions.url;

        const response = await httpClient.call<Response, Payload>(url, {
          ...config,
          data,
          params: p.value!,
        });
        return response.data;
      },
    };
  };
}
