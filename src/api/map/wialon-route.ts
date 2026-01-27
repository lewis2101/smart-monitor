import { MapEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  sessionKey: string;
};

export type Response = {
  status: string;
  points: number[][];
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
}[];

export const useWialonRouteQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: MapEndpoints.wialonRoute,
    method: "GET",
  },
  scope: Scopes.wialongRoute,
});
