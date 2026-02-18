<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import SelectInput from "@/widgets/select-input/select-input.vue";
import { computed, type ComputedRef, reactive, watch } from "vue";
import { IonSpinner } from "@ionic/vue";
import type { OrderPartsContentChild } from "@/api/orders/new-order-parts.ts";
import { useSupplierListQuery } from "@/api/orders/supplierList.ts";
import { useQuery } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";

const DEPENDENCY_VEHICLE_KEY = "vehicleId";
const DEPENDENCY_WORKS_KEY = "worksList";

type SelectList = InstanceType<typeof SelectInput>["$props"]["list"];

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
    stepModel: Record<string, OrderPartsContentChild[] | { id: string | number } | undefined>;
  }>(),
  {
    disabled: false,
  },
);

const { t } = useI18n();

const model = defineModel<{
  id: string | number;
} | null>({ required: true });

const modelProxy = computed({
  get: () => {
    if (typeof model.value === "object" && model.value?.id) {
      return model.value.id;
    }
    return model.value;
  },
  set: (value) => {
    if (value) {
      model.value = {
        id: value,
      };
    }
  },
});

const supplierListParams = reactive<{
  vehicleId: string;
  services: string[];
  parts: string[];
}>({
  vehicleId: "",
  services: [],
  parts: [],
});

const supplierListQuery = useSupplierListQuery({
  params: supplierListParams,
});

const { data: supplierListData, isPending } = useQuery({
  ...supplierListQuery,
  enabled: () =>
    !!supplierListParams.vehicleId && (!!supplierListParams.services.length || !!supplierListParams.parts.length),
});

const isLoading = computed(
  () =>
    !supplierListData.value &&
    !!isPending.value &&
    !!supplierListParams.vehicleId &&
    (!!supplierListParams.services.length || !!supplierListParams.parts.length),
);

const isDisabled = computed(() => props.disabled || props.field.disabled || isLoading.value);

const list: ComputedRef<SelectList> = computed(() => {
  if (!supplierListData.value) return [];

  return supplierListData.value.content.map((item) => ({
    label: item.name,
    description: `${item.cityName} ${item.street}`,
    hint: [
      item.mobileNumber ? `${t("mobileNumber")}: ${item.mobileNumber}` : "",
      item.workNumber ? `${t("workNumber")}: ${item.workNumber}` : "",
    ],
    value: item.id,
  }));
});

watch(
  () => props.stepModel[DEPENDENCY_VEHICLE_KEY],
  (value) => {
    if (value && !Array.isArray(value) && value.id) {
      supplierListParams.vehicleId = String(value.id);
    }
  },
);

watch(
  () => props.stepModel[DEPENDENCY_WORKS_KEY],
  (value) => {
    if (value && Array.isArray(value)) {
      const services: string[] = [];
      const parts: string[] = [];
      value.forEach((item) => {
        if (item.serviceId) {
          services.push(String(item.serviceId));
        }
        if (item.sparePartId) {
          parts.push(String(item.sparePartId));
        }
      });

      supplierListParams.services = services;
      supplierListParams.parts = parts;
    }
  },
);
</script>

<template>
  <div class="supplier-selector">
    <select-input
      v-model="modelProxy"
      :placeholder="$t(field.value)"
      :list="list"
      :disabled="isDisabled"
      show-search
      :required="field.required"
    />
    <div v-if="isLoading" class="supplier-selector__spinner">
      <ion-spinner name="circular" class="supplier-selector__spinner-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.supplier-selector {
  position: relative;

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
