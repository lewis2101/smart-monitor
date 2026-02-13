<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="events__tabs">
    <ion-button size="small">Все</ion-button>
    <ion-button size="small" fill="outline">Критичные</ion-button>
    <ion-button size="small" fill="outline">Оповещения</ion-button>
    <ion-button size="small" fill="outline">Инфо</ion-button>
    <ion-button size="small" fill="outline">Обновления</ion-button>
  </div>
</template>

<style lang="scss" scoped>
.events {
  &__tabs {
    position: sticky;
    top: 0;
    z-index: 1;
    background: $white;

    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    overflow: auto;
    padding: 10px 0;
    border-radius: 24px;

    ion-button::part(native) {
      border-radius: 24px;
      box-shadow: 0px 2px 3px 0px #0000001a;
      border: 1px solid var(--System-Gray-Light, #f2f2f7);
      padding: 8px 12px;
      min-width: 70px;
    }
  }
}
</style>
