import { ref, watch, onMounted } from 'vue'
import { THEMES } from '@/utils/constants.js'

export function useTheme() {
  const theme = ref(THEMES.light)

  // 检测系统主题
  const detectSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.dark
    }
    return THEMES.light
  }

  // 加载保存的主题
  const loadTheme = () => {
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
  }

  // 保存主题
  const saveTheme = (newTheme) => {
    try {
      localStorage.setItem('cikgen-theme', newTheme)
    } catch {
      // 存储失败时静默处理
    }
  }

  // 应用主题到DOM
  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    document.body.className = `theme-${newTheme}`
  }

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === THEMES.light ? THEMES.dark : THEMES.light
  }

  // 设置特定主题
  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      theme.value = newTheme
    }
  }

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
    saveTheme(newTheme)
  })

  // 监听系统主题变化
  onMounted(() => {
    loadTheme()
    applyTheme(theme.value)

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const saved = localStorage.getItem('cikgen-theme')
        if (!saved) {
          theme.value = e.matches ? THEMES.dark : THEMES.light
        }
      })
    }
  })

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: () => theme.value === THEMES.dark
  }
}
