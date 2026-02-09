<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import MainReports from "@/components/main/main-reports/main-reports.vue";
import { IonPage, IonHeader } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import MainHeader from "@/components/main/main-header/main-header.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import MainStories from "@/components/main/main-stories/main-stories.vue";
</script>

<template>
  <ion-page class="main-page">
    <ion-header :translucent="true">
      <base-toolbar>
        <main-header />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="main-page__content" @refresh="mockRefresh">
      <div class="main-page__body">
        <div class="main-page__top">
          <main-docs-block class="main-docs-block" />
        </div>
        <base-island-block :shadow="false" :clickable="false" class="main-page__block">
          <main-stories />
          <main-menu-block class="main-menu-block" />
          <main-reports class="main-reports" />
        </base-island-block>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style lang="scss" scoped>
.main-page {
  &__content {
    //--background: linear-gradient(180deg, $main-color 15%, #ffffff 100%);
    --background: $main-color;
  }

  &__top {
    position: sticky;
    top: 0;
    padding: 0 8px;
  }

  &__body {
    position: relative;
    z-index: 1;
  }

  &__padding {
    padding: 0 8px;
  }

  &__block {
    position: relative;
    z-index: 3;
  }
}

.main-docs-block,
.main-menu-block,
.main-reports {
  margin-bottom: 16px;
}
</style>
