<template>
  <section
    class="admin-page admin-pool-rule-page main"
    data-section="admin-pool-rule"
    data-template="pool-rule-list"
  >
    <header class="admin-xr-header xr-header">
      <div class="admin-xr-label">
        {{ config.title }}
        <span v-if="poolType === 'customer'" class="wk-help-tips" aria-hidden="true" />
      </div>
      <div class="admin-xr-ft">
        <el-button type="primary" @click="openCreateView()">{{ config.createText }}</el-button>
      </div>
    </header>

    <div class="admin-list-body main-body">
      <el-table
        class="admin-source-table main-table"
        :data="config.rows"
        :height="tableHeight"
        :row-key="config.idField"
        :cell-class-name="cellClassName"
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column
          v-for="field in config.fields"
          :key="field.prop"
          :prop="field.prop"
          :label="field.label"
          :width="field.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="field.prop === 'status'" class="status-cell">
              <span :class="['status-mark', row.status === 1 ? 'is-success' : 'is-muted']" />
              {{ statusLabel(row.status) }}
            </span>
            <button
              v-else-if="field.prop === 'poolName'"
              type="button"
              class="admin-link pool-link"
              @click.stop="openDetail(row)"
            >
              {{ row.poolName }}
            </button>
            <span v-else>{{ formatField(row, field.prop) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="poolActionColumnWidth" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click.stop="togglePoolStatus(row)">{{ row.status === 0 ? '启用' : '停用' }}</el-button>
            <el-button type="primary" link @click.stop="openTransferDialog(row)">转移</el-button>
            <el-button type="primary" link @click.stop="openCreateView(row)">编辑</el-button>
            <el-button type="primary" link @click.stop="deletePool(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="p-contianer admin-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="prev, pager, next, sizes, total, jumper"
          :total="config.rows.length"
          :page-sizes="[15, 30, 45, 60]"
        />
      </div>
    </div>

    <AdminPoolCreateView
      v-model="createViewVisible"
      data-section="admin-pool-create-view"
      :pool-type="poolType"
      :config="config"
      :row="activeRule"
      @save="savePoolRule"
    />

    <AdminPoolDetail
      v-model="detailVisible"
      data-section="admin-pool-detail-slide"
      :pool-type="poolType"
      :row="detailRow"
    />

    <el-dialog
      v-model="transferDialogVisible"
      title="转移"
      :width="`${wkcrmUiDimensions.adminPoolTransferDialogWidth}px`"
      append-to-body
      data-section="admin-pool-transfer-dialog"
    >
      <el-form label-width="80px" class="admin-pool-transfer-form">
        <el-form-item label="转移至：">
          <el-select v-model="transferPoolId" style="width: 100%;">
            <el-option
              v-for="pool in transferOptions"
              :key="pool[config.idField]"
              :label="pool.poolName"
              :value="pool[config.idField]"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="transferDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTransferDialog">确定转移</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AdminPoolCreateView from './AdminPoolCreateView.vue'
import AdminPoolDetail from './AdminPoolDetail.vue'
import { poolRuleTemplates } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const props = defineProps({
  poolType: {
    type: String,
    default: 'leads'
  }
})

const poolState = ref(JSON.parse(JSON.stringify(poolRuleTemplates)))
const currentPage = ref(1)
const pageSize = ref(15)
const tableHeight = ref(320)
const activeRule = ref(null)
const detailRow = ref(null)
const createViewVisible = ref(false)
const detailVisible = ref(false)
const transferDialogVisible = ref(false)
const transferPoolId = ref('')
const config = computed(() => poolState.value[props.poolType] || poolState.value.leads)
// 源码线索池和客户公海列表操作列固定 200px。
const poolActionColumnWidth = wkcrmUiDimensions.adminPoolActionColumnWidth
let localPoolIndex = 1

const transferOptions = computed(() => {
  const idField = config.value.idField
  return config.value.rows.filter(row => row[idField] !== activeRule.value?.[idField])
})

function userNames(users = []) {
  return users.map(item => item.realname).join('、')
}

function memberNames(row) {
  const depts = (row.memberDept || []).map(item => item.name)
  const users = (row.memberUser || []).map(item => item.realname)
  return [...depts, ...users].join('、')
}

function statusLabel(status) {
  return status === 0 ? '停用' : '启用'
}

function formatField(row, prop) {
  if (prop === 'adminUser') return userNames(row.adminUser)
  if (prop === 'memberUser') return memberNames(row)
  return row[prop]
}

function cellClassName({ column }) {
  return column.property === 'poolName' ? 'can-visit--underline' : ''
}

function handleRowClick(row, column) {
  if (column?.property === 'poolName') openDetail(row)
}

function openDetail(row) {
  detailRow.value = row
  detailVisible.value = true
}

function openCreateView(row = null) {
  activeRule.value = row
  createViewVisible.value = true
}

function openTransferDialog(row) {
  activeRule.value = row
  transferPoolId.value = transferOptions.value[0]?.[config.value.idField] || ''
  transferDialogVisible.value = true
}

function savePoolRule(formRow) {
  const idField = config.value.idField
  const countField = props.poolType === 'leads' ? 'leadsNum' : 'customerNum'
  const nextRow = {
    ...(activeRule.value || {}),
    ...formRow,
    [idField]: activeRule.value?.[idField] || `${props.poolType}-pool-local-${localPoolIndex++}`,
    [countField]: activeRule.value?.[countField] ?? 0,
    status: activeRule.value?.status ?? 1
  }

  if (activeRule.value) Object.assign(activeRule.value, nextRow)
  else config.value.rows.unshift(nextRow)

  detailRow.value = activeRule.value || nextRow
  createViewVisible.value = false
}

function saveTransferDialog() {
  if (activeRule.value) {
    // 源码会调用转移接口；模板只记录本地 UI 选择，不迁移真实线索或客户。
    activeRule.value.lastTransferTarget = transferPoolId.value
  }
  transferDialogVisible.value = false
}

function togglePoolStatus(row) {
  // 源码状态语义：0 表示停用，1 表示启用。
  row.status = row.status === 0 ? 1 : 0
}

function deletePool(row) {
  config.value.rows = config.value.rows.filter(item => item[config.value.idField] !== row[config.value.idField])
  if (detailRow.value?.[config.value.idField] === row[config.value.idField]) {
    detailVisible.value = false
    detailRow.value = null
  }
}

function updateTableHeight() {
  tableHeight.value = Math.max(300, window.innerHeight - wkcrmUiDimensions.adminApprovalTableOffset)
}

watch(config, () => {
  activeRule.value = null
  detailVisible.value = false
  createViewVisible.value = false
  transferDialogVisible.value = false
}, { immediate: true })

onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})
</script>
