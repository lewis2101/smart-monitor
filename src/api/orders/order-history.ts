import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = {
  orderId: number | string;
};

export type Response = {
  createdAt: Date | string;
  updatedAt: Date | string;
  event: string;
  id: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
  };
}[];

export const useOrderHistoryQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.orderHistory,
    method: "GET",
  },
  scope: Scopes.orderHistory,
});
