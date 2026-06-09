<template>
  <section
    v-if="!editorVisible"
    class="admin-page admin-config-list-page main"
    data-section="admin-config-list"
    data-template="config-list"
  >
    <header class="admin-xr-header xr-header">
      <div class="admin-xr-label">{{ config.title }}</div>
      <div class="admin-xr-ft">
        <el-button type="primary" @click="openCreateDialog">{{ config.createText }}</el-button>
      </div>
    </header>

    <div class="admin-list-body main-body">
      <el-table
        class="admin-source-table"
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
          :min-width="field.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="field.prop === 'templateName'" class="admin-link">{{ row.templateName }}</span>
            <span v-else-if="field.prop === 'type'">{{ typeLabel(row.type) }}</span>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="printActionColumnWidth" fixed="right">
          <template #default="{ row }">
            <el-button
              v-for="action in config.actions"
              :key="action"
              :type="action === '删除' ? 'danger' : 'primary'"
              link
              @click.stop="handleTemplateAction(action, row)"
            >{{ action }}</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>

    <el-dialog
      v-model="templateDialogVisible"
      :title="templateDialogTitle"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      data-section="admin-print-template-dialog"
    >
      <el-form label-width="80px">
        <el-form-item
          v-for="field in visibleCreateFields"
          :key="field.field"
          :label="field.label"
          :required="field.required"
        >
          <el-select v-if="field.formType === 'select'" v-model="templateForm[field.field]" style="width: 100%;">
            <el-option
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-input v-else v-model="templateForm[field.field]" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="templateDialogMode === 'rename'" type="primary" @click="saveTemplateName">保存</el-button>
          <el-button v-else type="primary" @click="createTemplateAndOpenEditor">下一步</el-button>
          <el-button text bg @click="templateDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </section>

  <section v-else class="print-template-editor main" data-section="admin-print-template-editor">
    <header class="admin-xr-header xr-header print-template-editor__header">
      <div class="admin-xr-label">{{ config.editor.title }}</div>
      <div class="admin-xr-ft">
        <el-button link @click="openSizeDialog">尺寸设置</el-button>
        <el-button link @click="previewVisible = true">预览</el-button>
        <el-button type="primary" @click="saveEditor">保存</el-button>
        <el-button @click="goBackToList">返回</el-button>
      </div>
    </header>

    <div class="print-template-editor__body main-body">
      <aside
        class="system-view-nav"
        data-section="admin-print-field-nav"
        :style="{ width: `${printFieldNavWidth}px` }"
      >
        <el-tabs v-model="activeTab" @tab-change="activeMenuField = ''">
          <el-tab-pane
            v-for="tab in config.editor.fieldTabs"
            :key="tab.key"
            :label="tab.label"
            :name="tab.key"
          />
        </el-tabs>
        <div class="xr-reminder print-reminder">
          点击字段即可插入变量值。
        </div>
        <div class="menus">
          <div v-if="activeTab === 'stage'" class="print-stage-select">
            <el-select v-model="stageFlowId">
              <el-option label="客户默认阶段流程" value="flow-customer" />
            </el-select>
            <el-tree
              :data="config.editor.stageTree"
              node-key="labelId"
              default-expand-all
              :props="{ children: 'children', label: 'label' }"
              @node-click="stageSelect"
            />
          </div>
          <template v-else>
            <button
              v-for="field in activeMenuList"
              :key="field.fieldName"
              type="button"
              class="menu-item text-one-line"
              :class="{ 'is-select': activeMenuField === field.fieldName }"
              @click="insertFieldToken(field)"
            >
              {{ field.name }}
            </button>
          </template>
        </div>
      </aside>

      <main class="system-view-content" data-section="admin-print-editor-content">
        <div class="print-rich-editor">
          <div class="print-rich-editor__toolbar">
            <span>undo</span>
            <span>redo</span>
            <span>bold</span>
            <span>italic</span>
            <span>table</span>
            <span>preview</span>
            <span>print</span>
          </div>
          <div class="print-rich-editor__area">
            <article class="print-rich-editor__iframe" :style="editorFrameStyle">
              <div class="print-rich-editor__body" :style="editorBodyStyle">
                <template v-for="(block, index) in editorContent" :key="`${block.type}-${index}`">
                  <p v-if="block.type === 'paragraph'">{{ block.text }}</p>
                  <p v-else class="print-token-line">
                    <span
                      v-for="token in block.tokens"
                      :key="`${token.type}-${token.value}-${token.label}`"
                      class="wk-print-tag-wukong"
                      :class="token.colorClass"
                      contenteditable="false"
                    >{{ formatTokenLabel(token) }}</span>
                  </p>
                </template>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>

    <el-dialog
      v-model="sizeDialogVisible"
      title="纸张尺寸"
      width="480px"
      append-to-body
      :close-on-click-modal="false"
      data-section="admin-print-size-dialog"
    >
      <el-form class="print-size-form" label-position="top">
        <el-form-item label="纸张大小">
          <el-select v-model="sizeForm.sizeName" @change="sizeChange">
            <el-option
              v-for="option in sizeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <div class="print-size-row">
          <el-form-item label="宽" class="is-left">
            <el-input-number
              v-model="sizeForm.width"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="99999"
              :disabled="sizeForm.sizeName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
          <el-form-item label="高" class="is-left">
            <el-input-number
              v-model="sizeForm.height"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="99999"
              :disabled="sizeForm.sizeName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
        </div>
        <el-form-item label="页边距">
          <el-select v-model="sizeForm.marginName" @change="marginChange">
            <el-option
              v-for="option in marginOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <div class="print-size-row">
          <el-form-item label="上" class="is-left">
            <el-input-number
              v-model="sizeForm.top"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="550"
              :disabled="sizeForm.marginName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
          <el-form-item label="下" class="is-left">
            <el-input-number
              v-model="sizeForm.bottom"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="550"
              :disabled="sizeForm.marginName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
        </div>
        <div class="print-size-row">
          <el-form-item label="左" class="is-left">
            <el-input-number
              v-model="sizeForm.left"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="550"
              :disabled="sizeForm.marginName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
          <el-form-item label="右" class="is-left">
            <el-input-number
              v-model="sizeForm.right"
              controls-position="right"
              :step="0.1"
              :precision="1"
              :min="1"
              :max="550"
              :disabled="sizeForm.marginName !== 'custom'"
            />
            <span class="is-unit">mm</span>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="savePrintSize">保存</el-button>
          <el-button text bg @click="sizeDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="previewVisible"
      title="打印预览"
      width="520px"
      append-to-body
      data-section="admin-print-preview-dialog"
    >
      <div class="print-preview-summary">
        {{ activeTemplateName }} 将按 {{ printSizeData.width }}mm × {{ printSizeData.height }}mm 纸张预览。
      </div>
      <template #footer>
        <el-button type="primary" @click="previewVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { printTemplateConfig } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const config = ref(JSON.parse(JSON.stringify(printTemplateConfig)))
