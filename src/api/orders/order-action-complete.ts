import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";
import type { OrderActions } from "@/components/step-generator/types.ts";

type RawData = undefined;

type Response = undefined;

type Payload = {
  buttonAction: OrderActions;
  order: Record<string, unknown>;
  orderExecutionId: number;
  saveData: Record<string, unknown> & {
    currentUserTask: string;
    userTaskCompleteEvent: string;
  };
};

export const useOrderActionCompleteMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.orderActionComplete,
    method: "POST",
  },
  scope: Scopes.orderActionComplete,
});
