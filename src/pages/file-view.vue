<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import { IonButton } from "@ionic/vue";
import { useGetFileQuery } from "@/api/file/get-file.ts";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";

const route = useRoute();

const fileId = computed(() => route.params.id as string);
const fileName = computed(() => (route.query.name as string) || "Файл");

const getFileQuery = useGetFileQuery({
  getUrl: (url) => `${url}/${fileId.value}`,
});

const toast = useToast();

const { data, error } = useQuery(getFileQuery);

function base64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([new Uint8Array(byteNumbers)], {
    type: "application/pdf",
  });
}

watch(data, (value) => {
  const test = base64ToBlob(value);
  console.log({ test });
});

watch(error, (value) => {
  if (value) {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Ошибка при получении файла",
      life: 3000,
    });
  }
});
</script>

<template>
  <ion-page class="file-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="fileName" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page>
        <div class="file-page__body"></div>
        <div class="file-page__buttons">
          <ion-button class="file-page__button">Поделиться</ion-button>
        </div>
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.file-page {
  &__body {
  }

  &__buttons {
    position: fixed;
    background: $white;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 16px calc(8px + env(safe-area-inset-bottom)) 16px;
  }

  &__button {
    width: 100%;
  }
}
</style>
