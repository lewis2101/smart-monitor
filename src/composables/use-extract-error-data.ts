import { getOrderErrorMessage } from "@/api/getOrderErrorMessage.ts";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

export const useExtractErrorData = () => {
  const { t } = useI18n();

  const isShowDetailedError = String(import.meta.env.VITE_SHOW_DETAILED_ERROR) === "true";

  const extractError = (value: any) => {
    if (isShowDetailedError) {
      return value;
    }

    if (value?.data?.extension) {
      if (value?.data?.attr) {
        return getOrderErrorMessage(value.data.extension, t(value.data.attr));
      }
      return value.data.extension;
    }

    return "Непредвиденная ошибка";
  };

  const getErrorShowTime = computed(() => {
    if (isShowDetailedError) {
      return undefined;
    }
    return 3000;
  });

  const getErrorForToast = (value: any) => {
    return {
      severity: "error",
      summary: "Ошибка",
      detail: extractError(value),
      life: getErrorShowTime.value,
      closable: isShowDetailedError,
    };
  };

  return {
    extractError,
    getErrorForToast,
  };
};
