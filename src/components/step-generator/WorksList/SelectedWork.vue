<script setup lang="ts">
import type { OrderPartsContentChild } from "@/api/orders/new-order-parts.ts";
import { IonButton } from "@ionic/vue";

withDefaults(
  defineProps<{
    item: OrderPartsContentChild;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

defineEmits<{
  (e: "delete"): void;
  (e: "change"): void;
}>();

const showKeys: Array<keyof Partial<OrderPartsContentChild>> = [
  "name",
  "typeName",
  "catalogNumber",
  "quantity",
  "price",
];
</script>

<template>
  <div class="selected-work">
    <template v-for="key in showKeys" :key="key">
      <div v-if="item[key]" class="selected-work__item">
        <span class="selected-work__item-bold">{{ $t(key) }}: </span>
        <span>{{ item[key] }}</span>
      </div>
    </template>
    <div v-if="!disabled" class="selected-work__buttons">
      <ion-button
        class="selected-work__button"
        size="small"
        fill="outline"
        :disabled="disabled"
        @click="$emit('change')"
      >
        Редактировать
      </ion-button>
      <ion-button
        class="selected-work__button"
        size="small"
        fill="outline"
        color="danger"
        :disabled="disabled"
        @click="$emit('delete')"
      >
        Удалить
      </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-work {
  &__item {
    font-size: 14px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    &-bold {
      font-weight: 600;
    }
  }

  &__buttons {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__button {
    width: 100%;
  }
}
</style>
