<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BriefingMenuBlock from "@/components/briefing/briefing-menu-block/briefing-menu-block.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
</script>

<template>
  <ion-page class="briefing-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Инструктажи и материалы" variant="secondary" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <default-page>
        <briefing-menu-block />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.briefing-page {
}
</style>
