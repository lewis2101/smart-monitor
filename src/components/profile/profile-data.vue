<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useLogin } from "@/composables/login/use-login.ts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { Lang } from "@/i18n/lang.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

const { locale } = useI18n();

const { userInfoStorage } = useAuthStorage();
const { logout } = useLogin();

const role = computed(() => userInfoStorage.value.role?.[locale.value as Lang] || "");
const name = computed(() => `${userInfoStorage.value.firstName} ${userInfoStorage.value.lastName}`);
</script>

<template>
  <base-island-block class="profile-data" :title="$t('profile.title')" :clickable="false">
    <base-input
      :placeholder="$t('profile.login')"
      :model-value="userInfoStorage.username"
      disabled
      class="profile-data__input"
    />
    <base-input :placeholder="$t('profile.role')" :model-value="role" disabled class="profile-data__input" />
    <base-input :placeholder="$t('profile.name')" :model-value="name" disabled class="profile-data__input" />
    <ion-button class="profile-data__button" fill="outline">{{ $t("profile.password") }}</ion-button>
    <ion-button class="profile-data__button" @click="logout">{{ $t("profile.logout") }}</ion-button>
  </base-island-block>
</template>

<style scoped lang="scss">
.profile-data {
  &__input {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
