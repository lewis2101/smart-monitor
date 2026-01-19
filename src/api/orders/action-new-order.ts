import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = number;

type Payload = Record<string, unknown> & {
  processKey: string;
};

export const useActionNewOrderMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.actionNewOrder,
    method: "POST",
  },
  scope: Scopes.actionNewOrder,
});
