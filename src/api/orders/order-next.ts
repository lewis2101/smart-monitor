import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { OrdersScope } from "@/api/orders-scope.ts";
import type { StepField } from "@/components/step-generator/types.ts";

type RawData = undefined;

type Response = {
  attributes: StepField[];
  routeStepList: string[];
  creatorName: string;
  createdDate: Date;
  updatedDate: Date;
  name: string;
  code: string;
  number: string;
  processKey: string;
  clientRate: string;
  nextButtonName: string;
  isClientRefuseExists: boolean;
  refuse: [
    {
      code: string;
      id: number;
      value: {
        eng: string;
        kaz: string;
        rus: string;
      };
    },
  ];
  assignee: string;
  buttons: string[];
};

type Payload = {
  orderId: string;
  currentUserTask: string;
};

export const useOrderNextMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: OrdersEndpoints.orderNext,
    method: "POST",
  },
  scope: OrdersScope.orderNext,
});
