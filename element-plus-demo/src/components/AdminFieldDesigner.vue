<template>
  <section
    v-if="!designerVisible"
    class="system-customer main admin-custom-field-page"
    data-section="admin-fields-list"
  >
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">自定义字段设置</div>
    </header>
    <div class="main-body admin-main-body">
      <el-table
        class="admin-source-table"
        :data="moduleRows"
        :height="fieldModuleTableHeight"
      >
        <el-table-column label="模块图标" width="100">
          <template #default="{ row }">
            <div class="table-icon"><i :class="row.icon" /></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模块" show-overflow-tooltip />
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip />
        <el-table-column label="字段数" width="100">
          <template #default="{ row }">{{ fieldCount(row) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openDesigner(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>

  <section
    v-else
    class="admin-field-designer fields-index body"
    data-section="admin-field-designer"
  >
    <aside class="body-left" data-section="admin-field-library">
      <div class="body-left_title">
        字段类型
        <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
      </div>
      <div class="lib-wrapper">
        <button
          v-for="item in fieldTypeLib"
          :key="item.formType"
          type="button"
          class="lib-item text-one-line"
          @click="addFieldFromLibrary(item)"
        >
          <i :class="item.icon" class="lib-item-icon" />
          <span>{{ item.name }}</span>
        </button>
      </div>
    </aside>

    <main class="body-content">
      <div class="body-content-warp" data-section="admin-field-canvas">
        <el-header>
          <div class="title">编辑{{ activeModule?.name || '客户' }}字段</div>
          <div>
            <el-button type="primary" @click="saveDesigner">保存</el-button>
            <el-button text bg @click="designerVisible = false">返回</el-button>
          </div>
        </el-header>
        <div class="body-content-main">
          <el-main>
            <el-form
              v-for="row in designerRows"
              :key="row.map(item => item.formAssistId).join('-')"
              class="field-row"
              label-position="top"
            >
              <div
                v-for="field in row"
                :key="field.formAssistId"
                class="field-item"
                :class="{ activate: activeField?.formAssistId === field.formAssistId }"
                :style="{ flexBasis: `${field.stylePercent}%` }"
                @click="activeField = field"
              >
                <el-form-item :label="field.name" :required="field.required">
                  <el-input v-if="field.formType !== 'textarea'" :placeholder="field.placeholder || `请输入${field.name}`" />
                  <el-input v-else type="textarea" rows="3" :placeholder="field.placeholder || `请输入${field.name}`" />
                </el-form-item>
                <span class="field-drag-handle" aria-hidden="true" />
              </div>
            </el-form>
          </el-main>
        </div>
      </div>
    </main>

    <aside class="body-right" data-section="admin-field-setting">
      <div class="field-setting">
        <div class="setting-title">{{ activeFieldTypeName }}</div>
        <div class="setting-body">
          <div class="item-section">
            <div class="name"><span>*</span>标识名</div>
            <el-input v-if="activeField" v-model="activeField.name" data-section="admin-field-name-input" />
            <div class="input-tips">标识名不能为空</div>
          </div>
          <div class="item-section">
            <div class="name">说明文字</div>
            <el-input
              v-if="activeField"
              v-model="activeField.inputTips"
              :rows="3"
              type="textarea"
              resize="none"
            />
            <div class="input-tips">显示在字段右侧</div>
          </div>
          <div class="item-section">
            <div class="name">字段占比 %</div>
            <el-radio-group v-if="activeField" v-model="activeField.stylePercent" size="small">
              <el-radio-button :value="25">25</el-radio-button>
              <el-radio-button :value="50">50</el-radio-button>
              <el-radio-button :value="75">75</el-radio-button>
              <el-radio-button :value="100">100</el-radio-button>
            </el-radio-group>
          </div>
          <div class="item-section">
            <div class="item-check-section is-flex">
              <el-checkbox v-if="activeField" v-model="activeField.required">设置为必填</el-checkbox>
              <i class="wk wk-icon-fill-help wk-help-tips" data-type="27" data-id="243" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { customFieldModules, designerFields, fieldTypeLib } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const designerVisible = ref(false)
const moduleRows = ref(customFieldModules.map(module => ({
  ...module,
  designerFields: cloneRows(designerFields)
})))
const activeModule = ref(moduleRows.value[1])
const designerRows = ref(cloneRows(activeModule.value?.designerFields || designerFields))
const activeField = ref(designerRows.value[0]?.[0] || null)
const fieldModuleTableHeight = ref(320)
let localFieldIndex = 1

const activeFieldTypeName = computed(() => {
  return fieldTypeLib.find(item => item.formType === activeField.value?.formType)?.name || '单行文本'
})

function cloneRows(rows) {
  return JSON.parse(JSON.stringify(rows))
}

function formatNow() {
  const now = new Date()
  const pad = value => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function fieldCount(module) {
  return (module.designerFields || []).reduce((total, row) => total + row.length, 0)
}

function updateFieldModuleTableHeight() {
  // 源码自定义字段入口表格仅扣除页面标题和少量间距。
  fieldModuleTableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminFieldEntryTableOffset)
}

function openDesigner(row) {
  activeModule.value = row
  designerRows.value = cloneRows(row.designerFields || designerFields)
  activeField.value = designerRows.value[0]?.[0] || null
  designerVisible.value = true
}

function addFieldFromLibrary(item) {
  const field = {
    formAssistId: `local-field-${Date.now()}-${localFieldIndex++}`,
    name: `新建${item.name}`,
    formType: item.formType,
    componentName: item.componentName,
    type: item.type,
    required: false,
    stylePercent: 50,
    inputTips: '',
    placeholder: `请输入新建${item.name}`
  }
  // 本地模板只模拟字段被添加到画布；不实现源码拖拽排序和发布接口。
  const lastRow = designerRows.value.at(-1)
  if (!lastRow || lastRow.reduce((sum, current) => sum + Number(current.stylePercent || 50), 0) >= 100) {
    designerRows.value.push([field])
  } else {
    lastRow.push(field)
  }
  activeField.value = field
}

function saveDesigner() {
  if (!activeModule.value) return
  activeModule.value.designerFields = cloneRows(designerRows.value)
  activeModule.value.updateTime = formatNow()
  designerVisible.value = false
}

onMounted(() => {
  updateFieldModuleTableHeight()
  window.addEventListener('resize', updateFieldModuleTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFieldModuleTableHeight)
})
</script>
