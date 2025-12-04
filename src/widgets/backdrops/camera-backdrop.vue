<script setup lang="ts">
import { useCamera } from "@/composables/native/use-camera.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

const { takePhoto, pickGallery } = useCamera();
const globalSpinner = useGlobalSpinner();

const props = defineProps<BackdropComponentProps<(photo: string) => void, (error: Error) => void>>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const handleClickCamera = async () => {
  emit("closeBackdrop");
  const photo = await globalSpinner.execute(() => takePhoto());
  if (photo) {
    props.onSuccess?.(photo);
  } else {
    props.onFailure?.(new Error("Failed to load photo"));
  }
};

const handleClickGallery = async () => {
  emit("closeBackdrop");
  const photo = await globalSpinner.execute(() => pickGallery());
  if (photo) {
    props.onSuccess?.(photo);
  } else {
    props.onFailure?.(new Error("Failed to load photo"));
  }
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
  padding: 0 8px 16px 8px;

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
