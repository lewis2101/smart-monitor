import type { Directive } from "vue";

export const vIntersect: Directive = {
  mounted(el, binding) {
    const options = binding.value?.options || {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        binding.value?.callback?.(entry);
      }
    }, options);

    observer.observe(el);

    el._observer = observer;
  },

  unmounted(el) {
    el._observer?.disconnect();
  },
};
