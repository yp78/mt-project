<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import io from 'socket.io-client'
import { ref, onMounted } from 'vue'
import type { Message, TimeMessages } from '@/types/RoomType'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { MsgType, OrderType } from '@/enum'
import { getOrderDetail } from '@/serves/consult.d'
import type { Row } from '@/types/consultType'
import type { Socket } from 'socket.io-client'
import { nextTick } from 'vue'
import dayjs from 'dayjs'
import { showLoadingToast } from 'vant'

const list = ref<Message[]>()
const store = useUserStore()
const route = useRoute()
const consult = ref<Row>()

let socket: Socket
onMounted(async () => {
  //连接websocked
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: 'bearer ' + store.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })

  //监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  //监听是否断开连接
  socket.on('disconnect', () => {
    console.log('断开连接')
  })

  //监听是否连接失败
  socket.on('error', (event) => {
    console.log('连接失败', event)
  })

  //监听默认的聊天信息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []
    console.log('e', data)
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: item.createTime,
        msg: { content: item.createTime }
      })
      arr.push(...item.items)
    })
    console.log('arr', arr)
    list.value = arr
  })

  //监听订单状态是否改变
  socket.on('statusChange', async () => {
    initOrderDetail()
  })

  //接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value?.push(event)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})

const initOrderDetail = async () => {
  const res = await getOrderDetail(route.query.orderId as string)
  consult.value = res.data
  console.log('订单状态', consult.value)
}
initOrderDetail()

const sendText = async (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}
// 发送图片
const sendImage = (data: { id: string; url: string }) => {
  console.log('data', data)
  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型
    msgType: MsgType.MsgImage,
    // 消息内容
    msg: {
      picture: data
    }
  })
}
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)

  // console.log('tt', time.value)
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    <RoomStatus :status="consult?.status!" :countdown="consult?.countdown!"></RoomStatus>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <RoomMessage :list="list!"></RoomMessage>
    </van-pull-refresh>
    <RoomAction
      @send-image="sendImage"
      @send-text="sendText"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></RoomAction>
    <!-- <botton @click="$router.push(`/order/pay?id=${consult?.prescriptionId}`)">购买药品</botton> -->
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
