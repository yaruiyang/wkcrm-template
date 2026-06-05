<template>
  <div class="wk-menu-detail" data-section="detail-tabs">
    <el-tabs v-model="activeName" tab-position="left" class="wmd-tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
      >
        <template #label>
          <div class="wmd-menu">
            <span>{{ tab.label }}</span>
            <el-tag v-if="tab.num" size="small" effect="dark">{{ tab.num }}</el-tag>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="container-wrapper">
      <div :class="['wmd-content', { 'is-right-collapsed': rightCollapsed }]">
        <div class="wmd-main">
          <slot name="header" />
          <div class="wmd-body">
            <slot name="body" :tab="activeTab" />
          </div>
        </div>

        <div
          :class="['wmd-right', { 'is-collapsed': rightCollapsed }]"
          data-section="detail-summary-column"
          @click.stop="rightCollapsed && (rightCollapsed = false)"
        >
          <div class="wmd-right-content">
            <slot name="right" />
          </div>
        </div>

        <div
          :class="['wmd-controls', { 'is-collapsed': rightCollapsed }]"
          data-section="detail-right-controls"
        >
          <div class="wmd-control-btns">
            <button
              :class="['wmd-control-btn', { 'is-active': rightCollapsed }]"
              type="button"
              title="展开/收起右侧"
              @click="rightCollapsed = !rightCollapsed"
            >
              <el-icon><ArrowLeft v-if="rightCollapsed" /><ArrowRight v-else /></el-icon>
            </button>
            <button class="wmd-control-btn is-active" type="button" title="锁定左右布局">
              <el-icon><Lock /></el-icon>
            </button>
          </div>
          <div class="wmd-drag-btn is-drag" title="调整宽度"><el-icon><MoreFilled /></el-icon></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, ArrowRight, Lock, MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'activity'
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])
const rightCollapsed = ref(false)

const activeName = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const activeTab = computed(() => {
  return props.tabs.find(item => item.name === props.modelValue) || props.tabs[0] || {}
})
</script>
