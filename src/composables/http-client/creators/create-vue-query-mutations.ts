import {type MutationOptions, useMutation} from "@tanstack/vue-query";
import {computed, inject, type MaybeRefOrGetter, toValue} from "vue";
import {httpClientProviderKey} from "@/composables/http-client/http-provider-keys.ts";
import {type CapacitorHttpOptions, HttpClient} from "@/composables/http-client/HttpClient.ts";
import {useEndpointBuilder} from "@/composables/http-client/use-endpoint-builder.ts";

export function createVueQueryMutations<
  RawParams,
  Payload,
  Response,
  Err
>(options: {
  httpClientOptions: CapacitorHttpOptions<Payload>;
  mutationOptions?: () => MutationOptions<Response, Err, MutationPayload<Payload>>;
  scope?: string;
}) {
  return ({
      params,
      client,
      getUrl,
      keys,
    }: {
    params?: MaybeRefOrGetter<RawParams>;
    client?: HttpClient;
    getUrl?: (url: string, urlParams?: Record<string, string>) => string;
    keys?: MaybeRefOrGetter[];
  }) => {
    const httpClient = client || inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const resolvedParams = computed(() => toValue(params));
    const resolvedKeys = computed(() => toValue(keys ?? []));

    const config = useEndpointBuilder<Payload>(options.httpClientOptions);

    return useMutation<Response, Err, MutationPayload<Payload>>({
      mutationKey: [options.scope, resolvedParams.value, ...resolvedKeys.value],

      mutationFn: async ({data, urlParams}: {
        data: Payload,
        urlParams?: Record<string, string>
      }) => {
        const baseUrl = options.httpClientOptions.url;
        let url = getUrl ? getUrl(baseUrl, urlParams) : baseUrl;

        if (urlParams) {
          Object.entries(urlParams).forEach(([key, value]) => {
            url = url.replace(`:${key}`, value);
          })
        }

        const response = await httpClient.call<Response, Payload>(url, {
          ...config,
          params: resolvedParams.value,
          data,
        });

        return response.data;
      },

      ...options.mutationOptions?.(),
    });
  };
}
