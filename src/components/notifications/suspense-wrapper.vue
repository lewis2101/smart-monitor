<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import NotificationsList from "@/components/notifications/notifications-list.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <error-boundary>
    <TransitionSuspense>
      <notifications-list />

      <template #fallback>
        <Skeleton />
      </template>
    </TransitionSuspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped lang="scss"></style>
