import request from '@/utils/request'
import type { addressResponse, OrderRequest, OrderResponse } from '@/types/OrderType'

// 订单-查询收货地址列表
export const getaddress = () => {
  return request<addressResponse>('/patient/order/address')
}

// 药品订单
// 支付药款页面-根据处方信息计算药款
export const getOrderDetail = (data: OrderRequest) => {
  return request<OrderResponse>('/patient/medicine/order/pre', 'GET', data)
}
