import { NaviEndpoints } from "@/api/endpoints.ts";
import { Scopes } from "@/api/scopes.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";

type RawData = undefined;

type Response = {
  rows: {
    id: string;
    name: string;
    vehicles: {
      id: number;
      name: string;
    }[];
  }[];
  size: number;
};

export const useNaviGroup = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: NaviEndpoints.naviGroup,
    method: "GET",
  },
  scope: Scopes.naviGroup,
});
