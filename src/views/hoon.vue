<template>
  <div class="">
    <div class="main">
      <p>{{ store.user }}</p>
      <div class="min">
        <button
          @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })"
        >
          登录
        </button>
        <van-button>按钮</van-button>
        <button @click="store.delUser()">退出</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '../utils/request'
import { useUserStore } from '@/stores/user'
import { Button as VanButton } from 'vant'
const store = useUserStore()

// import { useRouter, useRoute } from 'vue-router'
// import { useStore } from 'vuex'
// import { ref, reactive, computed, watch } from 'vue'

// // 引入路由
// const router = useRouter()
// // 路由对象
// const route = useRoute()
// // 引入仓库
// const store = useStore()

// // 声明响应式数据
// const data = reactive({})

// // 父传子
// const props = defineProps({})

// // 子传父, 传递的自定义事件名还要在defineEmits中声明
// const emit = defineEmits([])
</script>

<style lang="scss" scoped>
.main {
  width: 400px;
  height: 300px;
  background-color: aqua;

  .min {
    width: 200px;
    height: 200px;
    background-color: antiquewhite;
  }
}
</style>
