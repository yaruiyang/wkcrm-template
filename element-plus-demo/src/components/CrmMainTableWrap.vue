<template>
  <div
    class="main-table-wrap"
    :class="viewTypeClassName"
    data-section="crm-main-table-wrap"
  >
    <div class="main-table-body">
      <div class="main-table" :style="mainTableStyle">
        <CrmStageView
          v-if="viewType === '2'"
          :stage-flow="stageFlow"
          :main-field="mainField"
          @open-detail="$emit('open-detail', $event)"
        />

        <CrmCardView
          v-else-if="viewType === '3'"
          :rows="cardRows"
          :main-field="mainField"
          @open-detail="$emit('open-detail', $event)"
        />

        <el-table
          v-else
          ref="tableRef"
          class="crm-source-table is-filter-table is-right-border-style is-bottom-border-style"
          data-section="table-view"
          :data="rows"
          :height="tableHeight"
          :row-height="wkcrmUiDimensions.tableRowHeight"
          :show-header="showHeader"
          row-key="__rowUid"
          border
          highlight-current-row
          @selection-change="$emit('selection-change', $event)"
          @row-click="$emit('open-detail', $event)"
        >
          <el-table-column type="selection" fixed width="40" align="center" />
          <el-table-column fixed width="40" align="center" header-align="center">
            <template #header>
              <el-icon class="focus-icon is-disabled"><Star /></el-icon>
            </template>
            <template #default="{ row }">
              <el-icon
                :class="['focus-icon', 'is-clickable', { active: row.star }]"
                @click.stop="$emit('favorite-toggle', row)"
              >
                <StarFilled v-if="row.star" />
                <Star v-else />
              </el-icon>
            </template>
          </el-table-column>

          <el-table-column
            v-for="field in fields"
            :key="field.prop"
            :prop="field.prop"
            :label="field.label"
            :width="field.width"
            :fixed="field.fixed ? 'left' : false"
            :sortable="field.sortable ? 'custom' : false"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span
                v-if="field.prop === mainField"
                class="customer-name-cell"
                @click.stop="$emit('open-detail', row)"
              >
                <span class="can-visit--underline text-one-line flex-label">{{ row[mainField] }}</span>
                <i
                  v-if="row.businessCount"
                  class="wk wk-business"
                  title="存在关联商机"
                />
              </span>
              <span v-else-if="field.prop === 'dealStatus'">
                <span :class="row.dealStatus ? 'deal-suc' : 'deal-un'" />
                <span class="deal-text">{{ row.dealStatus ? '已成交' : '未成交' }}</span>
              </span>
              <span v-else>{{ row[field.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="80" />
        </el-table>

        <div v-if="viewType !== '2'" class="p-contianer" data-section="crm-pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            class="p-bar"
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[15, 30, 60, 100]"
            :pager-count="5"
            :total="rows.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Star, StarFilled } from '@element-plus/icons-vue'
import CrmCardView from './CrmCardView.vue'
import CrmStageView from './CrmStageView.vue'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  fields: {
    type: Array,
    default: () => []
  },
  selectedRows: {
    type: Array,
    default: () => []
  },
  tableHeight: {
    type: Number,
    default: 320
  },
  viewType: {
    type: String,
    default: '1'
  },
  stageFlow: {
    type: Object,
    required: true
  },
  cardRows: {
    type: Array,
    default: () => []
  },
  mainField: {
    type: String,
    default: 'customerName'
  }
})

defineEmits(['selection-change', 'open-detail', 'favorite-toggle'])

const tableRef = ref(null)
const currentPage = ref(1)
const pageSize = ref(15)
const showHeader = computed(() => props.selectedRows.length === 0)
const mainTableStyle = computed(() => {
  if (props.viewType === '2' || props.viewType === '3') {
    return { height: `${props.tableHeight + wkcrmUiDimensions.stageViewExtraHeight}px` }
  }
  return {}
})
const viewTypeClassName = computed(() => ({
  '1': 'is-table',
  '2': 'is-stage',
  '3': 'is-card'
}[props.viewType] || 'is-table'))

function clearSelection() {
  tableRef.value?.clearSelection()
}

function toggleAllSelection() {
  tableRef.value?.toggleAllSelection()
}

function doLayout() {
  tableRef.value?.doLayout()
}

defineExpose({
  clearSelection,
  toggleAllSelection,
  doLayout
})
</script>
