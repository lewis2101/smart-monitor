<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import { useOrderActionQuery } from "@/api/orders/order-action.ts";
import { useOrderMainMutation } from "@/api/orders/order-main.ts";
import { useOrderNextMutation } from "@/api/orders/order-next.ts";
import { useQuery } from "@tanstack/vue-query";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import type { OrderActions } from "@/components/step-generator/types.ts";
import { computed, useTemplateRef, watch } from "vue";
import { useOrderSaveMutation } from "@/api/orders/order-save.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const COMPLETE_TASK_NAME = "COMPLETE";

const props = defineProps<{
  orderId: string;
}>();

const stepGeneratorRef = useTemplateRef("stepGeneratorRef");

const orderActionQuery = useOrderActionQuery({
  getUrl: (url) => url + "/" + props.orderId,
  keys: [() => props.orderId],
});

const { mutateAsync: orderMainMutate } = useOrderMainMutation({});
const { mutateAsync: orderNextMutate } = useOrderNextMutation({});
const { mutate: orderSaveMutate, isPending: savePending, error: saveError } = useOrderSaveMutation({});

const globalSpinner = useGlobalSpinner();

const { data: orderData, suspense } = useQuery({
  ...orderActionQuery,
  enabled: () => !!props.orderId,
});

await Promise.all([
  suspense(),
  orderMainMutate({
    orderId: props.orderId,
  }),
]);

const currentUserTask = computed(() =>
  orderData.value?.processCompleted ? COMPLETE_TASK_NAME : orderData.value?.currentTask,
);

const orderNextData = await orderNextMutate({
  orderId: props.orderId,
  currentUserTask: currentUserTask.value,
});

const orderActions: Record<OrderActions, { label: string; fill?: "outline"; color?: string; action: () => void }> = {
  RATE_THE_TRIP: {
    label: "Оценить поездку",
    action: () => {
      if (stepGeneratorRef.value?.fieldsModel) {
        orderSaveMutate({
          ...stepGeneratorRef.value.fieldsModel,
          currentUserTask: currentUserTask.value,
          userTaskCompleteEvent: "RATE_THE_TRIP",
          orderId: props.orderId,
        });
        console.log("FIELDS MODEL: ", stepGeneratorRef.value?.fieldsModel);
      }
    },
  },
  CONFIRM: {
    label: "Подтвердить",
    action: () => {
      console.log("CONFIRM");
    },
  },
  CANCEL: {
    label: "Отменить",
    action: () => {
      console.log("CANCEL");
    },
    fill: "outline",
    color: "danger",
  },
  TO_REWORK: {
    label: "На доработку",
    action: () => {
      console.log("TO_REWORK");
    },
    fill: "outline",
  },
};

const orderDisabled = computed(() => !orderData.value?.permissions.canComplete);

const orderActionButtons = computed(() => {
  if (!orderData.value) {
    return [];
  }

  const orderActionsKeys = Object.keys(orderActions);

  return orderData.value.actions
    .filter((action) => orderActionsKeys.includes(action))
    .map((action) => orderActions[action]);
});

watch(savePending, (value) => {
  if (value) {
    globalSpinner.show();
  } else {
    globalSpinner.hide();
  }
});

watch(saveError, (value) => {
  if (value) {
    console.log(value);
  }
});
</script>

<template>
  <div class="order-main-block">
    <div class="order-main-block__status-title">
      {{ orderNextData.name }}
    </div>
    <div class="order-main-block__fields">
      <step-generator ref="stepGeneratorRef" :fields="orderNextData.attributes" :disabled="orderDisabled" />
    </div>
    <div class="order-main-block__actions">
      <ion-button
        v-for="action in orderActionButtons"
        :key="action.label"
        :fill="action.fill"
        :color="action.color"
        class="order-main-block__action-button"
        @click="action.action"
      >
        {{ action.label }}
      </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-main-block {
  width: 100%;

  &__status-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;

    color: $white;
    padding: 4px 12px;
    background: $main-color;
    border-radius: 20px;
    width: fit-content;

    margin-bottom: 16px;
  }

  &__fields {
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }

  &__action-button {
    width: 100%;
  }
}
</style>
