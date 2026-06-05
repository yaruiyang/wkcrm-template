<template>
  <div
    ref="rootRef"
    class="wk-table-header"
    :class="{ 'has-selection': selectionList.length > 0 }"
    data-section="crm-toolbar"
  >
    <div class="wk-filter-header">
      <div class="filter-wrap">
        <el-input
          :model-value="search"
          class="search-input"
          :placeholder="searchPlaceholder"
          clearable
          @update:model-value="$emit('update:search', $event)"
        >
          <template #append>
            <el-button class="search-btn"><el-icon><Search /></el-icon></el-button>
          </template>
        </el-input>

        <div class="tabs">
          <span class="tabs-label">显示:</span>
          <el-button
            v-for="item in visibleScenes"
            :key="item.value"
            :class="{ 'el-button--selected': item.value === activeTab }"
            text
            bg
            @click="$emit('update:activeTab', item.value)"
          >
            {{ item.label }}
          </el-button>
          <el-dropdown v-if="overflowScenes.length" trigger="click" @command="$emit('update:activeTab', $event)">
            <el-button
              :class="{ 'el-button--selected': overflowScenes.some(item => item.value === activeTab) }"
              text
              bg
              class="dropdown-btn"
            >
              <span>{{ overflowActiveLabel }}</span>
              <el-icon class="dropdown-arrow"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in overflowScenes"
                  :key="item.value"
                  :command="item.value"
                >
                  {{ item.label }}
                </el-dropdown-item>
                <el-dropdown-item divided command="sceneSet">
                  场景设置
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="filter-right">
          <el-button text bg>展开筛选<el-icon class="button-suffix"><ArrowDown /></el-icon></el-button>
          <el-button text bg class="filter-button"><el-icon><Filter /></el-icon><span>高级筛选</span></el-button>
          <el-button text bg class="bi-button" title="BI 统计">
            <el-icon><PieChart /></el-icon>
          </el-button>
          <div class="wk-toggle-button" aria-label="视图切换">
            <button
              v-for="item in viewTypes"
              :key="item.value"
              :title="item.label"
              :class="['wk-toggle-item', { 'is-active': item.value === viewType }]"
              type="button"
              @click="$emit('update:viewType', item.value)"
            >
              <el-icon><component :is="viewIconMap[item.value]" /></el-icon>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="selectionList.length > 0"
        class="selection-bar"
        data-section="crm-selection-bar"
      >
        <el-checkbox
          :model-value="isAllSelected"
          :indeterminate="isIndeterminate"
          class="selection-check"
          style="margin: 0 20px;"
          @change="$emit('toggle-all-selection', $event)"
        />
        <div class="selected-title">
          已选中 <span class="selected-count">{{ selectionList.length }}</span> 项
          <el-button
            :icon="Close"
            class="clear"
            text
            bg
            aria-label="清空已选"
            @click="$emit('clear-all')"
          />
        </div>
        <el-scrollbar>
          <div class="selection-items-box">
            <el-button
              v-for="item in operations"
              :key="item.type"
              :icon="item.icon"
              :class="['selection-item', `is-${item.type}`]"
              text
              @click="$emit('operations-click', item.type)"
            >
              {{ item.name }}
            </el-button>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowDown, Close, Filter, Grid, Menu, Operation, PieChart, Search } from '@element-plus/icons-vue'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  activeTab: {
    type: String,
    default: 'all'
  },
  sceneList: {
    type: Array,
    default: () => []
  },
  viewTypes: {
    type: Array,
    default: () => []
  },
  viewType: {
    type: String,
    default: '1'
  },
  selectionList: {
    type: Array,
    default: () => []
  },
  selectableCount: {
    type: Number,
    default: 0
  },
  operations: {
    type: Array,
    default: () => []
  },
  searchPlaceholder: {
    type: String,
    default: '客户名称/手机/电话'
  }
})

defineEmits([
  'update:search',
  'update:activeTab',
  'update:viewType',
  'operations-click',
  'toggle-all-selection',
  'clear-all'
])

const rootRef = ref(null)
const visibleScenes = computed(() => props.sceneList.slice(0, sourceDimensions.maxVisibleSceneCount))
const overflowScenes = computed(() => props.sceneList.slice(sourceDimensions.maxVisibleSceneCount))
const overflowActiveLabel = computed(() => {
  return overflowScenes.value.find(item => item.value === props.activeTab)?.label || ''
})
const isAllSelected = computed(() => {
  return props.selectableCount > 0 && props.selectionList.length === props.selectableCount
})
const isIndeterminate = computed(() => {
  return props.selectionList.length > 0 && props.selectionList.length < props.selectableCount
})

const viewIconMap = {
  1: Menu,
  2: Operation,
  3: Grid
}

defineExpose({
  rootEl: rootRef
})
</script>
