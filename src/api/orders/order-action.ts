import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders/orders-scope.ts";
import type { FieldType } from "../../../types/FieldType.ts";

type RawData = undefined;

type Response = {
  modelName: string;
  tabheader: FieldType[];
};

export const useOrderActionQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.orderAction,
    method: "GET",
  },
  scope: OrdersScope.orderAction,
});
