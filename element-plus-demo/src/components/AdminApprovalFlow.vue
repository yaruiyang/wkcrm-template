<template>
  <section v-if="!createVisible" class="main admin-approval-page" data-section="admin-approval">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">业务审批流</div>
      <div class="admin-xr-ft">
        <el-button type="primary" @click="openFlowCreate()">新建审批流程</el-button>
      </div>
    </header>
    <div class="main-body admin-main-body">
      <el-table
        class="admin-source-table"
        :data="flowRows"
        :height="approvalTableHeight"
        row-key="metadataId"
        highlight-current-row
      >
        <el-table-column width="100" label="审批流图标">
          <template #default>
            <div class="table-icon"><i class="wk wk-icon-stage" /></div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="field in approvalFields"
          :key="field.prop"
          :prop="field.prop"
          :min-width="field.width"
          :label="field.label"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag v-if="field.prop === 'status'" :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '启用' : '停用' }}
            </el-tag>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="{ row }">
            <el-button type="primary" link @click="openFlowCreate(row, 'edit')">编辑</el-button>
            <el-button type="primary" link @click="toggleFlowStatus(row)">{{ row.status === 1 ? '停用' : '启用' }}</el-button>
            <el-button type="primary" link @click="openFlowCreate(row, 'copy')">复制并新建</el-button>
            <el-button type="danger" link @click="deleteFlow(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer admin-pagination">
        <el-pagination
          v-model:current-page="approvalPage"
          v-model:page-size="approvalPageSize"
          background
          layout="prev, pager, next, sizes, total, jumper"
          :total="flowRows.length"
          :page-sizes="[20, 40, 80]"
        />
      </div>
    </div>
  </section>

  <section v-else class="business-approve-flow-create admin-flow-create" data-section="admin-flow-create">
    <header
      class="wk-backgroud-tabs"
      :style="{ height: `${wkcrmUiDimensions.adminFlowTabsHeight}px` }"
    >
      <div class="wk-tabs__left">
        <span class="admin-flow-create-title">{{ flowCreateTitle }}</span>
      </div>
      <div class="wk-tabs__wrap">
        <div class="wk-tabs">
          <button
            v-for="tab in approvalFlowTemplate.tabs"
            :key="tab.value"
            :class="['wk-tabs__item', { active: activeFlowTab === tab.value }]"
            type="button"
            @click="activeFlowTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      <div class="admin-flow-actions">
        <el-button type="primary" @click="publishFlow">发布</el-button>
        <i
          class="el-icon-close create-close"
          role="button"
          tabindex="0"
          title="关闭"
          aria-label="关闭审批流程配置"
          data-section="admin-flow-create-close"
          @click="closeFlowCreate"
          @keyup.enter="closeFlowCreate"
          @keyup.space.prevent="closeFlowCreate"
        />
      </div>
    </header>

    <div
      v-show="activeFlowTab === 'base'"
      class="base-info-set flow-base-panel"
      :style="{ width: `${wkcrmUiDimensions.adminFlowBaseInfoWidth}px` }"
    >
      <div class="base-info-set__header">设置基础信息</div>
      <section class="create-sections admin-flow-base-section" data-section="admin-flow-base-section">
        <div class="section-header">
          <span class="section-mark" />
          <div class="section-title">基础信息</div>
        </div>
        <el-form label-position="top" class="admin-flow-base-form">
          <el-form-item
            v-for="field in approvalFlowTemplate.baseFields"
            :key="field.field"
            :label="field.label"
            :required="field.required"
          >
            <el-select v-if="field.formType === 'select'" v-model="flowDraft[field.field]" style="width: 100%;">
              <el-option v-for="option in field.options" :key="option" :label="option" :value="option" />
            </el-select>
            <el-radio-group v-else-if="field.formType === 'radio'" v-model="flowDraft[field.field]">
              <el-radio v-for="option in field.options" :key="option" :value="option">{{ option }}</el-radio>
            </el-radio-group>
            <el-input v-else-if="field.formType === 'textarea'" v-model="flowDraft[field.field]" type="textarea" :rows="4" />
            <el-input v-else v-model="flowDraft[field.field]" />
          </el-form-item>
        </el-form>
      </section>
      <section class="create-sections admin-flow-advanced-section" data-section="admin-flow-advanced-section">
        <div class="section-header">
          <span class="section-mark" />
          <div class="section-title">高级配置</div>
        </div>
        <el-form label-position="top" class="admin-flow-base-form">
          <el-form-item
            v-for="field in approvalFlowTemplate.advancedFields"
            :key="field.field"
            :label="field.label"
          >
            <el-select v-if="field.formType === 'select'" v-model="advancedDraft[field.field]" style="width: 100%;">
              <el-option v-for="option in field.options" :key="option" :label="option" :value="option" />
            </el-select>
            <el-radio-group v-else-if="field.formType === 'radio'" v-model="advancedDraft[field.field]">
              <el-radio v-for="option in field.options" :key="option" :value="option">{{ option }}</el-radio>
            </el-radio-group>
            <el-switch v-else-if="field.formType === 'switch'" v-model="advancedDraft[field.field]" />
            <el-input v-else v-model="advancedDraft[field.field]" />
          </el-form-item>
        </el-form>
      </section>
    </div>

    <main v-show="activeFlowTab === 'flow'" class="wk-approve-flow-wrap flow-canvas">
      <el-button-group class="flow-scale-controls" data-section="admin-flow-canvas-scale">
        <el-button class="group-btn" :disabled="flowScale <= 0.5" @click="scaleFlow('minus')">-</el-button>
        <el-button class="group-btn" :disabled="flowScale >= 3" @click="scaleFlow('plus')">+</el-button>
      </el-button-group>

      <div
        class="wk-approve-flow"
        :style="{ transform: `scale(${flowScale})` }"
      >
        <div class="wk-node">
          <div class="wk-node-wrap is-first is-disabled">
            <div class="header is-start">
              <i :class="[approvalFlowTemplate.sendNode.icon, 'icon']" />
              <span class="title">{{ approvalFlowTemplate.sendNode.name }}</span>
            </div>
            <div class="body">
              <div class="content">{{ approvalFlowTemplate.sendNode.content }}</div>
            </div>
          </div>
          <div class="add-node-btn-wrap">
            <AdminApprovalAddNodeButton
              :show-paste="Boolean(copiedNode)"
              @command="command => addFlowNode({ target: flowNodes, index: -1, command })"
            />
          </div>
        </div>

        <AdminApprovalFlowList
          :nodes="flowNodes"
          :selected-node-id="selectedNode?.nodeId || ''"
          :show-paste="Boolean(copiedNode)"
          @open-node="openNodeDrawer"
          @add-node="addFlowNode"
          @delete-node="deleteFlowNode"
          @copy-node="copyFlowNode"
          @add-condition="addConditionBranch"
          @delete-condition="deleteConditionBranch"
        />

        <div class="wk-end-node" data-section="admin-flow-end-node">
          <div class="circle" />
          <div class="text">流程结束</div>
        </div>
      </div>
    </main>

    <el-drawer
      v-model="nodeDrawerVisible"
      :with-header="false"
      size="500px"
      append-to-body
      data-section="admin-flow-node-drawer"
    >
      <div v-if="nodeDraft" class="flow-drawer-header">
        <div class="edit-title">
          <el-input
            v-if="drawerTitleEditing"
            v-model="nodeDraft.name"
            maxlength="20"
            @blur="drawerTitleEditing = false"
          />
          <template v-else>
            <span class="title" @click="drawerTitleEditing = true">{{ nodeDraft.name }}</span>
            <i class="wk wk-edit" @click="drawerTitleEditing = true" />
          </template>
        </div>
        <i class="el-icon-close" @click="nodeDrawerVisible = false" />
      </div>

      <div v-if="nodeDraft" class="flow-drawer-body">
        <template v-if="drawerMode === 'condition'">
          <div class="section">
            <div class="section__title">条件设置</div>
            <el-form label-position="top" class="admin-one-col-form">
              <el-form-item label="条件名称">
                <el-input v-model="nodeDraft.name" />
              </el-form-item>
              <el-form-item label="条件内容">
                <el-input v-model="nodeDraft.content" type="textarea" :rows="4" />
              </el-form-item>
            </el-form>
          </div>
        </template>

        <template v-else-if="drawerMode === 'copy'">
          <div class="section">
            <div class="section__title">抄送设置</div>
            <el-form label-position="top" class="admin-one-col-form">
              <el-form-item label="抄送成员">
                <el-input v-model="nodeDraft.userText" placeholder="客户负责人" />
              </el-form-item>
              <el-form-item label="指定上级">
                <el-select v-model="nodeDraft.parentLevelText" style="width: 100%;">
                  <el-option label="直属上级" value="直属上级" />
                  <el-option label="第 2 级上级" value="第 2 级上级" />
                  <el-option label="部门负责人" value="部门负责人" />
                </el-select>
              </el-form-item>
              <el-checkbox v-model="nodeDraft.isSelf">抄送发起人本人</el-checkbox>
              <el-checkbox v-model="nodeDraft.isAdd">允许发起人添加抄送人</el-checkbox>
            </el-form>
          </div>
        </template>

        <template v-else>
          <div class="section">
            <div class="section__title">审批人设置</div>
            <el-radio-group v-model="nodeDraft.examineType" class="flow-drawer-radio">
              <el-radio :value="1">指定成员</el-radio>
              <el-radio :value="2">上级</el-radio>
              <el-radio :value="3">角色</el-radio>
              <el-radio :value="4">发起人自选</el-radio>
              <el-radio :value="5">连续多级上级</el-radio>
            </el-radio-group>

            <div v-if="nodeDraft.examineType === 1" class="section-handle">
              <el-input v-model="nodeDraft.memberText" placeholder="张敏、陈启" />
              <span class="text-des">指定成员为空时展示“请选择审批人”。</span>
            </div>
            <div v-else-if="nodeDraft.examineType === 2" class="section-handle">
              <span>发起人的</span>
              <el-select v-model="nodeDraft.parentLevel" style="width: 160px; margin-left: 8px;">
                <el-option v-for="level in parentLevelOptions" :key="level.value" :label="level.label" :value="level.value" />
              </el-select>
              <el-checkbox v-model="nodeDraft.noSupervisorAutoPass" class="flow-drawer-checkbox">找不到上级时自动通过</el-checkbox>
            </div>
            <div v-else-if="nodeDraft.examineType === 3" class="section-handle">
              <el-select v-model="nodeDraft.roleText" style="width: 100%;">
                <el-option label="销售主管" value="销售主管" />
                <el-option label="财务负责人" value="财务负责人" />
                <el-option label="总经理" value="总经理" />
              </el-select>
            </div>
            <div v-else-if="nodeDraft.examineType === 4" class="section-handle">
              <el-select v-model="nodeDraft.chooseType" style="width: 180px;">
                <el-option label="自选一人" value="自选一人" />
                <el-option label="自选多人" value="自选多人" />
              </el-select>
              <el-select v-model="nodeDraft.rangeType" style="width: 180px; margin-left: 8px;">
                <el-option label="全公司" value="全公司" />
                <el-option label="指定成员" value="指定成员" />
                <el-option label="指定角色" value="指定角色" />
              </el-select>
            </div>
            <div v-else class="section-handle">
              <el-select v-model="nodeDraft.endPoint" style="width: 100%;">
                <el-option label="直到直属上级" value="直到直属上级" />
                <el-option label="直到第 3 级上级" value="直到第 3 级上级" />
                <el-option label="直到总经理角色" value="直到总经理角色" />
              </el-select>
            </div>
          </div>

          <div class="section">
            <div class="section__title">审批方式</div>
            <el-radio-group v-model="nodeDraft.approveWay" class="flow-drawer-radio">
              <el-radio label="依次审批" />
              <el-radio label="会签" />
              <el-radio label="或签" />
            </el-radio-group>
          </div>
        </template>
      </div>

      <div class="flow-drawer-footer">
        <el-button @click="nodeDrawerVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNodeDrawer">保存</el-button>
      </div>
    </el-drawer>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { approvalFields, approvalFlowTemplate, approvalRows } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'
