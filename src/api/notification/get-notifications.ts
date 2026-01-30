import { NotificationEndpoints } from "@/api/endpoints.ts";
import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { Scopes } from "@/api/scopes.ts";

export type RawData = undefined;

export type Response = {
  content: {
    id: number;
    type: null | string;
    code: string;
    caption: string;
    username: string;
    message: string;
    orderId: number;
    orderNumber: string;
    isRead: boolean;
    readAt: null | Date | string;
    createdAt: Date | string;
  }[];
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
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  size: number;
  number: number;
  empty: boolean;
};

export const useGetNotificationsQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: NotificationEndpoints.getNotifications,
    method: "GET",
  },
  scope: Scopes.getNotifications,
});
