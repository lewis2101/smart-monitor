<script setup lang="ts">
import type {StepField} from "@/components/step-generator/types.ts";
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {
  useGlobalBackdropStore
} from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import {formatDateString} from "@/utils/formatDate.ts";
import {useBubbleAnimate} from "@/composables/useBubbleAnimate.ts";
import type {
  DateCalcRestrictionResponse
} from "@/composables/apply-restrictions/date-time-picker-restiction.ts";
import {IonSpinner} from "@ionic/vue";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
    restriction?: DateCalcRestrictionResponse;
    loading?: boolean;
  }>(),
  {
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{
  (e: "change"): void;
}>()

const model = defineModel<string | null>({required: true});

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
  if (isDisabled.value) return;

  try {
    const date = (await globalBackdropStore.push("date-picker", {
      title: "Выберите дату",
      props: {
        showTime: true,
        minDate: props.restriction?.min && new Date(props.restriction?.min),
        maxDate: props.restriction?.max && new Date(props.restriction?.max),
        initialDate: proxyModel.value
      },
    })) as Date;

    proxyModel.value = date;
    emit("change");
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

const isDisabled = computed(() => props.disabled || props.field.disabled || props.loading);

watch(() => props.restriction, (value) => {
  if (!value) return;

  const minDate = new Date(value.min).getTime();
  const maxDate = new Date(value.max).getTime();
  const currentDate = new Date(model.value).getTime();

  if (currentDate < minDate || currentDate > maxDate) {
    model.value = new Date(minDate).toISOString();
  }
})

</script>

<template>
  <div ref="dateTimeFieldRef"
       :class="['date-time-field', isDisabled && 'disabled']" @click="showModal">
    <div
      v-if="field.value"
      :class="['date-time-field__placeholder', (isFocused || model) && 'date-time-field__placeholder_focus']"
    >
      {{ $t(field.value) }}
    </div>
    <div v-if="model" class="date-time-field__value">
      {{ getFormattedDate }}
    </div>
    <div v-if="loading" class="date-time-field__spinner">
      <ion-spinner name="circular" class="date-time-field__spinner-icon"/>
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

.disabled {
  color: #64748b !important;
}
</style>
