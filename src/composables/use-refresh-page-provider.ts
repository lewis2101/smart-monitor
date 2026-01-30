import { type InjectionKey, provide, readonly, ref, inject } from "vue";
import { getUniqueString } from "@/utils/getUniqueString.ts";

export const refreshPageProviderKey = Symbol("refresh-page-key") as InjectionKey<{
  getTriesCount: () => number;
  refreshPageKey: () => void;
  refreshPageWithTries: () => void;
}>;

export const useRefreshPageProvider = () => {
  const refreshTries = ref(0);
  const pageKey = ref<string>(getUniqueString());

  const refreshPageKey = () => {
    pageKey.value = getUniqueString();
  };

  const refreshPageWithTries = () => {
    refreshPageKey();
    refreshTries.value++;
  };

  provide(refreshPageProviderKey, {
    getTriesCount: () => refreshTries.value,
    refreshPageKey,
    refreshPageWithTries,
  });

  return {
    pageKey: readonly(pageKey),
    refreshPageKey,
  };
};

export const useRefreshPageInjector = () => {
  const refreshPageInjector = inject(refreshPageProviderKey);

  if (!refreshPageInjector) {
    throw new Error("REFRESH PAGE NOT PROVIDED");
  }

  const { getTriesCount, refreshPageKey, refreshPageWithTries } = refreshPageInjector;

  return {
    getTriesCount,
    refreshPageKey,
    refreshPageWithTries,
  };
};
