<template>
  <div class="password-history">
    <!-- 搜索区域 -->
    <div class="search-area">
      <div class="search-header">
        <div class="search-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>搜索历史记录</span>
        </div>
        <div class="search-stats">
          <span class="stat-item"><strong>{{ totalCount }}</strong> 条记录</span>
          <span class="stat-item"><strong>{{ filteredCount }}</strong> 条匹配</span>
        </div>
      </div>
      
      <div class="search-filters">
        <div class="filter-group">
          <label>开始日期</label>
          <input type="date" v-model="filters.startDate" />
        </div>
        <div class="filter-group">
          <label>结束日期</label>
          <input type="date" v-model="filters.endDate" />
        </div>
        <div class="filter-group">
          <label>密码长度</label>
          <select v-model="filters.length">
            <option value="">全部</option>
            <option v-for="len in [8, 12, 16, 20, 24, 32]" :key="len" :value="len">{{ len }} 位</option>
          </select>
        </div>
        <div class="filter-actions">
          <button class="filter-btn reset" @click="resetFilters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            重置
          </button>
          <button class="filter-btn primary" @click="loadHistory">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            搜索
          </button>
        </div>
      </div>

      <div class="quick-dates">
        <span class="quick-label">快捷:</span>
        <button @click="setQuickDate('today')" :class="{ active: quickDate === 'today' }">今天</button>
        <button @click="setQuickDate('week')" :class="{ active: quickDate === 'week' }">近7天</button>
        <button @click="setQuickDate('month')" :class="{ active: quickDate === 'month' }">近30天</button>
        <button @click="setQuickDate('all')" :class="{ active: quickDate === 'all' }">全部</button>
      </div>
    </div>

    <!-- 历史列表 -->
    <div class="history-area">
      <div class="history-header">
        <div class="header-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>历史记录</span>
        </div>
        <div class="header-right">
          <button class="header-btn" @click="loadHistory" :disabled="isLoading">
            <svg :class="{ spin: isLoading }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path>
            </svg>
          </button>
          <button class="header-btn danger" @click="confirmClear" :disabled="filteredHistory.length === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="history-list" v-if="paginatedHistory.length > 0">
        <div class="history-table">
          <div class="table-header">
            <span class="col col-password">密码</span>
            <span class="col col-length">长度</span>
            <span class="col col-date">日期</span>
            <span class="col col-time">时间</span>
            <span class="col col-actions">操作</span>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="item in paginatedHistory" :key="item.id">
              <span class="col col-password">
                <code>{{ item.password }}</code>
              </span>
              <span class="col col-length">
                <span class="length-tag">{{ item.length }}位</span>
              </span>
              <span class="col col-date">{{ formatDate(item.createdAt) }}</span>
              <span class="col col-time">{{ formatTime(item.createdAt) }}</span>
              <span class="col col-actions">
                <button class="row-btn" @click="copyPassword(item.password)" title="复制">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                  </svg>
                </button>
                <button class="row-btn danger" @click="removeItem(item.id)" title="删除">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- 分页控件 -->
        <div class="pagination" v-if="totalPages > 1">
          <button class="page-btn" @click="currentPage = 1" :disabled="currentPage === 1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
          </button>
          <button class="page-btn" @click="currentPage--" :disabled="currentPage === 1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button class="page-btn" @click="currentPage++" :disabled="currentPage === totalPages">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <button class="page-btn" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
          </button>
        </div>
      </div>

      <div class="history-empty" v-else>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{{ isLoading ? '加载中...' : '没有找到匹配的记录' }}</span>
      </div>
    </div>

    <!-- 确认对话框 -->
    <div class="modal-overlay" v-if="showConfirm" @click.self="showConfirm = false">
      <div class="modal-box">
        <div class="modal-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h4>确认清空</h4>
        <p>确定要删除所有历史记录吗？此操作不可恢复。</p>
        <div class="modal-actions">
          <button class="modal-btn" @click="showConfirm = false">取消</button>
          <button class="modal-btn danger" @click="clearAll">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated } from 'vue'
import { useIndexedDB } from '@/composables/useIndexedDB.js'

const { history, totalCount, isLoading, loadHistory: fetchHistory, removeRecord, clearHistory } = useIndexedDB()

const showConfirm = ref(false)
const quickDate = ref('all')
const currentPage = ref(1)
const pageSize = 50

const filters = reactive({
  startDate: '',
  endDate: '',
  length: ''
})

const filteredHistory = computed(() => {
  let result = history.value

  if (filters.startDate) {
    const start = new Date(filters.startDate)
    start.setHours(0, 0, 0, 0)
    result = result.filter(item => new Date(item.createdAt) >= start)
  }

  if (filters.endDate) {
    const end = new Date(filters.endDate)
    end.setHours(23, 59, 59, 999)
    result = result.filter(item => new Date(item.createdAt) <= end)
  }

  if (filters.length) {
    result = result.filter(item => item.length === Number(filters.length))
  }

  return result
})

