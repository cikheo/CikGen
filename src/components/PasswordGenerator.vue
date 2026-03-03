<template>
  <div class="password-generator">
    <!-- 操作栏 -->
    <div class="action-bar">
      <div class="stats-group">
        <div class="stat-item">
          <span class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </span>
          <div class="stat-content">
            <span class="stat-value" :style="{ color: latestStrength?.color || 'var(--text-muted)' }">{{ latestStrength?.label || '--' }}</span>
            <span class="stat-label">强度</span>
          </div>
        </div>
        <div class="stat-item">
          <span class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
          </span>
          <div class="stat-content">
            <span class="stat-value">{{ totalCharCount }}</span>
            <span class="stat-label">可用字符</span>
          </div>
        </div>
        <div class="stat-item">
          <span class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </span>
          <div class="stat-content">
            <span class="stat-value">{{ activeCharTypes }}</span>
            <span class="stat-label">字符类型</span>
          </div>
        </div>
      </div>
      <button class="generate-btn" @click="generate" :disabled="isGenerating">
        <svg v-if="!isGenerating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path>
        </svg>
        <svg v-else class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
        </svg>
        <span>生成密码</span>
      </button>
    </div>

    <!-- 配置区域 -->
    <div class="config-grid">
      <!-- 密码长度 -->
      <div class="config-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
          </svg>
          <span>密码长度</span>
        </div>
        <div class="length-controls">
          <div class="num-input">
            <button @click="config.length = Math.max(4, config.length - 1)">−</button>
            <input type="number" v-model.number="config.length" min="4" max="128" />
            <button @click="config.length = Math.min(128, config.length + 1)">+</button>
          </div>
          <div class="preset-btns">
            <button v-for="n in [8, 12, 16, 24, 32, 48]" :key="n" :class="{ active: config.length === n }" @click="config.length = n">{{ n }}</button>
          </div>
        </div>
      </div>

      <!-- 生成数量 -->
      <div class="config-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>生成数量</span>
        </div>
        <div class="count-controls">
          <div class="num-input">
            <button @click="config.count = Math.max(1, config.count - 1)">−</button>
            <input type="number" v-model.number="config.count" min="1" max="50" />
            <button @click="config.count = Math.min(50, config.count + 1)">+</button>
          </div>
          <div class="preset-btns">
            <button v-for="n in [1, 3, 5, 10, 20]" :key="n" :class="{ active: config.count === n }" @click="config.count = n">{{ n }}</button>
          </div>
        </div>
      </div>

      <!-- 字符类型 -->
      <div class="config-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          <span>字符类型</span>
        </div>
        <div class="type-btns">
          <button :class="{ active: config.includeLowercase }" @click="config.includeLowercase = !config.includeLowercase">
            <span class="btn-icon">az</span><span class="btn-text">小写</span>
          </button>
          <button :class="{ active: config.includeUppercase }" @click="config.includeUppercase = !config.includeUppercase">
            <span class="btn-icon">AZ</span><span class="btn-text">大写</span>
          </button>
          <button :class="{ active: config.includeNumbers }" @click="config.includeNumbers = !config.includeNumbers">
            <span class="btn-icon">09</span><span class="btn-text">数字</span>
          </button>
          <button :class="{ active: config.includeSymbols }" @click="config.includeSymbols = !config.includeSymbols">
            <span class="btn-icon">!@</span><span class="btn-text">符号</span>
          </button>
        </div>
      </div>

      <!-- 高级选项 -->
      <div class="config-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
          </svg>
          <span>高级选项</span>
        </div>
        <div class="adv-inputs">
          <div class="input-row">
            <label>自定义符号</label>
            <div class="input-wrap">
              <input type="text" v-model="config.customSymbols" placeholder="留空使用默认" />
              <button class="clear-btn" v-if="config.customSymbols" @click="config.customSymbols = ''" title="清空">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          <div class="input-row">
            <label>排除字符</label>
            <div class="input-wrap">
              <input type="text" v-model="config.excludeChars" placeholder="如 0O1lI" />
              <button class="clear-btn" v-if="config.excludeChars" @click="config.excludeChars = ''" title="清空">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div class="error-bar" v-if="error">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- 结果区域 -->
    <div class="result-section">
      <div class="result-header">
        <div class="result-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <span>生成结果</span>
          <span class="result-badge" v-if="passwords.length">{{ passwords.length }}</span>
        </div>
        <div class="result-btns" v-if="passwords.length">
          <button @click="copyAll" title="复制全部">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
            复制全部
          </button>
          <button @click="passwords = []" class="danger" title="清空">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
            清空
          </button>
        </div>
      </div>

      <div class="result-list" v-if="passwords.length">
        <div 
          class="result-row" 
          v-for="(pwd, idx) in passwords" 
          :key="idx"
          @click="copyPassword(pwd, idx)"
          :class="{ copied: copiedIndex === idx }"
        >
          <span class="row-num">{{ idx + 1 }}</span>
          <code class="row-pwd">{{ pwd }}</code>
          <span class="row-action">
            <svg v-if="copiedIndex === idx" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span v-else>复制</span>
          </span>
        </div>
      </div>

      <div class="result-empty" v-else>
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
        </div>
        <h3>点击「生成密码」创建安全密码</h3>
        <p>使用 Web Crypto API 生成加密安全的随机密码</p>
        
        <div class="privacy-card">
          <div class="privacy-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>隐私安全承诺</span>
          </div>
          <div class="privacy-items">
            <div class="privacy-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>不收集任何数据</span>
            </div>
            <div class="privacy-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>不发送网络请求</span>
            </div>
            <div class="privacy-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>数据仅保存本地</span>
            </div>
            <div class="privacy-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>完全离线运行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { generatePassword, calculateStrength } from '@/utils/passwordGenerator.js'
