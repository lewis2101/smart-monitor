<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import ProfileData from "@/components/profile/profile-data.vue";
import { ProfileHistoryAction } from "@/widgets/profile-history";
import { AuthPublicKeyListAction } from "@/widgets/auth-public-key-list";
</script>

<template>
  <ion-page class="profile-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="$t('profile.header-title')" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="profile-page__content" @refresh="mockRefresh" variant="secondary">
      <profile-data />
      <auth-public-key-list-action class="profile-page__top-offset" />
      <profile-history-action class="profile-page__top-offset" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.profile-page {
  &__content {
  }

  &__body {
  }

  &__top-offset {
    margin-top: 16px;
  }
}
</style>
