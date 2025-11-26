import type { App } from "vue";
import { httpClientProviderKey } from "@/composables/http-client/http-provider-keys.ts";
import { httpProvider } from "@/plugins/providers/httpProvider.ts";

export default {
  install: (app: App) => {
    const httpClient = httpProvider();

    app.provide(httpClientProviderKey, httpClient);
  },
};
