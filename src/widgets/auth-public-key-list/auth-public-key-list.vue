<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { usePublicKeyListMutation } from "@/api/auth/public-key-list.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const globalBackdropStore = useGlobalBackdropStore();

const { mutateAsync } = usePublicKeyListMutation({});

const { data } = await mutateAsync({});

const handleDelete = (id: number, name: string) => {
  globalBackdropStore.push("pick", {
    title: `Удалить ключ доступа - ${name}?`,
    props: {
      list: [
        {
          label: "Да",
          value: "yes",
        },
        {
          label: "Нет",
          value: "no",
        },
      ],
    },
  });
};
</script>

<template>
  <base-island-block class="profile-permission-key" title="Ключи доступа" :clickable="false">
    <template v-if="data && data.length">
      <div v-for="item in data" :key="item.id" class="profile-permission-key__item">
        <div class="profile-permission-key__content">
          <div class="profile-permission-key__icon">
            <base-icon name="touch" />
          </div>
          <div class="profile-permission-key__body">
            <div class="profile-permission-key__title">{{ item.title }}</div>
            <div class="profile-permission-key__description">{{ item.subTitle }}</div>
          </div>
        </div>
        <div class="profile-permission-key__delete">
          <ion-button color="danger" size="small" @click="handleDelete(item.id, item.subTitle)">
            <base-icon name="trash" />
          </ion-button>
        </div>
      </div>
    </template>
    <div class="profile-permission-key__empty">
      Нет активных ключей доступа
    </div>
  </base-island-block>
</template>

<style lang="scss" scoped>
.profile-permission-key {
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    gap: 8px;
    border-bottom: 1px solid $gray-light;

    &:last-child {
      border-bottom: none;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
  }

  &__description {
    margin-top: 4px;
    font-size: 12px;
  }

  &__delete {
    span {
      width: 16px;
      height: 16px;
    }
  }

  &__empty {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    margin: 8px 0;
    color: $gray-dark;
  }
}
</style>
