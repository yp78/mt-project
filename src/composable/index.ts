import { getPrescriptApi, clearOrder, delOrder } from '../serves/consult.d'
import { ref } from 'vue'
import { showImagePreview, showToast } from 'vant'
import type { Row } from '@/types/consultType'
// const emit = defineEmits(['on-delete'])

export const useshowImage = () => {
  const showImage = async (id: string | number) => {
    const res = await getPrescriptApi(id)
    showImagePreview([res.data.url])
  }
  return {
    showImage
  }
}

//取消订单
export const useClearConsult = () => {
  const loading = ref(false)
  const clearConsult = async (item: Row) => {
    loading.value = true
    try {
      await clearOrder(item.id)
      item.statusValue = '已取消'
      showToast('取消成功')
    } catch {
      showToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return {
    clearConsult,
    loading
  }
}
//删除订单
export const usedelConsult = (cb?: (id: string | number) => void) => {
  const deleteLoading = ref(false)
  const delConsult = async (item: Row) => {
    deleteLoading.value = true
    try {
      await delOrder(item.id)
      showToast('删除成功')
      cb && cb(item.id)
    } catch {
      showToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }
  return { delConsult, deleteLoading }
}
