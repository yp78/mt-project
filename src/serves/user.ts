import request from '@/utils/request'
import type { loginConfig } from '@/serves/user.d'

export const loginApi = (params: loginConfig) => {
  return request('/login/password', 'post', params)
}
