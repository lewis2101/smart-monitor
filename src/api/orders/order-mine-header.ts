import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";

type RawData = {
  tabName?: string;
  lng?: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
  changePass: boolean;
  clientInfo: null;
  expiry: number;
  isDeviceRegistered: boolean;
  partners: null;
  permissions: string[];
  userInfo: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  userOptions: {
    isOrderOnFullScreen: false;
    lang: string;
    sfChartsSubpages: string[];
    sideBarColor: string;
    sideBarDark: boolean;
    sideBarNav: boolean;
    sideBarType: boolean;
  };
};

const httpClientOptions: HttpCallOption = {
  url: OrdersEndpoints.ordersMineHeader,
  method: "GET",
};

export const useOrdersMineHeaderQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions,
});
