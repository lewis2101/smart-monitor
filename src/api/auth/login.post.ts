import type { AxiosError } from "axios";
import { useVueQueryMutations } from "@/composables/http-client/use-vue-query-mutations.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";

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

const httpClientOptions: HttpCallOption<Payload> = {
  url: AuthEndpoints.login,
  method: "POST",
};

export const useAuthMutation = useVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
