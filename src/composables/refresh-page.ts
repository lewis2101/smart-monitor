import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { getUniqueString } from "@/utils/getUniqueString.ts";

export const useRefreshPage = (queryClientKeys: string[] | string[][]) => {
  const pageId = ref(getUniqueString());
  const queryClient = useQueryClient();

  const refresh = async (onFinish?: () => void) => {
    if (queryClientKeys) {
      const suspense = queryClientKeys.map((item) => {
        const keys = Array.isArray(item) ? item : [item];
        return queryClient.invalidateQueries({
          queryKey: keys,
        });
      });

      await Promise.all(suspense);
      pageId.value = getUniqueString();

      onFinish?.();
    }
  };

  return {
    pageId,
    refresh,
  };
};
