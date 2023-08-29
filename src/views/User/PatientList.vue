<script setup lang="ts">
import { getPatientApi } from '@/serves/user'
import type { patientType } from '@/types/user'
import { ref } from 'vue'

const list = ref<patientType[]>()

const getPatient = async () => {
  const res = await getPatientApi()
  console.log(res)
  list.value = res.data
}
getPatient()
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-page-main">
      <div class="patient" v-for="(item, index) in list" :key="index">
        <div class="left">
          <p style="display: flex; justify-content: space-between">
            <span>{{ item.name }}</span>
            <span>{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          </p>
          <p style="color: #858282">
            <span style="margin-right: 20px">{{ item.defaultFlag ? '男' : '女' }}</span>
            <span>{{ item.age }}岁</span>
          </p>
        </div>
        <div class="right">
          <cp-icons class="cpicon" name="user-edit"></cp-icons>
          <van-tag class="bian" color="#40be9f" v-if="index === 0">默认</van-tag>
        </div>
      </div>
      <div class="patient" v-if="list && list?.length < 6">
        <div class="lefe">
          <cp-icons name="user-add" style="font-size: 1.6em"></cp-icons>
          <p>添加患者</p>
        </div>
      </div>
      <p class="p">最多可添加6人</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  box-sizing: border-box;
  padding: 46px 0 80px;
  &-main {
    padding: 0 15px;
    .patient {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 10px;
      padding: 15px;
      box-sizing: border-box;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      .left {
        width: 70%;
        height: 100%;
        line-height: 30px;
      }
      .right {
        width: 20%;

        position: relative;
        .cpicon {
          position: absolute;
          top: 40%;
          right: 0;
        }
      }
      .lefe {
        width: 100%;
        line-height: 20px;
        font-size: 1.2em;
        color: var(--cp-primary);
        text-align: center;
      }
    }
    .p {
      color: var(--cp-text3);
    }
  }
}
</style>
