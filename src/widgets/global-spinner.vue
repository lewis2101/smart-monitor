<script setup lang="ts">
import { IonSpinner } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const { isVisible } = storeToRefs(useGlobalSpinner());
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="global-spinner">
      <div class="global-spinner__item">
        <ion-spinner name="circular" color="light" />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.global-spinner {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 500;

  background: #00000080;

  &__item {
  }
}
</style>