import AdminApprovalAddNodeButton from './AdminApprovalAddNodeButton.vue'
import AdminApprovalFlowList from './AdminApprovalFlowList.vue'

let flowIndex = approvalRows.length + 1
let nodeIndex = 1

const flowRows = ref(approvalRows.map(row => ({
  ...row,
  baseInfo: buildFieldValues(approvalFlowTemplate.baseFields, row),
  advancedConfig: buildFieldValues(approvalFlowTemplate.advancedFields),
  canvasNodes: cloneFlowNodes(approvalFlowTemplate.canvasNodes)
})))
const createVisible = ref(false)
const activeFlowTab = ref('base')
const createMode = ref('create')
const currentFlow = ref(null)
const flowDraft = ref(buildFieldValues(approvalFlowTemplate.baseFields))
const advancedDraft = ref(buildFieldValues(approvalFlowTemplate.advancedFields))
const flowNodes = ref(cloneFlowNodes(approvalFlowTemplate.canvasNodes))
const flowScale = ref(1)
const selectedNode = ref(null)
const copiedNode = ref(null)
const nodeDraft = ref(null)
const nodeDrawerVisible = ref(false)
const drawerMode = ref('approve')
const drawerTitleEditing = ref(false)
const approvalTableHeight = ref(320)
const approvalPage = ref(1)
const approvalPageSize = ref(20)

