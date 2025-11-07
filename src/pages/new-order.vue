<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
  IonButton,
  IonFooter,
  IonSpinner,
  type RefresherCustomEvent,
} from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import Textarea from "primevue/textarea";
import IftaLabel from "primevue/iftalabel";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import { computed, reactive, ref } from "vue";

const { setSecondaryColor } = useStatusBarColor();
setSecondaryColor();

const router = useIonRouter();

const images = reactive<string[]>([]);
const description = ref("");

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
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
  <ion-page>
    <ion-header>
      <ion-toolbar class="new-order-page__toolbar">
        <default-layout-header
          title="Новая заявка"
          close
          @click-close="handleClickClose"
          @click-back="handleClickClose"
        />
      </ion-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="handleRefresh">
      <div class="new-order-page__body">
        <base-gallery-block v-model="images" title="Фотографии" class="new-order-page__gallery" />
        <img class="new-order-page__gallery" src="@/assets/map-test.png" style="width: 100%" />
        <ifta-label>
          <Textarea
            v-model="description"
            id="description"
            class="new-order-page__textarea"
            placeholder="Укажите, что именно не так на фотографии"
          />
          <label class="new-order-page__textarea-label" for="description">Подробности</label>
        </ifta-label>
      </div>
    </base-content-with-refresher>
    <ion-footer class="new-order-page__footer">
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

  &__toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
  }

  &__body {
    padding: 16px 24px;
  }

  &__gallery {
    margin-bottom: 16px;
  }

  &__textarea {
    --p-textarea-focus-border-color: $gray-light;
    border: 1px solid $gray-light;
    box-shadow: 0 2px 3px 0 #0000001a;
    width: 100%;
    height: 100%;
    min-height: 150px;

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

  &__footer {
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
