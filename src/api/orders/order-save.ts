import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";
import type { CapacitorHttpError, HttpRequestError } from "@/api/error-data.ts";

type RawData = undefined;

type Response = any;

type Payload = Record<string, unknown> & {
  currentUserTask: string;
  userTaskCompleteEvent: string;
  orderId: string;
};

export const useOrderSaveMutation = createVueQueryMutations<RawData, Payload, Response, CapacitorHttpError<HttpRequestError>>({
  httpClientOptions: {
    url: OrdersEndpoints.orderSave,
    method: "POST",
  },
  scope: Scopes.orderSave,
});
