<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <ion-page class="docs-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="KPI" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <div class="kpi-score">
        <div class="kpi-score__title">
          <base-icon name="star" />
          Отличный результат
        </div>
        <div class="kpi-score__value">96.4</div>
        <div class="kpi-score__description">Общий балл эффективности</div>
      </div>
      <div class="kpi-feats">
        <base-island-block class="kpi-feats__item" :clickable="false">
          <div class="kpi-feats__point">
            <base-icon name="point" />
          </div>
          <div class="kpi-feats__title">Цель мес.</div>
          <div class="kpi-feats__description">100%</div>
        </base-island-block>
        <base-island-block class="kpi-feats__item" :clickable="false">
          <div class="kpi-feats__bonus">
            <base-icon name="medal" />
          </div>
          <div class="kpi-feats__title">Бонус</div>
          <div class="kpi-feats__description">+15%</div>
        </base-island-block>
      </div>
      <div class="kpi-metrics">
        <div class="kpi-metrics__title">Детальные метрики</div>
        <base-island-block :clickable="false">
          <div class="kpi-metrics__item">
            <div class="kpi-metrics__item-content">
              <div class="kpi-metrics__green" />
              <div class="kpi-metrics__item-title">
                <div>Безопасность (HSE)</div>
                <div class="green">+2.4%</div>
              </div>
            </div>
            <div class="kpi-metrics__item-value">98%</div>
          </div>
        </base-island-block>
        <base-island-block :clickable="false">
          <div class="kpi-metrics__item">
            <div class="kpi-metrics__item-content">
              <div class="kpi-metrics__green" />
              <div class="kpi-metrics__item-title">
                <div>Производительность</div>
                <div class="green">+5.1%</div>
              </div>
            </div>
            <div class="kpi-metrics__item-value">104%</div>
          </div>
        </base-island-block>
        <base-island-block :clickable="false">
          <div class="kpi-metrics__item">
            <div class="kpi-metrics__item-content">
              <div class="kpi-metrics__red" />
              <div class="kpi-metrics__item-title">
                <div>Дисциплина</div>
                <div class="red">-1.2%</div>
              </div>
            </div>
            <div class="kpi-metrics__item-value">92%</div>
          </div>
        </base-island-block>
        <base-island-block :clickable="false">
          <div class="kpi-metrics__item">
            <div class="kpi-metrics__item-content">
              <div class="kpi-metrics__green" />
              <div class="kpi-metrics__item-title">
                <div>Качество работ</div>
                <div class="green">0%</div>
              </div>
            </div>
            <div class="kpi-metrics__item-value">100%</div>
          </div>
        </base-island-block>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
.kpi-score {
  width: 100%;
  background: linear-gradient(75deg, #00786f, #00bc7d);
  color: $white;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 32px;

  &__title {
    padding: 6px 16px;
    border-radius: 12px;
    background: #fff3;
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    gap: 8px;

    span {
      width: 14px;
    }
  }

  &__value {
    font-size: 54px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  &__description {
    color: #d0fae5;
  }
}

.kpi-feats {
  margin-top: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &__item {
    padding: 24px;
  }

  &__bonus,
  &__point {
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
  }

  &__bonus {
    color: #fe9a00;
    background: #fffbeb;
  }

  &__point {
    color: #2b7fff;
    background: #eff6ff;
  }

  &__title {
    color: $gray-dark;
    font-weight: bold;
  }

  &__description {
    font-weight: bold;
    font-size: 18px;
  }
}

.kpi-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    margin-top: 32px;
    font-weight: bold;
    font-size: 18px;
    margin-left: 8px;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }

  &__green,
  &__red {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &__red {
    background: $danger;
  }

  &__green {
    background: $main-color;
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__item-title {
    font-size: 14px;
    font-weight: bold;

    .green,
    .red {
      margin-top: 8px;
      font-weight: bold;
      font-size: 12px;
    }

    .green {
      color: $main-color;
    }

    .red {
      color: $danger;
    }
  }

  &__item-value {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
