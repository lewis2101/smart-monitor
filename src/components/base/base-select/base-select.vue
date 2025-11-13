<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseBackdrop from "@/components/base/base-backdrop/base-backdrop.vue";
import { computed, ref, watch } from "vue";
import RadioButton from "primevue/radiobutton";
import { IonButton } from "@ionic/vue";

const props = defineProps<{
  placeholder?: string;
  selectTitle?: string;
  list: Array<{
    label: string;
    value: string;
  }>;
}>();

const model = defineModel<string>({ required: true });
const isVisibleBackdrop = ref(false);

const temporaryModel = ref("");

const submit = () => {
  if (temporaryModel.value) {
    model.value = temporaryModel.value;
    isVisibleBackdrop.value = false;
  }
};

const currentValueLabel = computed(() => props.list.find((l) => l.value === model.value)?.label || "");

watch(isVisibleBackdrop, (value) => {
  if (value) {
    temporaryModel.value = model.value;
  } else {
    temporaryModel.value = "";
  }
});
</script>

<template>
  <div class="base-select" @click="isVisibleBackdrop = true">
    <div class="base-select__native">
      <div
        v-if="placeholder"
        :class="['base-select__placeholder', currentValueLabel && 'base-select__placeholder_focus']"
      >
        {{ placeholder }}
      </div>
      <div class="base-select__value">
        {{ currentValueLabel }}
      </div>
    </div>
    <base-icon name="chevron" class="base-select__icon" />
    <base-backdrop v-model="isVisibleBackdrop" :title="selectTitle || ''">
      <div class="base-select-backdrop">
        <label
          v-for="(item, idx) in list"
          :key="item.value"
          :for="`${item.value}-${idx}`"
          class="base-select-backdrop__item"
        >
          <radio-button
            v-model="temporaryModel"
            variant="filled"
            :value="item.value"
            :input-id="`${item.value}-${idx}`"
            class="base-select-backdrop__radio"
          />
          <label :for="`${item.value}-${idx}`">{{ item.label }}</label>
        </label>
        <ion-button class="base-select-backdrop__button" @click="submit">Подтвердить</ion-button>
      </div>
    </base-backdrop>
  </div>
</template>

<style scoped lang="scss">
.base-select {
  position: relative;

  &__native {
    padding: 20px 16px 12px 16px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
  }

  &__placeholder {
    position: relative;
    bottom: 4px;
    color: $txt-description;

    transition: all 0.2s ease;

    &_focus {
      position: absolute;

      font-size: 12px;
      top: 6px;
      left: 16px;
    }
  }

  &__value {
    color: $txt-black;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%) rotate(90deg);
    color: $txt-description;
  }
}
.base-select-backdrop {
  padding: 4px;

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 19px 16px;
  }

  &__radio {
    --p-radiobutton-checked-hover-border-color: #{$main-color};
    --p-radiobutton-checked-hover-background: #{$main-color};
    --p-radiobutton-checked-border-color: #{$main-color};
    --p-radiobutton-checked-background: #{$main-color};
  }

  &__button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
