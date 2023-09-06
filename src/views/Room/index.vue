<script setup lang="ts"></script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    <button @click="$router.push('/order/pay?id=6938560516042752')">购买药品</button>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
}
</style>
