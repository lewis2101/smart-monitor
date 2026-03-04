<script setup lang="ts">
import { AuthPublicKeyList } from "@/widgets/auth-public-key-list";
</script>

<template>
  <div class="auth-public-key-list-backdrop">
    <auth-public-key-list />
  </div>
</template>

<style scoped lang="scss">
.auth-public-key-list-backdrop {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom)) 16px;
}
</style>
