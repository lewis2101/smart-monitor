<script setup lang="ts">
import { formatDateString } from "@/utils/formatDate.ts";
import { onMounted, useTemplateRef } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

withDefaults(
  defineProps<{
    orderNumber: string;
    userName: string;
    isRead?: boolean;
    createdAt: Date | string;
    message: string;
  }>(),
  {
    isRead: false,
  },
);

const notificationItemRef = useTemplateRef("notificationItemRef");

onMounted(() => {
  useBubbleAnimate(notificationItemRef);
});

const getFormattedListMessage = (text: string) => {
  return text.split("\n");
};
</script>

<template>
  <div ref="notificationItemRef" :class="['notification-item', isRead && 'notification-item-readed']">
    <div v-if="!isRead" class="notification-item-new" />
    <div class="notification-item-title">
      <div><span class="bold">Заявка: </span> {{ orderNumber }}</div>
      <div><span class="bold">Инифицатор: </span> {{ userName }}</div>
      <div><span class="bold">Дата создания: </span> {{ formatDateString(createdAt, { time: true }) }}</div>
    </div>
    <div v-for="(text, textIdx) in getFormattedListMessage(message)" :key="text + textIdx">
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification-item {
  &-readed {
    color: $gray-dark;
  }

  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  .bold {
    font-weight: 600;
  }

  &-title {
    margin-bottom: 16px;
  }

  &-new {
    position: absolute;
    top: 15px;
    right: 15px;

    background: $danger;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
