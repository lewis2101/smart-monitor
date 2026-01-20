<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { onMounted, useTemplateRef } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { IonSpinner } from "@ionic/vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useOrderHistoryQuery } from "@/api/orders/order-history.ts";
import { useQuery } from "@tanstack/vue-query";
import { formatDateString } from "@/utils/formatDate.ts";

const eventMapper: Record<string, string> = {
  init: `Новая заявка создана`,
  NEXT: `Задача направлена далее`,
  REWORK: `Осуществлен возврат`,
  TO_REWORK: `Задача возвращена на доработку`,
  BACK: `Осуществлен возврат`,
  CONFIRM: `Задача подтверждена`,
  FINISH: `Задача завершена`,
  TO_CONFIRM: `Задача отправлена на подтверждение`,
  CANCEL: `Задача отменена`,
  NOT_CONFIRM: `Задача не подтверждена`,
  VEHICLE_IS_CAME: `Задача подтверждена`,
  VEHICLE_IS_NOT_CAME: `Задача не подтверждена`,
  CONFIRM_WITH_CHANGES: `Задача подтверждена`,
  ACCEPT: `Задача принята`,
  HAND_OVER: `Задача сдана`,
  ACCESS: `Осуществлен допуск`,
  NO_ACCESS: `Задача была не допущена`,
  SEND_FOR_PAYMENT: `Произведена оплата`,
  RESEND_FOR_PAYMENT: `Осуществлен возврат на исправление`,
  RATE_THE_TRIP: `Задача была оценена`,
};

const DEFAULT_EVENT_TEXT = `Задача направлена далее`;

const props = defineProps<{
  orderId: string | number;
}>();

const orderHistoryRef = useTemplateRef("orderHistoryRef");

const globalBackdropStore = useGlobalBackdropStore();

const orderHistoryQuery = useOrderHistoryQuery({
  params: {
    orderId: props.orderId,
  },
});

const { data, isPending } = useQuery(orderHistoryQuery);

const handleClick = () => {
  if (isPending.value) return;

  globalBackdropStore.push("timeline", {
    title: "История заявки",
    props: {
      timeline: data.value
        .map((item) => {
          const username = item.user.username;
          const fullName = `${item.user.firstName || ""} ${item.user.lastName || ""}`;
          const description = `${fullName} (${username})`;
          const date = formatDateString(new Date(item.createdAt), { time: true });

          const eventText = eventMapper[item.event];

          if (eventText) {
            return {
              label: eventText,
              description,
              date,
            };
          }
          return {
            label: DEFAULT_EVENT_TEXT,
            description,
            date,
          };
        })
        .reverse(),
    },
  });
};

onMounted(() => {
  useBubbleAnimate(orderHistoryRef);
});
</script>

<template>
  <div ref="orderHistoryRef" class="order-history" @click="handleClick">
    <div class="order-history__title">История заявки</div>
    <ion-spinner v-if="isPending" name="circular" class="order-history__spinner-icon" />
    <base-icon v-else name="history" class="order-history__icon" />
  </div>
</template>

<style scoped lang="scss">
.order-history {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    font-weight: 500;
  }

  &__icon {
    color: $main-color;
  }

  &__spinner {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;

    &-icon {
      color: $main-color;
    }
  }
}
</style>
