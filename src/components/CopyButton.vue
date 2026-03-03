<template>
  <button 
    class="copy-btn" 
    :class="{ copied: isCopied }"
    @click="handleCopy"
    :disabled="!text || disabled"
    :title="isCopied ? '已复制!' : '复制到剪贴板'"
  >
    <svg v-if="!isCopied" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span class="text">{{ isCopied ? '已复制' : '复制' }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['copied'])

const isCopied = ref(false)

async function handleCopy() {
  if (!props.text || props.disabled) return

  try {
    await navigator.clipboard.writeText(props.text)
    isCopied.value = true
    emit('copied', true)
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch {
    // 降级方案
    try {
      const textarea = document.createElement('textarea')
      textarea.value = props.text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      isCopied.value = true
      emit('copied', true)
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch {
      emit('copied', false)
    }
  }
}
</script>

<style scoped>
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-btn.copied {
  background: var(--success-color);
}

.icon {
  width: 16px;
  height: 16px;
}

.text {
  font-weight: 500;
}
</style>