const parentLevelOptions = [
  { label: '直属上级', value: 1 },
  { label: '第 2 级上级', value: 2 },
  { label: '第 3 级上级', value: 3 }
]

const flowCreateTitle = computed(() => {
  if (createMode.value === 'copy') return '复制并新建审批流程'
  if (createMode.value === 'edit') return currentFlow.value?.examineName || '编辑审批流程'
  return '新建审批流程'
})

function buildFieldValues(fields, row = {}) {
  return Object.fromEntries(fields.map(field => [field.field, row[field.field] ?? field.value ?? '']))
}

function createNodeId(prefix) {
  return `flow-${prefix}-${Date.now()}-${nodeIndex++}`
}

function cloneFlowNodes(nodes = []) {
  return JSON.parse(JSON.stringify(nodes)).map(node => normalizeFlowNode(node))
}

function normalizeFlowNode(node) {
  const nextNode = {
    ...node,
    nodeId: node.nodeId || createNodeId(node.type || 'node')
  }
  if (Array.isArray(node.conditionList)) {
    nextNode.conditionList = node.conditionList.map((condition, index) => ({
      ...condition,
      nodeId: condition.nodeId || createNodeId(`condition-${index + 1}`),
      examineDataList: cloneFlowNodes(condition.examineDataList || [])
    }))
  }
  return nextNode
}

