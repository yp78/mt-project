import request from '@/utils/request'
import type { CodeTypeRules } from '@/serves/user.d'
import type { User, UserInfo, patientType } from '@/types/user.d'

//密码登录
export const loginApi = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}
//短信登录
export const loginByApi = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}
//验证码

export const sendMobileCode = (mobile: string, type: CodeTypeRules) => {
  return request('/code', 'GET', { mobile, type })
}

//获取个人信息
export const getUserApi = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}

//获取家庭档案
export const getPatientApi = () => {
  return request<patientType[]>('/patient/mylist')
}