import { savePassword } from '@/utils/indexedDB.js'

const passwords = ref([])
const latestStrength = ref(null)
const isGenerating = ref(false)
const error = ref(null)
const copiedIndex = ref(-1)

const config = reactive({
  length: 16,
  count: 5,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  customSymbols: '',
  excludeChars: ''
})

const DEFAULT_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

const activeCharTypes = computed(() => {
  return [config.includeLowercase, config.includeUppercase, config.includeNumbers, config.includeSymbols].filter(Boolean).length
})

const totalCharCount = computed(() => {
  let count = 0
  const excludeSet = new Set(config.excludeChars.split(''))
  if (config.includeLowercase) count += 'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => !excludeSet.has(c)).length
  if (config.includeUppercase) count += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !excludeSet.has(c)).length
  if (config.includeNumbers) count += '0123456789'.split('').filter(c => !excludeSet.has(c)).length
  if (config.includeSymbols) count += (config.customSymbols || DEFAULT_SYMBOLS).split('').filter(c => !excludeSet.has(c)).length
  return count
})

async function generate() {
  isGenerating.value = true
  error.value = null
  try {
    const options = {
      includeLowercase: config.includeLowercase,
      includeUppercase: config.includeUppercase,
      includeNumbers: config.includeNumbers,
      includeSymbols: config.includeSymbols,
      customSymbols: config.customSymbols || undefined,
      excludeChars: config.excludeChars || undefined
    }
    const newPasswords = []
    for (let i = 0; i < config.count; i++) {
      const pwd = generatePassword(config.length, options)
      newPasswords.push(pwd)
      await savePassword({ password: pwd, length: config.length, ...options })
    }
    passwords.value = newPasswords
    latestStrength.value = calculateStrength(newPasswords[0])
  } catch (e) {
    error.value = e.message || '生成密码失败'
    setTimeout(() => { error.value = null }, 3000)
  } finally {
    isGenerating.value = false
  }
}

async function copyPassword(pwd, idx) {
  try {
    await navigator.clipboard.writeText(pwd)
    copiedIndex.value = idx
    setTimeout(() => { copiedIndex.value = -1 }, 1500)
  } catch {
    fallbackCopy(pwd)
    copiedIndex.value = idx
    setTimeout(() => { copiedIndex.value = -1 }, 1500)
  }
}

