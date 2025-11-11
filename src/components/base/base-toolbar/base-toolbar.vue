<script setup lang="ts">
import { IonToolbar } from "@ionic/vue";
</script>

<template>
  <ion-toolbar class="base-toolbar">
    <slot />
  </ion-toolbar>
</template>

<style scoped lang="scss">
.base-toolbar {
  padding: 0;
  --padding-start: 0;
  --padding-end: 0;
  --padding-bottom: 0;
  --padding-top: 0;
}
</style>
