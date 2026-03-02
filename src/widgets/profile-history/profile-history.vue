<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useI18n } from "vue-i18n";
import { useResourceViewQuery } from "@/api/orders/resource-view.ts";
import { useQuery } from "@tanstack/vue-query";
import { formatDateString } from "@/utils/formatDate.ts";

const { locale } = useI18n();

const resourceViewQuery = useResourceViewQuery({
  params: {
    paranoid: false,
    lang: locale.value,
    sort: {
      descending: false,
      rowsPerPage: 10,
      page: 1,
    },
    where: [
      {
        value: "eventTypeId",
        text: "4",
        operator: "=",
      },
      {
        value: "userId",
        text: "1",
        operator: "=",
      },
    ],
  },
  getUrl: (url) => url + `/SysTableLog`,
});

const { data, suspense } = useQuery(resourceViewQuery);

await suspense();
</script>

<template>
  <base-island-block title="История входа" class="profile-history" :clickable="false">
    <template v-if="data && data.content.length">
      <div v-for="item in data.content" :key="item.id" class="profile-history__item">
        <div :class="['profile-history__icon', item?.isSuccess ? 'success' : 'failed']">
          <base-icon :name="item?.isSuccess ? 'check' : 'close'" />
        </div>
        <div class="profile-history__content">
          <div class="profile-history__text"><span class="bold">IP адресс: </span>{{ item?.ipAddress }}</div>
          <div class="profile-history__text">
            <span class="bold">Дата события: </span> {{ formatDateString(item?.createdAt, { time: true }) }}
          </div>
        </div>
      </div>
    </template>
    <div v-else class="profile-history__empty">Нет записей</div>
  </base-island-block>
</template>

<style scoped lang="scss">
.profile-history {
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 16px;

    padding: 4px;

    .success {
      background: $secondary-color;
      color: $white;
    }

    .failed {
      background: $danger;
      color: $white;
    }
  }

  &__icon {
    width: 32px;
    height: 32px;
    background: red;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-size: 14px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    .bold {
      font-weight: bold;
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
