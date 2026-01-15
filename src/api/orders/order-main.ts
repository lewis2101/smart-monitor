import { OrdersEndpoints } from "@/api/endpoints.ts";
import type { FieldType } from "../../../types/FieldType.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

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
  scope: Scopes.orderAction,
});
