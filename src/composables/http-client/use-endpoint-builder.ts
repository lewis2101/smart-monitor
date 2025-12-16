import type { CapacitorHttpOptions } from "@/composables/http-client/HttpClient.ts";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";

export const useEndpointBuilder = <D>(overrideOptions: CapacitorHttpOptions<D>): CapacitorHttpOptions<D> => {
  const { accessTokenStorage } = useAuthStorage();

  return {
    headers: {
      Authorization: `Bearer ${accessTokenStorage.value}`,
    },
    ...overrideOptions,
  };
};