const filteredCount = computed(() => filteredHistory.value.length)
const totalPages = computed(() => Math.ceil(filteredCount.value / pageSize))
const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredHistory.value.slice(start, start + pageSize)
})

function setQuickDate(type) {
  quickDate.value = type
  const today = new Date()
  
  switch (type) {
    case 'today':
      filters.startDate = formatInputDate(today)
      filters.endDate = formatInputDate(today)
      break
    case 'week':
      const weekAgo = new Date(today)
      weekAgo.setDate(today.getDate() - 7)
      filters.startDate = formatInputDate(weekAgo)
      filters.endDate = formatInputDate(today)
      break
    case 'month':
      const monthAgo = new Date(today)
      monthAgo.setDate(today.getDate() - 30)
      filters.startDate = formatInputDate(monthAgo)
      filters.endDate = formatInputDate(today)
      break
    case 'all':
    default:
      filters.startDate = ''
      filters.endDate = ''
      break
  }
}

function formatInputDate(date) {
  return date.toISOString().split('T')[0]
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function resetFilters() {
  filters.startDate = ''
  filters.endDate = ''
  filters.length = ''
  quickDate.value = 'all'
  currentPage.value = 1
}

async function loadHistory() {
  await fetchHistory()
  currentPage.value = 1
}

async function copyPassword(pwd) {
  try {
    await navigator.clipboard.writeText(pwd)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = pwd
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}

async function removeItem(id) {
  await removeRecord(id)
}

function confirmClear() {
  showConfirm.value = true
}

async function clearAll() {
  await clearHistory()
  showConfirm.value = false
}

onMounted(() => loadHistory())
onActivated(() => loadHistory())

defineExpose({ refresh: loadHistory })
</script>

<style scoped>
.password-history {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

/* 搜索区域 */
.search-area {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 20px;
}

.search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-muted);
}

.search-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.search-title svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
}

.search-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  font-size: 13px;
  color: var(--text-muted);
}

.stat-item strong {
  color: var(--primary);
  font-weight: 700;
}

/* 搜索筛选 */
.search-filters {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 12px;
  color: var(--text-muted);
}

.filter-group input,
.filter-group select {
  padding: 10px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text-primary);
  min-width: 160px;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.filter-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-btn svg {
  width: 16px;
  height: 16px;
}

.filter-btn.reset {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
}

.filter-btn.reset:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
}

.filter-btn.primary {
  background: var(--primary);
  border: none;
  color: white;
}

.filter-btn.primary:hover {
  background: var(--primary-hover);
}

/* 快捷日期 */
.quick-dates {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--border-muted);
}

.quick-label {
  font-size: 12px;
  color: var(--text-muted);
}

.quick-dates button {
  padding: 6px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.quick-dates button:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}

.quick-dates button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* 历史区域 */
.history-area {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-muted);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.header-left svg {
  width: 18px;
  height: 18px;
  color: var(--primary);
}

.header-right {
  display: flex;
  gap: 8px;
}

.header-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.header-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.header-btn.danger:hover:not(:disabled) {
  border-color: var(--danger);
  color: var(--danger);
}

.header-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.header-btn svg {
  width: 18px;
  height: 18px;
}

.header-btn svg.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 历史列表 */
.history-list {
  flex: 1;
  overflow-y: auto;
}

.history-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 80px 100px 80px 90px;
  gap: 16px;
  padding: 12px 20px;
  background: var(--bg-elevated);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-muted);
}

.table-body {
  max-height: 320px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 80px 100px 80px 90px;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-muted);
  align-items: center;
  transition: background 0.15s;
}

.table-row:hover {
  background: var(--bg-elevated);
}

.table-row:last-child {
  border-bottom: none;
}

.col-password code {
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 13px;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.length-tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--primary);
}

.col-date, .col-time {
  font-size: 13px;
  color: var(--text-muted);
}

.col-actions {
  display: flex;
  gap: 6px;
}

.row-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.row-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.row-btn.danger:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.row-btn svg {
  width: 16px;
  height: 16px;
}

/* 分页控件 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--border-muted);
  background: var(--bg-elevated);
}

.page-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn svg {
  width: 16px;
  height: 16px;
}

.page-info {
  font-size: 13px;
  color: var(--text-secondary);
  padding: 0 16px;
}

/* 空状态 */
.history-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: var(--text-muted);
  font-size: 14px;
}

.history-empty svg {
  width: 56px;
  height: 56px;
  opacity: 0.4;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 28px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 81, 73, 0.1);
  border-radius: 50%;
  color: var(--danger);
}

.modal-icon svg {
  width: 28px;
  height: 28px;
}

.modal-box h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.modal-box p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
}

.modal-btn:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
}

.modal-btn.danger {
  background: var(--danger);
  border: none;
  color: white;
}

.modal-btn.danger:hover {
  opacity: 0.9;
}
</style>
