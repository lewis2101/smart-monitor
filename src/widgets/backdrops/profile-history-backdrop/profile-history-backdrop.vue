<script setup lang="ts">
import { ProfileHistory } from "@/widgets/profile-history";
</script>

<template>
  <div class="profile-history-backdrop">
    <profile-history />
  </div>
</template>

<style scoped lang="scss">
.profile-history-backdrop {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom)) 16px;
}
</style>
