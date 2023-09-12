<script setup lang="ts">
import { MsgType } from '@/enum'
import type { Image } from '@/types/consultType'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { showImagePreview, showToast } from 'vant'
import type { Message, Prescription } from '@/types/RoomType'
import { useUserStore } from '@/stores/user'
import { nextTick } from 'vue'
import dayjs from 'dayjs'
import { getPrescriptApi } from '@/serves/consult.d'
import { useRouter } from 'vue-router'
import { PrescriptionStatus } from '@/enum/index'

const store = useUserStore()
const router = useRouter()

const props = defineProps<{
  list: Message[]
}>()

const load = async () => {
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}

//格式化时间
const formatTime = (time: string) => dayjs(time).format('HH:mm')

// 点击查看患者图片
const previewImg = (pictures?: Image[]) => {
  if (pictures && pictures.length > 0) {
    showImagePreview(pictures.map((item) => item.url))
  }
}

const Images = (url: string) => {
  showImagePreview([url])
}

const showPrescription = async (id?: string) => {
  if (id) {
    const res = await getPrescriptApi(id)
    showImagePreview([res.data.url])
  }
}

const buy = (pre?: Prescription) => {
  if (pre) {
    if (pre.status === PrescriptionStatus.Invalid) return showToast('处⽅已失效')
    if (pre.status === PrescriptionStatus.NotPayment && !pre.orderId)
      return router.push(`/order/pay?id=${pre.id}`)
    router.push(`/order/${pre.orderId}`)
  }
}
</script>

