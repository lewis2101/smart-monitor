import type { AxiosError } from "axios";
import { useVueQueryMutations } from "@/composables/http-client/use-vue-query-mutations.ts";
import type { HttpCallOption } from "@/composables/http-client/HttpClient.ts";

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
  url: "/auth/public/challenge",
  method: "POST",
};

export const useAuthChallengeMutation = useVueQueryMutations<RawData, Payload, Response, AxiosError>({
  httpClientOptions,
});
