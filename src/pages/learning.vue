<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { LearningScore } from "@/components/learning/learning-score";
import { LearningCourses } from "@/components/learning/learning-courses";
</script>

<template>
  <ion-page class="learning-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Обучение" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <learning-score />
      <learning-courses />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.learning-page {
}
</style>
