<script setup lang="ts">
import { IonHeader, IonPage, IonToolbar, useIonRouter, IonButton, IonFooter, IonTextarea } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import { computed, reactive, ref } from "vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";

const { setSecondaryColor } = useStatusBarColor();
setSecondaryColor();

const router = useIonRouter();
const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const images = reactive<string[]>([]);
const description = ref("");

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};

const validate = computed(() => {
  if (!images.length) {
    return false;
  }
  if (description.value === "") {
    return false;
  }
  return true;
});
</script>

<template>
  <ion-page class="new-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header
          title="Новая заявка"
          close
          @click-close="handleClickClose"
          @click-back="handleClickClose"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="new-order-page__body">
        <base-gallery-block v-model="images" title="Фотографии" class="new-order-page__gallery" />
        <img class="new-order-page__gallery" src="@/assets/map-test.png" style="width: 100%" />
        <ion-textarea
          v-model="description"
          label="Подробности"
          class="new-order-page__textarea"
          label-placement="stacked"
          placeholder="Укажите, что именно не так на фотографии"
        />
      </div>
    </base-content-with-refresher>
    <ion-footer v-if="!isVisibleKeyboard">
      <ion-toolbar class="new-order-page__buttons">
        <ion-button class="new-order-page__button" :disabled="!validate" @click="handleClickClose"
          >Отправить</ion-button
        >
        <ion-button class="new-order-page__button" fill="clear" color="danger" @click="handleClickClose"
          >Отменить заявку</ion-button
        >
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.new-order-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px 24px;
  }

  &__gallery {
    margin-bottom: 16px;
  }

  &__textarea {
    --p-textarea-focus-border-color: $gray-light;
    border: 1px solid $gray-light;
    border-radius: 12px;
    box-shadow: 0 2px 3px 0 #0000001a;
    width: 100%;
    height: 100%;
    min-height: 150px;
    padding: 0 16px;

    &::placeholder {
      color: $txt-description;
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0;
    }

    &:focus-visible {
      border: 1px solid $gray-light;
    }
  }

  &__textarea-label {
    background: $white;
    top: 1px;
    padding: 5px 0;
    --p-iftalabel-focus-color: $txt-description;
  }

  &__buttons {
    --background: $white;
    background: $white;
    --border-width: 0 !important;
    width: 100%;
    padding: 0 24px;
  }

  &__button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
