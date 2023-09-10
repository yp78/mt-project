//问诊类型 0普通1三甲
export enum inquiry {
  pt = 0,
  sj = 1
}

//是否就诊过0未就诊1就诊过
export enum FlagType {
  diag = 0,
  wdia = 1
}

//就诊类型 1找医生 2极速问诊 3开药问诊默认是1
export enum typelist {
  doctor = 1,
  inquiry = 2,
  medicine = 3
}

//-患病时间 1一周内2一月内3半年内4半年以上
export enum childtime {
  week = 1,
  month = 2,
  helfyear = 3,
  year = 4
}
// 肝功能0正常1异常2不清楚
export enum liver {
  zc = 0,
  yc = 1,
  bqc = 2
}
// 肾功能0正常1异常2不清楚
export enum renal {
  zc = 0,
  yc = 1,
  bqc = 2
}
// 过敏史0无1有2不清楚
export enum allergic {
  not = 0,
  hove = 1,
  notmin = 2
}

/**
 * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
 */
export enum Status {
  The1 = '1',
  The2 = '2',
  The3 = '3',
  The4 = '4',
  The5 = '5'
}

// 订单状态
export enum OrderType {
  // 问诊订单
  /** 待支付 */
  ConsultPay = 1,
  /** 待接诊 */
  ConsultWait = 2,
  /** 问诊中 */
  ConsultChat = 3,
  /** 问诊完成 */
  ConsultComplete = 4,
  /** 取消问诊 */
  ConsultCancel = 5,
  // 药品订单
  /** 待支付 */
  MedicinePay = 10,
  /** 待发货 */
  MedicineSend = 11,
  /** 待收货 */
  MedicineTake = 12,
  /** 已完成 */
  MedicineComplete = 13,
  /** 取消订单 */
  MedicineCancel = 14
}

export enum ExpressStatus {
  // 已发货
  Delivered = 1,
  // 已揽件
  Received = 2,
  // 运输中
  Transit = 3,
  // 派送中
  Delivery = 4,
  // 已签收
  Signed = 5
}

// 消息类型
export enum MsgType {
  /** 文字聊天 */
  MsgText = 1,
  /** 图片聊天 */
  MsgImage = 4,
  /** 患者信息 */
  CardPat = 21,
  /** 处方信息 */
  CardPre = 22,
  /** 未评价信息 */
  CardEvaForm = 23,
  /** 已评价信息 */
  CardEva = 24,
  /** 通用通知 */
  Notify = 31,
  /** 温馨提示 */
  NotifyTip = 32,
  /** 取消提示 */
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  /** 未付款 */
  NotPayment = 1,
  /** 已付款 */
  Payment = 2,
  /** 已失效 */
  Invalid = 3
}
