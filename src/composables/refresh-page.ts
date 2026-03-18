import { nextTick, ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { getUniqueString } from "@/utils/getUniqueString.ts";
import type { RefresherCustomEvent } from "@ionic/vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useHaptics } from "@/composables/native/use-haptics.ts";

export const useRefreshPage = (queryClientKeys: string[] | string[][], onFinish?: () => void) => {
  const pageId = ref(getUniqueString());
  const queryClient = useQueryClient();

  const { mediumHaptic } = useHaptics();

  const refresh = async (event: RefresherCustomEvent) => {
    if (queryClientKeys) {
      const suspense = queryClientKeys.map((item) => {
        const keys = Array.isArray(item) ? item : [item];
        return queryClient.invalidateQueries({
          queryKey: keys,
        });
      });

      await nextTick();
      await mediumHaptic();

      await Promise.all(suspense);
      pageId.value = getUniqueString();

      onFinish?.();
      mockRefresh(event);
    }
  };

  return {
    pageId,
    refresh,
  };
};
