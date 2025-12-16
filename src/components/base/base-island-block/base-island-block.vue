<script setup lang="ts">
import { computed, ref } from "vue";

type Radius = "S" | "M";

const radiusMapper: Record<Radius, number> = {
  S: 12,
  M: 24,
};

const props = withDefaults(
  defineProps<{
    title?: string;
    rounded?: Radius;
    clickable?: boolean;
  }>(),
  {
    rounded: "M",
    clickable: true,
  },
);

const pressed = ref(false);

const press = () => {
  if (props.clickable) {
    pressed.value = true;
  }
};

const release = () => {
  if (props.clickable) {
    pressed.value = false;
  }
};

const radius = computed(() => `${radiusMapper[props.rounded]}px`);
</script>

<template>
  <div
    :class="[
      'base-island-block',
      'base-island-block_pressable',
      'base-island-block_pressed',
      { 'base-island-block_release': !pressed },
    ]"
    @touchstart="press"
    @touchend="release"
    @touchcancel="release"
  >
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
  transition: all 0.2s ease-in-out;

  &_pressable {
    transform: scale(1);
    transition:
      transform 120ms cubic-bezier(0.2, 0, 0.2, 1),
      box-shadow 120ms ease;
    will-change: transform;
  }

  &_pressable:active,
  &_pressable.pressed {
    transform: scale(0.96);
  }

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

  &-clickable {
    &:active {
      background: #f4f4f4;
    }
  }
}
</style>
