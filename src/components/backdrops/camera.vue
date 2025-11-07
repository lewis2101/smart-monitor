<script setup lang="ts">
import { useCamera } from "@/composables/native/use-camera.ts";

const { takePhoto, pickGallery } = useCamera();

const props = defineProps<{
  selectPhoto: (photo: string | undefined) => void;
}>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const handleClickCamera = () => {
  emit("closeBackdrop");
  takePhoto(props.selectPhoto);
};

const handleClickGallery = () => {
  emit("closeBackdrop");
  pickGallery(props.selectPhoto);
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
