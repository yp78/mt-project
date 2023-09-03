import request from '@/utils/request'
import type { DoctorDep, ConsultOrderPreData, ConsultOrderPreParams } from '@/types/consultType'

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
