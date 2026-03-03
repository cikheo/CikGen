<template>
  <div class="options-app" :class="{ 'is-dark': isDark }">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
    </div>

    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <img class="logo-img" src="/icons/logo.png" alt="CikGen" />
          <div class="logo-text-wrapper">
            <span class="logo-text">CikGen</span>
            <span class="logo-subtitle">设置中心</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>

    <main class="app-main">
      <!-- 关于卡片 -->
      <section class="settings-card about-card">
        <div class="card-header">
          <div class="header-icon about">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <h2 class="card-title">关于</h2>
        </div>
        <div class="about-content">
          <img class="app-icon-img" src="/icons/logo.png" alt="CikGen" />
          <div class="app-info">
            <h3 class="app-name">CikGen 密码生成器</h3>
            <span class="app-version">版本 1.0.0</span>
            <p class="app-desc">安全、可定制的随机密码生成器，为您的账户安全保驾护航。</p>
            <div class="app-features">
              <span class="feature-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                安全加密
              </span>
              <span class="feature-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                本地存储
              </span>
              <span class="feature-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                隐私保护
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 外观设置 -->
      <section class="settings-card">
        <div class="card-header">
          <div class="header-icon appearance">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <h2 class="card-title">外观</h2>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">主题模式</span>
            <span class="setting-desc">选择您喜欢的界面主题</span>
          </div>
          <div class="theme-switcher">
            <button 
              class="theme-option" 
              :class="{ active: !isDark }"
              @click="setTheme('light')"
            >
              <span class="option-icon light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </span>
              <span class="option-label">浅色</span>
            </button>
            <button 
              class="theme-option" 
              :class="{ active: isDark }"
              @click="setTheme('dark')"
            >
              <span class="option-icon dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </span>
              <span class="option-label">深色</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 数据管理 -->
      <section class="settings-card">
        <div class="card-header">
          <div class="header-icon data">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <h2 class="card-title">数据管理</h2>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">历史记录</span>
            <span class="setting-desc">
              <span class="data-count">{{ historyCount }}</span> 条密码记录已保存
            </span>
          </div>
          <button 
            class="danger-btn" 
            @click="confirmClear"
            :disabled="historyCount === 0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            清空历史
          </button>
        </div>
      </section>

      <!-- 使用帮助 -->
      <section class="settings-card help-card">
        <div class="card-header">
          <div class="header-icon help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 class="card-title">使用帮助</h2>
        </div>
        <div class="help-sections">
          <div class="help-section">
            <h4 class="help-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              复杂度级别
            </h4>
            <div class="help-list">
              <div class="help-item">
                <span class="item-icon">🌱</span>
                <div class="item-content">
                  <span class="item-name">易于记忆</span>
                  <span class="item-desc">8位，小写字母+数字，适合日常使用</span>
                </div>
              </div>
              <div class="help-item">
                <span class="item-icon">👁️</span>
                <div class="item-content">
                  <span class="item-name">易于阅读</span>
                  <span class="item-desc">10位，消歧义字符，可读性强</span>
                </div>
              </div>
              <div class="help-item">
                <span class="item-icon">😊</span>
                <div class="item-content">
                  <span class="item-name">愉快</span>
                  <span class="item-desc">12位，平衡安全性和可读性</span>
                </div>
              </div>
              <div class="help-item">
                <span class="item-icon">💪</span>
                <div class="item-content">
                  <span class="item-name">强</span>
                  <span class="item-desc">16位，包含符号，较高安全性</span>
                </div>
              </div>
              <div class="help-item">
                <span class="item-icon">🔐</span>
                <div class="item-content">
                  <span class="item-name">偏执</span>
                  <span class="item-desc">24位，严格模式，极高安全性</span>
                </div>
              </div>
            </div>
          </div>
          <div class="help-section">
            <h4 class="help-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              高级选项
            </h4>
            <div class="help-list">
              <div class="help-item">
                <span class="item-badge">严格</span>
                <div class="item-content">
                  <span class="item-name">严格模式</span>
                  <span class="item-desc">确保密码包含所有选定的字符类型</span>
                </div>
              </div>
              <div class="help-item">
                <span class="item-badge">消歧</span>
                <div class="item-content">
                  <span class="item-name">消歧义模式</span>
                  <span class="item-desc">排除容易混淆的字符 (i, l, 1, O, 0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 确认对话框 -->
    <transition name="modal">
      <div class="modal-overlay" v-if="showConfirm" @click.self="showConfirm = false">
        <div class="modal-content">
          <div class="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h4 class="modal-title">确认清空</h4>
          <p class="modal-desc">确定要清空所有历史记录吗？此操作不可恢复。</p>
          <div class="modal-actions">
            <button class="btn-secondary" @click="showConfirm = false">取消</button>
            <button class="btn-danger" @click="clearAll">确认清空</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.js'
import { getRecordCount, clearAllRecords } from '@/utils/indexedDB.js'
import ThemeToggle from '@/components/ThemeToggle.vue'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const historyCount = ref(0)
const showConfirm = ref(false)

function setTheme(theme) {
  themeStore.setTheme(theme)
}

function confirmClear() {
  showConfirm.value = true
}

async function clearAll() {
  await clearAllRecords()
  historyCount.value = 0
  showConfirm.value = false
}

async function loadHistoryCount() {
  try {
    historyCount.value = await getRecordCount()
  } catch {
    historyCount.value = 0
  }
}

onMounted(() => {
  themeStore.init()
  loadHistoryCount()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --primary-light: rgba(99, 102, 241, 0.12);
  --primary-glow: rgba(99, 102, 241, 0.4);
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  
  --bg-color: #f0f4ff;
  --bg-gradient: linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 50%, #f0fdf4 100%);
  --surface-color: rgba(255, 255, 255, 0.8);
  --surface-solid: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.9);
  --text-color: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border-color: rgba(148, 163, 184, 0.2);
  --hover-color: rgba(99, 102, 241, 0.08);
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
}

[data-theme="dark"] {
  --bg-color: #0c0f1a;
  --bg-gradient: linear-gradient(135deg, #0c0f1a 0%, #1a0f1e 50%, #0f1a14 100%);
  --surface-color: rgba(30, 41, 59, 0.8);
  --surface-solid: #1e293b;
  --card-bg: rgba(30, 41, 59, 0.9);
  --text-color: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-color: rgba(71, 85, 105, 0.4);
  --hover-color: rgba(99, 102, 241, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-gradient);
  color: var(--text-color);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.options-app {
  position: relative;
  min-height: 100vh;
  background: var(--bg-gradient);
  overflow-x: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-color);
  top: -100px;
  right: -100px;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary-color);
  bottom: -50px;
  left: -50px;
}

.is-dark .bg-orb {
  opacity: 0.2;
}

/* Header */
.app-header {
  position: sticky;
  top: 0;
  background: var(--surface-color);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  object-fit: contain;
}

.logo-text-wrapper {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-subtitle {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: -2px;
}

/* Main */
.app-main {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
  z-index: 1;
}

/* Cards */
.settings-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 24px;
  margin-bottom: 24px;
  transition: all var(--transition-normal);
}

.settings-card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
}

