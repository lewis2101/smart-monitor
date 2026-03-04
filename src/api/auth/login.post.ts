import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { CapacitorHttpOptions } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";
import type { ClientInfo, UserInfo } from "@/api/auth/types.ts";
import type { CapacitorHttpError, HttpRequestError } from "@/api/error-data.ts";
import type { Permission, PermissionMethod } from "@/composables/login/types.ts";

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
  clientInfo: ClientInfo;
  expiry: number;
  isDeviceRegistered: boolean;
  partners: null;
  permissions: Permission<PermissionMethod>[];
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

const httpClientOptions: CapacitorHttpOptions<Payload> = {
  url: AuthEndpoints.login,
  method: "POST",
};

export const useAuthMutation = createVueQueryMutations<
  RawData,
  Payload,
  Response,
  CapacitorHttpError<HttpRequestError>
>({
  httpClientOptions,
});
