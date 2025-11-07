import { computed, getCurrentInstance } from "vue";

export const useEmits = () => {
  const currentInstance = getCurrentInstance();

  const emits = computed(() => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      currentInstance?.type.emits?.reduce((acc, el) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        acc[el] = (value) => currentInstance?.emit(el, value);

        return acc;
      }, {}) ?? {}
    );
  });

  return {
    emits,
  };
};
