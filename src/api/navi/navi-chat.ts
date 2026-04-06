import { NaviEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = {
  answer: string;
  chatId: string;
};

type Payload = {
  context: Record<string, string>;
  message: string;
};

export const useActionNaviChat = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: NaviEndpoints.naviChat,
    method: "POST",
  },
  scope: Scopes.naviChat,
});
