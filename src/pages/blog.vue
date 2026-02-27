<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import { BlogData } from "@/widgets/blog-data";

const route = useRoute();
</script>

<template>
  <ion-page class="blog-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Новости" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <blog-data :blog-id="route.params.id as string" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.blog-page {
}
</style>
