<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import { computed, type ComputedRef } from "vue";
import { useResourceDependencyQuery } from "@/api/dependency/resource-dependency.ts";
import { useQuery } from "@tanstack/vue-query";
import { IonSpinner } from "@ionic/vue";
import SelectInput from "@/widgets/select-input.vue";

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
    return Number(props.field.default.id);
  }
  return null;
};

const model = defineModel<number | null>({ required: true });
model.value = getInitialValue();

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

const { data, isPending } = useQuery({
  ...resourceDependencyQuery,
  enabled: isHasTableProperty.value,
});

const list: ComputedRef<SelectList> = computed(() =>
  data.value?.content.map((item) => ({
    label: item.value,
    value: Number(item.id),
  })),
);
</script>

<template>
  <div class="field-input">
    <select-input v-model="model" :list="list" :placeholder="$t(field.value)" :disabled="disabled || field.disabled" />
    <div v-if="isPending && isHasTableProperty" class="field-input__spinner">
      <ion-spinner name="circular" class="field-input__spinner-icon" />
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
