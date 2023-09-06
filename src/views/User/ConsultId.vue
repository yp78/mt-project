<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getOrderDetail } from '@/serves/consult.d'
import { ref, watch } from 'vue'
import type { RowType } from '@/types/consultType'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { Status } from '@/enum/index'
import cpconsultmore from './componsable/CpConsultMore.vue'
import { useshowImage, useClearConsult, usedelConsult } from '@/composable/index'
const { showImage } = useshowImage()
const { clearConsult, loading } = useClearConsult()
import { useClipboard } from '@vueuse/core'
import { showToast } from 'vant'
import { showConfirmDialog } from 'vant'
import cppaysheet from '@/components/CpPaySheet.vue'

const show = ref(false)
const { copy, copied, isSupported } = useClipboard()
const emit = defineEmits(['on-delete'])
const { delConsult, deleteLoading } = usedelConsult((id) => {
  emit('on-delete', id)
})

const list = ref<RowType>()
const route = useRoute()
const router = useRouter()
const getDetail = async () => {
  const res = await getOrderDetail(route.params.id as string)
  console.log('res', res)
  list.value = res.data
}
getDetail()

//复制
const onCopy = () => {
  if (!isSupported.value) return showToast('我授权，不支持')
  copy(list.value?.orderNo || '')
}
watch(copied, () => {
  if (copied.value) showToast('已复制')
})

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
      router.push('/user/consult')
      return true
    })
}
</script>

<template>
  <div class="user-consult-page" v-if="list">
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <div class="detaill-header">
      <div class="text">
        <h3>{{ list.docInfo?.gradeName }} {{ list?.payment + '元' }}</h3>
        <span class="sta green">{{ list.statusValue }}</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ list?.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${list?.patientInfo.name} | ${list?.patientInfo.genderValue} | ${list?.patientInfo.age}岁`"
        />
        <van-cell title="患病时⻓" :value="`${getIllnessTimeText(list?.illnessTime as number)}`" />
        <van-cell title="就诊情况" :value="`${getConsultFlagText(list?.consultFlag as number)}`" />
        <van-cell title="病情描述" :label="list?.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy()">复制</span>
            {{ list?.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="list?.createTime" />
        <van-cell title="应付款" :value="`￥${list?.payment}`" />
        <van-cell title="优惠券" :value="`-￥${list?.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${list?.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${list?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="detail-action van-hairline--top" v-if="list.status == Status.The1">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ list.actualPayment }}</span>
      </div>
      <van-button
        type="default"
        round
        plain
        size="small"
        :loading="loading"
        @click="clearConsult(list)"
        >取消问诊</van-button
      >
      <van-button type="primary" plain size="small" round @click="show = true">继续⽀付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="list.status == Status.The2">
      <van-button
        type="default"
        class="gray"
        plain
        size="small"
        round
        :loading="loading"
        @click="clearConsult(list)"
        >取消问诊</van-button
      >
      <van-button type="primary" round :to="`/room?orderId=${list.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="list.status == Status.The3">
      <van-button
        type="default"
        round
        v-if="list.prescriptionId"
        @click="showImage(list.prescriptionId)"
        >查看处⽅</van-button
      >
      <van-button type="primary" round :to="`/room?orderId=${list.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="list.status == Status.The4">
      <cpconsultmore></cpconsultmore>
      <van-button type="default" round :to="`/room?orderId=${list.id}`">问诊记录</van-button>
      <van-button type="primary" round v-if="list.evaluateFlag">写评价</van-button>
      <van-button type="default" round v-else>查看评价</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="list.status == Status.The5">
      <van-button type="default" round :loading="deleteLoading" @click.stop="delConsult(list)"
        >删除订单</van-button
      >
      <van-button type="primary" round to="/">咨询其他医⽣</van-button>
    </div>
    <div class="detail-time" v-if="list.status == Status.The1">
      请在 <van-count-down :time="list.countdown * 1000" /> 内完成⽀付，超时订单将取消
    </div>
  </div>
  <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
  <cppaysheet
    v-model:show="show"
    :orderId="list?.id!"
    :actualPayment="list?.actualPayment!"
    :onClose="onClose"
  ></cppaysheet>
</template>

<style lang="scss" scoped>
.user-consult-page {
  padding: 46px 0 110px 0;
  .detaill-header {
    height: 140px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 135px;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }
    padding: 15px;
    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 3px;
      .sta {
        color: var(--cp-tag);
        font-weight: 500;
        font-size: 16px;
        &.green {
          color: var(--cp-primary);
        }
        &.orange {
          color: #f2994a;
        }
      }
      .tip {
        width: 100%;
        color: var(--cp-text3);
        margin-top: 5px;
      }
    }
    .card {
      height: 74px;
      background-color: #fff;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-shadow: 0 0 22px 0 rgba(229, 229, 229, 0.5);
      img {
        width: 38px;
        height: 38px;
      }
      .doc {
        flex: 1;
        padding-left: 15px;
        > span {
          display: block;
          font-size: 16px;
          &:last-child {
            font-size: 13px;
            color: var(--cp-text3);
          }
        }
      }
      .van-icon {
        color: var(--cp-tip);
      }
    }
  }
  .detail-patient {
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
    }
  }
  .detail-order {
    > h3 {
      padding: 10px 18px;
      font-weight: normal;
    }
    .copy {
      padding: 2px 10px;
      border: 1px solid var(--cp-primary);
      background-color: var(--cp-plain);
      color: var(--cp-primary);
      font-size: 12px;
      border-radius: 12px;
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    flex: 1;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;
  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
</style>
