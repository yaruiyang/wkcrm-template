<template>
  <div v-if="modelValue" class="slide-view-root" data-section="detail-overlay">
    <transition name="slide-fade" appear>
      <el-card
        class="slide-detail-card-container"
        data-section="detail-slide"
        :body-style="{ padding: 0, height: '100%' }"
      >
        <el-button class="close-btn" type="primary" @click="$emit('update:modelValue', false)">
          <el-icon><Close /></el-icon>
        </el-button>
        <slot />
      </el-card>
    </transition>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
