import { ref } from 'vue'
import type { typeType } from '@/types/KnowledgeType'
import { getLinkApi } from '@/serves/Knowledge'
export const useFollow = (type: typeType) => {
  const loading = ref(false)
  const flaglink = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await getLinkApi({ id: obj.id, type: type })
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return {
    flaglink,
    loading
  }
}
