<script setup lang="ts">
import { IonContent, IonRefresher, IonRefresherContent, type RefresherCustomEvent } from "@ionic/vue";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
  }>(),
  {
    variant: "primary",
  },
);

defineEmits<{
  (e: "refresh", event: RefresherCustomEvent): void;
}>();

const getColorLoader = computed(() => (props.variant === "primary" ? "#FFFFFF" : "#000000"));
</script>

<template>
  <ion-content class="base-content" :fullscreen="true">
    <ion-refresher class="base-refresher" slot="fixed" @ion-refresh="$emit('refresh', $event)">
      <ion-refresher-content>
        <slot name="refresher" />
      </ion-refresher-content>
    </ion-refresher>
    <div v-if="variant === 'primary'" class="base-content__decor" />
    <div v-else class="base-content__decor-white" />
    <div class="base-content__body">
      <slot />
    </div>
  </ion-content>
</template>

<style scoped lang="scss">
.base-content {
  --padding-bottom: 16px;
  --background: $main-color;

  &__decor {
    position: fixed;
    inset: 0;
    background: $main-color;
  }

  &__decor-white {
    position: fixed;
    inset: 0;
    background: $white;
  }

  &__body {
    position: relative;
    z-index: 1;
  }
}
.base-refresher {
  z-index: 10;
  --color: v-bind(getColorLoader);
}
</style>
