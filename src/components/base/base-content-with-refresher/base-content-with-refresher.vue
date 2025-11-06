<script setup lang="ts">
import { IonContent, IonRefresher, IonRefresherContent, type RefresherCustomEvent } from "@ionic/vue";

defineEmits<{
  (e: "refresh", event: RefresherCustomEvent): void;
}>();
</script>

<template>
  <ion-content>
    <ion-refresher slot="fixed" @ion-refresh="$emit('refresh', $event)">
      <ion-refresher-content>
        <slot name="refresher" />
      </ion-refresher-content>
    </ion-refresher>
    <slot />
  </ion-content>
</template>

<style scoped></style>
