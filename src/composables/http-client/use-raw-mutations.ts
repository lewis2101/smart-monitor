import { inject } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { type HttpCallOption, HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useEndpointBuilder } from "@/composables/http-client/use-endpoint-builder.ts";

export function useRawMutations<RawData, Payload, Response>(options: { httpClientOptions: HttpCallOption<Payload> }) {
  return (client?: HttpClient) => {
    const { httpClientOptions } = options;
    const httpClient = client || inject(httpClientProviderKey);

    if (!httpClient) {
      throw new Error("Http client is not provided");
    }

    const config = useEndpointBuilder<Payload>(httpClientOptions);

    return {
      mutateAsync: async (data: Payload): Promise<Response> => {
        const response = await httpClient.call<RawData, Payload, Response>(config, data);
        return response.data;
      },
    };
  };
}
