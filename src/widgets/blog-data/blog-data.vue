<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { blogs } from "@/mock/blogs.ts";
import { computed } from "vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { IonButton } from "@ionic/vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import TransitionImg from "@/components/transition-img.vue";

const props = defineProps<{
  blogId: string;
}>();

const blogData = computed(() => blogs.find((blog) => `${blog.id}` === props.blogId));

await mockDelayPromise();

const { push } = useGlobalBackdropStore();

const handleClick = () => {
  push("develop", {
    title: "Этап не доступен",
    props: {},
  });
};
</script>

<template>
  <div v-if="blogData" class="blog-data">
    <base-island-block class="blog-data__image-wrapper" :clickable="false">
      <transition-img :src="blogData.image" class="blog-data__image" />
    </base-island-block>
    <base-island-block class="blog-data__content-wrapper" :clickable="false">
      <div class="blog-data__time">{{ blogData.time }}</div>
      <div class="blog-data__content" v-html="blogData.content" />
    </base-island-block>
    <ion-button class="blog-data__share" @click="handleClick">Поделиться</ion-button>
  </div>
</template>

<style scoped lang="scss">
.blog-data {
  &__image-wrapper {
    padding: 0;
  }

  &__share {
    margin-top: 8px;
    width: 100%;
  }

  &__time {
    color: $gray-dark;
    font-size: 14px;
  }

  &__image {
    width: 100%;
    height: 300px;
    object-fit: cover;

    border-radius: 24px;
  }

  &__content-wrapper {
    margin-top: 8px;
  }

  &__content {
    &:deep(ul) {
      list-style: none;
    }
    &:deep(h2) {
      margin-bottom: 16px;
    }
    &:deep(h3) {
      margin-top: 16px;
      margin-left: 8px;
      margin-bottom: 8px;
    }
    &:deep(p) {
      margin-left: 8px;
      margin-bottom: 4px;
    }
    &:deep(li) {
      margin-left: 8px;
      margin-bottom: 4px;
    }
  }
}
</style>
