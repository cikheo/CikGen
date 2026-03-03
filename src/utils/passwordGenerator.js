import { CHAR_SETS } from './constants.js'

const DEFAULT_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

/**
 * 获取可用字符集
 * @param {Object} options - 配置选项
 * @returns {string} 可用字符集
 */
function getCharacterSet(options) {
  const {
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    customSymbols,
    excludeChars
  } = options

  let charset = ''

  if (includeLowercase) {
    charset += CHAR_SETS.lowercase
  }

  if (includeUppercase) {
    charset += CHAR_SETS.uppercase
  }

  if (includeNumbers) {
    charset += CHAR_SETS.numbers
  }

  if (includeSymbols) {
    charset += customSymbols || DEFAULT_SYMBOLS
  }

  // 排除指定字符
  if (excludeChars) {
    const excludeSet = new Set(excludeChars.split(''))
    charset = charset.split('').filter(c => !excludeSet.has(c)).join('')
  }

  return charset
}

/**
 * 生成随机密码
 * @param {number} length - 密码长度
 * @param {Object} options - 配置选项
 * @returns {string} 生成的密码
 */
export function generatePassword(length, options) {
  const charset = getCharacterSet(options)
  
  if (charset.length === 0) {
    throw new Error('请至少选择一种字符类型，且排除字符不能覆盖所有可用字符')
  }

  let password = ''
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length]
  }

  return password
}

/**
 * 计算密码强度
 * @param {string} password - 密码
 * @returns {Object} 强度信息
 */
export function calculateStrength(password) {
  let score = 0
  const checks = {
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password)
  }

  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (checks.lowercase) score += 1
  if (checks.uppercase) score += 1
  if (checks.numbers) score += 1
  if (checks.symbols) score += 2

  let level = 'weak'
  let label = '弱'
  let color = '#ef4444'

  if (score >= 7) {
    level = 'very-strong'
    label = '非常强'
    color = '#10b981'
  } else if (score >= 5) {
    level = 'strong'
    label = '强'
    color = '#22c55e'
  } else if (score >= 3) {
    level = 'medium'
    label = '中等'
    color = '#f59e0b'
  }

  return { score, level, label, color, checks }
}
