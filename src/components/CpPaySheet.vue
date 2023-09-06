<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { getConsultOrderPayUrl } from '@/serves/consult.d'
const paymentMethod = ref<0 | 1>()
const props = defineProps<{
  orderId: string
  actualPayment: number
  onClose?: () => void
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
//跳转第三方支付页
const pay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')
  const payRes = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: props.orderId,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = payRes.data.payUrl
}
</script>

<template>
  <van-action-sheet
    :beforeClose="onClose"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
    :show="show"
    :closeable="false"
    :close-on-popstate="false"
  >
    <p class="p">￥{{ actualPayment.toFixed(2) }}</p>
    <van-cell-group>
      <van-cell title="微信⽀付" @click="paymentMethod = 0">
        <template #icon><cp-icons class="icon" name="consult-wechat" /></template>
        <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
      </van-cell>
      <van-cell title="⽀付宝⽀付" @click="paymentMethod = 1">
        <template #icon><cp-icons class="icon" name="consult-alipay" /></template>
        <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
      </van-cell>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" round block @click="pay">⽴即⽀付</van-button>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.van-action-sheet {
  .p {
    text-align: center;
    height: 50px;
    font-weight: bold;
    border-bottom: 1px solid #f5f2f2;
    line-height: 50px;
  }
  .van-cell {
    height: 50px;
    .icon {
      font-size: 1.6em;
      margin-right: 10px;
    }
  }
  .btn {
    padding: 15px;
  }
}
</style>