const currentPage = ref(1)
const pageSize = ref(10)
const tableHeight = ref(320)
const templateDialogVisible = ref(false)
const templateDialogMode = ref('create')
const templateForm = ref({})
const activeTemplate = ref(null)
const editorVisible = ref(false)
const previewVisible = ref(false)
const sizeDialogVisible = ref(false)
const activeTab = ref(config.value.editor.fieldTabs[0]?.key || 'customer')
const activeMenuField = ref('')
const stageFlowId = ref('flow-customer')
const printSizeData = ref(clonePlain(config.value.editor.printSize))
const sizeForm = ref(clonePlain(config.value.editor.printSize))
const editorContent = ref(normalizeContent(config.value.editor.defaultContent))

// 源码列表页固定打印模板操作列宽度，区别于规则池的 200px 操作列。
const printActionColumnWidth = wkcrmUiDimensions.adminPrintActionColumnWidth
const printFieldNavWidth = wkcrmUiDimensions.adminPrintFieldNavWidth
let templateIndex = config.value.rows.length + 1

const templateDialogTitle = computed(() => templateDialogMode.value === 'rename' ? '编辑打印模板' : config.value.createText)
const activeTemplateName = computed(() => activeTemplate.value?.templateName || templateForm.value.templateName || config.value.editor.title)
const typeOptions = computed(() => config.value.createFields.find(field => field.field === 'type')?.options || [])
const activeMenuList = computed(() => config.value.editor.fieldTabs.find(tab => tab.key === activeTab.value)?.fields || [])
const visibleCreateFields = computed(() => {
  // 源码编辑名称时不允许切换关联事项，避免修改模板已绑定的业务对象。
  return templateDialogMode.value === 'rename'
    ? config.value.createFields.filter(field => field.field === 'templateName')
    : config.value.createFields
})
const editorFrameStyle = computed(() => ({
  width: `${printSizeData.value.width / 10}cm`,
  minHeight: `${printSizeData.value.height / 10}cm`
}))
const editorBodyStyle = computed(() => ({
  paddingTop: `${printSizeData.value.top / 10}cm`,
  paddingBottom: `${printSizeData.value.bottom / 10}cm`,
  paddingLeft: `${printSizeData.value.left / 10}cm`,
  paddingRight: `${printSizeData.value.right / 10}cm`
}))

const sizeOptions = [
  { value: 'custom', label: '自定义' },
  { value: '210,297', label: 'A4' },
  { value: '297,420', label: 'A3' },
  { value: '148,210', label: 'A5' },
  { value: '176,250', label: 'B5' }
]

const marginOptions = [
  { value: 'custom', label: '自定义' },
  { value: '25.4,25.4,31.8,31.8', label: '常规' },
  { value: '12.7,12.7,12.7,12.7', label: '窄' },
  { value: '25.4,25.4,19.1,19.1', label: '适中' },
  { value: '25.4,25.4,50.8,50.8', label: '宽' }
]

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value))
}