function formatNow() {
  const now = new Date()
  const pad = value => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function openFlowCreate(row = null, mode = 'create') {
  createMode.value = mode
  currentFlow.value = row
  flowDraft.value = row
    ? { ...buildFieldValues(approvalFlowTemplate.baseFields), ...row.baseInfo, examineName: row.examineName, label: row.label, rejectType: row.advancedConfigVO }
    : buildFieldValues(approvalFlowTemplate.baseFields)
  if (mode === 'copy') {
    flowDraft.value.examineName = `${row.examineName}副本`
  }
  advancedDraft.value = row
    ? { ...buildFieldValues(approvalFlowTemplate.advancedFields), ...row.advancedConfig }
    : buildFieldValues(approvalFlowTemplate.advancedFields)
  flowNodes.value = cloneFlowNodes(row?.canvasNodes || approvalFlowTemplate.canvasNodes)
  selectedNode.value = flowNodes.value[0] || null
  flowScale.value = 1
  activeFlowTab.value = 'base'
  createVisible.value = true
}

function createDefaultFlowNode(type) {
  if (type === 'copy') {
    return normalizeFlowNode({
      nodeId: createNodeId('copy'),
      type: 'copy',
      theme: 'copy',
      examineType: 7,
      name: '抄送人',
      content: '审批完成后抄送客户负责人',
      userText: '客户负责人',
      isSelf: false,
      isAdd: true
    })
  }
  if (type === 'condition') {
    return createConditionWrap([])
  }
  return normalizeFlowNode({
    nodeId: createNodeId(type === 'fill' ? 'fill' : 'approve'),
    type,
    theme: type === 'fill' ? 'fill' : 'approve',
    examineType: type === 'fill' ? 9 : 2,
    name: type === 'fill' ? '填写' : '审批人',
    content: type === 'fill' ? '补充审批所需字段' : '发起人直属上级审批',
    parentLevel: 1,
    approveWay: '依次审批'
  })
}

function createConditionWrap(trailingNodes = []) {
  return normalizeFlowNode({
    nodeId: createNodeId('condition-wrap'),
    type: 'condition',
    theme: 'condition',
    examineType: 0,
    name: '条件分支',
    conditionList: [
      {
        nodeId: createNodeId('condition'),
        conditionName: '条件',
        content: '合同金额 大于 100000 元',
        conditionDataList: ['合同金额 大于 100000 元'],
        examineDataList: []
      },
      {
        nodeId: createNodeId('condition'),
        conditionName: '其他条件',
        content: '未命中其他条件',
        conditionDataList: [],
        examineDataList: trailingNodes
      }
    ]
  })
}

function scaleFlow(type) {
  const delta = type === 'minus' ? -0.1 : 0.1
  flowScale.value = Math.min(3, Math.max(0.5, Number((flowScale.value + delta).toFixed(2))))
}

function addFlowNode({ target, index, command }) {
  const insertIndex = Math.max(0, index + 1)
  if (command === 'condition') {
    const trailingNodes = target.splice(insertIndex)
    const conditionWrap = createConditionWrap(trailingNodes)
    target.splice(insertIndex, 0, conditionWrap)
    selectedNode.value = conditionWrap.conditionList[0]
    return
  }
  const nextNode = command === 'paste' && copiedNode.value
    ? normalizeFlowNode({ ...clonePlain(copiedNode.value), nodeId: createNodeId('paste'), name: `${copiedNode.value.name || copiedNode.value.conditionName}（复制）` })
    : createDefaultFlowNode(command)
  // 这里只模拟源码 AddNodeBtn 的本地插入，不执行真实审批流编排。
  target.splice(insertIndex, 0, nextNode)
  selectedNode.value = nextNode
}

function addConditionBranch(node) {
  node.conditionList.push({
    nodeId: createNodeId('condition'),
    conditionName: `条件${node.conditionList.length + 1}`,
    content: '点击设置条件',
    conditionDataList: [],
    examineDataList: []
  })
}

function deleteFlowNode({ target, index }) {
  target.splice(index, 1)
}

function deleteConditionBranch({ node, conditionIndex, parent, index }) {
  if (node.conditionList.length > 2) {
    node.conditionList.splice(conditionIndex, 1)
    return
  }
  const otherIndex = conditionIndex === 0 ? 1 : 0
  const keepNodes = node.conditionList[otherIndex]?.examineDataList || []
  parent.splice(index, 1, ...keepNodes)
}

function copyFlowNode(node) {
  copiedNode.value = clonePlain(node)
}

function openNodeDrawer({ node, mode }) {
  selectedNode.value = node
  drawerMode.value = mode === 'condition' ? 'condition' : node.type
  drawerTitleEditing.value = false
  nodeDraft.value = buildNodeDraft(node, drawerMode.value)
  nodeDrawerVisible.value = true
}

function buildNodeDraft(node, mode) {
  if (mode === 'condition') {
    return {
      nodeId: node.nodeId,
      name: node.conditionName,
      content: node.content || node.conditionText || '无条件'
    }
  }
  return {
    nodeId: node.nodeId,
    type: node.type,
    name: node.name,
    content: node.content || '',
    examineType: node.examineType || 2,
    memberText: node.memberText || '',
    parentLevel: node.parentLevel || 1,
    noSupervisorAutoPass: Boolean(node.noSupervisorAutoPass),
    roleText: node.roleText || '销售主管',
    chooseType: node.chooseType || '自选一人',
    rangeType: node.rangeType || '全公司',
    endPoint: node.endPoint || '直到直属上级',
    approveWay: node.approveWay || '依次审批',
    userText: node.userText || '客户负责人',
    parentLevelText: node.parentLevelText || '直属上级',
    isSelf: Boolean(node.isSelf),
    isAdd: Boolean(node.isAdd)
  }
}

function saveNodeDrawer() {
  if (!selectedNode.value || !nodeDraft.value) return
  if (drawerMode.value === 'condition') {
    selectedNode.value.conditionName = nodeDraft.value.name
    selectedNode.value.content = nodeDraft.value.content
  } else {
    Object.assign(selectedNode.value, normalizeNodeFromDraft(nodeDraft.value, drawerMode.value))
  }
  nodeDrawerVisible.value = false
}

function normalizeNodeFromDraft(draft, mode) {
  const nextNode = { ...draft }
  if (mode === 'copy') {
    nextNode.content = draft.userText ? `审批完成后抄送${draft.userText}` : '审批完成后抄送'
    return nextNode
  }
  if (mode === 'fill') {
    nextNode.content = draft.content || '补充审批所需字段'
    return nextNode
  }
  if (draft.examineType === 1) nextNode.content = draft.memberText || '请选择审批人'
  else if (draft.examineType === 2) nextNode.content = `发起人的${parentLevelOptions.find(item => item.value === draft.parentLevel)?.label || '直属上级'}审批`
  else if (draft.examineType === 3) nextNode.content = `${draft.roleText}${draft.approveWay}`
  else if (draft.examineType === 4) nextNode.content = `发起人${draft.chooseType}，范围：${draft.rangeType}`
  else nextNode.content = draft.endPoint
  return nextNode
}

function closeFlowCreate() {
  // 源码关闭只退出全屏配置页；这里同步取消本地草稿，不触发发布或列表写回。
  nodeDrawerVisible.value = false
  createVisible.value = false
  activeFlowTab.value = 'base'
}

function publishFlow() {
  const target = createMode.value === 'edit'
    ? flowRows.value.find(row => row.metadataId === currentFlow.value?.metadataId)
    : null
  const nextRow = {
    metadataId: target?.metadataId || `flow-local-${String(flowIndex++).padStart(3, '0')}`,
    examineName: flowDraft.value.examineName || '新建审批流程',
    label: flowDraft.value.label || '合同',
    advancedConfigVO: flowDraft.value.rejectType || '允许重新提交',
    updateUserName: 'admin',
    updateTime: formatNow(),
    status: target?.status || 1,
    baseInfo: { ...flowDraft.value },
    advancedConfig: { ...advancedDraft.value },
    canvasNodes: clonePlain(flowNodes.value)
  }
  if (target) Object.assign(target, nextRow)
  else flowRows.value.unshift(nextRow)
  closeFlowCreate()
}

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value))
}

function toggleFlowStatus(row) {
  // 审批流启停只改变本地 mock 状态，用于表达模板操作反馈。
  row.status = row.status === 1 ? 2 : 1
  row.updateTime = formatNow()
}

function deleteFlow(row) {
  flowRows.value = flowRows.value.filter(item => item.metadataId !== row.metadataId)
}

function updateApprovalTableHeight() {
  // 源码审批列表用 220 扣除顶部标题和分页区域。
  approvalTableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminApprovalTableOffset)
}

onMounted(() => {
  updateApprovalTableHeight()
  window.addEventListener('resize', updateApprovalTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateApprovalTableHeight)
})
</script>
