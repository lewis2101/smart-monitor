import { createVueQueryOptions } from "@/composables/http-client/creators/create-vue-query-options.ts";
import { DependencyEndpoints } from "@/api/endpoints.ts";
import { DependencyScope } from "@/api/dependency-scope.ts";

type RawData = {
  lang: string;
  selectedId?: string;
  disabled?: boolean;
  limits?: Record<string, unknown>;
  search?: string;
};

type Response = {
  modelName: string;
  content: {
    code: string;
    createdAt: Date;
    id: number;
    value: string;
  }[];
};

export const useResourceDependencyQuery = createVueQueryOptions<RawData, Response>({
  httpClientOptions: {
    url: DependencyEndpoints.resourceDependency,
    method: "GET",
  },
  scope: DependencyScope.resourceDependency,
});
