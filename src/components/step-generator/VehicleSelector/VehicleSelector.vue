<script setup lang="ts">
import SelectInput from "@/widgets/select-input.vue";
import type { StepField } from "@/components/step-generator/types.ts";
import { useClientVehiclesQuery, type Vehicle } from "@/api/orders/client-vehicles.ts";
import { IonSpinner } from "@ionic/vue";
import { useQuery } from "@tanstack/vue-query";
import { computed, type ComputedRef, onMounted, ref, watch } from "vue";
import { getValueByLocale } from "@/i18n";
import { useI18n } from "vue-i18n";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

type SelectList = InstanceType<typeof SelectInput>["$props"]["list"];

withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: "change"): void;
}>();

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

const { t } = useI18n();

const vehicleSelectorRef = ref<HTMLDivElement | null>(null);
const clientVehicleQuery = useClientVehiclesQuery({});
const { data, isPending } = useQuery(clientVehicleQuery);

const buildDescriptionOfVehicle = (vehicle: Vehicle) => {
  return `${getValueByLocale(vehicle.color.name)} ${getValueByLocale(vehicle.model.make.name)} ${getValueByLocale(vehicle.model.name)} ${getValueByLocale(vehicle.year.name)}`;
};

onMounted(() => {
  useBubbleAnimate(vehicleSelectorRef);
});

const list: ComputedRef<SelectList> = computed(() => {
  if (!data.value) return [];

  return data.value.content.map((item) => ({
    label: item.registrationNumber,
    value: item.id,
    description: buildDescriptionOfVehicle(item),
    hint: `${t("CITY")}: ${getValueByLocale(item.city.name)}`,
  }));
});

watch(model, () => {
  emit("change");
});
</script>

<template>
  <div class="vehicle-selector" ref="vehicleSelectorRef">
    <select-input
      v-model="modelProxy"
      :list="list"
      :placeholder="$t(field.value)"
      :disabled="disabled || field.disabled || isPending"
      show-search
    />
    <div v-if="isPending" class="vehicle-selector__spinner">
      <ion-spinner name="circular" class="vehicle-selector__spinner-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.vehicle-selector {
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
