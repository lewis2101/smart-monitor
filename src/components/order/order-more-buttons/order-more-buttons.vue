<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import {IonButton} from "@ionic/vue";
import {
  useGlobalBackdropStore
} from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import {AdditionalOrderActions, OrderActions} from "@/components/step-generator/types.ts";
import {computed} from "vue";

const props = defineProps<{
  actionButtons: string[];
  additionalButtons: string[];
}>()

const globalBackdropStore = useGlobalBackdropStore();

const orderButtonsConfig: Record<OrderActions | AdditionalOrderActions, {
  label: string;
  order: number;
}> = {
  CONFIRM: {
    label: "Подтвердить",
    order: 1,
  },
  RATE_THE_TRIP: {
    label: "Оценить поездку",
    order: 2,
  },
  REWORK: {
    label: "Вернуть",
    order: 3,
  },
  TO_REWORK: {
    label: "На доработку",
    order: 4,
  },
  CANCEL: {
    label: "Отменить",
    order: 5,
  },
  duplicate: {
    label: "Дублировать заявку",
    order: 6,
  }
}

const orderMainButton = computed(() => {
  return [...props.actionButtons, ...props.additionalButtons].reduce((acc, curr) => {
    const currentButton = orderButtonsConfig[curr];
    if (!acc) {
      return currentButton;
    }
    if (currentButton.order < acc.order) {
      return currentButton;
    }
    return acc;
  }, null)
})

const orderAdditionalButtons = computed(() => {
  return [...props.actionButtons, ...props.additionalButtons]
    .filter((button) => {
      if (!orderButtonsConfig[button]) {
        return false;
      }
      return orderMainButton.value.label !== orderButtonsConfig[button].label;
    })
    .map((button) => {
      const buttonConfig = orderButtonsConfig[button];
      if (buttonConfig) {
        return {
          label: buttonConfig.label,
          value: buttonConfig.label,
        }
      }
    })
})

const handleClick = async () => {
  try {
    const result = (await globalBackdropStore.push("pick", {
      title: "Управление заявкой",
      props: {
        list: orderAdditionalButtons.value
      }
    }) as string);

    console.log({result})
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <div class="order-more-buttons">
    <ion-button
      v-if="orderMainButton"
      class="order-more-buttons__action-button"
    >
      {{ orderMainButton.label }}
    </ion-button>
    <ion-button v-if="orderAdditionalButtons.length" fill="outline" @click="handleClick">
      <base-icon name="more-horizontal"/>
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