<template>
  <div class="room-message">
    <template v-for="(item, index) in list" :key="index">
      <!-- 消息时间 -->
      <!-- 通知-通用 -->
      <!-- <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
        <div class="content">
          {{ item.msg.content }}
        </div>
      </div> -->

      <!-- 患者卡片 -->
      <div class="msg msg-illness" v-if="item.msgType === MsgType.CardPat">
        <div class="patient van-hairline--bottom">
          <p>
            {{ item.msg.consultRecord!.patientInfo.name }}
            {{ item.msg.consultRecord!.patientInfo.genderValue }}
            {{ item.msg.consultRecord!.patientInfo.age }}岁
          </p>
          <p>
            {{ getIllnessTimeText(item.msg.consultRecord!.illnessTime) }} |
            {{ getConsultFlagText(item.msg.consultRecord!.illnessType) }}
          </p>
        </div>
        <van-row>
          <van-col span="6">病情描述</van-col>
          <van-col span="18">{{ item.msg.consultRecord!.illnessDesc }}</van-col>
          <van-col span="6">图片</van-col>
          <van-col span="18" @click="previewImg(item.msg.consultRecord!.pictures)"
            >点击查看</van-col
          >
        </van-row>
      </div>
      <!-- 通知-通用 -->
      <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
        <div class="content">
          <span>{{ item.msg.content }}</span>
        </div>
      </div>
      <!-- 通知-温馨提示 -->
      <div class="msg msg-tip" v-if="item.msgType === MsgType.NotifyTip">
        <div class="content">
          <span class="green">温馨提示：</span>
          <span>{{ item.msg.content }}</span>
        </div>
      </div>
      <!-- 通知-结束 -->
      <div class="msg msg-tip msg-tip-cancel" v-if="item.msgType === MsgType.NotifyTip">
        <div class="content">
          <span>订单取消</span>
        </div>
      </div>
      <!-- 我发的消息 -->
      <div
        class="msg msg-to"
        v-if="item.msgType === MsgType.MsgText && store.user?.id === item.from"
      >
        <div class="content">
          <div class="time">{{ formatTime(item.createTime) }}</div>
          <div class="pao">{{ item.msg.content }}</div>
        </div>
        <van-image :src="store.user?.avatar" />
      </div>
      <!-- 医⽣发的消息 -->
      <div
        class="msg msg-from"
        v-if="item.msgType === MsgType.MsgText && store.user?.id !== item.from"
      >
        <van-image :src="item.toAvatar" />
        <div class="content">
          <div class="time">{{ formatTime(item.createTime) }}</div>
          <div class="pao">{{ item.msg.content }}</div>
        </div>
      </div>
      <!-- 发送图片 -->
      <div class="msg msg-to" v-if="item.msgType === 4 && item.from === store.user?.id">
        <div class="content">
          <div class="time">{{ formatTime(item.createTime) }}</div>
          <van-image
            @click="Images(item.msg.picture!.url)"
            @load="load"
            fit="contain"
            :src="item.msg.picture!.url"
          />
        </div>
        <van-image :src="item.fromAvatar" />
      </div>
      <!-- 接收图片 -->
      <div class="msg msg-from" v-if="item.msgType === 4 && item.from !== store.user?.id">
        <van-image :src="item.fromAvatar" />
        <div class="content">
          <div class="time">{{ formatTime(item.createTime) }}</div>
          <van-image
            @click="Images(item.msg.picture!.url)"
            @load="load"
            fit="contain"
            :src="item.msg.picture!.url"
          />
        </div>
      </div>

      <!-- 处⽅ -->
      <div class="msg msg-recipe" v-if="item.msgType === MsgType.CardPre">
        <div class="content" v-if="item.msg.prescription">
          <div class="head van-hairline--bottom">
            <div class="head-tit">
              <h3>电⼦处⽅</h3>
              <p @click="showPrescription(item.msg.prescription?.id)">
                原始处⽅ <van-icon name="arrow"></van-icon>
              </p>
            </div>
            <p>
              {{ item.msg.prescription.name }}
              {{ item.msg.prescription.genderValue }}
              {{ item.msg.prescription.age }}岁
              {{ item.msg.prescription.diagnosis }}
            </p>
            <p>开⽅时间：{{ item.msg.prescription.createTime }}</p>
          </div>
          <div class="body">
            <div class="body-item" v-for="med in item.msg.prescription.medicines" :key="med.id">
              <div class="durg">
                <p>{{ med.name }} {{ med.specs }}</p>
                <p>{{ med.usageDosag }}</p>
              </div>
              <div class="num">x{{ med.quantity }}</div>
            </div>
          </div>
          <div class="foot">
            <span @click="buy(item.msg.prescription)">购买药品</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.createTime {
  // margin-top: 40px;
  background-color: #fff;
  width: 150px;
  margin: 0 auto 30px;
  padding: 10px;
  font-size: 12px;
  color: var(--cp-tag);
  border-radius: 20px;
  text-align: center;
}
.msg {
  display: flex;
  padding: 15px;

  &-illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;

    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          color: var(--cp-tip);
        }
      }
    }

    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--cp-tip);
      }
    }
  }

  &-from {
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
      }
      .pao {
        padding: 15px;
        background-color: #fff;
        color: var(--cp-text3);
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: #fff;
          border-top-left-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-right-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }

  &-to {
    justify-content: flex-end;
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
        text-align: right;
      }
      .pao {
        padding: 15px;
        background-color: var(--cp-primary);
        color: #fff;
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          right: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: var(--cp-primary);
          border-top-right-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-left-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }

    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 13px;
    }
  }

  &-tip {
    justify-content: center;
    font-size: 12px;
    .content {
      height: 34px;
      line-height: 34px;
      background-color: #fff;
      color: var(--cp-tip);
      font-size: 12px;
      border-radius: 17px;
      padding: 0 16px;
      max-width: 100%;
      .green {
        color: var(--cp-primary);
      }
    }
    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
  &-recipe {
    padding: 15px;
    .content {
      background-color: #fff;
      border-radius: 8px;
      color: var(--cp-tip);
      font-size: 12px;
      flex: 1;
      .head {
        padding: 15px;
        .head-tit {
          display: flex;
          justify-content: space-between;
          > h3 {
            font-weight: normal;
            font-size: 16px;
            color: var(--cp-text1);
          }
        }
        p {
          margin-top: 5px;
        }
      }
      .body {
        padding: 15px 15px 0 15px;
        &-item {
          display: flex;
          margin-bottom: 15px;
          .durg {
            flex: 1;
            > p {
              &:first-child {
                font-size: 14px;
                color: var(--cp-text1);
                margin-bottom: 5px;
              }
            }
          }
          .num {
            color: var(--cp-text1);
          }
        }
      }
      .foot {
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 16px;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
