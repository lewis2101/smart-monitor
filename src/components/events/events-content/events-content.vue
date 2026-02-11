<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="events">
    <base-island-block class="events__item-wrapper" :clickable="false">
      <div class="events__item">
        <div class="events__item-icon danger">
          <base-icon name="danger" />
        </div>
        <div class="events__content">
          <div class="events__content-date">Сегодня, 10:45</div>
          <div class="events__content-title">Обнаружена утечка в секторе B-4</div>
          <div class="events__content-description">
            Техническая неисправность клапана. Зона оцеплена, ведутся ремонтные работы.
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="events__item-wrapper" :clickable="false">
      <div class="events__item">
        <div class="events__item-icon warning">
          <base-icon name="warning" />
        </div>
        <div class="events__content">
          <div class="events__content-date">Завтра, 09:00</div>
          <div class="events__content-title">Плановая проверка СИЗ</div>
          <div class="events__content-description">
            Проверка наличия и состояния средств индивидуальной защиты у всех сотрудников смены.
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="events__item-wrapper" :clickable="false">
      <div class="events__item">
        <div class="events__item-icon notification">
          <base-icon name="notification" />
        </div>
        <div class="events__content">
          <div class="events__content-date">Вчера, 18:20</div>
          <div class="events__content-title">Незначительное падение давления</div>
          <div class="events__content-description">
            Зафиксировано падение давления на 5%. Причины устанавливаются диспетчерской службой.
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="events__item-wrapper" :clickable="false">
      <div class="events__item">
        <div class="events__item-icon info">
          <base-icon name="info" />
        </div>
        <div class="events__content">
          <div class="events__content-date">03 Фев, 14:00</div>
          <div class="events__content-title">Обновление инструкций HSE</div>
          <div class="events__content-description">
            Доступны новые регламенты по работе на высоте. Ознакомьтесь в разделе "Обучение".
          </div>
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.events {
  &__title {
    font-weight: bold;
    padding: 0 8px;
    margin-bottom: 16px;
    color: $main-color;
  }

  &__item-wrapper {
    padding: 20px;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    gap: 16px;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      width: 48px;
      height: 48px;
      border-radius: 12px;
    }

    .danger {
      color: $danger;
      background: #fff1f2;
    }

    .warning {
      color: #e17100;
      background: #fffbeb;
    }

    .notification {
      color: #e17100;
      background: #fffbeb;
    }

    .info {
      color: #155dfc;
      background: #eff6ff;
    }
  }

  &__content {
    &-date {
      color: #90a1b9;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    &-title {
      font-weight: bold;
      margin-bottom: 8px;
    }
    &-description {
      font-size: 12px;
      color: #45556c;
      background: #fcf9fa;
      padding: 8px;
      border-radius: 12px;
    }
  }
}
</style>
