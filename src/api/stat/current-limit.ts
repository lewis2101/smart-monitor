import { StatEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  processName: string;
};

export type Response = {
  balance: number;
  blocked: number;
  spent: number;
  limit: number;
  expDate: Date | string;
  clientId: string;
  number: string;
  date: string;
}[];

export const useCurrentLimitQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: StatEndpoints.currentLimit,
    method: "GET",
  },
  scope: Scopes.currentLimit,
});
