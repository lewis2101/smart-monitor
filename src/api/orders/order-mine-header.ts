import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders-scope.ts";
import type { FieldType } from "../../../types/FieldType.ts";

type RawData = {
  tabName?: string;
  lng?: string;
};

type Response = {
 modelName: string;
 tabheader: FieldType[];
};

export const useOrdersMineHeaderQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.ordersMineHeader,
    method: "GET",
  },
  scope: OrdersScope.ordersMineHeader,
});
