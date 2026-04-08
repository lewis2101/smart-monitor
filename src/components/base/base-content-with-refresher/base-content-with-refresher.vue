<script setup lang="ts">
import { IonContent, IonRefresher, IonRefresherContent, type RefresherCustomEvent } from "@ionic/vue";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
    xOffset?: boolean;
    disableRefresh?: boolean;
  }>(),
  {
    variant: "primary",
    xOffset: true,
    disableRefresh: false,
  },
);

defineEmits<{
  (e: "refresh", event: RefresherCustomEvent): void;
}>();

const getVariantColor = computed(() => (props.variant === "primary" ? "#066046" : "#FFFFFF"));
const getXOffset = computed(() => (props.xOffset ? "16px 16px calc(16px + env(safe-area-inset-bottom)) 16px" : 0));
const getHeight = computed(() => (props.xOffset ? "auto" : "calc(100% - 50px)"));
</script>

<template>
  <ion-content class="base-content">
    <ion-refresher
      class="base-refresher"
      slot="fixed"
      @ion-refresh="$emit('refresh', $event)"
      :disabled="disableRefresh"
    >
      <ion-refresher-content>
        <slot name="refresher" />
      </ion-refresher-content>
    </ion-refresher>
    <div class="base-content__body">
      <slot />
    </div>
  </ion-content>
</template>

<style scoped lang="scss">
.base-content {
  --offset-bottom: 0;
  --background: v-bind(getVariantColor);
  border-radius: 24px;

  &::part(scroll) {
    background: var(--background);
    border-radius: 24px 24px 0 0;
  }

  &::part(background) {
    border-radius: 24px 24px 0 0;
  }

  &__body {
    position: relative;
    z-index: 1;
    padding: v-bind(getXOffset);

    width: 100%;
    height: v-bind(getHeight);
  }
}
.base-refresher {
  z-index: 10;
  --color: #{$white} !important;
}
</style>
