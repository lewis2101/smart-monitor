<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

const stories = [
  {
    url: "https://images.unsplash.com/photo-1673978483247-5700459f7e0c?q=80&w=200",
    title: "Защита рук",
  },
  {
    url: "https://images.unsplash.com/photo-1757967771758-d9b2ea992b3c?q=80&w=200",
    title: "Пожарная ТБ",
  },
  {
    url: "https://images.unsplash.com/flagged/photo-1565025998428-20c660a9862a?q=80&w=200",
    title: "Аптечка",
  },
  {
    url: "https://images.unsplash.com/photo-1761576660182-3f05ccc5a61d?q=80&w=200",
    title: "Электро ТБ",
  },
  {
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=200",
    title: "СИЗ головы",
  },
];
</script>

<template>
  <base-island-block :shadow="false" title="Новости" :clickable="false">
    <div class="main-stories">
      <div v-for="(item, idx) in stories" :key="idx" class="main-stories__item">
        <div class="main-stories__item-img">
          <img :src="item.url" />
        </div>
        <div class="main-stories__item-title">{{ item.title }}</div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.main-stories {
  display: flex;
  gap: 16px;
  overflow: auto;

  &__item {
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    gap: 8px;

    &-img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;

      border: 1px $main-color solid;
      padding: 3px;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &-title {
      font-size: 12px;
    }
  }
}
</style>
