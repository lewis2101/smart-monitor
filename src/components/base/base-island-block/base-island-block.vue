<script setup lang="ts">
import { computed } from "vue";

type Radius = "S" | "M";

const radiusMapper: Record<Radius, number> = {
  S: 12,
  M: 24,
};

const props = withDefaults(
  defineProps<{
    title?: string;
    rounded?: Radius;
  }>(),
  {
    rounded: "M",
  },
);

const radius = computed(() => `${radiusMapper[props.rounded]}px`);
</script>

<template>
  <div class="base-island-block">
    <span v-if="title" class="base-island-block__title">{{ title }}</span>
    <div class="base-island-block__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-island-block {
  padding: 12px;
  border-radius: v-bind("radius");
  background: $white;
  box-shadow: 0 8px 16px 0 #00000014;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    padding: 0 4px;
    margin-bottom: 8px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
