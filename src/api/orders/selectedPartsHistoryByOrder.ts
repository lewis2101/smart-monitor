import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  orderId: string;
};

export type Response = {
  id: number;
  added: boolean;
  deleted: boolean;
  item: {
    id: number;
    name: string;
    price: null | number;
    unit_id: number;
    quantity: number;
    typeCode: string;
    typeName: string;
    serviceId: null | number;
    clientPrice: number;
    priceListId: number;
    sparePartId: number;
    catalogNumber: null | number;
    supplierPrice: number;
    discountedPrice: number;
  };
};

export const useSelectedPartsHistoryByOrderQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.selectedPartsHistoryByOrder,
    method: "GET",
  },
  scope: Scopes.selectedPartsHistoryByOrder,
});
