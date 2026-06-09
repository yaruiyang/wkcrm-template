<template>
  <el-dialog
    v-model="visible"
    :title="`导出${moduleName}`"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="750px"
    data-section="crm-export-dialog"
    @close="closeView"
  >
    <div v-loading="exportLoading" class="dialog-body crm-source-export">
      <el-steps :active="stepsActive" align-center>
        <el-step title="导出配置" />
        <el-step title="导出完成" />
      </el-steps>

      <div v-if="stepsActive === 1 && !exportLoading" class="step-section">
        <div class="type-section">
          <div class="type-section__header">选择字段导出范围</div>
          <el-select
            v-model="rangeType"
            class="type-section__body"
            style="width: 100%;"
            @change="resetSelection"
          >
            <el-option label="全部字段" value="all" />
            <el-option label="列表字段" value="table" />
          </el-select>
        </div>

        <div class="field">
          <div class="title">选择字段导出范围:</div>
          <div class="field-list">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="selectionList"
              @change="handleChange"
            >
              <el-checkbox
                v-for="field in fieldList"
                :key="field.sortId"
                :value="field.sortId"
              >
                {{ field.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="select-num">已选择 {{ selectionList.length }} 项</div>
        </div>

        <div class="type-section">
          <div class="type-section__header">选择导出文件类型</div>
          <el-radio-group v-model="fileType">
            <el-radio :value="1">xls</el-radio>
            <el-radio :value="2">csv</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div v-if="stepsActive === 2" class="step-section is-success">
        <div class="success">
          <i class="wk wk-success success-icon" />
          <div>导出完成</div>
        </div>
      </div>
    </div>

    <template v-if="!exportLoading" #footer>
      <div class="dialog-footer">
        <el-popover
          v-if="true"
          v-model:visible="historyPopoverShow"
          placement="top"
          width="800"
          popper-class="no-padding-popover"
          trigger="click"
        >
          <div class="export-history" data-section="crm-export-history">
            <div class="history-row">2026-06-05 admin 导出{{ moduleName }} {{ rows.length }} 条</div>
          </div>
          <template #reference>
            <el-button class="history-btn" link>查看导出历史</el-button>
          </template>
        </el-popover>
        <el-button
          v-if="stepsActive === 1"
          type="primary"
          @click="sureClick"
        >
          立即导出
        </el-button>
        <el-button v-else type="primary" @click="closeView">确定</el-button>
        <el-button text bg @click="closeView">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  moduleName: {
    type: String,
    default: '客户'
  },
  fields: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const rangeType = ref('table')
const fileType = ref(1)
const stepsActive = ref(1)
const checkAll = ref(false)
const isIndeterminate = ref(false)
const selectionList = ref([])
const exportLoading = ref(false)
const historyPopoverShow = ref(false)

const fieldList = computed(() => props.fields.map((field, index) => ({
  prop: field.prop || field.field,
  formType: field.formType || 'text',
  label: field.label || field.name,
  width: field.width || 140,
  sortId: field.sortId || field.prop || field.field || index
})).filter(field => field.prop && field.label))

watch(() => props.modelValue, (value) => {
  if (value) {
    resetState()
  }
})

function resetState() {
  rangeType.value = 'table'
  fileType.value = 1
  stepsActive.value = 1
  exportLoading.value = false
  resetSelection()
}

function resetSelection() {
  selectionList.value = fieldList.value.map(field => field.sortId)
  checkAll.value = selectionList.value.length === fieldList.value.length
  isIndeterminate.value = false
}

function handleCheckAllChange(value) {
  selectionList.value = value ? fieldList.value.map(field => field.sortId) : []
  isIndeterminate.value = false
}

function handleChange(value) {
  const checkedCount = value.length
  checkAll.value = checkedCount === fieldList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < fieldList.value.length
}

function sureClick() {
  if (selectionList.value.length === 0) {
    ElMessage.error('请选择导出字段')
    return
  }
  downloadMockFile()
  stepsActive.value = 2
}

function downloadMockFile() {
  const selectedFields = fieldList.value.filter(field => selectionList.value.includes(field.sortId))
  const csv = [
    selectedFields.map(field => field.label).join(','),
    ...props.rows.map(row => selectedFields.map(field => JSON.stringify(row[field.prop] ?? '')).join(','))
  ].join('\n')
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.moduleName}列表.${fileType.value === 1 ? 'xls' : 'csv'}`
  link.click()
  URL.revokeObjectURL(url)
}

function closeView() {
  visible.value = false
  stepsActive.value = 1
  selectionList.value = []
}
</script>
