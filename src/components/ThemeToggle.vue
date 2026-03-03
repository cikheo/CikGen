<template>
  <button 
    class="theme-toggle" 
    @click="toggle"
    :class="{ 'is-dark': isDark }"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <span class="toggle-track">
      <span class="toggle-thumb">
        <svg class="icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <svg class="icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </span>
    </span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/themeStore.js'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

function toggle() {
  themeStore.toggle()
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--surface-color);
  cursor: pointer;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.theme-toggle:hover {
  background: var(--hover-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.toggle-track {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.toggle-thumb {
  position: relative;
  width: 24px;
  height: 24px;
}

.icon {
  position: absolute;
  inset: 0;
  width: 24px;
  height: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon.sun {
  color: #f59e0b;
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.icon.moon {
  color: #8b5cf6;
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.is-dark .icon.sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.is-dark .icon.moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
