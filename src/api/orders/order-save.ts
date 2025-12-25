import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { OrdersScope } from "@/api/orders-scope.ts";

type RawData = undefined;

type Response = any;

type Payload = Record<string, unknown> & {
  currentUserTask: string;
  userTaskCompleteEvent: string;
  orderId: string;
};

export const useOrderSaveMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.orderSave,
    method: "POST",
  },
  scope: OrdersScope.orderSave,
});
