<script setup lang="ts">
import { blogs } from "@/mock/blogs.ts";
import { CommonRoutes } from "@/router/router-list.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useIonRouter } from "@ionic/vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

const router = useIonRouter();

await mockDelayPromise();
</script>

<template>
  <base-island-block
    class="blog-item"
    v-for="blog in blogs"
    :key="blog.id"
    @click="router.push({ name: CommonRoutes.blog, params: { id: blog.id } })"
  >
    <img :src="blog.image" class="blog-item__image" />
    <div class="blog-item__content-wrapper">
      <div class="blog-item__title">
        {{ blog.title }}
      </div>
      <div class="blog-item__description">
        {{ blog.spoiler }}
      </div>
      <div class="blog-item__footer">
        <div class="blog-item__time"><base-icon name="time" /> {{ blog.time }}</div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.blog-item {
  padding: 0;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &__image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 24px 24px 0 0;
  }

  &__content-wrapper {
    padding: 8px 16px 16px 16px;
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
