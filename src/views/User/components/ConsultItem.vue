<script setup lang="ts">
import type { Row } from '@/types/consultType'
import { Status } from '@/enum/index'
// import { ref } from 'vue'
// import { delOrder } from '@/serves/consult.d'
// import { showToast } from 'vant'
import { useshowImage, useClearConsult, usedelConsult } from '@/composable/index'
import CpConsultMore from '../componsable/CpConsultMore.vue'
const { showImage } = useshowImage()
const { clearConsult, loading } = useClearConsult()

defineProps<{
  item: Row
}>()
const emit = defineEmits(['on-delete'])
const { delConsult, deleteLoading } = usedelConsult((id) => {
  emit('on-delete', id)
})
// const loading = ref(false)
// const showPopover = ref(false)
// const actions = computed(() => [
//   { text: '查看处⽅', disabled: !props.item.prescriptionId },
//   { text: '删除订单' }
// ])
// const onSelect = (action: { text: string }, i: number) => {
//   if (props.item.prescriptionId) {
//     if (i === 0) {
//       showImage(props.item.prescriptionId)
//     }
//   }
//   if (i === 1) {
//     // 删除
//     delConsult(props.item)
//   }
// }

// const clearConsult = async (item: Row) => {
//   try {
//     loading.value = true
//     await clearOrder(item.id)
//     item.statusValue = '已取消'
//     showToast('取消成功')
//   } catch {
//     showToast('取消失败')
//   } finally {
//     loading.value = false
//   }
// }
// const deleteLoading = ref(false)
// const delConsult = async (item: Row) => {
//   try {
//     deleteLoading.value = true
//     await delOrder(item.id)
//     emit('on-delete', item.id)
//     showToast('删除成功')
//   } catch {
//     showToast('删除失败')
//   } finally {
//     deleteLoading.value = false
//   }
// }
</script>

<template>
  <div class="consult-item-page">
    <div class="header">
      <img src="@/assets/avatar-doctor.svg" alt="" />
      <p>{{ item.docInfo?.name || '暂未分配' }}</p>
      <span>{{ item.statusValue }}</span>
    </div>
    <div @click="$router.push(`/user/consult/${item.id}`)">
      <p class="p">
        <label>病情描述</label><span>{{ item.illnessDesc }}</span>
      </p>
      <p class="p">
        <label>价格</label><span>￥{{ item.payment }}</span>
      </p>
      <p class="p">
        <label>创建时间</label><span style="color: var(--cp-dark)">{{ item.createTime }}</span>
      </p>
    </div>
    <!-- 1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消 -->
    <div class="foot" v-if="item.status == Status.The1">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="clearConsult(item)"
        >取消问诊</van-button
      >
      <van-button type="primary" plain size="small" round :to="`/consult/pay/${item.id}`"
        >去⽀付</van-button
      >
    </div>
    <div class="foot" v-if="item.status == Status.The2">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="clearConsult(item)"
        >取消问诊</van-button
      >
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`"
        >继续沟通</van-button
      >
    </div>
    <div class="foot" v-if="item.status == Status.The3">
      <van-button
        v-if="item.prescriptionId"
        class="gray"
        plain
        size="small"
        round
        @click="showImage(item.prescriptionId)"
        >查看处方</van-button
      >
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`"
        >继续沟通</van-button
      >
    </div>
    <div class="foot" v-if="item.status == Status.The4">
      <div class="more">
        <CpConsultMore
          :disabled="!item.prescriptionId"
          @on-delete="delConsult(item)"
          @on-preview="showImage(item.prescriptionId as string)"
        ></CpConsultMore>
      </div>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateFlag" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <div class="foot" v-if="item.status == Status.The5">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="deleteLoading"
        @click.stop="delConsult(item)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round to="/">咨询其他医⽣</van-button>
    </div>
  </div>

  <!-- <cppaysheet
    v-model:show="show"
    :orderId="orderId"
    :actualPayment="payInfo?.actualPayment!"
    :onClose="onClose"
  ></cppaysheet> -->
</template>

<style lang="scss" scoped>
.consult-item-page {
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  .header {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    p {
      flex: 1;
    }
  }
  .p {
    height: 25px;
    line-height: 25px;
    padding: 0 15px;
    label {
      display: inline-block;
      width: 70px;
      color: var(--cp-dark);
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
  }
}
</style>
