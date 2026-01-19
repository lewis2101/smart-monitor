<script setup lang="ts">
import { IonButton, useIonRouter } from "@ionic/vue";
import { useOrderInitialMutation } from "@/api/orders/initial-order.ts";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import { computed, useTemplateRef } from "vue";
import { useValidateInitialMutation } from "@/api/orders/validate-initial.ts";
import { useToast } from "primevue/usetoast";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";
import { ClientLimit } from "@/components/order/client-limit";
import { useActionNewOrderMutation } from "@/api/orders/action-new-order.ts";
import { useOrderSaveMutation } from "@/api/orders/order-save.ts";
import { OrderRoutes } from "@/router/router-list.ts";
import { useStartProcessMutation } from "@/api/orders/start-process.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const LIMIT_HAS_PROCESS_KEYS = ["LENKRAD_PROCESS", "PURCHASE_PROCESS"];

const props = defineProps<{
  processKey: string;
}>();

const emit = defineEmits<{
  (e: "getLabel", value: string): void;
}>();

const router = useIonRouter();
const stepGeneratorRef = useTemplateRef("stepGeneratorRef");

const toast = useToast();
const { getErrorForToast } = useExtractErrorData();
const globalSpinner = useGlobalSpinner();

const { mutateAsync: orderInitialMutate } = useOrderInitialMutation({});
const { mutateAsync: orderValidateMutate } = useValidateInitialMutation({});
const { mutateAsync: orderActionNewMutate } = useActionNewOrderMutation({});
const { mutateAsync: orderSaveMutate } = useOrderSaveMutation({});
const { mutateAsync: startProcessMutate } = useStartProcessMutation({});

const { data: orderData } = await orderInitialMutate({
  data: {
    processKey: props.processKey,
  },
});

const createOrder = async () => {
  if (!stepGeneratorRef.value) return;

  const payload = {
    ...stepGeneratorRef.value.getPayloadOfFields(),
  };

  try {
    globalSpinner.show();

    await orderValidateMutate({
      data: {
        ...payload,
        processKey: props.processKey,
      },
    });

    const { data: orderId } = await orderActionNewMutate({
      data: {
        ...payload,
        processKey: props.processKey,
      },
    });

    await orderSaveMutate({
      data: {
        ...payload,
        currentUserTask: "init",
        userTaskCompleteEvent: "init",
        orderId,
      },
    });

    await startProcessMutate({
      data: {
        orderId,
        saveData: payload,
      },
    }).catch((e) => {
      console.log(e);
    });

    router.replace({
      name: OrderRoutes.order,
      params: {
        orderId: String(orderId),
      },
    });
  } catch (e) {
    console.log(e);
    toast.add(getErrorForToast(e));
  } finally {
    globalSpinner.hide();
  }
};

const showLimits = computed(() => LIMIT_HAS_PROCESS_KEYS.includes(props.processKey));

emit("getLabel", orderData.name);
</script>

<template>
  <div v-if="orderData" class="new-order-main-block">
    <div v-if="showLimits" class="new-order-main-block__limits">
      <client-limit :process-key="processKey" />
    </div>
    <div class="new-order-main-block__fields">
      <step-generator ref="stepGeneratorRef" :process-key="processKey" :fields="orderData.attributes" />
    </div>
    <div class="new-order-main-block__actions">
      <ion-button v-if="orderData.nextButtonName" class="new-order-main-block__action-button" @click="createOrder">
        {{ $t("new-order.create") }}
      </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-order-main-block {
  width: 100%;

  &__limits {
    margin-bottom: 8px;
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
