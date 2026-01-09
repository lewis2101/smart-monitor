<script setup lang="ts">
import type {DateCalcRestrictionResponse, StepField} from "@/components/step-generator/types.ts";
import {computed, onMounted, ref, useTemplateRef} from "vue";
import {useCalcRestriction} from "@/composables/order/use-calc-restriction.ts";
import {
  useGlobalBackdropStore
} from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import {formatDateString} from "@/utils/formatDate.ts";
import {useBubbleAnimate} from "@/composables/useBubbleAnimate.ts";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const getInitialValue = () => {
  if (typeof props.field.default === "string") {
    return new Date(props.field.default).toISOString();
  }
  return null;
};

const model = defineModel<string | null>({required: true});
model.value = getInitialValue();

useCalcRestriction<DateCalcRestrictionResponse>(props.field.value, model, {
  getValueOfCalcRestriction: (data) => {
    minDate.value = new Date(data.min);
    maxDate.value = new Date(data.max);
  }
});

const minDate = ref<Date>();
const maxDate = ref<Date>();

const proxyModel = computed({
  get: () => {
    if (model.value) {
      return new Date(model.value);
    }
    return null;
  },
  set: (value: Date) => {
    if (value) {
      model.value = value.toISOString();
      console.log("MODEL: ", model.value)
    }
  },
});

const dateTimeFieldRef = useTemplateRef("dateTimeFieldRef");
const globalBackdropStore = useGlobalBackdropStore();

const showModal = async () => {

  try {
    const date = (await globalBackdropStore.push("date-picker", {
      title: "Выберите дату",
      props: {
        showTime: true,
        minDate: minDate.value,
        maxDate: maxDate.value
      },
    })) as Date;

    proxyModel.value = date;
  } catch (e) {
    console.log(e)
  }
}

const getFormattedDate = computed(() => {
  if (!model) return null;
  return formatDateString(new Date(model.value), {time: true})
})

onMounted(() => {
  useBubbleAnimate(dateTimeFieldRef);
})

</script>

<template>
  <div ref="dateTimeFieldRef" :class="['date-time-field', (disabled || field.disabled) && 'disabled']" @click="showModal">
    <div
      v-if="field.value"
      :class="['date-time-field__placeholder', (isFocused || model) && 'date-time-field__placeholder_focus']"
    >
      {{ $t(field.value) }}
    </div>
    <div v-if="model" class="date-time-field__value">
      {{ getFormattedDate }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-time-field {
  color: $txt-black;

  min-height: 52px;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid #f2f2f7;
  border-radius: 12px;

  position: relative;

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);

    color: inherit;

    transition: all 0.2s ease;
    will-change: transform;

    &_focus {
      font-size: 12px;
      top: 6px;
      left: 16px;
      transform: translate(0, 0);
    }
  }

  &__value {
    padding: 20px 16px 12px 16px;
  }
}

.disabled {
  color: #64748b !important;
}
</style>
