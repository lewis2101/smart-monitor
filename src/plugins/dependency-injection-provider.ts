import type { App } from "vue";
import { HttpClient } from "@/composables/http-client/HttpClient.ts";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";

export default {
  install: (app: App) => {
    const httpClient = new HttpClient({
      baseURL: "/api",
    });

    app.provide(httpClientProviderKey, httpClient);
  },
};
