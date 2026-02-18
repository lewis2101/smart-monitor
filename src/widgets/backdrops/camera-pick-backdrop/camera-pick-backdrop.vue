<script setup lang="ts">
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

const props = defineProps<BackdropComponentProps<(value: string) => void, (error: Error) => void>>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const handleClick = (value: string) => {
  props.onSuccess?.(value);
  emit("closeBackdrop");
};
</script>

<template>
  <div class="pick-backdrop">
    <base-island-block class="pick-backdrop__item-wrapper camera-wrapper" @click="handleClick('camera')">
      <div class="pick-backdrop__item">
        <div class="pick-backdrop__icon camera">
          <base-icon name="camera" />
        </div>
        <div class="pick-backdrop__title camera-title">Камера</div>
        <div class="pick-backdrop__description camera-description">Сделать фото</div>
      </div>
    </base-island-block>

    <base-island-block class="pick-backdrop__item-wrapper gallery-wrapper" @click="handleClick('gallery')">
      <div class="pick-backdrop__item">
        <div class="pick-backdrop__icon gallery">
          <base-icon name="gallery" />
        </div>
        <div class="pick-backdrop__title">Галерея</div>
        <div class="pick-backdrop__description gallery-description">Выбрать из галареи</div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.pick-backdrop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  padding: 8px 8px calc(16px + env(safe-area-inset-bottom)) 8px;

  .camera-wrapper {
    border: 1px #bedbff solid;
    background: #eff6ff;
  }

  .gallery-wrapper {
    border: 1px #a4f4cf solid;
    background: #d0fae5;
  }

  &__item-wrapper {
    width: 100%;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;

    .camera {
      background: #155dfc;
      color: $white;
    }

    .gallery {
      background: #009966;
      color: $white;
    }
  }

  &__icon {
    background: red;
    width: 56px;
    height: 56px;
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .camera-title {
    color: #1c398e;
  }

  .gallery-title {
    color: #004f3b;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
  }

  .camera-description {
    color: #155dfc;
  }

  .gallery-description {
    color: #009966;
  }

  &__description {
    font-size: 12px;
  }
}
</style>
