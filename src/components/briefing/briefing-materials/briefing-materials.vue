<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

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
  <div class="briefing-materials">
    <div class="briefing-materials__title">Документы и материалы</div>
    <base-island-block class="briefing-materials__wrapper" @click="handleClick">
      <div class="briefing-materials__item">
        <div class="briefing-materials__icon success">
          <base-icon name="shield" />
        </div>
        <div class="briefing-materials__content">
          <div class="briefing-materials__type">
            <span>HSE</span>
            <span class="briefing-materials__ext">PDF</span>
          </div>
          <div class="briefing-materials__item-title">Инструкция по работе с химическими веществами</div>
          <div class="briefing-materials__item-bottom">
            <div class="briefing-materials__date">2.4 МБ / 10 Фев 2026</div>
            <div class="briefing-materials__download">
              <base-icon name="download" />
            </div>
          </div>
        </div>
      </div>
    </base-island-block >
    <base-island-block class="briefing-materials__wrapper" @click="handleClick">
      <div class="briefing-materials__item">
        <div class="briefing-materials__icon warning">
          <base-icon name="warning" />
        </div>
        <div class="briefing-materials__content">
          <div class="briefing-materials__type">
            <span>Безопасность</span>
            <span class="briefing-materials__ext">PDF</span>
          </div>
          <div class="briefing-materials__item-title">Регламент техники безопасности</div>
          <div class="briefing-materials__item-bottom">
            <div class="briefing-materials__date">1.8 МБ / 08 Фев 2026</div>
            <div class="briefing-materials__download">
              <base-icon name="download" />
            </div>
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="briefing-materials__wrapper" @click="handleClick">
      <div class="briefing-materials__item">
        <div class="briefing-materials__icon info">
          <base-icon name="fix" />
        </div>
        <div class="briefing-materials__content">
          <div class="briefing-materials__type">
            <span>Техническая документация</span>
            <span class="briefing-materials__ext">PDF</span>
          </div>
          <div class="briefing-materials__item-title">Руководство по эксплуатации оборудования</div>
          <div class="briefing-materials__item-bottom">
            <div class="briefing-materials__date">5.2 МБ / 05 Фев 2026</div>
            <div class="briefing-materials__download">
              <base-icon name="download" />
            </div>
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="briefing-materials__wrapper" @click="handleClick">
      <div class="briefing-materials__item">
        <div class="briefing-materials__icon remind">
          <base-icon name="book" />
        </div>
        <div class="briefing-materials__content">
          <div class="briefing-materials__type">
            <span>Корпоративные документы</span>
            <span class="briefing-materials__ext">DOC</span>
          </div>
          <div class="briefing-materials__item-title">Политика компании по охране труда</div>
          <div class="briefing-materials__item-bottom">
            <div class="briefing-materials__date">890 КБ / 01 Фев 2026</div>
            <div class="briefing-materials__download">
              <base-icon name="download" />
            </div>
          </div>
        </div>
      </div>
    </base-island-block>
    <base-island-block class="briefing-materials__wrapper" @click="handleClick">
      <div class="briefing-materials__item">
        <div class="briefing-materials__icon danger">
          <base-icon name="shield" />
        </div>
        <div class="briefing-materials__content">
          <div class="briefing-materials__type">
            <span>HSE</span>
            <span class="briefing-materials__ext">PDF</span>
          </div>
          <div class="briefing-materials__item-title">Процедуры экстренного реагирования</div>
          <div class="briefing-materials__item-bottom">
            <div class="briefing-materials__date">3.1 МБ / 28 Янв 2026</div>
            <div class="briefing-materials__download">
              <base-icon name="download" />
            </div>
          </div>
        </div>
      </div>
    </base-island-block>

    <div class="briefing-materials__support">
      <div class="briefing-materials__support-icon">
        <base-icon name="help" />
      </div>
      <div class="briefing-materials__support-content">
        <div class="briefing-materials__support-title">Нужна помощь?</div>
        <div class="briefing-materials__support-text">
          Если у вас возникли вопросы по материалам, обратитесь в отдел HSE или к своему руководителю.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.briefing-materials {
  &__title {
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
    gap: 16px;

    &-title {
      font-weight: bold;
      font-size: 14px;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-top: 8px;
    }

    .success {
      color: #009966;
      background: #ecfdf5;
    }

    .warning {
      color: #e17100;
      background: #fffbeb;
    }

    .info {
      color: #155dfc;
      background: #eff6ff;
    }

    .remind {
      color: #9810fa;
      background: #faf5ff;
    }

    .danger {
      color: #ec003f;
      background: #fff1f2;
    }
  }

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
  }

  &__content {
    width: 100%;
  }

  &__type {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 12px;
    color: #90a1b9;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__ext {
    color: #45556c;
    background: #f9f3f4;
    padding: 2px 8px;
    border-radius: 8px;
  }

  &__date {
    color: #90a1b9;
    font-size: 10px;
  }

  &__download {
    color: $white;
    background: $secondary-color;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 42px;
    height: 32px;
    border-radius: 8px;

    span {
      width: 16px;
    }
  }

  &__support {
    display: flex;
    align-items: center;
    gap: 16px;

    background: #eff6ff;
    padding: 20px;
    border: 1px solid #dbeafe;
    border-radius: 16px;

    color: #1c398e;

    &-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;

      color: #155dfc;
      background: #dbeafe;

      flex-shrink: 0;

      span {
        width: 16px;
      }
    }

    &-title {
      font-size: 14px;
      font-weight: bold;
    }

    &-text {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>
