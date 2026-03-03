import { ref } from 'vue'
import { 
  initDB, 
  getAllRecords,
  deleteRecord, 
  clearAllRecords,
  getRecordCount 
} from '@/utils/indexedDB.js'

export function useIndexedDB() {
  const history = ref([])
  const totalCount = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  // 初始化数据库
  const initialize = async () => {
    try {
      await initDB()
    } catch (e) {
      error.value = e.message
    }
  }

  // 加载历史记录（获取所有记录以支持前端分页）
  const loadHistory = async () => {
    isLoading.value = true
    error.value = null

    try {
      const records = await getAllRecords()
      // 按创建时间倒序排列
      history.value = records.sort((a, b) => b.createdAt - a.createdAt)
      totalCount.value = records.length
    } catch (e) {
      error.value = e.message
      history.value = []
    } finally {
      isLoading.value = false
    }
  }

  // 删除单条记录
  const removeRecord = async (id) => {
    try {
      await deleteRecord(id)
      history.value = history.value.filter(item => item.id !== id)
      totalCount.value = Math.max(0, totalCount.value - 1)
      return true
    } catch (e) {
      error.value = e.message
      return false
    }
  }

  // 清空所有记录
  const clearHistory = async () => {
    try {
      await clearAllRecords()
      history.value = []
      totalCount.value = 0
      return true
    } catch (e) {
      error.value = e.message
      return false
    }
  }

  // 刷新历史记录
  const refreshHistory = async () => {
    await loadHistory()
  }

  return {
    history,
    totalCount,
    isLoading,
    error,
    initialize,
    loadHistory,
    removeRecord,
    clearHistory,
    refreshHistory
  }
}
