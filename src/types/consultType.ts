import { inquiry, FlagType, renal, allergic, liver, typelist, childtime, Status } from '@/enum'
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

// 问诊记录-订单列表  请求类型
export type getOrderType = {
  // 当前页数，默认1
  current?: number
  /**
   * 每页的大小默认10
   */
  pageSize?: number
  /**
   * 1问医生2极速问诊3开药问诊--默认是1
   */
  type?: string
}

//返回响应参数类型
export type Data = {
  /**
   * 总页数
   */
  pageTotal: number
  rows: Row[]
  /**
   * 总条数
   */
  total: number
}

/**
 * 就诊记录列表数据
 */
export type Row = {
  /**
   * 开药门诊必有-过敏史0无1有2不清楚
   */
  allergicHistory?: number
  /**
   * 取消/退款进度
   */
  cancelProcess?: string
  /**
   * 取消订单原因
   */
  cancelReason?: string
  /**
   * 取消订单原因文字
   */
  cancelReasonValue?: string
  /**
   * 找医生/极速问诊必有-是否就诊过0未就诊1就诊过
   */
  consultFlag?: number
  /**
   * 倒计时-1表示计时已过(单位s)
   */
  countdown?: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 咨询的医生--找医生
   */
  docInfo?: DocInfo
  /**
   * 是否已经评价1 已评价0 未评价
   */
  evaluateFlag: string
  /**
   * 开药门诊必有-生育状态及计划0无1备孕中2已怀孕3哺乳期
   */
  fertilityStatus?: number
  /**
   * 订单id
   */
  id: string
  /**
   * 病情--症状描述
   */
  illnessDesc: string
  /**
   * 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
   */
  illnessTime?: number
  /**
   * 开药门诊必有-肝功能0正常1异常2不清楚
   */
  liverFunction?: number
  /**
   * 订单编号
   */
  orderNo?: string
  /**
   * 价格
   */
  payment: number
  /**
   * 患者id,用于关联患者信息
   */
  patientInfo?: PatientInfo
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 就诊记录id信息
   */
  recordId: string
  /**
   * 开药门诊必有-肾功能0正常1异常2不清楚
   */
  renalFunction?: number
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  status: Status
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  statusValue?: string
  /**
   * 订单类型1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
}

/**
 * 咨询的医生--找医生
 */
export type DocInfo = {
  /**
   * 医生头像
   */
  avatar?: string
  /**
   * 接诊数量
   */
  consultationNum?: number
  /**
   * 科室
   */
  depName?: string
  /**
   * 医院等级
   */
  gradeName?: string
  /**
   * 医院名称
   */
  hospitalName?: string
  /**
   * 医生id
   */
  id?: string
  /**
   * 擅长
   */
  major?: string
  /**
   * 医生姓名
   */
  name?: string
  /**
   * 职称
   */
  positionalTitles?: string
  /**
   * 评分
   */
  score?: number
  /**
   * 服务费
   */
  serviceFee?: number
  /**
   * 医生状态0休息中1可以咨询
   */
  status?: number
}

/**
 * 患者id,用于关联患者信息
 */
export type PatientInfo = {
  /**
   * 患者年龄
   */
  age: string
  /**
   * 患者性别
   */
  gender: number
  /**
   * 患者id
   */
  id: string
  /**
   * 患者证件信息
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}
