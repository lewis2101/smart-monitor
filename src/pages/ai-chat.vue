<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage, IonFooter, IonButton } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseTextarea from "@/components/base/base-textarea/base-textarea.vue";
import { ref } from "vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { AiChatMessages } from "@/widgets/ai-chat-messages";

const asd = ref("");
</script>

<template>
  <ion-page class="ai-chat-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="ИИ Ассистент" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <ai-chat-messages />
    </base-content-with-refresher>

    <ion-footer class="chat-footer">
      <div class="chat-footer__wrapper">
        <base-textarea
          v-model="asd"
          :min-height="50"
          native-placeholder="Введите сообщение..."
          class="chat-footer__input"
        />
        <ion-button class="chat-footer__button">
          <base-icon name="send" class="chat-footer__icon" />
        </ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.ai-chat-page {
}

.chat-footer {
  border: 1px $gray-light solid;

  &__wrapper {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    background: $white;
    padding: 10px 10px calc(10px + env(safe-area-inset-bottom)) 10px;
  }

  &__input {
    flex-grow: 1;
    border: 1px #e2e8f0 solid;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__button {
    &::part(native) {
      padding: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
