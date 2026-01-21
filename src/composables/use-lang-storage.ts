import { useI18n } from "vue-i18n";
import { watch } from "vue";
import type { Lang } from "@/i18n/lang.ts";

const LANGUAGE_STORAGE_KEY = "language";

export const useLangStorage = () => {
  const { locale } = useI18n();

  const initLocaleLang = () => {
    const currentLocale = (localStorage.getItem(LANGUAGE_STORAGE_KEY) || "rus") as Lang;
    locale.value = currentLocale;
  };

  watch(locale, (value) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  });

  return {
    initLocaleLang,
  };
};
