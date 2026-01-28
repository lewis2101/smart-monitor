import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";
import type { AddressSelectorPoints } from "@/composables/order/types.ts";

export type RawData = {
  point: AddressSelectorPoints;
  sessionKey?: string;
};

export type Response = {
  sessionKey: string;
};

export const useWialonRoutePointQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.wialonRoutePoint,
    method: "GET",
  },
  scope: Scopes.wialonAddress,
});
