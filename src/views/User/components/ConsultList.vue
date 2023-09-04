<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
import { getOrderList } from '@/serves/consult.d'
import type { getOrderType, Row } from '@/types/consultType'
import { ref } from 'vue'

const props = defineProps<{
  type: string
}>()

const list = ref<Row[]>([])
const loading = ref(false)
const finished = ref(false)

const OrderInfo = ref<getOrderType>({
  current: 1,
  pageSize: 10,
  type: props.type
})
// const getList = async () => {
//   const OrderRes = await getOrderList(OrderInfo.value)
//   list.value = OrderRes.data.rows
// }
// getList()

const onLoad = async () => {
  const OrderRes = await getOrderList(OrderInfo.value)
  console.log(OrderRes, 'pageTotal')

  list.value.push(...OrderRes.data.rows)
  if (OrderInfo.value.current) {
    if (OrderInfo.value.current < OrderRes.data.pageTotal) {
      OrderInfo.value.current++
    } else {
      finished.value = true
    }
    loading.value = false
  }
}
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="consult-list-page">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        @on-delete="onDelete"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list-page {
  padding: 10px;
}
</style>
