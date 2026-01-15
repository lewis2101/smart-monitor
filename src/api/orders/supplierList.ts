import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders-scope.ts";

export type RawData = {
  vehicleId: string;
  services: string[];
  parts: string[];
};

export type Response = {
  content: {
    id: string;
    name: string;
    mobileNumber: string;
    workNumber: string;
    street: string;
    building: null;
    apartment: null;
    house: string;
    cityName: string;
  }[];
};

export const useSupplierListQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.supplierList,
    method: "GET",
  },
  scope: OrdersScope.supplierList,
});
