import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { CapacitorHttpOptions } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";
import type { CapacitorHttpError, HttpRequestError } from "@/api/error-data.ts";

type RawData = undefined;

type Payload = {
  userId: string;
};

type Response = {
  loggedOut: boolean;
};

const httpClientOptions: CapacitorHttpOptions<Payload> = {
  url: AuthEndpoints.logout,
  method: "POST",
};

export const useLogOutMutation = createVueQueryMutations<
  RawData,
  Payload,
  Response,
  CapacitorHttpError<HttpRequestError>
>({
  httpClientOptions,
});
