import { HttpClient } from "@/composables/http-client/HttpClient.ts";
import { useRefreshTokenRawMutation } from "@/api/auth/refresh-token.post.ts";
import type { AxiosError } from "axios";
import { AuthEndpoints } from "@/api/endpoints.ts";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { CommonRoutes } from "@/router/router-list.ts";
import { HttpStatus } from "@/composables/http-client/HttpStatuses.ts";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _tokenRetried?: boolean;
  }
}

const refreshTokenInterceptor = (httpClient: HttpClient) => {
  const { mutateAsync: mutateRefreshToken } = useRefreshTokenRawMutation(undefined, httpClient);

  return async (err: AxiosError) => {
    const config = err.config;

    const isUnAuthorized =
      err.status === HttpStatus.Unauthorized &&
      config &&
      !config?._tokenRetried &&
      !config.url?.includes(AuthEndpoints.login);

    if (isUnAuthorized) {
      config._tokenRetried = true;

      const { refreshTokenStorage, accessTokenStorage, expiresTokenStorage } = useAuthStorage();
      const data = await mutateRefreshToken({
        refresh: refreshTokenStorage.value,
      });

      accessTokenStorage.value = data.accessToken;
      refreshTokenStorage.value = data.refreshToken;
      expiresTokenStorage.value = data.expiry;

      return err.config;
    }

    const hasTokenRetried = config && config._tokenRetried;

    if (hasTokenRetried) {
      location.href = CommonRoutes.login;
    }
  };
};

export const httpProvider = () => {
  const httpClient = new HttpClient({
    baseURL: "/api",
  });
  httpClient.registerResponseInterceptor(refreshTokenInterceptor(httpClient));

  return httpClient;
};
