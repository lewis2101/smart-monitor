import type { InjectionKey } from "vue";
import type { HttpClient } from "@/composables/http-client/HttpClient.ts";

export const httpClientProviderKey = Symbol("http-provider-key") as InjectionKey<HttpClient>;
