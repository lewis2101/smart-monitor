<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { IonButton } from "@ionic/vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { AdditionalOrderActions, OrderActions } from "@/components/step-generator/types.ts";
import { computed, type ComputedRef } from "vue";

const props = defineProps<{
  actionButtons: OrderActions[];
  additionalButtons: AdditionalOrderActions[];
}>();

const emit = defineEmits<{
  (e: "click-action", value: OrderActions | AdditionalOrderActions): void;
}>();

const globalBackdropStore = useGlobalBackdropStore();

type OrderButtonConfig = {
  label: string;
  order: number;
  type: OrderActions | AdditionalOrderActions;
};

const orderButtonsConfig: Record<OrderActions | AdditionalOrderActions, OrderButtonConfig> = {
  CONFIRM: {
    label: "Подтвердить",
    order: 1,
    type: "CONFIRM",
  },
  TO_CONFIRM: {
    label: "На согласование",
    order: 2,
    type: "TO_CONFIRM",
  },
  RATE_THE_TRIP: {
    label: "Оценить поездку",
    order: 3,
    type: "RATE_THE_TRIP",
  },
  REWORK: {
    label: "Вернуть",
    order: 4,
    type: "REWORK",
  },
  TO_REWORK: {
    label: "На доработку",
    order: 5,
    type: "TO_REWORK",
  },
  CANCEL: {
    label: "Отменить",
    order: 6,
    type: "CANCEL",
  },
  duplicate: {
    label: "Дублировать заявку",
    order: 7,
    type: "duplicate",
  },
};

const orderMainButton: ComputedRef<OrderButtonConfig | null> = computed(() => {
  return [...props.actionButtons, ...props.additionalButtons].reduce<OrderButtonConfig | null>((acc, curr) => {
    const currentButton = orderButtonsConfig[curr];
    if (!acc) {
      return currentButton;
    }
    if (currentButton.order < acc.order) {
      return currentButton;
    }
    return acc;
  }, null);
});

const orderAdditionalButtons = computed(() => {
  return [...props.actionButtons, ...props.additionalButtons]
    .filter((button) => {
      if (!orderButtonsConfig[button]) {
        return false;
      }
      if (orderMainButton.value) {
        return orderMainButton.value.label !== orderButtonsConfig[button].label;
      }
      return true;
    })
    .map((button) => {
      const buttonConfig = orderButtonsConfig[button];
      return {
        label: buttonConfig.label,
        value: buttonConfig.type,
      };
    });
});

const handleMoreClick = async () => {
  try {
    const result = (await globalBackdropStore.push("pick", {
      title: "Управление заявкой",
      props: {
        list: orderAdditionalButtons.value,
      },
    })) as OrderActions | AdditionalOrderActions;

    if (result) {
      emit("click-action", result);
    }
  } catch (e) {
    console.log(e);
  }
};

const handleMainButton = () => {
  if (orderMainButton.value) {
    emit("click-action", orderMainButton.value.type);
  }
};
</script>

<template>
  <div class="order-more-buttons">
    <ion-button v-if="orderMainButton" class="order-more-buttons__action-button" @click="handleMainButton">
      {{ orderMainButton.label }}
    </ion-button>
    <ion-button v-if="orderAdditionalButtons.length" fill="outline" @click="handleMoreClick">
      <base-icon name="more-horizontal" />
    </ion-button>
  </div>
</template>

<style scoped lang="scss">
.order-more-buttons {
  display: flex;
  align-items: center;
  gap: 8px;

  &__action-button {
    width: 100%;
  }
}
</style>
