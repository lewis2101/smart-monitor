<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import DocsLayoutHeader from "@/components/layout/docs-layout-header.vue";
</script>

<template>
  <ion-page style="padding-top: env(safe-area-inset-top);">
    <ion-header>
      <ion-toolbar style="padding: 0">
        <docs-layout-header />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
      <div>DOCS</div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.docs {
  margin-top: 16px;
}
</style>
