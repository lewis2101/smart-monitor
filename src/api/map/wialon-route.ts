import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";
import type { AddressSelectorRouteInfo } from "@/composables/order/types.ts";

export type RawData = {
  sessionKey: string;
};

export type Response = AddressSelectorRouteInfo[];

export const useWialonRouteQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.wialonRoute,
    method: "GET",
  },
  scope: Scopes.wialongRoute,
});
