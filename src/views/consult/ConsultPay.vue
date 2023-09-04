<script setup lang="ts">
import type { patientType } from '@/types/user'
import { getPatientInfo } from '@/serves/user'
import { ref, computed, onMounted } from 'vue'
import { useConsultStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consultType'
import { getConsultOrderPre, getOrderApi, getConsultOrderPayUrl } from '@/serves/consult.d'
import { showToast } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router' //路由回退
import { showConfirmDialog } from 'vant'
const store = useConsultStore()
const router = useRouter()

const agree = ref(false)

// 获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
const initPayInfo = async () => {
  const payInfoRes = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  console.log(payInfoRes)

  store.setCouponId(payInfoRes.data.couponId as string)
  console.log('payInfoRes', payInfoRes)
  payInfo.value = payInfoRes.data
}
initPayInfo()

const num = computed(() => {
  if (payInfo.value != undefined) {
    return payInfo?.value.actualPayment * 100
  } else {
    return 0
  }
})

// 获取患者详情信息
const patientInfo = ref<patientType>()
const initPatientInfo = async () => {
  const patientRes = await getPatientInfo(store.consult.patientId as string)
  patientInfo.value = patientRes.data
}
initPatientInfo()

const show = ref(false)
const loading = ref(false)
const orderId = ref('')
const paymentMethod = ref()
//立即支付按钮
const submit = async () => {
  if (!agree.value) {
    return showToast('请勾选我已同意⽀付协议')
  }
  try {
    loading.value = true
    const orderRes = await getOrderApi(store.consult)
    orderId.value = orderRes.data.id
    store.clear()
    show.value = true
  } finally {
    loading.value = false
  }
}

const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消⽀付将⽆法获得医⽣回复，医⽣接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续⽀付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      // on confirm
      return false
    })
    .catch(() => {
      // on cancel
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})

//跳转第三方支付页
const pay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')
  const payRes = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = payRes.data.payUrl
}

//防止在当前页面刷新，问诊记录已经清空，组件初始化需要校验
onMounted(() => {
  if (
    !store.consult.type ||
    !store.consult.illnessType ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showConfirmDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未⽀付的问诊订单可在问诊记录中继续⽀付',
      closeOnPopstate: false //是否在页面回退时自动关闭 默认true
    }).then(() => {
      router.push('/home')
    })
  }
  initPayInfo()
  initPatientInfo()
})
</script>

<template>
  <div class="consult-pay-page" v-if="patientInfo">
    <cp-nav-bar title="支付"></cp-nav-bar>
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>

    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="pay-price" />
    </van-cell-group>

    <div class="pay-space"></div>

    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientInfo?.name} | ${patientInfo?.gender ? '男' : '女'} | ${patientInfo?.age}
        岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>

    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>

    <van-submit-bar
      text-align="left"
      button-type="primary"
      :price="num"
      @click="submit"
      button-text="立即支付"
      :loading="loading"
    />
  </div>

  <div v-else class="consult-pay-page">
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>

  <van-action-sheet
    :beforeClose="onClose"
    v-model:show="show"
    title="选择支付方式"
    :closeable="false"
    :close-on-popstate="false"
  >
    <p class="p">￥39.00</p>
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
.consult-pay-page {
  padding: 46px 0 50px 0;

  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }

    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }

  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }

  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--cp-primary);
    }
  }

  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
}
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
