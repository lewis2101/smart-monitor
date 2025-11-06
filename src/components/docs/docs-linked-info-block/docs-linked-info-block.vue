<script setup lang="ts">
import BaseListItem from "@/components/base/base-list-item/base-list-item.vue";
import BaseLinkedInfo from "@/components/base/base-linked-info/base-linked-info.vue";
import BaseList from "@/components/base/base-list/base-list.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

const infoList = [
  {
    title: "Сертификат подрядчика",
    icon: "article-person",
    list: [
      {
        text: "необходимо заменить сертификат после Нового года перед Рамаданом",
        marked: true,
      },
    ],
  },
  {
    title: "Техосмотр",
    icon: "article-person",
    list: [
      {
        text: "Срок действия истекает в октябре",
        marked: true,
      },
    ],
  },
  {
    title: "Обучения",
    icon: "article-person",
    list: [
      {
        text: "Адрес установки оборудования подтвержден",
        marked: false,
      },
    ],
  },
  {
    title: "Пункт меню",
    icon: "checklist",
    list: [
      {
        text: "Подзаголовок меню",
        marked: false,
      },
    ],
  },
  {
    title: "Статус",
    icon: "eye-tracking",
    list: [
      {
        text: "Активный",
        marked: false,
      },
    ],
  },
  {
    title: "Тип оборудования",
    icon: "highlight",
    list: [
      {
        text: "Сетевой маршрутизатор",
        marked: false,
      },
    ],
  },
];
</script>

<template>
  <base-island-block v-for="item in infoList" :key="item.title" rounded="S" class="docs-linked-info">
    <base-linked-info :title="item.title" :icon="item.icon" />
    <base-list class="docs-linked-info__list">
      <base-list-item
        v-for="list in item.list"
        :key="list.text"
        :class="['docs-linked-info__list-item', list.marked && 'docs-linked-info_marked']"
      >
        {{ list.text }}
      </base-list-item>
    </base-list>
  </base-island-block>
</template>

<style scoped lang="scss">
.docs-linked-info {
  padding: 16px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &__list {
    padding: 0 clamp(32px, 10vw, 48px);
  }

  &__list-item {
    list-style: none;
  }

  &_marked {
    list-style: initial;
    &::marker {
      color: $main-red;
    }
  }
}
</style>
