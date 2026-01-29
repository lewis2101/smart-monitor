<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import { computed } from "vue";
import { IonButton } from "@ionic/vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import type { FileType } from "@/components/step-generator/DocumentField/types.ts";

const iconMap: Record<FileType, string> = {
  IMAGE_PDF: "image",
  VIDEO: "video",
};

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const getFileIcon = (type?: FileType) => (type && iconMap[type] ? iconMap[type] : "file");

const files = computed(() => {
  return props.field.options?.files || [];
});
</script>

<template>
  <div class="document-field">
    <div class="document-field__title">Загрузка файлов</div>
    <div class="document-field__list">
      <div v-for="file in files" :key="file.fileCode" class="document-field__list-item">
        <div class="document-field__list-icon">
          <base-icon :name="getFileIcon(file.fileType)" />
        </div>
        <div class="document-field__list-title">{{ file.fileName }}</div>
      </div>
    </div>
    <ion-button v-if="!field.disabled && !props.disabled" class="document-field__button">
      <base-icon class="document-field__button-icon" name="plus" />
    </ion-button>
  </div>
</template>

<style scoped lang="scss">
.document-field {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__title {
    margin-bottom: 16px;
    padding-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px #f2f2f7 solid;
  }

  &__list {
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
    margin-bottom: 16px;
    padding: 4px;

    &-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px;
    }

    &-icon {
      border: 1px solid var(--System-Gray-Light, #f2f2f7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;

      color: $gray-dark;
    }

    &-title {
      color: $gray-dark;
      font-size: 14px;
    }
  }

  &__button {
    width: 100%;

    &-icon {
      color: $white;
    }
  }
}
</style>
