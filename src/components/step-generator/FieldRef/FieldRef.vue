<script setup lang="ts">
import type {StepField} from "@/components/step-generator/types.ts";
import {computed, type ComputedRef} from "vue";
import {useResourceDependencyQuery} from "@/api/dependency/resource-dependency.ts";
import {useQuery} from "@tanstack/vue-query";
import {IonSpinner} from "@ionic/vue";
import SelectInput from "@/widgets/select-input.vue";
import {tryToParseNumber} from "@/utils/tryToParseNumber.ts";

type SelectList = InstanceType<typeof SelectInput>["$props"]["list"];

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
  if (typeof props.field.default === "object" && props.field.default.id) {
    return {
      id: tryToParseNumber(props.field.default.id)
    };
  }
  return null;
};

const model = defineModel<{
  id: string | number
} | null>({required: true});
model.value = getInitialValue();

const modelProxy = computed({
  get: () => {
    if (model.value && "id" in model.value) {
      return model.value.id
    }
    return model.value;
  },
  set: (value) => {
    if (value) {
      model.value = {
        id: value
      }
    }
  }
})

const fieldDefaultId = computed(() => (typeof props.field.default === "object" ? props.field.default.id : ""));
const isHasTableProperty = computed(() => !!props.field.table);

const queryKeys = props.field.table ? [props.field.table] : [];

const resourceDependencyQuery = useResourceDependencyQuery({
  getUrl: (url) => `${url}/${props.field.table}`,
  params: {
    lang: "rus",
    selectedId: String(fieldDefaultId.value),
    disabled: props.field.disabled,
  },
  keys: queryKeys,
});

const {data, isPending} = useQuery({
  ...resourceDependencyQuery,
  enabled: isHasTableProperty.value,
});

const list: ComputedRef<SelectList> = computed(() =>
  data.value?.content.map((item) => ({
    label: item.value,
    value: tryToParseNumber(item.id),
  })),
);

const loadingData = computed(() => isPending.value && isHasTableProperty.value);
</script>

<template>
  <div class="field-input">
    <select-input
      v-model="modelProxy"
      :list="list"
      :placeholder="$t(field.value)"
      :disabled="disabled || field.disabled || loadingData"
    />
    <div v-if="loadingData" class="field-input__spinner">
      <ion-spinner name="circular" class="field-input__spinner-icon"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.field-input {
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
