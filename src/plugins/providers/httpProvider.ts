import {HttpClient, type InterceptorCallback} from "@/composables/http-client/HttpClient.ts";
import {useRefreshTokenRawMutation} from "@/api/auth/refresh-token.post.ts";
import {AuthEndpoints} from "@/api/endpoints.ts";
import {useAuthStorage} from "@/composables/login/use-auth-storage.ts";
import {CommonRoutes} from "@/router/router-list.ts";
import {HttpStatus} from "@/composables/http-client/HttpStatuses.ts";
import type {HttpResponse} from "@capacitor/core";

const refreshTokenInterceptor = (httpClient: HttpClient): InterceptorCallback => {
  const {mutateAsync: mutateRefreshToken} = useRefreshTokenRawMutation({
    client: httpClient,
  });
  let refreshPromise: Promise<void> | null = null;

  return async (option: HttpResponse) => {
    const isUnAuthorized =
      option.status === HttpStatus.Unauthorized &&
      !option.url?.includes(AuthEndpoints.login) &&
      !option.url?.includes(AuthEndpoints.refreshToken);

    if (isUnAuthorized) {
      const {refreshTokenStorage, accessTokenStorage, expiresTokenStorage} = useAuthStorage();

      try {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            const data = await mutateRefreshToken({
              data: {
                refresh: refreshTokenStorage.value,
              }
            });

            accessTokenStorage.value = data.accessToken;
            refreshTokenStorage.value = data.refreshToken;
            expiresTokenStorage.value = data.expiry;
          })()
            .catch((e) => {
              location.href = CommonRoutes.login;
              throw e;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;

        return {
          refetch: true,
          headers: {
            Authorization: `Bearer ${accessTokenStorage.value}`,
          },
        };
      } catch (e) {
        throw e;
      }
    }

    return {
      refetch: false,
    };
  };
};

export const httpProvider = () => {
  const httpClient = new HttpClient({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  httpClient.registerResponseInterceptor(refreshTokenInterceptor(httpClient));

  return httpClient;
};
