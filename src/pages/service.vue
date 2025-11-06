<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="docs-page__toolbar">
        <default-layout-header title="Сервисы" />
      </ion-toolbar>
    </ion-header>
    <ion-content> Service </ion-content>
  </ion-page>
</template>

<style scoped></style>
