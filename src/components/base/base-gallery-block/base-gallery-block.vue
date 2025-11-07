<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useGlobalImageStore } from "@/stores/use-global-image-store/use-global-image-store.ts";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

defineProps<{
  title?: string;
}>();

const images = defineModel<string[]>({ default: () => [], required: true });

const globalBackdropStore = useGlobalBackdropStore();

const globalImageStore = useGlobalImageStore();
const { currentImage } = storeToRefs(globalImageStore);

const removeImage = (idx: number) => {
  images.value.splice(idx, 1);
};

const handleAddPhoto = () => {
  globalBackdropStore.push("camera", {
    args: {
      selectPhoto: (photo) => photo && images.value.push(photo),
    },
  });
};

onMounted(() => {
  if (currentImage.value) {
    images.value.push(currentImage.value);
    globalImageStore.removeImage();
  }
});

watch(currentImage, (value) => {
  if (value) {
    images.value.push(value);
  }
});
</script>

<template>
  <div class="base-gallery-block">
    <div v-if="title" class="base-gallery-block__title">{{ title }}</div>
    <div class="base-gallery-block__images">
      <div v-for="(image, idx) in images" :key="idx" class="block-image">
        <base-icon name="close" class="block-image__close" @click="removeImage(idx)" />
        <img :src="image" />
      </div>
      <div class="add-photo" @click="handleAddPhoto">
        <base-icon name="add-photo" />
        <div class="add-photo__title">Добавить файл</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-gallery-block {
  &__title {
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
    color: $txt-description;
    margin-bottom: 8px;
  }

  &__images {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .block-image {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 8px;

    &__close {
      width: 28px;
      height: 28px;
      position: absolute;
      top: 4px;
      right: 4px;
      color: #777777;
      background: #e1e0e1;
      border-radius: 50%;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .add-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: 1px solid #e1e1e1;
    width: 96px;
    height: 96px;
    border-radius: 14px;

    &__title {
      font-weight: 300;
      font-size: 11px;
      line-height: 100%;
      letter-spacing: 0;
      color: #767776;
    }
  }
}
</style>
