<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useCameraPick } from "@/composables/useCameraPick.ts";
import Image from "primevue/image";

withDefaults(
  defineProps<{
    title?: string;
    canAdd?: boolean;
    canDelete?: boolean;
  }>(),
  {
    canAdd: false,
    canDelete: false,
  },
);

const images = defineModel<string[]>({ default: () => [], required: true });

const { getPhoto } = useCameraPick();

const removeImage = (idx: number) => {
  images.value.splice(idx, 1);
};

const handleAddPhoto = async () => {
  const photo = await getPhoto();

  if (photo) {
    images.value.push(photo);
  }
};
</script>

<template>
  <div class="base-gallery-block">
    <div v-if="title" class="base-gallery-block__title">{{ title }}</div>
    <div class="base-gallery-block__images">
      <div v-for="(img, idx) in images" :key="idx" class="block-image">
        <base-icon v-if="canDelete" name="close" class="block-image__close" @click="removeImage(idx)" />
        <Image
          :pt="{
            toolbar: $style.toolbar,
          }"
          class="block-image__img"
          :src="img"
          preview
        />
        <!--        <img :src="image" />-->
      </div>
      <div v-if="canAdd" class="add-photo" @click="handleAddPhoto">
        <base-icon name="add-photo" />
        <div class="add-photo__title">Добавить файл</div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.toolbar {
  margin-top: env(safe-area-inset-top);
}
</style>

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
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .block-image {
    flex-shrink: 0;
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
      z-index: 1;
    }

    &__img {
      width: 100%;
      height: 100%;

      &:deep(img) {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }

  .add-photo {
    flex-shrink: 0;
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
