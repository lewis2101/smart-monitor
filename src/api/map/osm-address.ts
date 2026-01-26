import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  posList: (number | null)[][];
};

export type Response = {
  city: string;
  country: string;
  formatted_path: string;
  house: string;
  street: string;
  value: string;
  x: number;
  y: number;
}[];

export const useOsmAddressQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.osmAddress,
    method: "GET",
  },
  scope: Scopes.osmAddress,
});
