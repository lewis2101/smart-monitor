<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import MainReports from "@/components/main/main-reports/main-reports.vue";
import { IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/vue";
import MainLayoutHeader from "@/components/layout/main-layout-header.vue";
</script>

<template>
  <ion-page style="padding-top: env(safe-area-inset-top);">
    <ion-header>
      <ion-toolbar style="padding-top: 0;">
        <main-layout-header />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="main">
        <div class="main__decor"></div>
        <div class="main__content">
          <main-docs-block class="main-docs-block" />
          <main-menu-block class="main-menu-block" />
          <main-reports class="main-reports" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  padding: 0 8px;

  &__decor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 533px;
    background: linear-gradient(180deg, #041a4b 22.12%, #143b88 61.06%, #ffffff 100%);
  }

  &__content {
    position: relative;
    z-index: 1;
  }
}
.main-docs-block,
.main-menu-block,
.main-reports {
  margin-bottom: 16px;
}
</style>
