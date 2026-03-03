<template>
  <div class="page-wrapper">
    <div class="popup-app">
      <header class="app-header">
        <!-- 左侧Logo -->
        <div class="logo">
          <img class="logo-icon" src="/icons/logo.png" alt="CikGen" />
          <span class="logo-text">CikGen</span>
          <span class="logo-badge">安全密码生成器</span>
        </div>

        <!-- 右侧导航按钮 -->
        <nav class="nav-tabs">
          <button 
            class="nav-tab" 
            :class="{ active: currentView === 'home' }"
            @click="switchView('home')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            主页
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: currentView === 'history' }"
            @click="switchView('history')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            历史记录
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: currentView === 'settings' }"
            @click="switchView('settings')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
            </svg>
            设置
          </button>
        </nav>
      </header>

      <main class="app-main">
        <keep-alive>
          <component :is="currentComponent" @generated="onPasswordGenerated" ref="componentRef" />
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import PasswordGenerator from '@/components/PasswordGenerator.vue'
import PasswordHistory from '@/components/PasswordHistory.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'

const currentView = ref('home')
const componentRef = ref(null)

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'home': return PasswordGenerator
    case 'history': return PasswordHistory
    case 'settings': return SettingsPanel
    default: return PasswordGenerator
  }
})

function switchView(view) {
  currentView.value = view
}

function onPasswordGenerated() {
  // 切换到历史记录时刷新
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --primary-light: rgba(59, 130, 246, 0.15);
  
  /* 柔和的深色背景 */
  --bg-base: #1e2433;
  --bg-card: #2a3142;
  --bg-elevated: #343d52;
  
  --border-default: #454f66;
  --border-muted: #3a4358;
  
  /* 调亮的字体颜色 */
  --text-primary: #f8fafc;
  --text-secondary: #a8b4c4;
  --text-muted: #7a8599;
  
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

body {
  width: 100%;
  min-height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-base);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

/* 滚动条在浏览器边缘 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-base);
}

::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: 5px;
  border: 2px solid var(--bg-base);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
}

.popup-app {
  display: flex;
  flex-direction: column;
  width: 1200px;
  min-height: calc(100vh - 48px);
  background: var(--bg-base);
}

/* Header */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-muted);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.logo-badge {
  padding: 4px 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  font-size: 11px;
  color: var(--text-muted);
}

/* 导航标签 */
.nav-tabs {
  display: flex;
  gap: 8px;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-tab svg {
  width: 16px;
  height: 16px;
}

.nav-tab:hover {
  color: var(--text-primary);
  border-color: var(--text-muted);
}

.nav-tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* Main Content */
.app-main {
  flex: 1;
  padding: 24px 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
