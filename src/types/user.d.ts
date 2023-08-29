export type User = {
  token: string
  id: string | number
  account: string
  mobile: string | number
  avatar: string
}

//匹配出非token字段的类型
type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type patientType = {
  // 患者ID
  id: string
  // 患者名称
  name: string
  // 身份证号
  idCard: string
  // 0不默认 1默认
  defaultFlag: 0 | 1
  // 0 ⼥ 1 男
  gender: 0 | 1
  // 性别⽂字
  genderValue: string
  // 年龄
  age: number
}
