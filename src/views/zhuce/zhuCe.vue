<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const clickright = () => {
  router.push('/')
}
</script>

<template>
  <div class="zhuce-page">
    <cp-nav-bar :title="'注册'" :text="'登录'" @click-right="clickright"></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
