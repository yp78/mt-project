import request from '@/utils/request'
import type { CodeTypeRules } from '@/serves/user.d'
import type { User } from '@/types/user.d'

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
