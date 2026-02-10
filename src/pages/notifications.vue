<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { NotificationsList } from "@/components/notifications";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import { Scopes } from "@/api/scopes.ts";

const { pageId, refresh } = useRefreshPage([Scopes.getNotifications]);
</script>

<template>
  <ion-page class="notification-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="$t('notification.header-title')" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refresh" variant="secondary">
      <notifications-list :key="pageId" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
