<script setup lang="ts">
import { getPatientApi, addPatient, editPatient, delPatient } from '@/serves/user'
import type { patientType } from '@/types/user'
import { ref, reactive, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import Validator from 'id-validator'
import { showConfirmDialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores/consult'

const store = useConsultStore()
const route = useRoute()
const router = useRouter()
const list = ref<patientType[]>()
const show = ref<boolean>(false)

const isChange = computed(() => {
  return route.query.isChange
})
const getPatient = async () => {
  const res = await getPatientApi()
  list.value = res.data
  if (isChange.value && list.value.length) {
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    if (defPatient) {
      patienId.value = defPatient.id as string
    } else {
      patienId.value = list.value[0].id as string
    }
  }
}
getPatient()
const initPatient: patientType = reactive({
  gender: 1,
  defaultFlag: 0,
  name: '',
  idCard: ''
})
const patient = ref<patientType>({ ...initPatient })
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
const showPopup = (item?: patientType) => {
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  show.value = true
}
const submit = async () => {
  if (!patient.value.name) return showToast('请s输⼊真实姓名')
  if (!patient.value.idCard) return showToast('请输⼊身份证号')
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
  const res = patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  showToast(res.message)
  show.value = false
  getPatient()
}
const remove = async () => {
  showConfirmDialog({
    title: '温馨提示',
    message: `您确认要删除${patient.value.name}患者信息吗？`
  })
    .then(async () => {
      await delPatient(patient.value.id as string)
      show.value = false
      getPatient()
      showToast('删除成功')
    })
    .catch(() => {
      // on cancel
    })
}
// 选择患者
let patienId = ref<string>('')
const selectedPatient = (item: patientType) => {
  if (isChange.value) {
    patienId.value = item.id as string
  }
}

const next = () => {
  if (!patienId.value) return showToast('请选就诊择患者')

  store.patientId(patienId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-page-main">
      <div
        class="patient"
        @click="selectedPatient(item)"
        v-for="(item, index) in list"
        :key="index"
        :class="{ selected: item.id === patienId }"
      >
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
          <cp-icons class="cpicon" name="user-edit" @click="showPopup(item)"></cp-icons>
          <van-tag class="bian" color="#40be9f" v-if="index === 0">默认</van-tag>
        </div>
      </div>
      <div class="patient" v-if="list && list?.length < 6" @click="showPopup()">
        <div class="lefe">
          <cp-icons name="user-add" style="font-size: 1.6em"></cp-icons>
          <p>添加患者</p>
        </div>
      </div>
      <p class="p">最多可添加6人</p>
    </div>
    <van-popup
      v-model:show="show"
      @update:show="show = $event"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <cp-nav-bar
        :back="() => (show = false)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        rightText="保存"
        @click-right="submit"
      ></cp-nav-bar>
      <van-form autocomplete="off">
        <van-cell-group inset>
          <van-field
            v-model="patient.name"
            name="用户名"
            label="真实姓名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="patient.idCard"
            name="身份证号"
            label="身份证号"
            :rules="[{ required: true, message: '请填写身份证号' }]"
          />
          <van-field label="性别">
            <template #input>
              <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox round v-model="defaultFlag" />
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <van-action-bar v-if="patient.id"
        ><van-action-bar-button @click="remove">删除</van-action-bar-button></van-action-bar
      >
    </van-popup>

    <!-- 底部按钮 -->
    <div class="patient-next">
      <van-button type="primary" @click="next" round block>下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  box-sizing: border-box;
  padding: 46px 0 80px;
  .patient-change {
    padding: 15px;
    > h3 {
      font-weight: normal;
      margin-bottom: 5px;
    }
    > p {
      color: var(--cp-text3);
    }
  }
  ::v-deep() {
    .van-popup {
      width: 80%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
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
      &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);
      }
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
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
