import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = any;

type Payload = Record<string, unknown>;

export const useCalcRestrictionMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.calcRestriction,
    method: "POST",
  },
  scope: Scopes.calcRestriction,
});
