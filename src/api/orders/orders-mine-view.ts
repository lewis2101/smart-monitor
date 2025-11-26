import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";

type RawData = {
  paranoid: boolean;
  lang: string;
  sort: Record<string, any>;
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
  url: OrdersEndpoints.ordersMineView,
  method: "GET",
};

export const useOrdersMineViewQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions,
});
