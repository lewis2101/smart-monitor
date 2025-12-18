import { OrdersEndpoints } from "@/api/endpoints.ts";
import type { FieldType } from "../../../types/FieldType.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { OrdersScope } from "@/api/orders-scope.ts";

type RawData = undefined;

type Response = {
  modelName: string;
  tabheader: FieldType[];
};

type Payload = {
  orderId: string;
};

export const useOrderMainMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.orderMain,
    method: "POST",
  },
  scope: OrdersScope.orderAction,
});
