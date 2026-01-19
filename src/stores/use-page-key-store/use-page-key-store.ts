import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { getUniqueString } from "@/utils/getUniqueString.ts";

export const usePageKeyStore = defineStore("use-page-key-store", () => {
  const pageKey = ref<string>(getUniqueString());

  const refreshPageKey = () => {
    pageKey.value = getUniqueString();
  };

  return {
    pageKey: readonly(pageKey),
    refreshPageKey,
  };
});
