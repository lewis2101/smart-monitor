<script setup lang="ts">
import { IonContent, IonRefresher, IonRefresherContent, type RefresherCustomEvent } from "@ionic/vue";
import { computed } from "vue";

type LoaderColor = "light" | "dark";

const props = withDefaults(
  defineProps<{
    loaderColor?: LoaderColor;
  }>(),
  {
    loaderColor: "dark",
  },
);

defineEmits<{
  (e: "refresh", event: RefresherCustomEvent): void;
}>();

const getColorLoader = computed(() => (props.loaderColor === "light" ? "#FFFFFF" : "#000000"));
</script>

<template>
  <ion-content class="base-content" :fullscreen="true">
    <ion-refresher class="base-refresher" slot="fixed" @ion-refresh="$emit('refresh', $event)">
      <ion-refresher-content>
        <slot name="refresher" />
      </ion-refresher-content>
    </ion-refresher>
    <slot />
  </ion-content>
</template>

<style scoped lang="scss">
.base-content {
  --padding-bottom: 16px;
}
.base-refresher {
  z-index: 10;
  --color: v-bind(getColorLoader);
}
</style>
