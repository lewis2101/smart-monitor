<script setup lang="ts">
import LinkedInfoBlock from "@/widgets/linked-info-block.vue";

type ListType = InstanceType<typeof LinkedInfoBlock>["$props"]["list"];

const infoList: ListType = [
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
    to: "/learning",
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
  <linked-info-block :list="infoList" />
</template>

<style scoped lang="scss">
</style>
