<template>
  <section class="system-customer main admin-biz-param-page" data-section="admin-biz-param">
    <header class="admin-xr-header xr-header">
      <div class="admin-xr-label">{{ businessParamTemplate.title }}</div>
    </header>

    <div class="main-content-wrap">
      <aside class="main-nav admin-main-nav" data-section="admin-biz-param-nav">
        <div class="main-nav__content">
          <div class="nav-sections-wrap admin-biz-param-menu">
            <button
              v-for="item in businessParamTemplate.nav"
              :key="item.key"
              :class="['admin-biz-param-menu-item', { 'is-select': activeKey === item.key }]"
              type="button"
              :title="item.label"
              @click="activeKey = item.key"
            >
              <strong>{{ item.label }}</strong>
            </button>
          </div>
        </div>
      </aside>

      <div class="main-content admin-main-content admin-biz-param-panel" data-section="admin-biz-param-panel">
        <div class="content-header">
          <span>{{ activePanel.title }}</span>
          <el-button type="primary" @click="handlePanelPrimaryAction">{{ activePanel.actionText }}</el-button>
        </div>

        <div class="content-body">
          <div v-if="activePanel.type === 'stage-flow'" class="stage-content">
            <div class="stage-filter">
              <el-select
                v-for="filter in activePanel.filters"
                :key="filter.field"
                v-model="filterState[activeKey][filter.field]"
                class="el-select"
                clearable
                :placeholder="`请选择${filter.label}`"
              >
                <el-option v-for="option in filter.options" :key="option" :label="option" :value="option" />
              </el-select>
            </div>
            <div class="customer-table">
              <el-table
                class="admin-source-table admin-setting-table"
                :data="filteredRows"
                :height="bizParamTableHeight"
                data-stage-edit-mode="split"
              >
                <el-table-column prop="flowName" label="阶段流程名称" min-width="150" show-overflow-tooltip />
                <el-table-column prop="label" label="关联对象" min-width="80" show-overflow-tooltip />
                <el-table-column prop="stageUserDep" label="适用范围" min-width="120" show-overflow-tooltip />
                <el-table-column prop="updateTime" label="最后修改时间" min-width="150" show-overflow-tooltip />
                <el-table-column prop="status" label="状态" min-width="80" show-overflow-tooltip>
                  <template #default="{ row }">
                    <span class="status-cell">
                      <span :class="['status-mark', row.status === '启用' ? 'is-success' : 'is-muted']" />
                      {{ row.status }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="阶段" min-width="220" show-overflow-tooltip>
                  <template #default="{ row }">
                    <span class="stage-tags">
                      <el-tag v-for="stage in row.stages" :key="stage" effect="plain">{{ stage }}</el-tag>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                  <template #default="{ row }">
                    <el-button type="primary" link @click="openParamDialog('edit', row)">编辑基本信息</el-button>
                    <el-button type="primary" link @click="openParamDialog('edit-stage', row)">编辑阶段信息</el-button>
                    <el-button type="primary" link @click="toggleStatus(row)">{{ row.status === '启用' ? '停用' : '启用' }}</el-button>
                    <el-button type="primary" link @click="openParamDialog('copy', row)">复制并新建</el-button>
                    <el-button type="danger" link @click="deleteParamRow(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="p-contianer admin-pagination">
                <el-pagination
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :total="filteredRows.length"
                  :page-sizes="[10, 20, 30, 40]"
                />
              </div>
            </div>
          </div>

          <div v-else-if="activePanel.type === 'verification-rule'" class="rule-content">
            <div class="rule-filter">
              <el-select
                v-for="filter in activePanel.filters"
                :key="filter.field"
                v-model="filterState[activeKey][filter.field]"
                clearable
                :placeholder="`请选择${filter.label}`"
              >
                <el-option v-for="option in filter.options" :key="option" :label="option" :value="option" />
              </el-select>
            </div>
            <div class="customer-table">
              <el-table
                class="admin-source-table admin-setting-table"
                :data="filteredRows"
                :height="bizParamTableHeight"
              >
                <el-table-column prop="name" label="规则名称" min-width="150" show-overflow-tooltip />
                <el-table-column prop="originalFormula" label="校验条件" min-width="170" show-overflow-tooltip />
                <el-table-column prop="formulaText" label="提示内容" min-width="220" show-overflow-tooltip />
                <el-table-column prop="targetModuleId" label="模块" min-width="90" show-overflow-tooltip />
                <el-table-column prop="updateUserName" label="创建人" min-width="100" show-overflow-tooltip />
                <el-table-column prop="createTime" label="创建时间" min-width="150" show-overflow-tooltip />
                <el-table-column label="操作" width="120" fixed="right">
                  <template #default="{ row }">
                    <el-button type="primary" link @click="openParamDialog('edit', row)">编辑</el-button>
                    <el-button type="danger" link @click="deleteParamRow(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div v-else-if="activePanel.type === 'category-tree'" class="rule-content category-content">
            <div class="customer-table">
              <el-table
                class="admin-source-table admin-setting-table"
                :data="activePanel.rows"
                :height="bizParamTableHeight"
                row-key="id"
                default-expand-all
                :tree-props="{ children: 'children' }"
                data-category-tree="source-tree"
              >
                <el-table-column prop="name" label="产品类别" min-width="180" show-overflow-tooltip />
                <el-table-column prop="parentName" label="上级类别" min-width="120" show-overflow-tooltip />
                <el-table-column prop="productCount" label="产品数量" min-width="100" show-overflow-tooltip />
                <el-table-column prop="status" label="状态" min-width="90" show-overflow-tooltip />
                <el-table-column label="操作" width="220" fixed="right">
                  <template #default="{ row }">
                    <el-button type="primary" link @click="openParamDialog('child', row)">新增下级</el-button>
                    <el-button type="primary" link @click="openParamDialog('edit', row)">编辑</el-button>
                    <el-button type="primary" link @click="toggleStatus(row)">{{ row.status === '启用' ? '停用' : '启用' }}</el-button>
                    <el-button type="danger" link @click="deleteParamRow(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div v-else-if="activePanel.type === 'customer-limit'" class="rule-content limit-content">
            <div class="limit-switches">
              <label>
                <el-switch v-model="activePanel.switchValue" />
                <span>{{ activePanel.switchLabel }}</span>
              </label>
            </div>
            <div class="customer-table">
              <el-table
                class="admin-source-table admin-setting-table"
                :data="activePanel.rows"
                :height="bizParamLimitTableHeight"
              >
                <el-table-column prop="scope" label="适用对象" min-width="140" show-overflow-tooltip />
                <el-table-column prop="userIds" label="适用员工/部门" min-width="180" show-overflow-tooltip />
                <el-table-column
                  v-if="activePanel.limitKind === 'own'"
                  prop="ownCustomerNum"
                  label="拥有客户上限"
                  min-width="130"
                  show-overflow-tooltip
                />
                <el-table-column
                  v-if="activePanel.limitKind === 'lock'"
                  prop="lockCustomerNum"
                  label="锁定客户上限"
                  min-width="130"
                  show-overflow-tooltip
                />
                <el-table-column prop="status" label="状态" min-width="90" show-overflow-tooltip />
                <el-table-column label="操作" width="160" fixed="right">
                  <template #default="{ row }">
                    <el-button type="primary" link @click="openParamDialog('edit', row)">编辑</el-button>
                    <el-button type="primary" link @click="toggleStatus(row)">{{ row.status === '启用' ? '停用' : '启用' }}</el-button>
                    <el-button type="danger" link @click="deleteParamRow(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div v-else-if="activePanel.type === 'reason-list'" class="reason-content">
            <div class="reason-list">
              <div class="switch-wrap reason-required-switch">
                <el-switch v-model="activePanel.requiredSwitch" />
                <span>{{ activePanel.switchLabel }}</span>
              </div>
              <section class="reason-group">
                <h3>{{ activePanel.reasonTitle }}</h3>
                <div
                  v-for="(row, index) in activePanel.reasons"
                  :key="`${activePanel.reasonTitle}-${index}`"
                  class="reason-item"
                >
                  <el-input v-model="activePanel.reasons[index]" />
                  <span class="handle-btn">
                    <i class="wk wk-icon-drag drag-handle move-btn" aria-hidden="true" />
                    <i class="wk wk-delete del-btn" aria-hidden="true" @click="deleteReason(index)" />
                  </span>
                </div>
                <div class="reason-item">
                  <el-button text bg class="el-icon-plus" @click="addReason">添加原因</el-button>
                </div>
              </section>
            </div>
          </div>

          <div v-else-if="activePanel.type === 'duplicate-check'" class="duplicate-check-content">
            <div class="switch-wrap duplicate-check-switch">
              <el-switch v-model="activePanel.enabled" />
              <span>启用查重</span>
            </div>
            <section class="duplicate-check-section">
              <h3>查重字段</h3>
              <label v-for="field in activePanel.fields" :key="field.field" class="duplicate-field-row">
                <el-checkbox v-model="field.checked" />
                <span>{{ field.label }}</span>
              </label>
            </section>
            <section class="duplicate-check-section">
              <h3>查重范围</h3>
              <label v-for="range in activePanel.ranges" :key="range.label" class="duplicate-field-row">
                <el-checkbox v-model="range.checked" />
                <span>{{ range.label }}</span>
              </label>
            </section>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="paramDialogVisible"
      :title="paramDialogTitle"
      width="500px"
      append-to-body
      data-section="admin-biz-param-dialog"
    >
      <el-form label-position="top" class="admin-one-col-form">
        <el-form-item
          v-for="field in paramDialogFields"
          :key="field.field"
          :label="field.label"
          :required="field.required"
        >
          <el-select v-if="field.formType === 'select'" v-model="paramForm[field.field]" style="width: 100%;">
            <el-option v-for="option in field.options" :key="option" :label="option" :value="option" />
          </el-select>
          <el-input
            v-else-if="field.formType === 'textarea'"
            v-model="paramForm[field.field]"
            type="textarea"
            :rows="4"
          />
          <el-input v-else v-model="paramForm[field.field]" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="paramDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveParamDialog">保存</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { businessParamTemplate } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const activeKey = ref(businessParamTemplate.nav[0]?.key || 'stage')
const panels = ref(JSON.parse(JSON.stringify(businessParamTemplate.panels)))
const bizParamTableHeight = ref(320)
const bizParamLimitTableHeight = ref(320)
const paramDialogVisible = ref(false)
const paramDialogMode = ref('create')
const paramDialogRow = ref(null)
const paramForm = ref({})
const parentCategoryRow = ref(null)
const filterState = ref({
  stage: { status: '', label: '' },
  verification: { module: '' }
})
let paramIndex = 1

const activePanel = computed(() => {
  return panels.value[activeKey.value] || panels.value.stage
})

const filteredRows = computed(() => {
  const rows = activePanel.value.rows || []
  const filters = filterState.value[activeKey.value] || {}
  return rows.filter(row => {
    if (activePanel.value.type === 'stage-flow') {
      return (!filters.status || row.status === filters.status) &&
        (!filters.label || row.label === filters.label)
    }
    if (activePanel.value.type === 'verification-rule') {
      return !filters.module || row.targetModuleId === filters.module
    }
    return true
  })
})

const paramDialogTitle = computed(() => {
  if (paramDialogMode.value === 'copy') return `复制${activePanel.value.title}`
  if (paramDialogMode.value === 'child') return '新增下级类别'
  return paramDialogMode.value === 'edit' || paramDialogMode.value === 'edit-stage'
    ? `编辑${activePanel.value.title}`
    : activePanel.value.actionText
})

const paramDialogFields = computed(() => {
  if (activePanel.value.type === 'stage-flow') {
    const baseFields = [
      { field: 'flowName', label: '阶段流程名称', formType: 'text', required: true },
      { field: 'label', label: '关联对象', formType: 'select', options: ['客户', '商机', '合同'], required: true },
      { field: 'stageUserDep', label: '适用范围', formType: 'text' },
      { field: 'status', label: '状态', formType: 'select', options: ['启用', '停用'] }
    ]
    const stageFields = [
      { field: 'stagesText', label: '阶段', formType: 'textarea' }
    ]
    // 源码阶段流程把基本信息和阶段信息分开维护，避免一个弹层混杂两个配置意图。
    return paramDialogMode.value === 'edit-stage' ? stageFields : [...baseFields, ...stageFields]
  }
  if (activePanel.value.type === 'verification-rule') {
    return [
      { field: 'name', label: '规则名称', formType: 'text', required: true },
      { field: 'originalFormula', label: '校验条件', formType: 'text' },
      { field: 'formulaText', label: '提示内容', formType: 'textarea' },
      { field: 'targetModuleId', label: '模块', formType: 'select', options: ['客户', '联系人', '商机', '合同'] }
    ]
  }
  if (activePanel.value.type === 'category-tree') {
    return [
      { field: 'name', label: '产品类别', formType: 'text', required: true },
      { field: 'parentName', label: '上级类别', formType: 'text' },
      { field: 'productCount', label: '产品数量', formType: 'text' },
      { field: 'status', label: '状态', formType: 'select', options: ['启用', '停用'] }
    ]
  }
  return [
    { field: 'scope', label: '适用对象', formType: 'text', required: true },
    { field: 'userIds', label: '适用员工/部门', formType: 'text' },
    {
      field: activePanel.value.limitKind === 'lock' ? 'lockCustomerNum' : 'ownCustomerNum',
      label: activePanel.value.limitKind === 'lock' ? '锁定客户上限' : '拥有客户上限',
      formType: 'text'
    },
    { field: 'status', label: '状态', formType: 'select', options: ['启用', '停用'] }
  ]
})

function formatNow() {
  const now = new Date()
  const pad = value => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function handlePanelPrimaryAction() {
  if (activePanel.value.type === 'reason-list' || activePanel.value.type === 'duplicate-check') {
    // 字典和查重配置的保存只标记本地更新时间，不调用后台。
    activePanel.value.savedAt = formatNow()
    return
  }
  openParamDialog('create')
}

function openParamDialog(mode, row = null) {
  paramDialogMode.value = mode
  paramDialogRow.value = row
  parentCategoryRow.value = mode === 'child' ? row : null
  const base = row ? { ...row } : {}
  if (mode === 'child' && row) {
    base.name = ''
    base.parentName = row.name
    base.productCount = 0
    base.status = '启用'
    delete base.children
  }
  if (mode === 'copy' && row) {
    base.flowName = `${row.flowName}副本`
  }
  if (activePanel.value.type === 'stage-flow') {
    base.stagesText = (row?.stages || ['初始接触', '需求确认', '成交客户']).join('、')
    base.status = base.status || '启用'
  }
  if (activePanel.value.type === 'category-tree' || activePanel.value.type === 'customer-limit') {
    base.status = base.status || '启用'
  }
  paramForm.value = base
  paramDialogVisible.value = true
}

function saveParamDialog() {
  const nextRow = buildRowFromForm()
  const target = paramDialogMode.value === 'edit' || paramDialogMode.value === 'edit-stage'
    ? paramDialogRow.value
    : null
  if (target) {
    Object.assign(target, nextRow)
  } else if (paramDialogMode.value === 'child' && parentCategoryRow.value) {
    // 产品类别新增下级必须挂到当前父级 children，保持源码树形列表层级。
    parentCategoryRow.value.children = parentCategoryRow.value.children || []
    parentCategoryRow.value.children.unshift(nextRow)
  } else {
    activePanel.value.rows.unshift(nextRow)
  }
  paramDialogVisible.value = false
  parentCategoryRow.value = null
}

function buildRowFromForm() {
  const form = { ...paramForm.value }
  if (activePanel.value.type === 'stage-flow') {
    const existingStages = Array.isArray(paramDialogRow.value?.stages) ? paramDialogRow.value.stages : []
    return {
      id: form.id || `stage-local-${paramIndex++}`,
      flowName: paramDialogMode.value === 'edit-stage' ? paramDialogRow.value.flowName : (form.flowName || '新建阶段流程'),
      label: paramDialogMode.value === 'edit-stage' ? paramDialogRow.value.label : (form.label || '客户'),
      stageUserDep: paramDialogMode.value === 'edit-stage' ? paramDialogRow.value.stageUserDep : (form.stageUserDep || '全公司'),
      updateTime: formatNow(),
      status: paramDialogMode.value === 'edit-stage' ? paramDialogRow.value.status : (form.status || '启用'),
      stages: String(form.stagesText || existingStages.join('、')).split(/[、,\n]/).map(item => item.trim()).filter(Boolean)
    }
  }
  if (activePanel.value.type === 'verification-rule') {
    return {
      id: form.id || `rule-local-${paramIndex++}`,
      name: form.name || '新建规则',
      originalFormula: form.originalFormula || '客户名称 为空',
      formulaText: form.formulaText || '保存客户时校验数据完整性',
      targetModuleId: form.targetModuleId || '客户',
      updateUserName: 'admin',
      createTime: form.createTime || formatNow()
    }
  }
  if (activePanel.value.type === 'category-tree') {
    return {
      id: form.id || `cat-local-${paramIndex++}`,
      name: form.name || '新建类别',
      parentName: form.parentName || '-',
      productCount: Number(form.productCount || 0),
      status: form.status || '启用',
      children: Array.isArray(form.children) ? form.children : []
    }
  }
  const limitField = activePanel.value.limitKind === 'lock' ? 'lockCustomerNum' : 'ownCustomerNum'
  return {
    id: form.id || `limit-local-${paramIndex++}`,
    scope: form.scope || '销售人员',
    userIds: form.userIds || '销售中心',
    [limitField]: Number(form[limitField] || 0),
    status: form.status || '启用'
  }
}

function toggleStatus(row) {
  row.status = row.status === '启用' ? '停用' : '启用'
  if (Object.prototype.hasOwnProperty.call(row, 'updateTime')) row.updateTime = formatNow()
}

function deleteParamRow(row) {
  activePanel.value.rows = removeRowById(activePanel.value.rows, row.id)
}

function removeRowById(rows, rowId) {
  return rows
    .filter(item => item.id !== rowId)
    .map(item => ({
      ...item,
      children: Array.isArray(item.children) ? removeRowById(item.children, rowId) : item.children
    }))
}

function addReason() {
  activePanel.value.reasons.push('新原因')
}

function deleteReason(index) {
  activePanel.value.reasons.splice(index, 1)
}

function updateBizParamTableHeights() {
  // 源码业务参数中阶段/校验表和客户限制表使用不同视口扣减。
  bizParamTableHeight.value = Math.max(300, window.innerHeight - wkcrmUiDimensions.adminBizParamTableOffset)
  bizParamLimitTableHeight.value = Math.max(300, window.innerHeight - wkcrmUiDimensions.adminBizParamLimitTableOffset)
}

onMounted(() => {
  updateBizParamTableHeights()
  window.addEventListener('resize', updateBizParamTableHeights)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBizParamTableHeights)
})
</script>
