import request from '@/utils/request'
import type {
  addressResponse,
  OrderRequest,
  OrderResponse,
  medicineType,
  Data,
  Logistics
} from '@/types/OrderType'

// 订单-查询收货地址列表
export const getaddress = () => {
  return request<addressResponse[]>('/patient/order/address')
}

// 药品订单
// 支付药款页面-根据处方信息计算药款
export const getOrderDetail = (data: OrderRequest) => {
  return request<OrderResponse>('/patient/medicine/order/pre', 'GET', data)
}

// 根据处方下药品订单
export const getmedicine = (data: medicineType) => {
  return request<{ id: string }>('/patient/medicine/order', 'POST', data)
}

//查询订单详情信息
export const getmedicinedetail = (id: string) => {
  return request<Data>(`/patient/medicine/order/detail/${id}`, 'GET')
}

// 获取药品订单物流信息
export const getMedicalOrderLogistics = (id: string) => {
  return request<Logistics>(`/patient/order/${id}/logistics`)
}
