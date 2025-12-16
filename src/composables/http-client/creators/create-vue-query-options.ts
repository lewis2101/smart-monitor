import { queryOptions } from "@tanstack/vue-query";
import { computed, inject, type MaybeRefOrGetter, toValue } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type CapacitorHttpOptions, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function createVueQueryOptions<RawData, Response>(options: {
  httpClientOptions: CapacitorHttpOptions;
  scope?: string;
}) {
  return ({
    params,
    client,
    getUrl,
    keys,
  }: {
    params?: MaybeRefOrGetter<RawData>;
    client?: HttpClient;
    getUrl?: (url: string) => string;
    keys?: MaybeRefOrGetter[];
  }) => {
    const { httpClientOptions, scope } = options;
    const httpClient = client || inject(httpClientProviderKey);

    const p = computed(() => toValue(params));
    const k = computed(() => toValue(keys || []));

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    return queryOptions({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryKey: [scope, p, k],
      queryFn: async () => {
        const config = useEndpointBuilder(httpClientOptions);
        const url = getUrl?.(httpClientOptions.url) || httpClientOptions.url;

        const { data } = await httpClient.call<Response>(url, {
          ...config,
          params: p.value!,
        });
        return data;
      },
    });
  };
}
