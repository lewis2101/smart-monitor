import type { App } from "vue";
import { HttpClient } from "@/composables/http-client/HttpClient.ts";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { useRefreshTokenMutation } from "@/api/auth/refresh-token.post.ts";

export default {
  install: (app: App) => {
    // const { mutateAsync: mutateRefreshToken } = useRefreshTokenMutation();

    const httpClient = new HttpClient({
      baseURL: "/api",
    });

    httpClient.registerResponseInterceptor((err) => {
      if (err.status === 401) {
        console.log("REFRESH INTERCEPTOR");
      }
    });

    app.provide(httpClientProviderKey, httpClient);
  },
};
