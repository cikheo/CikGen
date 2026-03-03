import { ref } from 'vue'
import { generatePassword as generate, calculateStrength } from '@/utils/passwordGenerator.js'
import { savePassword } from '@/utils/indexedDB.js'
import { COMPLEXITY_LEVELS, PASSWORD_LENGTH } from '@/utils/constants.js'

export function usePasswordGenerator() {
  const password = ref('')
  const strength = ref(null)
  const isGenerating = ref(false)
  const error = ref(null)

  // 默认配置
  const config = ref({
    length: 12,
    complexity: 'pleasant',
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: false,
    strictMode: false,
    disambiguate: false
  })

  // 应用复杂度预设
  const applyComplexityPreset = (complexityKey) => {
    const preset = COMPLEXITY_LEVELS[complexityKey]
    if (preset) {
      config.value = {
        ...config.value,
        complexity: complexityKey,
        length: preset.defaultLength,
        ...preset.options
      }
    }
  }

  // 生成密码
  const generateNewPassword = async (saveToHistory = true) => {
    isGenerating.value = true
    error.value = null

    try {
      const options = {
        includeLowercase: config.value.includeLowercase,
        includeUppercase: config.value.includeUppercase,
        includeNumbers: config.value.includeNumbers,
        includeSymbols: config.value.includeSymbols,
        strictMode: config.value.strictMode,
        disambiguate: config.value.disambiguate
      }

      // 确保长度在有效范围内
      const length = Math.max(
        PASSWORD_LENGTH.min,
        Math.min(PASSWORD_LENGTH.max, config.value.length)
      )

      password.value = generate(length, options)
      strength.value = calculateStrength(password.value)

      // 保存到历史记录
      if (saveToHistory) {
        await savePassword({
          password: password.value,
          length: length,
          complexity: config.value.complexity,
          ...options
        })
      }
    } catch (e) {
      error.value = e.message || '生成密码失败'
      password.value = ''
      strength.value = null
    } finally {
      isGenerating.value = false
    }
  }

  // 复制密码到剪贴板
  const copyPassword = async () => {
    if (!password.value) return false

    try {
      await navigator.clipboard.writeText(password.value)
      return true
    } catch {
      // 降级方案
      try {
        const textarea = document.createElement('textarea')
        textarea.value = password.value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        return true
      } catch {
        return false
      }
    }
  }

  // 更新配置
  const updateConfig = (key, value) => {
    config.value[key] = value
  }

  // 设置密码长度
  const setLength = (length) => {
    config.value.length = Math.max(
      PASSWORD_LENGTH.min,
      Math.min(PASSWORD_LENGTH.max, length)
    )
  }

  return {
    password,
    strength,
    config,
    isGenerating,
    error,
    generateNewPassword,
    copyPassword,
    updateConfig,
    setLength,
    applyComplexityPreset
  }
}
