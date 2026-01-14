<script setup lang="ts">
import { IonButton, IonSpinner } from "@ionic/vue";
import type { StepField } from "@/components/step-generator/types.ts";
import { computed, reactive, watch } from "vue";
import { useNewOrderPartsQuery } from "@/api/orders/new-order-parts.ts";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";

const DEPENDENCY_FIELD_KEY = "vehicleId";

const props = withDefaults(
  defineProps<{
    field: StepField;
    stepModel: Record<string, { id: string | number } | undefined>;
    processKey: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const toast = useToast();

const newOrderPartsParams = reactive({
  lang: "rus",
  vehicleId: "",
  processKey: props.processKey,
});

const newOrderPartsQuery = useNewOrderPartsQuery({
  params: newOrderPartsParams,
});

const { data: newOrderPartsData, isPending } = useQuery({
  ...newOrderPartsQuery,
  enabled: () => !!newOrderPartsParams.vehicleId,
});

const isLoading = computed(() => !newOrderPartsData.value && !!isPending.value && !!newOrderPartsParams.vehicleId);

const handleClick = () => {
  if (!newOrderPartsData.value || !newOrderPartsParams.vehicleId) {
    toast.add({
      summary: "Транспорт не выбран",
      severity: "error",
      life: 3000,
    });
  }


  console.log("show details");
};

watch(
  () => props.stepModel[DEPENDENCY_FIELD_KEY],
  (value) => {
    if (value && value?.id) {
      newOrderPartsParams.vehicleId = String(value.id);
    }
  },
);
</script>

<template>
  <div class="works-list">
    <div class="works-list__title">{{ $t(field.value) }}</div>
    <ion-button
      class="works-list__button-select"
      fill="outline"
      :disabled="disabled || field.disabled || isLoading"
      @click="handleClick"
    >
      <ion-spinner v-if="isLoading" name="circular" />
      <span v-else>Выбрать</span>
    </ion-button>
  </div>
</template>

<style scoped lang="scss">
.works-list {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__title {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &__button-select {
    width: 100%;
  }
}
</style>
