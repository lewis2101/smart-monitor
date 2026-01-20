<script setup lang="ts">
import { useOrderActionQuery } from "@/api/orders/order-action.ts";
import { useOrderMainMutation } from "@/api/orders/order-main.ts";
import { useOrderNextMutation } from "@/api/orders/order-next.ts";
import { useQuery } from "@tanstack/vue-query";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import type { AdditionalOrderActions, OrderActions } from "@/components/step-generator/types.ts";
import { computed, useTemplateRef } from "vue";
import { useOrderSaveMutation } from "@/api/orders/order-save.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useToast } from "primevue/usetoast";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";
import OrderMoreButtons from "@/components/order/order-more-buttons/order-more-buttons.vue";
import ClientLimit from "@/components/order/client-limit/client-limit.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useRole } from "@/composables/useRole.ts";
import { useRefreshPageInjector } from "@/composables/use-refresh-page.ts";
import OrderHistory from "@/components/order/order-history/order-history.vue";

const LIMIT_HAS_PROCESS_KEYS = ["LENKRAD_PROCESS", "PURCHASE_PROCESS"];
const COMPLETE_TASK_NAME = "COMPLETE";

const props = defineProps<{
  orderId: string;
}>();

const stepGeneratorRef = useTemplateRef("stepGeneratorRef");
const toast = useToast();
const { getErrorForToast } = useExtractErrorData();

const { clientInfoStorage } = useAuthStorage();
const { isClient } = useRole(() => clientInfoStorage.value.type);

const { getTriesCount, refreshPageKey, refreshPageWithTries } = useRefreshPageInjector();

const checkOrderDataState = () => {
  const { currentTask, currentTaskType, state, processCompleted } = orderData.value;

  if ((currentTask && currentTaskType === "USER" && state === "RUNNING") || processCompleted) {
    return;
  }

  if (getTriesCount() > 10 || state === "ERROR") {
    return;
  }

  refreshPageWithTries();
};

const orderActionQuery = useOrderActionQuery({
  getUrl: (url) => url + "/" + props.orderId,
  keys: [() => props.orderId],
});

const { mutateAsync: orderMainMutate } = useOrderMainMutation({});
const { mutateAsync: orderNextMutate } = useOrderNextMutation({});
const { mutateAsync: orderSaveMutate } = useOrderSaveMutation({});

const globalSpinner = useGlobalSpinner();

const { data: orderData, suspense } = useQuery({
  ...orderActionQuery,
  enabled: () => !!props.orderId,
  staleTime: 0,
});

await Promise.all([
  suspense(),
  orderMainMutate({
    data: {
      orderId: props.orderId,
    },
  }),
]);

checkOrderDataState();

const currentUserTask = computed(() =>
  orderData.value?.processCompleted ? COMPLETE_TASK_NAME : orderData.value?.currentTask,
);

const isBpmnButtonsVisible = computed(() => orderData.value.permissions.canComplete);

const { data: orderNextData } = await orderNextMutate({
  data: {
    orderId: props.orderId,
    currentUserTask: currentUserTask.value,
  },
});

const saveOrder = async (action: OrderActions | AdditionalOrderActions) => {
  if (!stepGeneratorRef.value) return;

  const payload = {
    ...stepGeneratorRef.value.getPayloadOfFields(),
  };

  try {
    globalSpinner.show();

    await orderSaveMutate({
      data: {
        ...payload,
        currentUserTask: currentUserTask.value,
        userTaskCompleteEvent: action,
        orderId: props.orderId,
      },
    });

    refreshPageKey();
  } catch (e) {
    console.log(e);
    toast.add(getErrorForToast(e));
  } finally {
    globalSpinner.hide();
  }
};

const orderActions: Record<OrderActions | AdditionalOrderActions, () => void> = {
  CONFIRM: () => saveOrder("CONFIRM"),
  TO_CONFIRM: () => saveOrder("TO_CONFIRM"),
  RATE_THE_TRIP: () => saveOrder("RATE_THE_TRIP"),
  REWORK: () => saveOrder("REWORK"),
  TO_REWORK: () => saveOrder("TO_REWORK"),
  CANCEL: () => saveOrder("CANCEL"),
  duplicate: () => {
    console.log("duplicate");
  },
};

const handleActionClick = (action: OrderActions | AdditionalOrderActions) => {
  if (action) {
    orderActions[action]();
  }
};

const orderDisabled = computed(() => !orderData.value?.permissions.canComplete);
const showLimits = computed(() => LIMIT_HAS_PROCESS_KEYS.includes(orderNextData?.processKey));
</script>

<template>
  <div v-if="orderData" class="order-main-block">
    <order-history :order-id="orderId" class="order-main-block__history" />
    <div v-if="isClient && showLimits" class="order-main-block__limits">
      <client-limit :process-key="orderNextData.processKey" />
    </div>
    <div class="order-main-block__status-title">
      {{ orderNextData.name }}
    </div>
    <div class="order-main-block__fields">
      <step-generator
        ref="stepGeneratorRef"
        :process-key="orderNextData.processKey"
        :fields="orderNextData.attributes"
        :disabled="orderDisabled"
      />
    </div>
    <order-more-buttons
      :action-buttons="isBpmnButtonsVisible ? orderData.actions || [] : []"
      :additional-buttons="orderNextData.buttons || []"
      @click-action="handleActionClick"
    />
  </div>
</template>

<style scoped lang="scss">
.order-main-block {
  width: 100%;

  &__history {
    margin-bottom: 8px;
  }

  &__limits {
    margin-bottom: 8px;
  }

  &__status-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;

    color: $white;
    padding: 12px;
    background: $main-color;
    border-radius: 20px;
    width: 100%;
    text-align: center;

    margin-bottom: 16px;
  }

  &__fields {
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__action-button {
    width: 100%;
  }
}
</style>
