<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
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
  <base-island-block class="main-news" title="Статьи" :clickable="false">
    <template #top-right>
      <div class="main-news__all">Все новости</div>
    </template>

    <div class="main-news__wrapper">
      <div class="main-news__item" @click="handleClick">
        <div class="main-news__item-header">
          <img
            src="https://images.unsplash.com/photo-1673978483693-9e4be55b2a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXQlMjBjb25zdHJ1Y3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzcwOTExMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          />
        </div>
        <div class="main-news__item-content">
          <div class="main-news__title">Новая программа повышения безопасности на рабочих местах</div>
          <div class="main-news__description">
            Компания запускает масштабную программу по улучшению стандартов безопасности. Все сотрудники пройдут
            дополнительное обучение.
          </div>
          <div class="main-news__footer">
            <div class="main-news__time"><base-icon name="time" /> 5 мин / 10 фев</div>
          </div>
        </div>
      </div>

      <div class="main-news__item" @click="handleClick">
        <div class="main-news__item-header">
          <img
            src="https://images.unsplash.com/photo-1767163934854-655747a35068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGlubm92YXRpb24lMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzA3OTIwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          />
        </div>
        <div class="main-news__item-content">
          <div class="main-news__title">Результаты корпоративного конкурса идей</div>
          <div class="main-news__description">
            Подведены итоги ежегодного конкурса инновационных предложений. Победители получат гранты на реализацию своих
            проектов.
          </div>
          <div class="main-news__footer">
            <div class="main-news__time"><base-icon name="time" /> 3 мин / 08 фев</div>
          </div>
        </div>
      </div>

      <div class="main-news__item" @click="handleClick">
        <div class="main-news__item-header">
          <img
            src="https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NzA4NDg5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          />
        </div>
        <div class="main-news__item-content">
          <div class="main-news__title">Экологическая инициатива: переход на возобновляемые источники</div>
          <div class="main-news__description">
            Компания объявляет о долгосрочной стратегии перехода на возобновляемые источники энергии. Цель - углеродная
            нейтральность к 2030 году.
          </div>
          <div class="main-news__footer">
            <div class="main-news__time"><base-icon name="time" /> 7 мин / 05 фев</div>
          </div>
        </div>
      </div>
    </div>
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