.header-icon svg {
  width: 22px;
  height: 22px;
}

.header-icon.about {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  color: white;
}

.header-icon.appearance {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
}

.header-icon.data {
  background: linear-gradient(135deg, var(--success-color) 0%, #059669 100%);
  color: white;
}

.header-icon.help {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
}

/* About Card */
.about-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.app-icon-img {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  object-fit: contain;
  flex-shrink: 0;
}

.app-info {
  flex: 1;
}

.app-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.app-version {
  display: inline-block;
  padding: 4px 12px;
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.app-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.app-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--surface-solid);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.feature-tag svg {
  width: 14px;
  height: 14px;
  color: var(--success-color);
}

/* Setting Row */
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
}

.setting-desc {
  font-size: 13px;
  color: var(--text-secondary);
}

.data-count {
  font-weight: 700;
  color: var(--primary-color);
}

/* Theme Switcher */
.theme-switcher {
  display: flex;
  gap: 10px;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-solid);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.theme-option:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.theme-option.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
  box-shadow: var(--shadow-md);
}

.option-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-icon svg {
  width: 24px;
  height: 24px;
}

.option-icon.light svg {
  color: #f59e0b;
}

.option-icon.dark svg {
  color: #8b5cf6;
}

.option-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

/* Danger Button */
.danger-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.danger-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.danger-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.danger-btn svg {
  width: 18px;
  height: 18px;
}

/* Help Card */
.help-sections {
  display: grid;
  gap: 24px;
}

.help-section {
  background: var(--surface-solid);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.help-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.help-title svg {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
}

.help-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.help-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--hover-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.help-item:hover {
  transform: translateX(4px);
}

.item-icon {
  font-size: 20px;
  line-height: 1;
}

.item-badge {
  padding: 4px 10px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  color: white;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.item-desc {
  font-size: 12px;
  color: var(--text-muted);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.modal-content {
  background: var(--surface-solid);
  border-radius: var(--radius-xl);
  padding: 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.modal-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
}

.modal-icon svg {
  width: 36px;
  height: 36px;
  color: var(--danger-color);
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 12px;
}

.modal-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 28px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-secondary,
.btn-danger {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-secondary {
  background: var(--hover-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

.btn-danger {
  background: linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%);
  color: white;
}

.btn-danger:hover {
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  transform: translateY(-2px);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 600px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .app-features {
    justify-content: center;
  }
  
  .setting-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .theme-switcher {
    width: 100%;
  }
  
  .theme-option {
    flex: 1;
  }
}
</style>
