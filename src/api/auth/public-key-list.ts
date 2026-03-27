import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { CapacitorHttpOptions } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";
import type { CapacitorHttpError, HttpRequestError } from "@/api/error-data.ts";

type RawData = undefined;

type Payload = undefined;

type Response = {
  id: number;
  title: string;
  subTitle: string;
}[];

const httpClientOptions: CapacitorHttpOptions<Payload> = {
  url: AuthEndpoints.publicKeyList,
  method: "POST",
};

export const usePublicKeyListMutation = createVueQueryMutations<
  RawData,
  Payload,
  Response,
  CapacitorHttpError<HttpRequestError>
>({
  httpClientOptions,
});
