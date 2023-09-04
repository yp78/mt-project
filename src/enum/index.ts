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
