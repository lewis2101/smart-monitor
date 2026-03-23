<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { AiChatList as AiChatListComponent } from "@/widgets/ai-chat-list";
import { useRefreshPage } from "@/composables/refresh-page.ts";

const { pageId, refresh } = useRefreshPage([]);
</script>

<template>
  <ion-page class="ai-chat-list-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Ассистент" hide-back hide-close />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refresh" variant="secondary">
      <div :key="pageId">
        <ai-chat-list-component />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.ai-chat-list-page {
}
</style>