async function copyAll() {
  try {
    await navigator.clipboard.writeText(passwords.value.join('\n'))
  } catch {
    fallbackCopy(passwords.value.join('\n'))
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.cssText = 'position:fixed;opacity:0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

// 初始不自动生成密码，等待用户点击
</script>

<style scoped>
.password-generator {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 操作栏 */
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
  padding: 16px 20px;
}

.stats-group {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  color: var(--primary);
}

.stat-icon svg {
  width: 20px;
  height: 20px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
}

.generate-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%);
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.generate-btn svg {
  width: 20px;
  height: 20px;
}

.generate-btn svg.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 配置网格 */
.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.config-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.card-header svg {
  width: 16px;
  height: 16px;
  color: var(--primary);
}

/* 数字输入 */
.length-controls, .count-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.num-input {
  display: flex;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.num-input button {
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s;
}

.num-input button:hover {
  background: var(--border-muted);
  color: var(--text-primary);
}

.num-input input {
  width: 50px;
  height: 34px;
  background: transparent;
  border: none;
  border-left: 1px solid var(--border-muted);
  border-right: 1px solid var(--border-muted);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  -moz-appearance: textfield;
}

.num-input input::-webkit-outer-spin-button,
.num-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.preset-btns {
  display: flex;
  gap: 4px;
  flex: 1;
}

.preset-btns button {
  flex: 1;
  padding: 7px 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.preset-btns button:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}

.preset-btns button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* 字符类型按钮 */
.type-btns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.type-btns button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s;
}

.type-btns button:hover {
  border-color: var(--primary);
}

.type-btns button.active {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--primary);
}

.btn-icon {
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-muted);
}

.type-btns button.active .btn-icon {
  color: var(--primary);
}

.btn-text {
  font-size: 11px;
  color: var(--text-muted);
}

/* 高级选项 */
.adv-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-row label {
  font-size: 12px;
  color: var(--text-muted);
  width: 70px;
  flex-shrink: 0;
}

.input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-wrap input {
  flex: 1;
  padding: 8px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text-primary);
}

.input-wrap input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-wrap input::placeholder {
  color: var(--text-muted);
}

.clear-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--danger);
  color: var(--danger);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

/* 错误提示 */
.error-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.3);
  border-radius: var(--radius-md);
  color: var(--danger);
  font-size: 13px;
}

.error-bar svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* 结果区域 */
.result-section {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-muted);
}

.result-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.result-title svg {
  width: 18px;
  height: 18px;
  color: var(--primary);
}

.result-badge {
  padding: 3px 10px;
  background: var(--primary);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: white;
}

.result-btns {
  display: flex;
  gap: 8px;
}

.result-btns button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.result-btns button:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.result-btns button.danger:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.result-btns button svg {
  width: 14px;
  height: 14px;
}

/* 结果列表 */
.result-list {
  flex: 1;
  overflow-y: auto;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.result-row:last-child {
  border-bottom: none;
}

.result-row:hover {
  background: var(--bg-elevated);
}

.result-row.copied {
  background: rgba(59, 130, 246, 0.08);
}

.row-num {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  flex-shrink: 0;
}

.row-pwd {
  flex: 1;
  font-family: 'SF Mono', 'Consolas', monospace;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 1.5px;
  word-break: break-all;
}

.row-action {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.result-row.copied .row-action {
  color: var(--success);
}

.row-action svg {
  width: 18px;
  height: 18px;
}

/* 空状态 */
.result-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 20px;
}

.empty-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  margin-bottom: 8px;
}

.empty-icon svg {
  width: 36px;
  height: 36px;
  color: var(--primary);
}

.result-empty h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.result-empty p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.privacy-card {
  margin-top: 20px;
  padding: 20px 28px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--radius-md);
  max-width: 500px;
}

.privacy-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.privacy-header svg {
  width: 20px;
  height: 20px;
  color: var(--success);
}

.privacy-header span {
  font-size: 14px;
  font-weight: 600;
  color: var(--success);
}

.privacy-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.privacy-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
}

.privacy-item svg {
  width: 16px;
  height: 16px;
  color: var(--success);
  flex-shrink: 0;
}

.privacy-item span {
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
