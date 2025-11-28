<script setup lang="ts">
import { IonHeader, IonPage, IonToolbar, useIonRouter, IonButton, IonFooter, IonTextarea } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { computed, reactive, ref } from "vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import BaseSelect from "@/components/base/base-select/base-select.vue";

type SelectList = InstanceType<typeof BaseSelect>["$props"]["list"];

const router = useIonRouter();
const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const images = reactive<string[]>([]);
const description = ref("");

const globalBackdropStore = useGlobalBackdropStore();

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};

const openMapBackdrop = () => {
  globalBackdropStore.push("map");
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

const selectModel = ref("");

const jobs: SelectList = [
  {
    label: "Рабочий",
    value: "shared",
  },
  {
    label: "Мастер",
    value: "master",
  },
  {
    label: "Инженер по ТБ",
    value: "tb",
  },
  {
    label: "Администратор",
    value: "admin",
  },
];

</script>

<template>
  <ion-page class="new-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header
          title="Новая заявка"
          back
          close
          @click-close="handleClickClose"
          @click-back="handleClickClose"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="new-order-page__body">
        <base-gallery-block v-model="images" title="Фотографии" class="new-order-page__gallery" />
        <div class="new-order-page__map" @click="openMapBackdrop">
          <base-map />
          <div class="new-order-page__map-content"></div>
        </div>
        <ion-textarea
          v-model="description"
          label="Подробности"
          class="new-order-page__textarea"
          label-placement="stacked"
          placeholder="Укажите, что именно не так на фотографии"
        />
        <base-select
          v-model="selectModel"
          class="registration-form__field"
          placeholder="Должность"
          select-title="Выберите должность"
          :list="jobs"
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
  &__body {
    padding: 16px 24px;
  }

  &__gallery {
    margin-bottom: 16px;
  }

  &__map {
    position: relative;

    width: 100%;
    height: 160px;
    margin-bottom: 16px;
    div {
      border-radius: 12px;
    }

    &-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ececf0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
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
    margin-bottom: 16px;

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
