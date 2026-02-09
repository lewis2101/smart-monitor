<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
import ProfileData from "@/components/profile/profile-data.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <ion-page class="profile-page">
    <ion-header :translucent="true">
      <base-toolbar>
        <default-layout-header :title="$t('profile.header-title')" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <base-island-block :clickable="false">
        <default-page>
          <profile-data />
        </default-page>
      </base-island-block>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.orders-page {
}
</style>
