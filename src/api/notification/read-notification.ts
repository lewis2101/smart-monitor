import { NotificationEndpoints } from "@/api/endpoints.ts";
import { createVueQueryMutations } from "@/composables/http-client/creators/create-vue-query-mutations.ts";
import { Scopes } from "@/api/scopes.ts";

type RawData = undefined;

type Response = any;

type Payload = undefined;

export const useReadNotificationMutation = createVueQueryMutations<RawData, Payload, Response, Error>({
  httpClientOptions: {
    url: NotificationEndpoints.readNotification,
    method: "PUT",
  },
  scope: Scopes.readNotification,
});
