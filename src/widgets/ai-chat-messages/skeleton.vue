<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="chat">
    <template v-for="i in 6" :key="i">
      <div v-if="i % 2" class="chat__message chat__guest">
        <div class="chat__content">
          <ion-skeleton-text animated style="width: 220px" />
          <ion-skeleton-text animated style="width: 120px" />
          <ion-skeleton-text animated style="width: 180px" />
        </div>
        <div class="chat__date chat__guest-date">
          <ion-skeleton-text animated />
        </div>
      </div>

      <div v-else class="chat__message chat__mine">
        <div class="chat__content">
          <ion-skeleton-text animated style="width: 220px" />
          <ion-skeleton-text animated style="width: 120px" />
          <ion-skeleton-text animated style="width: 180px" />
        </div>
        <div class="chat__date chat__mine-date">
          <ion-skeleton-text animated />
        </div>
      </div>
    </template>
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

  &__content {
    ion-skeleton-text {
      margin-bottom: 4px;
      height: 16px;
      border-radius: 24px;
    }
  }

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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-top: 8px;

    ion-skeleton-text {
      width: 70px;
      height: 14px;
      border-radius: 24px;
    }
  }
}
</style>
