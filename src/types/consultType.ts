import { inquiry, FlagType, renal, allergic, liver, typelist, childtime } from '@/enum'
//查询科室
export type childDep = {
  id: string
  name: string
}
export type DoctorDep = childDep & {
  child: childDep[]
}

//问诊-保存/修改问诊订单
export type consultType = {
  type: typelist
  // 就诊类型
  couponId?: string
  // 使用优惠券，必传可使用优惠券id
  illnessType?: inquiry
  // 极速问诊类型：0普通1三甲
  patientId: string
  // 患者id,用于关联患者信息
  depId?: string
  // 选择的科室id-极速问诊必填(选择的科室)
  illnessDesc: string
  // 病情--症状描述
  illnessTime?: childtime
  // 找医生/极速问诊-患病时间1一周内2一月内3半年内4半年以上
  consultFlag?: FlagType
  // 找医生/极速问诊-是否就诊过0未就诊1就诊过
  liverFunction?: liver
  // 开药门诊-肝功能0正常1异常2不清楚
  renalFunction?: renal
  // 开药门诊-肾功能0正常1异常2不清楚
  allergicHistory?: allergic
  // 开药门诊-过敏史0无1有2不清楚
  fertilityStatus?: 0 | 1 | 2 | 3
  // 开药门诊-生育状态及计划0无1备孕中2已怀孕3哺乳期
  docId?: string
  // 咨询的医生-类型为找医生问诊，字段是必须的
  medicines?: medicType[]
  pictures?: picturesType[]
}
//问诊记录变成可选 Partial 将定义的必填类型转化为可选类型
//Required 转化为全部必须  Patial 转化为全部可选  两个内置的泛型类型
export type PartialConsult = Partial<consultType>
//开药问诊-开药问诊的药品id集合
export type medicType = {
  id: string //选择的药品id
  quantity: number //选择的药品数量
}
//补充病例信息-图片集合
export type picturesType = {
  id: string //图片id
  url: string //图片url
}

export type FormConsult = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 图片病例信息
export type Image = {
  id: string
  url: string
}
// 支付传参类型
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>
// 获取预支付信息返回类型
export type ConsultOrderPreData = {
  /**
   * 实付金额
   */
  actualPayment: number
  /**
   * 优惠券抵扣
   */
  couponDeduction: number
  /**
   * 使用的优惠券id-使用优惠券时，返回
   */
  couponId?: string
  /**
   * 极速问诊类型：0普通1三甲,极速问题必须有值
   */
  illnessType?: number
  /**
   * 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元
   */
  payment: number
  /**
   * 积分可抵扣
   */
  pointDeduction: number
  /**
   * 1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
}
