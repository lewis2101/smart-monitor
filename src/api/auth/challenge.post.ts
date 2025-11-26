import type { AxiosError } from "axios";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";
import { AuthEndpoints } from "@/api/endpoints.ts";

type RawData = undefined;

type Payload = {
  userName: string;
  device: any;
};

type Response = {
  publicKey: {
    allowCredentials: string[];
    challenge: string;
  };
};

const httpClientOptions: HttpCallOption<Payload> = {
  url: AuthEndpoints.challenge,
  method: "POST",
};

export const useAuthChallengeMutation = createVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
