<script setup lang="ts">
import { ref, computed, onUnmounted, useTemplateRef, onMounted } from "vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const DURATION = 4000;
const SWIPE_CLOSE_THRESHOLD = 10;

const stories = ref([
  {
    id: 1,
    title: "Защита рук",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800",
    text: "Используйте защитные перчатки.",
    viewed: false,
  },
  {
    id: 2,
    title: "Пожарная ТБ",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
    text: "Знайте где огнетушители.",
    viewed: false,
  },
  {
    id: 3,
    title: "Аптечка",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    text: "Аптечка должна быть доступна.",
    viewed: false,
  },
  {
    id: 4,
    title: "Электро ТБ",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    text: "Отключайте питание.",
    viewed: false,
  },
  {
    id: 5,
    title: "СИЗ головы",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    text: "Носите каску.",
    viewed: false,
  },
]);

const isOpen = ref(false);
const currentIndex = ref(0);
const progress = ref(0);
const isPaused = ref(false);

const storiesRefs = useTemplateRef<HTMLDivElement[]>("storiesRefs");

let timer: any = null;

const currentStory = computed(() => stories.value[currentIndex.value]);

function openStory(index: number) {
  currentIndex.value = index;

  if (!stories.value[index]) {
    return;
  }

  stories.value[index].viewed = true;
  isOpen.value = true;
  preloadImage(index + 1);
  startTimer();
}

function close() {
  isOpen.value = false;
  clearInterval(timer);
}

function nextStory() {
  if (currentIndex.value < stories.value.length - 1) {
    currentIndex.value++;

    if (!stories.value[currentIndex.value]) {
      return;
    }

    stories.value[currentIndex.value].viewed = true;
    preloadImage(currentIndex.value + 1);
    resetTimer();
  } else {
    close();
  }
}

function prevStory() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  resetTimer();
}

function preloadImage(index: number) {
  if (!stories.value[index]) return;
  const img = new Image();
  img.src = stories.value[index].image;
}

function startTimer() {
  clearInterval(timer);
  progress.value = 0;

  timer = setInterval(() => {
    if (isPaused.value) return;
    progress.value += 100 / (DURATION / 100);
    if (progress.value >= 100) nextStory();
  }, 100);
}

function resetTimer() {
  progress.value = 0;
  startTimer();
}

function progressStyle(i: number) {
  if (i < currentIndex.value) return { width: "100%" };
  if (i === currentIndex.value) return { width: progress.value + "%" };
  return { width: "0%" };
}

onUnmounted(() => clearInterval(timer));

// свайп вниз для закрытия + удержание = пауза
const startY = ref(0);
const deltaY = ref(0);
const isDragging = ref(false);

function onTouchStart(e: PointerEvent) {
  isPaused.value = true;
  isDragging.value = true;
  startY.value = e.clientY;
}

function onTouchMove(e: PointerEvent) {
  if (!isDragging.value) return;
  deltaY.value = Math.max(0, e.clientY - startY.value);
}

function onTouchEnd() {
  isPaused.value = false;
  isDragging.value = false;

  if (deltaY.value > SWIPE_CLOSE_THRESHOLD) {
    close();
  }

  deltaY.value = 0;
}

onMounted(() => {
  if (storiesRefs.value && storiesRefs.value.length) {
    storiesRefs.value.forEach((story) => {
      useBubbleAnimate(story);
    });
  }
});

await mockDelayPromise();
</script>

<template>
  <div class="stories">
    <base-island-block title="Новости" :clickable="false">
      <div class="stories__list">
        <div
          v-for="(story, index) in stories"
          :key="story.id"
          ref="storiesRefs"
          class="stories__item"
          @click="openStory(index)"
        >
          <div class="stories__avatar" :class="{ viewed: story.viewed }">
            <img :src="story.image" />
          </div>

          <div class="stories__title">
            {{ story.title }}
          </div>
        </div>
      </div>
    </base-island-block>

    <Teleport to="body">
      <Transition name="story" appear>
        <div
          v-if="isOpen"
          class="viewer"
          :class="{ 'viewer--dragging': isDragging }"
          @pointerdown.stop="onTouchStart"
          @pointermove.stop="onTouchMove"
          @pointerup.stop="onTouchEnd"
          @pointercancel.stop="onTouchEnd"
        >
          <div class="viewer__wrapper">
            <div class="viewer__progress">
              <div v-for="(s, i) in stories" :key="i" class="viewer__progress-bar">
                <div class="viewer__progress-fill" :style="progressStyle(i)" />
              </div>
            </div>

            <img :key="currentStory.id" class="viewer__image" :src="currentStory.image" />

            <div class="viewer__content">
              <h2>{{ currentStory.title }}</h2>
              <p>{{ currentStory.text }}</p>
            </div>

            <div class="viewer__nav viewer__nav--left" @click="prevStory" />
            <div class="viewer__nav viewer__nav--right" @click="nextStory" />

            <button class="viewer__close" @click="close">✕</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.story-enter-active,
.story-leave-active {
  transition:
    opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.story-enter-from {
  opacity: 0;
  transform: scale(1.06);
}

.story-enter-to {
  opacity: 1;
  transform: scale(1);
}

.story-leave-from {
  opacity: 1;
  transform: scale(1);
}

.story-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

<style scoped lang="scss">
.stories__list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.stories__item {
  width: 74px;
  text-align: center;
  cursor: pointer;
}

.stories__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 2px;
  background: $secondary-color;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 50%;
    border: 1px $white solid;
  }
}

.stories__avatar.viewed {
  background: #999;
}

.stories__title {
  margin-top: 4px;
  font-size: 12px;
}

.viewer {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 9999;

  transition: transform 0.25s ease;
  will-change: transform;

  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.viewer--dragging {
  transition: none;
}

.viewer__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.viewer__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;

  padding: 20px 20px calc(20px + env(safe-area-inset-bottom)) 20px;
  border-radius: 16px 16px 0 0;

  background: $opacity-main;
}

.viewer__progress {
  display: flex;
  gap: 4px;
  padding: calc(16px + env(safe-area-inset-top)) 10px 16px 10px;
  position: relative;
  z-index: 1;
  background: $opacity-main;
  border-radius: 0 0 8px 8px;
}

.viewer__progress-bar {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}

.viewer__progress-fill {
  height: 100%;
  background: white;
}

.viewer__nav {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
}

.viewer__nav--left {
  left: 0;
}
.viewer__nav--right {
  right: 0;
}

.viewer__close {
  position: absolute;
  top: calc(42px + env(safe-area-inset-top));
  right: 8px;
  color: white;
  background: transparent;
  border: none;
  font-size: 22px;
  z-index: 1;
  background: $opacity-main;
  padding: 10px 14px;
  border-radius: 16px;
}
</style>
