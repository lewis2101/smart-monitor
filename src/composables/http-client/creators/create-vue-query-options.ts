import { queryOptions } from "@tanstack/vue-query";
import { computed, inject, type MaybeRefOrGetter, toValue } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type HttpCallOption, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function createVueQueryOptions<RawData, Response>(options: {
  httpClientOptions: HttpCallOption;
  scope?: string;
}) {
  return (params?: MaybeRefOrGetter<RawData>, client?: HttpClient) => {
    const { httpClientOptions, scope } = options;
    const httpClient = client || inject(httpClientProviderKey);

    const p = computed(() => toValue(params));

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const config = useEndpointBuilder(httpClientOptions);

    return queryOptions({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryKey: [scope, p],
      queryFn: () =>
        httpClient.call<RawData, Response>({
          ...config,
          params: p.value,
        }),
    });
  };
}
