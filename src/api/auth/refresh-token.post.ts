import type { AxiosError } from "axios";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { CapacitorHttpOptions } from "@/composables/http-client/HttpClient.ts";
import { createRawMutations } from "@/composables/http-client/creators/create-raw-mutations.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";

type RawData = undefined;

type Payload = {
  refresh: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
  expiry: string;
};

const httpClientOptions: CapacitorHttpOptions<Payload> = {
  url: AuthEndpoints.refreshToken,
  method: "POST",
};

export const useRefreshTokenMutation = createVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
export const useRefreshTokenRawMutation = createRawMutations<RawData, Payload, Response>({
  httpClientOptions,
});
