import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  point: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
    wp1: number;
    wp2: number;
    point1: {
      x: number;
      y: number;
      city: string;
      house: number | string;
      value: string;
      street: string;
      country: string;
      formatted_path: string;
    };
    point2: {
      x: number;
      y: number;
      city: string;
      house: number | string;
      value: string;
      street: string;
      country: string;
      formatted_path: string;
    };
  };
};

export type Response = {
  sessionKey: string;
};

export const useOsmRoutePointQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.osmRoutePoint,
    method: "GET",
  },
  scope: Scopes.osmRoutePoint,
});
