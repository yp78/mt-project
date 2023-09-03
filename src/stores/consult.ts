import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult, FormConsult } from '@/types/consultType'
import type { typelist, inquiry } from '@/enum/index'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    //初始化一个状态，保存问诊记录
    const consult = ref<PartialConsult>({})
    //设置问诊类型
    const setType = (type: typelist) => {
      consult.value.type = type
    }
    //设置极速问诊
    const setIllnessType = (type: inquiry) => {
      consult.value.illnessType = type
    }
    //设置科室
    const setDepId = (depId: string) => {
      consult.value.depId = depId
    }
    //设置问诊信息（疾病描述，持续时间，是否就诊过，患者信息consult.value.consultFlag=illness.consultFlag图片
    const setIllness = (illness: FormConsult) => {
      // 设置疾病描述时间
      consult.value.illnessDesc = illness.illnessDesc
      //疾病持续时间
      consult.value.illnessTime = illness.illnessTime
      // 设置是否就诊过
      consult.value.consultFlag = illness.consultFlag
      //设置患者信息图片数据
      consult.value.pictures = illness.pictures
    }
    //设置患者id
    const patientId = (patientId: string) => {
      consult.value.patientId = patientId
    }
    //设置优惠卷id
    const setCouponId = (couponId: string) => {
      consult.value.couponId = couponId
    }
    return {
      consult,
      setType,
      setIllnessType,
      setDepId,
      setIllness,
      patientId,
      setCouponId
    }
  },
  { persist: true }
)
