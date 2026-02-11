<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { IonButton, IonProgressBar } from "@ionic/vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const { push } = useGlobalBackdropStore();

const handleClick = () => {
  push("develop", {
    title: "Этап не доступен",
    props: {},
  });
};

await mockDelayPromise();
</script>

<template>
  <div class="learning-courses">
    <div class="learning-courses__title">Ваши курсы</div>
    <base-island-block class="learning-courses__wrapper" :clickable="false">
      <div class="learning-courses__item">
        <div class="learning-courses__item-icon active">
          <base-icon name="video" />
        </div>
        <div class="learning-courses__content">
          <div class="learning-courses__item-status">
            <div class="learning-courses__status-title">HSE Базовый</div>
            <div class="learning-courses__status-time">
              <base-icon name="time" />
              45 мин
            </div>
          </div>
          <div class="learning-courses__item-title">Безопасность при работе на высоте</div>
          <div class="learning-courses__item-progress">
            <span>Прогресс</span>
            <ion-progress-bar :value="0.65" />
          </div>
          <ion-button @click="handleClick">Продолжить</ion-button>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="learning-courses__wrapper" :clickable="false">
      <div class="learning-courses__item">
        <div class="learning-courses__item-icon disabled">
          <base-icon name="video" />
        </div>
        <div class="learning-courses__content">
          <div class="learning-courses__item-status">
            <div class="learning-courses__status-title">Медицина</div>
            <div class="learning-courses__status-time">
              <base-icon name="time" />
              120 мин
            </div>
          </div>
          <div class="learning-courses__item-title">Оказание первой медицинской помощи</div>
          <ion-button @click="handleClick">Начать</ion-button>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="learning-courses__wrapper" :clickable="false">
      <div class="learning-courses__item">
        <div class="learning-courses__item-icon success">
          <base-icon name="check" />
        </div>
        <div class="learning-courses__content">
          <div class="learning-courses__item-status">
            <div class="learning-courses__status-title">Безопасность</div>
            <div class="learning-courses__status-time">
              <base-icon name="time" />
              30 мин
            </div>
          </div>
          <div class="learning-courses__item-title">Пожарная безопасность 2026</div>
          <div class="learning-courses__item-progress">
            <span>Прогресс</span>
            <ion-progress-bar :value="1" />
          </div>
          <ion-button fill="outline" @click="handleClick">Повторить</ion-button>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="learning-courses__wrapper" :clickable="false">
      <div class="learning-courses__item">
        <div class="learning-courses__item-icon disabled">
          <base-icon name="video" />
        </div>
        <div class="learning-courses__content">
          <div class="learning-courses__item-status">
            <div class="learning-courses__status-title">Технический</div>
            <div class="learning-courses__status-time">
              <base-icon name="time" />
              180 мин
            </div>
          </div>
          <div class="learning-courses__item-title">Электробезопасность (Группа II)</div>
          <ion-button @click="handleClick">Продолжить</ion-button>
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.learning-courses {
  &__title {
    margin-top: 32px;
    font-weight: bold;
    font-size: 18px;
    margin-left: 8px;
    margin-bottom: 16px;
  }

  &__wrapper {
    padding: 20px;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    width: 100%;
    gap: 16px;

    .active {
      color: #2b7fff;
      background: #eff6ff;
    }

    .disabled {
      color: #90a1b9;
      background: #fcf9fa;
    }

    .success {
      color: #00bc7d;
      background: #ecfdf5;
    }

    &-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 16px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-title {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
    }

    &-progress {
      font-size: 12px;
      color: #90a1b9;
      margin-bottom: 8px;

      ion-progress-bar {
        margin-top: 4px;
        height: 8px;
      }
    }

    ion-button {
      width: 100%;
    }

    ion-button::part(native) {
      font-size: 14px;
    }
  }

  &__content {
    width: 100%;
  }

  &__item-status {
    width: 100%;
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__status-title {
    font-size: 14px;
    font-weight: bold;
    color: $main-color;
  }

  &__status-time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #90a1b9;

    span {
      width: 12px;
    }
  }
}
</style>
