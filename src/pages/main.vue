<script setup lang="ts">
import { MainDocsBlock } from "@/components/main/main-docs-block";
import { MainReports } from "@/components/main/main-reports";
import { IonPage, IonHeader } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import MainHeader from "@/components/main/main-header/main-header.vue";
import { MainStories } from "@/components/main/main-stories";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import { MainNews } from "@/components/main/main-news";
import { MainExpress } from "@/components/main/main-express";

const { pageId, refresh } = useRefreshPage([]);
</script>

<template>
  <ion-page class="main-page">
    <ion-header>
      <base-toolbar>
        <main-header />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="main-page__content" @refresh="refresh" :x-offset="false">
      <div :key="pageId">
        <div class="main-page__top">
          <main-docs-block class="main-docs-block" />
        </div>
        <base-island-block class="main-page__body" :clickable="false" rounded-orient="top" :shadow="false">
          <div class="main-page__handler">
            <div class="main-page__handler-button" />
          </div>
          <main-stories />
          <main-news />
          <!--          <main-menu-block />-->

          <main-express />
          <main-reports />
        </base-island-block>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style lang="scss" scoped>
.main-page {
  &__content {
    //--background: linear-gradient(180deg, $main-color 15%, #ffffff 100%);
    //--background: $main-color;
  }

  &__handler {
    position: sticky;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 16px;
    border-radius: 10px 10px 0 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__handler-button {
    width: 36px;
    height: 5px;
    background: $gray-dark;
    border-radius: 24px;
  }

  &__top {
    position: sticky;
    top: 0;
    padding: 0 8px;
    margin-bottom: 8px;
  }

  &__body {
    position: relative;
    z-index: 1;
    padding: 0 12px 12px 12px;
  }

  &__padding {
    padding: 0 8px;
  }

  &__block {
    position: relative;
    z-index: 3;
    gap: 8px;
  }
}
</style>
