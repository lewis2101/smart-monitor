<script setup lang="ts">
import { IonHeader, IonPage, useIonRouter } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import LearningLinkedInfoBlock from "@/components/learning/learning-linked-info-block/learning-linked-info-block.vue";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";

const { setSecondaryColor } = useStatusBarColor();
setSecondaryColor();

const router = useIonRouter();

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};
</script>

<template>
  <ion-page class="learning-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Обучение" close @click-close="handleClickClose" @click-back="handleClickClose" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="learning-page__body">
        <learning-linked-info-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.learning-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px 24px;
  }
}
</style>
