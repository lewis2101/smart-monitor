import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type OrderPartsContentChild = {
  catalogNumber: number | null;
  clientPrice: string;
  id: number;
  name: string;
  price: string;
  quantity: number;
  serviceId: number | null;
  sparePartId: number;
  typeCode: string;
  typeName: string;
  unit_id: number;
};

export type RawData = {
  lang: string;
  vehicleId: string | number;
} & (
  | {
      processKey: string;
    }
  | {
      orderId: string;
    }
);

export type Response = {
  content: {
    id: number;
    name: string;
    children?: OrderPartsContentChild[];
  }[];
  size: number;
};

export const useOrderPartsQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.order,
    method: "GET",
  },
  scope: Scopes.orderParts,
});
