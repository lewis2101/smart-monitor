import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { OrdersScope } from "@/api/orders-scope.ts";

type RawData = undefined;

type Response = {
  orderExecutionId: number;
  order: {
    id: number;
    orderNumber: string;
    checkInTime: null;
    withDiagnostics: null;
    totalPrice: number;
    client: {
      id: number;
      name: string;
      bin: string;
      signer: string;
      mobileNumber: string;
      workNumber: string;
      isVAT: boolean;
      isEdo: boolean;
      isIndependent: boolean;
      useShortAvr: boolean;
    };
    vehicle: {
      id: number;
      registrationNumber: string;
      vinNumber: string;
      odometer: number;
      model: {
        id: number;
        code: string;
        name: string;
        description: null;
      };
      year: {
        id: number;
        code: string;
        name: string;
        description: string;
      };
      color: {
        id: number;
        code: string;
        name: string;
        description: string;
      };
      transmission: null;
    };
    supplier: {
      id: number;
      name: string;
      bin: string;
      signer: string;
      mobileNumber: string;
      workNumber: string;
      isVAT: boolean;
      isEdo: boolean;
      isIndependent: boolean;
      useShortAvr: boolean;
    };
    clientTypeId: null;
    refuseId: null;
    refuseOtherText: null;
    supplierId: number;
    extOrderId: null;
    cancelReason: null;
    bpmnProcessKeyId: number;
    bpmnProcessKeyCode: null;
  };
  permissions: {
    canComplete: boolean;
    canRead: boolean;
    canSave: boolean;
    canWrite: boolean;
  };
  currentTask: string;
  currentTaskType: string;
  state: string;
  actions: string[];
  processCompleted: boolean;
};

export const useOrderActionQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.orderAction,
    method: "GET",
  },
  scope: OrdersScope.orderAction,
});
