import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";
import type { AddressInfo } from "@/api/map/types.ts";

export type RawData = {
  posList: (number | null)[][];
};

export type Response = AddressInfo[];

export const useOsmAddressQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.osmAddress,
    method: "GET",
  },
  scope: Scopes.osmAddress,
});
