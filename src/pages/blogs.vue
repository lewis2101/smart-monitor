<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { BlogsList } from "@/widgets/blogs-list";
</script>

<template>
  <ion-page class="blogs-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Все новости" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <blogs-list />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.blogs-page {
}
</style>
