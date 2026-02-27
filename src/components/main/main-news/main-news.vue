<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { blogs } from "@/mock/blogs.ts";
import { useIonRouter, IonButton } from "@ionic/vue";
import { CommonRoutes } from "@/router/router-list.ts";

const router = useIonRouter();

await mockDelayPromise();
</script>

<template>
  <base-island-block class="main-news" title="Статьи" :clickable="false">
    <template #top-right>
      <div class="main-news__all">Новости</div>
    </template>

    <div class="main-news__wrapper">
      <div
        class="main-news__item"
        v-for="blog in [blogs[0], blogs[1], blogs[2], blogs[3], blogs[4]]"
        :key="blog.id"
        @click="router.push({ name: CommonRoutes.blog, params: { id: blog.id } })"
      >
        <div class="main-news__item-header">
          <img :src="blog.image" />
        </div>
        <div class="main-news__item-content">
          <div class="main-news__title">{{ blog.title }}</div>
          <div class="main-news__description">
            {{ blog.spoiler }}
          </div>
          <div class="main-news__footer">
            <div class="main-news__time"><base-icon name="time" /> {{ blog.time }}</div>
          </div>
        </div>
      </div>
    </div>
    <ion-button @click="router.push({ name: CommonRoutes.blogs })">Все новости</ion-button>
  </base-island-block>
</template>

<style scoped lang="scss">
.main-news {
  padding: 20px;

  &__all {
    font-size: 14px;
    font-weight: bold;
    padding: 4px 12px;
    color: #007a55;
    background: #d0fae5;
    border-radius: 8px;
  }

  &__wrapper {
    display: flex;
    gap: 8px;
    overflow: auto;
    padding-bottom: 4px;
    border-radius: 20px;
  }

  &__item {
    width: 100%;
    min-width: 270px;
    margin-top: 8px;
    border-radius: 32px;
    box-shadow: 0 0 24px 0 #00000014;

    &-header {
      width: 100%;
      height: 160px;
      border-radius: 32px 32px 0 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-content {
      padding: 12px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #90a1b9;
    font-size: 12px;

    span {
      width: 14px;
    }
  }
}
</style>
