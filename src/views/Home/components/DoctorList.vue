<script setup lang="ts">
import { useFollow } from './index'
import type { Doctor } from '@/types/KnowledgeType'
const { flaglink, loading } = useFollow('doc')
defineProps<{ item: Doctor }>()
</script>

<template>
  <div class="min">
    <img style="width: 60px; height: 60px; border-radius: 50%" :src="item.avatar" alt="" />
    <p>{{ item.name }}</p>
    <p class="a van-ellipsis">{{ item.hospitalName }}</p>
    <p class="a">{{ item.depName }}</p>
    <van-button
      :loading="loading"
      style="height: 35px"
      color="#16c2a3"
      @click="flaglink(item)"
      round
      >{{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}</van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.min {
  height: 200px;
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  padding: 20px 10px 0;
  line-height: 25px;
  margin-right: 10px;
}
.a {
  color: #ccc;
}
</style>
