import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  point: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
    wp1: string;
    wp2: string;
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

export const useWialonRoutePointQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.wialonRoutePoint,
    method: "GET",
  },
  scope: Scopes.wialonAddress,
});
