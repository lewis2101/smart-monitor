<script setup lang="ts">
import { IonSpinner } from "@ionic/vue";
import { onMounted, reactive, useTemplateRef } from "vue";
import { formatDateString } from "@/utils/formatDate.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

const messages = reactive<
  {
    type: "mine" | "guest";
    text: string;
    date: string | Date;
  }[]
>([
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "guest",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
  {
    type: "mine",
    text: "hello world hello world hello world hello world hello world hello world hello world hello world hello world",
    date: new Date(),
  },
]);

await mockDelayPromise();

const bottomRef = useTemplateRef("bottomRef");

onMounted(() => {
  bottomRef.value?.scrollIntoView({
    behavior: "instant",
  });
});
</script>

<template>
  <div class="chat">
    <template v-for="(message, idx) in messages" :key="idx">
      <div v-if="message.type === 'guest'" class="chat__message chat__guest">
        <div class="chat__content">{{ message.text }}</div>
        <div class="chat__date chat__guest-date">
          {{ formatDateString(new Date(message.date), { time: true }) }}
        </div>
      </div>

      <div v-if="message.type === 'mine'" class="chat__message chat__mine">
        <div class="chat__content">{{ message.text }}</div>
        <div class="chat__date chat__mine-date">
          {{ formatDateString(new Date(message.date), { time: true }) }}
        </div>
      </div>
    </template>

    <div class="chat__message chat__guest">
      <div class="chat__content">
        <ion-spinner name="dots" color="light" />
      </div>
    </div>

    <div ref="bottomRef" />
  </div>
</template>

<style scoped lang="scss">
.chat {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - (170px + env(safe-area-inset-bottom)));

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;

  &__message {
    box-shadow: 0 2px 3px 0 #0000001a;
    border: 1px solid #f2f2f7;
    padding: 8px 12px;
  }

  &__guest {
    margin-right: 24px;
    border-radius: 16px 16px 16px 0;
    background: $secondary-color;
    color: $white;
  }

  &__mine {
    margin-left: 24px;
    border-radius: 16px 16px 0 16px;
    align-self: flex-end;
  }

  &__date {
    margin-top: 8px;
    font-size: 12px;
    text-align: right;
  }

  &__guest-date {
    color: #dbeafe;
  }

  &__mine-date {
    color: #90a1b9;
  }
}
</style>