function formatNow() {
  const now = new Date()
  const pad = value => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function typeLabel(value) {
  return typeOptions.value.find(option => option.value === value)?.label || value
}

function defaultTemplateForm(row = {}) {
  return Object.fromEntries(config.value.createFields.map(field => [field.field, row[field.field] ?? field.value ?? '']))
}

function normalizeContent(blocks) {
  return (blocks || []).map(block => {
    if (block.type === 'tokens') {
      return {
        type: 'tokens',
        tokens: block.fields.map(label => createToken({ name: label, fieldName: label }, 'common'))
      }
    }
    return { ...block }
  })
}

function createToken(field, type = activeTab.value) {
  const color = ['customer', 'contacts', 'business', 'contract', 'receivables', 'product'].includes(type) ? type : 'common'
  return {
    type,
    value: field.fieldName || field.labelId || field.name,
    label: field.name || field.label,
    colorClass: `wk-tiny-color--${color}`
  }
}

function formatTokenLabel(token) {
  return `{${token.label}}`
}

function openCreateDialog() {
  templateDialogMode.value = 'create'
  activeTemplate.value = null
  templateForm.value = defaultTemplateForm()
  templateDialogVisible.value = true
}

function openRenameDialog(row) {
  templateDialogMode.value = 'rename'
  activeTemplate.value = row
  templateForm.value = defaultTemplateForm(row)
  templateDialogVisible.value = true
}

function createTemplateAndOpenEditor() {
  const row = {
    templateId: `print-local-${String(templateIndex++).padStart(3, '0')}`,
    templateName: templateForm.value.templateName || '新建打印模板',
    type: templateForm.value.type || typeOptions.value[0]?.value,
    createTime: formatNow(),
    createUserName: 'admin',
    updateTime: formatNow(),
    printSize: clonePlain(config.value.editor.printSize),
    content: normalizeContent(config.value.editor.defaultContent)
  }
  config.value.rows.unshift(row)
  openEditor(row)
  templateDialogVisible.value = false
}

function saveTemplateName() {
  if (activeTemplate.value) {
    // 编辑名称只更新模板标题；源码编辑弹层不展示关联事项选择。
    activeTemplate.value.templateName = templateForm.value.templateName
    activeTemplate.value.updateTime = formatNow()
  }
  templateDialogVisible.value = false
}

function openEditor(row = null) {
  activeTemplate.value = row
  activeTab.value = config.value.editor.fieldTabs[0]?.key || 'customer'
  activeMenuField.value = ''
  printSizeData.value = clonePlain(row?.printSize || config.value.editor.printSize)
  editorContent.value = clonePlain(row?.content || normalizeContent(config.value.editor.defaultContent))
  templateDialogVisible.value = false
  editorVisible.value = true
}

function goBackToList() {
  editorVisible.value = false
}

function handleTemplateAction(action, row) {
  if (action === '删除') {
    config.value.rows = config.value.rows.filter(item => item.templateId !== row.templateId)
    return
  }
  if (action === '复制') {
    const copied = {
      ...clonePlain(row),
      templateId: `print-local-${String(templateIndex++).padStart(3, '0')}`,
      templateName: `${row.templateName}副本`,
      createTime: formatNow(),
      updateTime: formatNow()
    }
    config.value.rows.unshift(copied)
    return
  }
  if (action === '编辑名称') {
    openRenameDialog(row)
  }
}

function cellClassName({ column }) {
  return column.property === 'templateName' ? 'can-visit--underline' : ''
}

function handleRowClick(row, column) {
  if (column.property === 'templateName') {
    openEditor(row)
  }
}

function insertFieldToken(field) {
  activeMenuField.value = field.fieldName
  editorContent.value.push({
    type: 'tokens',
    tokens: [createToken(field)]
  })
}

function stageSelect(data) {
  if (data.isChildren) return
  activeMenuField.value = data.labelId
  editorContent.value.push({
    type: 'tokens',
    tokens: [createToken(data, 'stage')]
  })
}

function openSizeDialog() {
  sizeForm.value = clonePlain(printSizeData.value)
  sizeDialogVisible.value = true
}

function sizeChange() {
  if (sizeForm.value.sizeName !== 'custom') {
    const [width, height] = sizeForm.value.sizeName.split(',').map(Number)
    sizeForm.value.width = width
    sizeForm.value.height = height
  }
}

function marginChange() {
  if (sizeForm.value.marginName !== 'custom') {
    const [top, bottom, left, right] = sizeForm.value.marginName.split(',').map(Number)
    sizeForm.value.top = top
    sizeForm.value.bottom = bottom
    sizeForm.value.left = left
    sizeForm.value.right = right
  }
}

function savePrintSize() {
  // 尺寸设置只影响当前本地模板草稿，不触发打印服务或远程保存。
  printSizeData.value = clonePlain(sizeForm.value)
  sizeDialogVisible.value = false
}

function saveEditor() {
  if (activeTemplate.value) {
    // 保存编辑器草稿只写回本地 mock 行，保持模板 demo 可离线复测。
    activeTemplate.value.printSize = clonePlain(printSizeData.value)
    activeTemplate.value.content = clonePlain(editorContent.value)
    activeTemplate.value.updateTime = formatNow()
  }
  editorVisible.value = false
}

function updateTableHeight() {
  tableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminApprovalTableOffset)
}

onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})
</script>
