<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import type { FileContent } from "@/components/step-generator/FileField/types.ts";
import { onMounted, useTemplateRef } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { IonButton } from "@ionic/vue";

const props = withDefaults(defineProps<{
  file: FileContent;
  disabled?: boolean;
}>(), {
  disabled: false,
});

const fileRef = useTemplateRef("fileRef");

onMounted(() => {
  useBubbleAnimate(fileRef, () => props.disabled);
});
</script>

<template>
  <div ref="fileRef" class="file">
    <div class="file__content">
      <base-icon name="file" class="file__icon" />
      <div class="file__label">{{ file.file.name }}</div>
      <div class="file-field__item-extension">({{ file.docTypeName }})</div>
    </div>
    <div v-if="false" class="file__buttons">
      <ion-button color="danger" @click.stop.prevent>
        <base-icon name="trash" />
      </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file {
  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__content {
    display: flex;
    align-items: center;
  }

  &__buttons {
    margin-top: 8px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__icon {
    color: $main-color;
    margin-right: 12px;
  }

  &__label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
