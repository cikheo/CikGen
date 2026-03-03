<template>
  <div class="complexity-selector">
    <label class="label">复杂度级别</label>
    <div class="levels">
      <button
        v-for="level in levels"
        :key="level.key"
        class="level-btn"
        :class="{ active: modelValue === level.key }"
        @click="selectLevel(level.key)"
        :title="level.description"
      >
        <span class="level-name">{{ level.name }}</span>
        <span class="level-length">{{ level.defaultLength }}位</span>
      </button>
    </div>
    <p class="description" v-if="currentLevel">
      {{ currentLevel.description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { COMPLEXITY_LEVELS } from '@/utils/constants.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'pleasant'
  }
})

const emit = defineEmits(['update:modelValue'])

const levels = computed(() => Object.values(COMPLEXITY_LEVELS))

const currentLevel = computed(() => COMPLEXITY_LEVELS[props.modelValue])

function selectLevel(key) {
  emit('update:modelValue', key)
}
</script>

<style scoped>
.complexity-selector {
  margin-bottom: 16px;
}

.label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.levels {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.level-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--surface-color);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;
}

.level-btn:hover {
  border-color: var(--primary-color);
  background: var(--hover-color);
}

.level-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.level-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.level-length {
  font-size: 10px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.description {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 8px;
  padding: 8px;
  background: var(--surface-color);
  border-radius: 6px;
}
</style>
