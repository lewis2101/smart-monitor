import { createI18n } from "vue-i18n";

import eng from "./eng.json";
import kaz from "./kaz.json";
import rus from "./rus.json";

const i18n = createI18n({
  legacy: false,
  locale: "rus",
  fallbackLocale: "rus",
  messages: {
    eng,
    kaz,
    rus,
  },
});

export default i18n;
