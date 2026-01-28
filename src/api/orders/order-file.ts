import { OrdersEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";
import type { FileContent } from "@/components/step-generator/FileField/types.ts";

export type RawData = undefined;

export type Response = {
  content: FileContent[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  size: number;
  number: number;
  empty: boolean;
};

export const useOrderFileQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: OrdersEndpoints.orderFile,
    method: "GET",
  },
  scope: Scopes.orderFile,
});
