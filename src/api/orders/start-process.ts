import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = string;

type Payload = {
  orderId: number;
  saveData: Record<string, unknown>;
};

export const useStartProcessMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.startProcess,
    method: "POST",
    responseType: "text",
  },
  scope: Scopes.startProcess,
});
