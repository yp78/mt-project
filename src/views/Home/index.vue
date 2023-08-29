<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <div class="home-page">
    <div class="home-page-top">
      <h2 style="color: #fff">优医</h2>
      <van-search
        v-model="value"
        background="rgba(0,0,0,0)"
        shape="round"
        placeholder="搜一搜: 疾病/症状/医生/健康知识"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  box-sizing: border-box;
  padding: 0 0 65px;
  &-top {
    height: 100px;
    border-radius: 0 0 50px 50px;
    background: linear-gradient(#52d4ce, #45c3c9);
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
