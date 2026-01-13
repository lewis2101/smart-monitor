import { Composer } from "vue-i18n";
import type { WritableComputedRef } from "vue";
import type { Lang } from "@/i18n/lang.ts";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: Composer["t"];
    locale: WritableComputedRef<Lang, string>;
  }
}
