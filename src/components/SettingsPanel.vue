<template>
  <div class="settings-page">
    <!-- 隐私声明横幅 -->
    <div class="privacy-banner">
      <div class="privacy-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
      <div class="privacy-content">
        <h3>隐私承诺</h3>
        <p>CikGen 不会收集、上传或分享您的任何数据。所有密码和历史记录仅保存在您的本地浏览器中，完全由您掌控。</p>
      </div>
      <div class="privacy-badges">
        <span class="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>无数据收集</span>
        <span class="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>无网络请求</span>
        <span class="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>本地存储</span>
      </div>
    </div>

    <!-- 关于信息 -->
    <div class="about-section">
      <div class="about-card">
        <div class="app-brand">
          <img class="app-logo" src="/icons/logo.png" alt="CikGen" />
          <div class="app-info">
            <h1>CikGen</h1>
            <span class="app-version">v1.0.0</span>
          </div>
        </div>
        <p class="app-desc">安全可靠的随机密码生成器浏览器扩展。使用 Web Crypto API 生成加密安全的随机数，为您的账户提供强大保护。</p>
                <div class="storage-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path>
                  </svg>
                  <span>数据存储位置：浏览器本地 IndexedDB 数据库</span>
                </div>
      </div>

      <div class="features-card">
        <h3>核心特性</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-name">加密安全</span>
              <span class="feature-desc">使用 Web Crypto API</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-name">批量生成</span>
              <span class="feature-desc">一次生成多个密码</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-name">离线使用</span>
              <span class="feature-desc">无需网络连接</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-name">数据导出</span>
              <span class="feature-desc">导出为 JSON 文件</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据管理区域 -->
    <div class="data-section">
      <!-- 统计 -->
      <div class="data-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>数据统计</span>
        </div>
        <div class="stats-row">
          <div class="stat-block">
            <span class="stat-num">{{ historyCount }}</span>
            <span class="stat-text">历史记录</span>
          </div>
          <div class="stat-block">
            <span class="stat-num">{{ todayCount }}</span>
            <span class="stat-text">今日生成</span>
          </div>
          <div class="stat-block">
            <span class="stat-num">{{ weekCount }}</span>
            <span class="stat-text">本周生成</span>
          </div>
        </div>
      </div>

      <!-- 操作 -->
      <div class="data-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
          </svg>
          <span>数据操作</span>
        </div>
        <div class="action-row">
          <div class="action-info">
            <span class="action-title">导出数据</span>
            <span class="action-desc">导出历史记录为 JSON 文件</span>
          </div>
          <button class="action-btn primary" @click="exportData" :disabled="historyCount === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            导出
          </button>
        </div>
        <div class="action-row">
          <div class="action-info">
            <span class="action-title">清空历史记录</span>
            <span class="action-desc">删除所有本地保存的密码记录</span>
          </div>
          <button class="action-btn danger" @click="confirmClear" :disabled="historyCount === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
            清空
          </button>
        </div>
      </div>

      <!-- 帮助 -->
      <div class="data-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>使用帮助</span>
        </div>
        <div class="help-items">
          <div class="help-row">
            <span class="help-key">密码长度</span>
            <span class="help-val">支持 4-128 位，建议至少 12 位</span>
          </div>
          <div class="help-row">
            <span class="help-key">批量生成</span>
            <span class="help-val">一次最多生成 50 个密码</span>
          </div>
          <div class="help-row">
            <span class="help-key">自定义符号</span>
            <span class="help-val">输入自定义符号替换默认符号集</span>
          </div>
          <div class="help-row">
            <span class="help-key">排除字符</span>
            <span class="help-val">排除易混淆字符如 0O1lI</span>
          </div>
        </div>
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
import { ref, onMounted, onActivated } from 'vue'
import { getRecordCount, clearAllRecords, getAllRecords } from '@/utils/indexedDB.js'

const historyCount = ref(0)
const todayCount = ref(0)
const weekCount = ref(0)
const showConfirm = ref(false)

function confirmClear() {
  showConfirm.value = true
}

async function clearAll() {
  await clearAllRecords()
  historyCount.value = 0
  todayCount.value = 0
  weekCount.value = 0
  showConfirm.value = false
}

async function exportData() {
  try {
    const records = await getAllRecords()
    const data = JSON.stringify(records, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cikgen-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Export failed:', e)
  }
}

async function loadStats() {
  try {
    historyCount.value = await getRecordCount()
    const records = await getAllRecords()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)
    todayCount.value = records.filter(r => new Date(r.createdAt) >= today).length
    weekCount.value = records.filter(r => new Date(r.createdAt) >= weekAgo).length
  } catch {
    historyCount.value = 0
    todayCount.value = 0
    weekCount.value = 0
  }
}

onMounted(() => loadStats())
onActivated(() => loadStats())
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 隐私横幅 */
.privacy-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-md);
}

.privacy-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
  border-radius: var(--radius-md);
  color: white;
  flex-shrink: 0;
}

.privacy-icon svg {
  width: 28px;
  height: 28px;
}

.privacy-content {
  flex: 1;
}

.privacy-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--success);
  margin-bottom: 6px;
}

.privacy-content p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.privacy-badges {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.privacy-badges .badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--success);
}

.privacy-badges .badge svg {
  width: 14px;
  height: 14px;
}

/* 关于区域 */
.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.about-card, .features-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 24px;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.app-logo {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  object-fit: contain;
}

.app-info h1 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.app-version {
  font-size: 12px;
  color: var(--text-muted);
  padding: 3px 10px;
  background: var(--bg-elevated);
  border-radius: 20px;
}

.app-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 14px;
}

.storage-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--primary);
}

.storage-info svg {
  width: 18px;
  height: 18px;
  color: var(--primary);
  flex-shrink: 0;
}

.storage-info span {
  font-size: 12px;
  color: var(--text-muted);
}

.features-card h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
}

.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  color: var(--primary);
  flex-shrink: 0;
}

.feature-icon svg {
  width: 20px;
  height: 20px;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.feature-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.feature-desc {
  font-size: 11px;
  color: var(--text-muted);
}

/* 数据区域 */
.data-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.data-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 18px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-muted);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-header svg {
  width: 18px;
  height: 18px;
  color: var(--primary);
}

/* 统计 */
.stats-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
}

.stat-num {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.stat-text {
  font-size: 12px;
  color: var(--text-muted);
}

/* 操作 */
.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}

.action-row:last-child {
  margin-bottom: 0;
}

.action-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.action-desc {
  font-size: 11px;
  color: var(--text-muted);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.action-btn.primary {
  background: var(--primary);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: var(--primary-hover);
}

.action-btn.danger {
  background: var(--danger);
  color: white;
}

.action-btn.danger:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 帮助 */
.help-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.help-row {
  display: flex;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
}

.help-key {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  width: 70px;
  flex-shrink: 0;
}

.help-val {
  font-size: 12px;
  color: var(--text-muted);
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
