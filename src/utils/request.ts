import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { type Method } from 'axios'
import { useUserStore } from '../stores/user'
import type { Data } from '../types/request'
import router from '../router'
import { showToast } from 'vant'

const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 10000
})
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer' + store.user.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 10000) {
      showToast(res.data.message)
    }
    return res.data
  },
  (err) => {
    if (err.response.status == 401) {
      const store = useUserStore()
      store.delUser()
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
