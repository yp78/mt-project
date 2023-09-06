import { childtime, FlagType } from '@/enum/index'

export const getIllnessTimeText = (value: number) => {
  const timeOption = [
    {
      label: '一周内',
      value: childtime.week
    },
    {
      label: '一月内',
      value: childtime.month
    },
    {
      label: '半年内',
      value: childtime.helfyear
    },
    {
      label: '半年以上',
      value: childtime.year
    }
  ]
  const data = timeOption.find((item) => item.value == value)
  return data?.label
}

export const getConsultFlagText = (value: number) => {
  const flagOption = [
    { label: '就诊过', value: FlagType.wdia },
    { label: '未就诊', value: FlagType.diag }
  ]
  const data = flagOption.find((item) => item.value == value)
  return data?.label
}
