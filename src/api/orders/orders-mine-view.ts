import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders/orders-scope.ts";
import type { FilterType } from "../../../types/FilterType.ts";
import type { SortType } from "../../../types/SortType.ts";

export type RawData = {
  paranoid: boolean;
  lang: string;
  sort: SortType;
  where?: FilterType[];
};

export type Response = {
  content: {
    id: string;
    orderNumber: string;
    taskName?: {
      eng: string;
      kaz: string;
      rus: string;
    };
    creator: string;
    createdAt: Date;
    updatedAt: Date;
    supplierBin: string;
    supplierName: string;
    clientBin: string;
    clientName: string;
    vinNumber: string;
    registrationNumber: string;
    totalAmount: string;
    creatorId: string;
    assignId: string[];
    clientId: string;
    supplierId: string;
    departmentId: string;
    documentNumber: string | null;
  }[];
  modelName: string;
  size: number;
};

export const useOrdersMineViewQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.ordersMineView,
    method: "GET",
  },
  scope: OrdersScope.ordersMineView,
});
