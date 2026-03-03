import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { THEMES } from '@/utils/constants.js'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(THEMES.light)

  const isDark = computed(() => theme.value === THEMES.dark)

  // 检测系统主题
  function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.dark
    }
    return THEMES.light
  }

  // 初始化主题
  function init() {
    try {
      const saved = localStorage.getItem('cikgen-theme')
      if (saved && Object.values(THEMES).includes(saved)) {
        theme.value = saved
      } else {
        theme.value = detectSystemTheme()
      }
    } catch {
      theme.value = detectSystemTheme()
    }
    applyTheme()
  }

  // 应用主题
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
    document.body.className = `theme-${theme.value}`
  }

  // 保存主题
  function saveTheme() {
    try {
      localStorage.setItem('cikgen-theme', theme.value)
    } catch {
      // 静默处理
    }
  }

  // 切换主题
  function toggle() {
    theme.value = theme.value === THEMES.light ? THEMES.dark : THEMES.light
    applyTheme()
    saveTheme()
  }

  // 设置主题
  function setTheme(newTheme) {
    if (Object.values(THEMES).includes(newTheme)) {
      theme.value = newTheme
      applyTheme()
      saveTheme()
    }
  }

  return {
    theme,
    isDark,
    init,
    toggle,
    setTheme
  }
})
