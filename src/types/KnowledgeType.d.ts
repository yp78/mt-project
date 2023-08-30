//列表响应
export type KnowledgeType = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}
export type Knowledge = 'like' | 'recommend' | 'fatReduction' | 'food'
// ⽂章列表带分⻚
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeType[]
}
// ⽂章列表查询参数
export type KnowledgeParams = {
  type: Knowledge
  current: number
  pageSize: number
}

// 通⽤的分⻚查询参数
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}
// 医⽣分⻚
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
