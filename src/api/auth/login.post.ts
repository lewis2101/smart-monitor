import type { AxiosError } from "axios";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";
import type { UserInfo } from "@/api/auth/types.ts";

type RawData = undefined;

type Payload = {
  username: string;
  password: string;
  device: any;
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
  userInfo: UserInfo;
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

const httpClientOptions: HttpCallOption<Payload> = {
  url: AuthEndpoints.login,
  method: "POST",
};

export const useAuthMutation = createVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
