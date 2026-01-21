<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { IonButton } from "@ionic/vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { AdditionalOrderActions, OrderActions } from "@/components/step-generator/types.ts";
import { computed, type ComputedRef } from "vue";
import {
  type OrderButtonConfig,
  orderButtonsConfig,
} from "@/components/order/order-more-buttons/orderButtonsConfig.ts";

const props = defineProps<{
  actionButtons: OrderActions[];
  additionalButtons: AdditionalOrderActions[];
}>();

const emit = defineEmits<{
  (e: "click-action", value: OrderActions | AdditionalOrderActions): void;
}>();

const globalBackdropStore = useGlobalBackdropStore();

const orderMainButton: ComputedRef<OrderButtonConfig | null> = computed(() => {
  const buttons = [...props.actionButtons, ...props.additionalButtons];

  if (buttons.length === 0) return null;
  const mainButtonKey = buttons.reduce((mainKey, currentKey) => {
    return orderButtonsConfig[currentKey].order < orderButtonsConfig[mainKey].order ? currentKey : mainKey;
  });

  if (!mainButtonKey) return null;
  return orderButtonsConfig[mainButtonKey];
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
