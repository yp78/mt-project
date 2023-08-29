<script setup lang="ts">
import { getUserApi } from '@/serves/user'
import { ref } from 'vue'
import type { UserInfo } from '../../types/user'
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const store = useUserStore()
const router = useRouter()
const user = ref<UserInfo>()
const initUser = async () => {
  const userRes = await getUserApi()
  user.value = userRes.data
  console.log('user', user.value)
}
initUser()
const logout = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？'
  })
    .then(() => {
      // on confirm
      store.delUser()
      router.push('/')
    })
    .catch(() => {
      // on cancel
    })
}
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处⽅', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官⽅客服', path: '/' },
  { label: '设置', path: '/' }
]
</script>

<template>
  <div class="user-page">
    <div class="user-top">
      <div class="user-top-on">
        <img :src="user?.avatar" alt="" />
        <div class="user-top-rigth">
          <p>{{ user?.account }}</p>
          <p><van-icon class="icon" name="edit" /></p>
        </div>
      </div>
      <div class="user-top-down">
        <div>
          <p>0</p>
          <p>收藏</p>
        </div>
        <div>
          <p>0</p>
          <p>关注</p>
        </div>
        <div>
          <p>0</p>
          <p>积分</p>
        </div>
        <div>
          <p>0</p>
          <p>优惠劵</p>
        </div>
      </div>
    </div>
    <van-grid :border="false" :column-num="4">
      <h3 class="h"><span>药品订单</span> <span style="color: #ccc">全部订单 ></span></h3>
      <van-grid-item>
        <p>0</p>
        <p>收藏</p>
      </van-grid-item>
      <van-grid-item>
        <p>0</p>
        <p>关注</p>
      </van-grid-item>
      <van-grid-item>
        <p>0</p>
        <p>积分</p>
      </van-grid-item>
      <van-grid-item>
        <p>0</p>
        <p>优惠劵</p>
      </van-grid-item>
    </van-grid>
    <van-cell style="border-radius: 10px 10px 0 0">
      <template #title> <h3>快捷工具</h3> </template>
    </van-cell>
    <van-cell is-link :to="item.path" v-for="(item, index) in tools" :key="index">
      <template #title>
        <cp-icons :name="`user-tool-0${index + 1}`"></cp-icons> {{ item.label }}
      </template>
    </van-cell>
    <p style="text-align: center; margin: 10px 0">
      <van-button size="small" color="red" plain @click="logout">退出登录</van-button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.user {
  &-page {
    width: 100vw;
    min-height: calc(100vh - 65px);
    background-color: var(--cp-bg);
  }
  &-top {
    box-sizing: border-box;
    height: 160px;
    background: linear-gradient(to bottom, #92d7d2, #fff);
    padding: 20px 15px;
    &-on {
      display: flex;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    &-rigth {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-weight: bold;
      .icon {
        color: var(--cp-primary);
      }
    }
    &-down {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin: 20px 0;
    }
  }
}
.h {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.van-grid {
  box-sizing: border-box;
  padding: 10px 15px 0;
  background-color: #fff;
  width: 95%;
  margin: 10px auto;
  border-radius: 10px;
}
.van-cell {
  width: 95%;
  margin: auto;
}
</style>
