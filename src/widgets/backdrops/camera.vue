<script setup lang="ts">
import { useCamera } from "@/composables/native/use-camera.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const { takePhoto, pickGallery } = useCamera();
const globalSpinner = useGlobalSpinner();

const props = defineProps<{
  selectPhoto: (photo: string | undefined) => void;
}>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const handleClickCamera = async () => {
  emit("closeBackdrop");
  await globalSpinner.execute(() => takePhoto(props.selectPhoto));
};

const handleClickGallery = async () => {
  emit("closeBackdrop");
  await globalSpinner.execute(() => pickGallery(props.selectPhoto));
};
</script>

<template>
  <div class="camera-backdrop">
    <div class="camera-backdrop__item" @click="handleClickCamera">Камера</div>
    <div class="camera-backdrop__item" @click="handleClickGallery">Галерея</div>
  </div>
</template>

<style scoped lang="scss">
.camera-backdrop {
  padding-bottom: 16px;

  &__item {
    color: $black;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;

    padding: 16px;
    border-radius: 8px;
    border-bottom: 1px solid $gray-light;
  }
}
</style>
