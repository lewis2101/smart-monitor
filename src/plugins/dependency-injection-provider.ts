import type { App } from "vue";
import { HttpClient } from "@/composables/http-client/HttpClient.ts";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";

export default {
  install: (app: App) => {
    const httpClient = new HttpClient({
      baseURL: import.meta.env.VITE_BASE_URL,
    });

    app.provide(httpClientProviderKey, httpClient);
  },
};
