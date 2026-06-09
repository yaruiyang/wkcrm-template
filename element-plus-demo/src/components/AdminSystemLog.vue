<template>
  <section class="main admin-log-page" data-section="admin-log">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">
        系统日志
        <i class="wk wk-help wk-help-tips" aria-hidden="true" />
      </div>
      <div class="admin-xr-ft">
        <el-button text bg>日志说明</el-button>
      </div>
    </header>

    <div class="main-body admin-main-body">
      <div class="main-table-header admin-log-filter" data-section="admin-log-filter">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-input v-model="operator" class="admin-log-filter__input" placeholder="操作人" clearable />
        <el-select v-model="application" placeholder="所属应用">
          <el-option
            v-for="item in logFilters.applications"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select v-model="moduleName" placeholder="操作对象">
          <el-option
            v-for="item in logFilters.modules"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select v-model="behavior" placeholder="操作行为">
          <el-option
            v-for="item in logFilters.behaviors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
        <el-button text bg class="main-table-header-button">导出</el-button>
      </div>

      <el-table
        class="admin-source-table"
        :data="filteredRows"
        :height="logTableHeight"
        row-key="id"
        highlight-current-row
        @row-click="openDetail"
      >
        <el-table-column
          v-for="field in systemLogFields"
          :key="field.prop"
          :prop="field.prop"
          :label="field.label"
          :min-width="field.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="field.prop === 'operationObj'" class="admin-link">{{ row.operationObj }}</span>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer admin-pagination">
        <el-pagination
          v-model:current-page="logPage"
          v-model:page-size="logPageSize"
          background
          layout="prev, pager, next, sizes, total, jumper"
          :total="342"
          :page-sizes="[15, 30, 60]"
        />
      </div>
    </div>

    <el-dialog
      v-model="detailDialogVisible"
      title="日志详情"
      width="700px"
      :style="{ '--admin-log-detail-dialog-width': `${wkcrmUiDimensions.adminLogDetailDialogWidth}px` }"
      :close-on-click-modal="false"
      data-section="admin-log-detail-dialog"
    >
      <div v-if="activeLog" class="admin-log-detail">
        <div class="log-detail-row">
          <span>操作人</span>
          <strong>{{ activeLog.userName }}</strong>
        </div>
        <div class="log-detail-row">
          <span>操作时间</span>
          <strong>{{ activeLog.createTime }}</strong>
        </div>
        <div class="log-detail-row">
          <span>所属应用</span>
          <strong>{{ activeLog.applyName }}</strong>
        </div>
        <div class="log-detail-row">
          <span>操作对象</span>
          <strong>{{ activeLog.operationObj }}</strong>
        </div>
        <div class="log-detail-content">{{ activeLog.operationInfo }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialogVisible = false">确定</el-button>
          <el-button text bg @click="detailDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { logFilters, systemLogFields, systemLogRows } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const dateRange = ref([])
const operator = ref('')
const application = ref('')
const moduleName = ref('')
const behavior = ref('')
const activeLog = ref(null)
const detailDialogVisible = ref(false)
const logTableHeight = ref(320)
const logPage = ref(1)
const logPageSize = ref(15)

const filteredRows = computed(() => {
  return systemLogRows.filter(row => {
    if (operator.value && !row.userName.includes(operator.value)) return false
    if (application.value && row.applyName !== application.value) return false
    if (moduleName.value && row.moduleName !== moduleName.value) return false
    if (behavior.value && row.behaviorName !== behavior.value) return false
    return true
  })
})

function updateLogTableHeight() {
  // 源码日志页用视口高度扣除头部、查询条件和分页固定空间。
  logTableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminLogTableOffset)
}

function openDetail(row) {
  activeLog.value = row
  detailDialogVisible.value = true
}

onMounted(() => {
  updateLogTableHeight()
  window.addEventListener('resize', updateLogTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLogTableHeight)
})
</script>
