import { createI18n } from "vue-i18n";
import eng from "./eng.json";
import kaz from "./kaz.json";
import rus from "./rus.json";
import type { Lang } from "@/i18n/lang.ts";
import type { ComputedRef } from "vue";

const FALLBACK_LANG: Lang = "rus";

function getByPath(obj: any, path: string) {
  return path.split(".").reduce((o, k) => o?.[k], obj);
}

function caseFallbackResolver(messages: any, path: string) {
  return getByPath(messages, path) ?? getByPath(messages, path.toUpperCase());
}

const i18n = createI18n({
  legacy: false,
  locale: "rus",
  fallbackLocale: "rus",
  messages: {
    eng,
    kaz,
    rus,
  },
  messageResolver: caseFallbackResolver,
});

export function getValueByLocale(obj: Record<Lang, string>): string {
  const locale = i18n.global.locale as ComputedRef<Lang>;
  return obj[locale.value as Lang] || obj[FALLBACK_LANG] || "";
}

export default i18n;
