import { readonly, ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalImageStore = defineStore("global-image-store", () => {
  const currentImage = ref<string>();

  const setImage = (image: string) => (currentImage.value = image);
  const removeImage = () => (currentImage.value = "");

  return {
    currentImage: readonly(currentImage),
    setImage,
    removeImage,
  };
});
