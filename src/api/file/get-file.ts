import { FileEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = undefined;

export type Response = string;

export const useGetFileQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: FileEndpoints.getFile,
    method: "GET",
    responseType: "text",
  },
  scope: Scopes.getFile,
});
