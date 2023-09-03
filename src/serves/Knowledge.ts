import request from '@/utils/request'
import type {
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  DoctorPage,
  LinkType
} from '@/types/KnowledgeType'

export const getKnowledge = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}

export const getDocorPage = (params: PageParams) => {
  return request<DoctorPage>('/home/page/doc', 'GET', params)
}

export const getLinkApi = (data: LinkType) => {
  return request('/like', 'POST', data)
}
