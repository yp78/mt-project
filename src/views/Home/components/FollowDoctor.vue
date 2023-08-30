<script setup lang="ts">
import { getDocorPage } from '@/serves/Knowledge'
import { ref } from 'vue'
const list = ref()
const getDoctor = async () => {
  const res = await getDocorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
getDoctor()
</script>

<template>
  <div class="Follow-page">
    <div class="top">
      <span>推荐关注</span>
      <span style="color: var(--cp-dark)">查看更多<van-icon name="arrow" /></span>
    </div>
    <van-swipe :width="150" class="my-swipe" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <div class="min">
          <img style="width: 60px; height: 60px; border-radius: 50%" :src="item.avatar" alt="" />
          <p>{{ item.name }}</p>
          <p class="a van-ellipsis">{{ item.hospitalName }}</p>
          <p class="a">{{ item.depName }}</p>
          <van-button style="height: 35px" color="#16c2a3" round>{{
            item.likeFlag === 1 ? '已关注' : '+ 关注'
          }}</van-button>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.Follow-page {
  background-color: var(--cp-line);
  padding: 10px 0;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 10px;
  }
  .my-swipe {
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
  }
}
</style>
