<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { CameraStatus } from "@/components/camera/camera-status";
import type { CameraStatusItem } from "@/components/camera/camera-status/types.ts";
import { CameraList } from "@/components/camera/camera-list";
import type { CameraListItem } from "@/components/camera/camera-list/types.ts";

const cameraStatusList: CameraStatusItem[] = [
  {
    label: "Всего камер",
    count: 3,
    status: "all",
  },
  {
    label: "Активные",
    count: 2,
    status: "active",
  },
  {
    label: "Оффлайн",
    count: 2,
    status: "offline",
  },
];

const list: CameraListItem[] = [
  {
    title: "Камера #000001",
    description: "Кабинет разработчиков",
    thumbnailImage:
      "https://www.itoki.jp/resources/column/article/office-workspace/assets/img/office-workspace_thumbnail.jpg",
    isLive: true,
    isActive: true,
  },
  {
    title: "Камера #000002",
    description: "Кабинет разработчиков",
    thumbnailImage:
      "https://www.itoki.jp/resources/column/article/office-workspace/assets/img/office-workspace_thumbnail.jpg",
    isLive: false,
    isActive: false,
  },
  {
    title: "Камера #000003",
    description: "Кабинет разработчиков",
    thumbnailImage:
      "https://www.itoki.jp/resources/column/article/office-workspace/assets/img/office-workspace_thumbnail.jpg",
    isLive: true,
    isActive: true,
  },
];
</script>

<template>
  <ion-page class="camera-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Камера" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <camera-status :list="cameraStatusList" />

      <camera-list :list="list" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.camera-page {
}
</style>
