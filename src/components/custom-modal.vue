<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="isOpen" class="sheet-backdrop" @click="close" />
    </Transition>

    <div
      ref="sheetRef"
      class="sheet"
      :class="{
        'sheet--open': isVisible,
        'sheet--dragging': isDragging,
      }"
      :style="dragStyle"
      @touchstart.passive="onTouchStart"
    >
      <div class="sheet__handle-wrap">
        <div class="sheet__handle" />
      </div>

      <div class="sheet__header">
        <h2 class="sheet__title">{{ title }}</h2>
        <div class="sheet__close-btn" @click.stop="close" aria-label="Close">
          <base-icon name="close" />
        </div>
      </div>

      <div ref="contentRef" class="sheet__content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

interface Props {
  title?: string;
  closeThreshold?: number;
}

const { title = "Sheet", closeThreshold = 120 } = defineProps<Props>();

const isOpen = defineModel<boolean>({ default: false });

const sheetRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

// isVisible drives the CSS open class — always lags one tick behind isOpen
// so the browser has painted the "closed" position before we animate to "open"
const isVisible = ref(false);

const translateY = ref(0);
const isDragging = ref(false);

let startY = 0;
let currentY = 0;
let rafId: number | null = null;
let gestureMode: boolean | null = null;

const dragStyle = computed(() => {
  if (!isDragging.value) return {};
  return { transform: `translateY(${translateY.value}px)` };
});

async function applyOpen(val: boolean) {
  setTimeout(async () => {
    if (val) {
      document.body.style.overflow = "hidden";
      // wait one tick so the sheet renders at translateY(100%) first,
      // then flip isVisible to trigger the CSS transition
      await nextTick();
      isVisible.value = true;
    } else {
      isVisible.value = false;
      document.body.style.overflow = "";
    }
    translateY.value = 0;
  });
}

watch(isOpen, applyOpen, {
  immediate: true,
});

// Handle the case where v-model is already true on mount
// onMounted(() => {
//   if (isOpen.value) applyOpen(true);
// });

function close(): void {
  isOpen.value = false;
  document.body.style.overflow = "";
}

function onTouchStart(e: TouchEvent): void {
  if (!isOpen.value) return;
  startY = e.touches[0].clientY;
  currentY = startY;
  gestureMode = null;
  isDragging.value = false;

  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
}

function onTouchMove(e: TouchEvent): void {
  currentY = e.touches[0].clientY;
  const dy = currentY - startY;

  if (gestureMode === null) {
    if (Math.abs(dy) < 4) return;
    const scrollTop = contentRef.value?.scrollTop ?? 0;
    gestureMode = dy > 0 && scrollTop <= 0 ? true : false;
  }

  if (gestureMode === true) {
    e.preventDefault();
    isDragging.value = true;

    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      translateY.value = Math.max(0, currentY - startY);
    });
  }
}

function onTouchEnd(): void {
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);

  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (gestureMode === true) {
    isDragging.value = false;
    if (translateY.value >= closeThreshold) {
      close();
    }
    translateY.value = 0;
  }

  gestureMode = null;
}

onUnmounted(() => {
  document.body.style.overflow = "";
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);
  if (rafId !== null) cancelAnimationFrame(rafId);
});

defineExpose({ close });
</script>

<style scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9998;
  cursor: pointer;
}
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  max-height: 80vh;

  background: #ffffff;
  border-radius: 20px 20px 0 0;
  box-shadow:
    0 -8px 40px rgba(0, 0, 0, 0.18),
    0 -2px 8px rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  transform: translateY(100%);
  transition: all 0.38s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}

.sheet--open {
  transform: translateY(0);
}

.sheet--dragging {
  transition: none !important;
}

.sheet__handle-wrap {
  display: flex;
  justify-content: center;
  padding: 6px 0 6px;
  flex-shrink: 0;
}
.sheet__handle {
  width: 36px;
  height: 4px;
  background: #d1d5db;
  border-radius: 9999px;
  pointer-events: none;
}

.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px 8px;
  flex-shrink: 0;
}
.sheet__title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.sheet__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    transform 0.15s;
  flex-shrink: 0;
  touch-action: manipulation;
}
.sheet__close-btn:active {
  transform: scale(0.94);
}

.sheet__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  -webkit-overflow-scrolling: touch;
  transition: height 0.38s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet__content::-webkit-scrollbar {
  width: 4px;
}
.sheet__content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}
</style>
