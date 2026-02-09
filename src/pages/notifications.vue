<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultPage from "@/layouts/default-page.vue";
import { NotificationsList } from "@/components/notifications";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import { Scopes } from "@/api/scopes.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

const { pageId, refresh } = useRefreshPage([Scopes.getNotifications]);
</script>

<template>
  <ion-page class="notification-page">
    <ion-header :translucent="true">
      <base-toolbar>
        <default-layout-header :title="$t('notification.header-title')" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refresh">
      <base-island-block :clickable="false">
        <default-page>
          <notifications-list :key="pageId" />
        </default-page>
      </base-island-block>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
