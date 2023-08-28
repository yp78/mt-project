<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginApi, loginByApi, sendMobileCode } from '@/serves/user'
import { showToast } from 'vant'
const agree = ref(false)
const show = ref<boolean>(false)
const router = useRouter()
const route = useRoute()
const isPass = ref<boolean>(true)

const clickright = () => {
  router.push('/zhuce')
}
const loginForm = reactive({
  mobile: '',
  password: '',
  code: ''
})

const onSubmit = async () => {
  if (!agree.value) {
    showToast('请勾选我已同意')
    return
  }
  try {
    const loginRes = isPass.value
      ? await loginApi(loginForm.mobile, loginForm.password)
      : await loginByApi(loginForm.mobile, loginForm.code)

    console.log('loginRes', loginRes)
    router.replace((route.query.returnUrl as string) || '/user')

    // 提示登录成功
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}

const time = ref(0)
let timeId: number = 0
const sendCode = async () => {
  if (time.value > 0) return
  const codeRes = await sendMobileCode(loginForm.mobile, 'login')
  console.log('codeRes', codeRes)
  showToast('发送成功')
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timeId)
  }, 1000)
}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar :title="'登录'" :text="'注册'" @click-right="clickright"></cp-nav-bar>
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <van-form autocomplete="off" @submit="onSubmit">
      <van-field
        :rules="mobileRules"
        v-model="loginForm.mobile"
        placeholder="请输入手机号码"
        type="tel"
      />
      <van-field
        v-if="isPass"
        :rules="passwordRules"
        v-model="loginForm.password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <cp-icons :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show"></cp-icons>
        </template>
      </van-field>
      <van-field v-else :rules="codeRules" v-model="loginForm.code" placeholder="请输入密码">
        <template #button>
          <span @click="sendCode">{{ time > 0 ? time + 's后再次发送' : '获取验证码' }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span> <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button round block type="primary" native-type="submit"> 登录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>

    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 15px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .van-checkbox {
    a {
      color: var(--cp-primary);
      padding: 0 5px;
    }
  }
}
</style>
