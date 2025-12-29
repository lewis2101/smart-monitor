import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { OrdersScope } from "@/api/orders-scope.ts";
import type { StepField } from "@/components/step-generator/types.ts";

type RawData = undefined;

type Response = {
  assignNextTaskToSelectedUser: {
    getUserInstanceFromAttributeName: string;
  };
  attributes: StepField[];
  isClientRefuseExists: boolean;
  name: string;
  nextButtonName: string;
  routeStepList: string[];
};

type Payload = {
  processKey: string;
};

export const useOrderInitialMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.orderInitial,
    method: "POST",
  },
  scope: OrdersScope.orderInitial,
});
