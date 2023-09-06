<script setup lang="ts">
import type { patientType } from '@/types/user'
import { getPatientInfo } from '@/serves/user'
import { ref, computed, onMounted } from 'vue'
import { useConsultStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consultType'
import { getConsultOrderPre, getOrderApi } from '@/serves/consult.d'
import { showToast } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router' //路由回退
import { showConfirmDialog } from 'vant'
import cppaysheet from '@/components/CpPaySheet.vue'

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

  <cppaysheet
    v-model:show="show"
    :orderId="orderId"
    :actualPayment="payInfo?.actualPayment!"
    :onClose="onClose"
  ></cppaysheet>
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
</style>
