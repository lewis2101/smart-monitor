import { NaviEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = undefined;

export type Response = {
  schema: string[];
  targets: string[][];
};

export const useGetNaviVehicleList = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: NaviEndpoints.vehicleList,
    method: "GET",
  },
  scope: Scopes.naviVehicleList,
});
