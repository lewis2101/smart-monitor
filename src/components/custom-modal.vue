<template>
  <Transition name="backdrop">
    <div v-if="isOpen" class="sheet-backdrop" :style="backdropStyle" @click="close" />
  </Transition>

  <div
    ref="sheetRef"
    class="sheet"
    :class="{
      'sheet--open': isVisible,
      'sheet--dragging': isDragging,
    }"
    :style="sheetStyle"
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
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from "vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useHaptics } from "@/composables/native/use-haptics.ts";

interface Props {
  title?: string;
  closeThreshold?: number;
  /**
   * Stack order: 0 = base sheet, 1 = sheet above it, 2 = sheet above that, etc.
   * Controls z-index layering and backdrop opacity.
   */
  stackIndex?: number;
}

const { title = "Sheet", closeThreshold = 80, stackIndex = 0 } = defineProps<Props>();

const { mediumHaptic } = useHaptics();

const isOpen = defineModel<boolean>({ default: false });

const sheetRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

const isVisible = ref(false);
const translateY = ref(0);
const isDragging = ref(false);

let startY = 0;
let currentY = 0;
let rafId: number | null = null;
let gestureMode: boolean | null = null;

// Each level: backdrop = BASE + index*10, sheet = BASE + index*10 + 1
const BASE_Z = 9000;
const Z_STEP = 10;

const backdropStyle = computed(() => ({
  zIndex: BASE_Z + stackIndex * Z_STEP,
  // Deeper sheets get a lighter backdrop so layering feels intentional
  background: `rgba(0,0,0,${Math.max(0.1, 0.45 - stackIndex * 0.15)})`,
}));

const sheetStyle = computed(() => {
  const styles: Record<string, string | number> = {
    zIndex: BASE_Z + stackIndex * Z_STEP + 1,
  };
  if (isDragging.value) {
    styles.transform = `translateY(${translateY.value}px)`;
  }
  return styles;
});

async function applyOpen(val: boolean) {
  if (val) {
    document.body.style.overflow = "hidden";
    await nextTick();
    isVisible.value = true;

    await mediumHaptic();
  } else {
    isVisible.value = false;
    document.body.style.overflow = "";
  }
  translateY.value = 0;
}

watch(isOpen, applyOpen);

onMounted(() => {
  setTimeout(() => {
    applyOpen(isOpen.value);
  }, 100);
});

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
  /* z-index and background set via :style */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
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
  /* z-index set via :style */
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
  transition: transform 0.38s cubic-bezier(0.32, 0.72, 0, 1);
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
}
.sheet__content::-webkit-scrollbar {
  width: 4px;
}
.sheet__content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}
</style>
