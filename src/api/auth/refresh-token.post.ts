import type { AxiosError } from "axios";
import { useVueQueryMutations } from "@/composables/http-client/use-vue-query-mutations.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";

type RawData = undefined;

type Payload = {
  refresh: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
  expiry: string;
};

const httpClientOptions: HttpCallOption<Payload> = {
  url: "/auth/refreshToken",
  method: "POST",
};

export const useRefreshTokenMutation = useVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
