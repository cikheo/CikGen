import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generatePassword, calculateStrength } from '@/utils/passwordGenerator.js'
import { savePassword } from '@/utils/indexedDB.js'
import { COMPLEXITY_LEVELS, PASSWORD_LENGTH } from '@/utils/constants.js'

export const usePasswordStore = defineStore('password', () => {
  // 状态
  const password = ref('')
  const strength = ref(null)
  const isGenerating = ref(false)
  const error = ref(null)
  const copied = ref(false)

  // 配置
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

  // 计算属性
  const hasPassword = computed(() => password.value.length > 0)
  const complexityPreset = computed(() => COMPLEXITY_LEVELS[config.value.complexity])

  // 应用复杂度预设
  function applyComplexityPreset(complexityKey) {
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
  async function generate(saveToHistory = true) {
    isGenerating.value = true
    error.value = null
    copied.value = false

    try {
      const options = {
        includeLowercase: config.value.includeLowercase,
        includeUppercase: config.value.includeUppercase,
        includeNumbers: config.value.includeNumbers,
        includeSymbols: config.value.includeSymbols,
        strictMode: config.value.strictMode,
        disambiguate: config.value.disambiguate
      }

      const length = Math.max(
        PASSWORD_LENGTH.min,
        Math.min(PASSWORD_LENGTH.max, config.value.length)
      )

      password.value = generatePassword(length, options)
      strength.value = calculateStrength(password.value)

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

  // 复制密码
  async function copy() {
    if (!password.value) return false

    try {
      await navigator.clipboard.writeText(password.value)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
      return true
    } catch {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = password.value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
        return true
      } catch {
        return false
      }
    }
  }

  // 更新配置
  function updateConfig(key, value) {
    config.value[key] = value
  }

  // 设置长度
  function setLength(length) {
    config.value.length = Math.max(
      PASSWORD_LENGTH.min,
      Math.min(PASSWORD_LENGTH.max, length)
    )
  }

  return {
    password,
    strength,
    isGenerating,
    error,
    copied,
    config,
    hasPassword,
    complexityPreset,
    applyComplexityPreset,
    generate,
    copy,
    updateConfig,
    setLength
  }
})
