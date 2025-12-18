<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import type { StepField } from "@/components/step-generator/types.ts";
import { computed, ref, watch } from "vue";
import { useResourceDependencyQuery } from "@/api/dependency/resource-dependency.ts";
import { useQuery } from "@tanstack/vue-query";
import { IonSpinner } from "@ionic/vue";

const props = defineProps<{
  field: StepField;
}>();

const getInitialValue = () => {
  if (typeof props.field.default === "string") {
    return props.field.default;
  }
  return "";
};

const model = ref(getInitialValue());

const isShow = computed(() => (typeof props.field.show === "boolean" ? props.field.show : true));
const fieldDefaultId = computed(() => (typeof props.field.default === "object" ? props.field.default.id : ""));
const isHasTableProperty = computed(() => !!props.field.table);

const resourceDependencyQuery = useResourceDependencyQuery({
  getUrl: (url) => `${url}/${props.field.table}`,
  params: {
    lang: "rus",
    selectedId: fieldDefaultId.value,
    disabled: props.field.disabled,
  },
});

const { data, isPending } = useQuery({
  ...resourceDependencyQuery,
  enabled: isHasTableProperty.value,
});

console.log("FIELD", !!props.field.table);

watch(data, (value) => {
  if (value && value.content && value.content[0]) {
    model.value = value.content[0].value;
  }
});
</script>

<template>
  <div class="field-input">
    <base-input v-if="isShow" v-model="model" :placeholder="field.text" :disabled="field.disabled" />
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

    &-icon {
      color: $main-color;
    }
  }
}
</style>
