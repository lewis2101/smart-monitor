import { NaviEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = {
  baseTs: number;
  schema: string[];
  sessionId: string;
  subscribed: any[];
  unsubscribed: any[];
};

type Payload = {
  sessionId: string | null;
  targets: number[];
};

export const useNaviSessionMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: NaviEndpoints.session,
    method: "POST",
  },
  scope: Scopes.naviSession,
});
