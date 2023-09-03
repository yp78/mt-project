<script setup lang="ts">
import { getDocorPage } from '@/serves/Knowledge'
import doctor from './DoctorList.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const list = ref()
const getDoctor = async () => {
  const res = await getDocorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
getDoctor()
const widthvalue = ref(0)
const setWidth = () => {
  const { width } = useWindowSize()
  widthvalue.value = (150 / 375) * width.value
}

onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', setWidth)
})
</script>

<template>
  <div class="Follow-page">
    <div class="top">
      <span>推荐关注</span>
      <span style="color: var(--cp-dark)">查看更多<van-icon name="arrow" /></span>
    </div>
    <van-swipe :width="widthvalue" class="my-swipe" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <doctor :item="item"></doctor>
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
}
</style>
