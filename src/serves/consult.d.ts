import request from '@/utils/request'
import type {
  DoctorDep,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  getOrderType,
  Data,
  RowType
} from '@/types/consultType'

//请求科室
export const getDepApi = () => {
  return request<DoctorDep[]>('/dep/all', 'GET')
}

// 上传文件/图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

// 拉取预支付订单信息
export const getConsultOrderPre = (payParams: ConsultOrderPreParams) => {
  return request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', payParams)
}

//支付接口
export const getOrderApi = (params: PartialConsult) => {
  return request<{ id: string }>('/patient/consult/order', 'post', params)
}

//获取支付地址 0是微信 1是支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return request<{ payUrl: string }>('/patient/consult/pay', 'post', params)
}

//问诊记录-订单列表
export const getOrderList = (params: getOrderType) => {
  return request<Data>('/patient/consult/order/list', 'get', params)
}

//取消订单
export const clearOrder = (id: string) => {
  return request(`/patient/order/cancel/${id}`, 'put')
}

//删除订单
export const delOrder = (id: string) => {
  return request(`/patient/order/${id}`, 'DELETE')
}

//查看处方 /patient/consult/prescription/
export const getPrescriptApi = (id: string | number) => {
  return request<{ id: string; url: string }>(`/patient/consult/prescription/${id}`, 'GET')
}

//获取订单详情
export const getOrderDetail = (orderId: string) => {
  return request<RowType>('/patient/consult/order/detail', 'GET', { orderId })
}
