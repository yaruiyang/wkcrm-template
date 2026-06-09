<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    append-to-body
    title="高级筛选"
    width="900px"
    data-section="crm-advanced-filter-dialog"
    @close="handleCancel"
  >
    <div class="crm-source-filter-form" data-section="crm-advanced-filter-form">
      <div class="condition-title">筛选条件</div>
      <div class="filter-fields">
        <el-row
          v-for="(formItem, index) in form"
          :key="`${formItem.fieldName}-${index}`"
          type="flex"
        >
          <el-col :span="6">
            <el-select
              v-model="formItem.fieldName"
              class="wk-search-select"
              placeholder="请选择字段"
              filterable
              @change="fieldChange(formItem)"
            >
              <el-option
                v-for="field in normalizedFields"
                :key="field.fieldName"
                :label="field.name"
                :value="field.fieldName"
              />
            </el-select>
          </el-col>

          <el-col class="interval-base" :span="1" />
          <el-col :span="4">
            <el-select
              v-model="formItem.condition"
              placeholder="请选择条件"
              @change="conditionChange(formItem)"
            >
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>

          <el-col class="interval-base" :span="1" />
          <el-col :span="8" style="position: relative;">
            <template v-if="['isNull', 'isNotNull'].includes(formItem.condition)" />
            <el-select
              v-else-if="['select', 'checkbox'].includes(formItem.formType)"
              v-model="formItem.value"
              :multiple="formItem.formType === 'checkbox'"
              clearable
              placeholder="请选择筛选值"
            >
              <el-option
                v-for="option in formItem.setting"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-date-picker
              v-else-if="['date', 'datetime'].includes(formItem.formType)"
              v-model="formItem.value"
              :type="formItem.formType"
              :value-format="formItem.formType === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'"
              placeholder="请选择日期"
            />
            <el-input
              v-else
              v-model="formItem.value"
              placeholder="请输入筛选内容"
            />
          </el-col>

          <el-col :span="1" class="delete">
            <i class="el-icon-error delete-btn" @click="handleDelete(index)" />
          </el-col>

          <el-col :span="2">
            <el-checkbox
              v-model="formItem.isOut"
              :true-value="1"
              :false-value="0"
            >
              外露
            </el-checkbox>
          </el-col>
        </el-row>
      </div>

      <p v-show="showErrors" class="el-icon-warning warning-info">
        <span class="desc">{{ errorText }}</span>
      </p>

      <el-button
        link
        style="padding-right: 0;padding-left: 0;"
        @click="handleAdd"
      >
        + 添加筛选条件
      </el-button>

      <div class="save">
        <div class="save-scene-row">
          <el-checkbox v-model="saveChecked">保存为场景</el-checkbox>
          <el-input
            v-show="saveChecked"
            v-model="saveName"
            :maxlength="10"
            class="name"
            placeholder="请输入场景名称"
          />
          <el-checkbox v-if="saveChecked" v-model="sceneSyncAll">同步至全体员工</el-checkbox>
          <el-checkbox v-model="exportSyncAll">外露同步至全体员工</el-checkbox>
        </div>
        <div v-show="saveChecked" class="save-setting">
          <el-checkbox v-model="saveDefault">设为默认</el-checkbox>
          <i class="wk wk-icon-fill-help wk-help-tips" data-type="8" data-id="60" />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button text bg @click="handleCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  fields: {
    type: Array,
    default: () => []
  },
  initialForm: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'filter'])

const conditionOptions = [
  { label: '包含', value: 'contains', type: 3 },
  { label: '等于', value: 'equals', type: 1 },
  { label: '不等于', value: 'notEqual', type: 2 },
  { label: '为空', value: 'isNull', type: 5 },
  { label: '不为空', value: 'isNotNull', type: 6 }
]

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const form = reactive([])
const saveChecked = ref(false)
const saveDefault = ref(false)
const saveName = ref('')
const sceneSyncAll = ref(false)
const exportSyncAll = ref(false)
const showErrors = ref(false)
const errorText = ref('')

const normalizedFields = computed(() => {
  return props.fields.map(field => ({
    fieldName: field.fieldName || field.field || field.prop,
    name: field.name || field.label,
    formType: field.formType || 'text',
    setting: normalizeSetting(field.setting || [])
  })).filter(field => field.fieldName && field.name)
})

watch(() => props.modelValue, (value) => {
  if (value) {
    resetDialog()
  }
})

function resetDialog() {
  form.splice(0, form.length)
  const source = props.initialForm.length > 0 ? props.initialForm : [getFilterItem()]
  source.forEach(item => form.push(normalizeFormItem(item)))
  saveChecked.value = false
  saveDefault.value = false
  saveName.value = ''
  sceneSyncAll.value = false
  exportSyncAll.value = false
  showErrors.value = false
  errorText.value = ''
}

function normalizeFormItem(item) {
  const field = normalizedFields.value.find(option => option.fieldName === item.fieldName)
  return {
    fieldName: item.fieldName || '',
    name: item.name || field?.name || '',
    formType: item.formType || field?.formType || '',
    isOut: item.isOut ?? 0,
    condition: item.condition || 'contains',
    type: item.type || 3,
    value: item.value ?? (field?.formType === 'checkbox' ? [] : ''),
    setting: normalizeSetting(item.setting || field?.setting || [])
  }
}

function normalizeSetting(setting) {
  return setting.map(item => {
    if (typeof item === 'object') {
      return {
        label: item.label || item.name || item.value,
        value: item.value || item.label || item.name
      }
    }
    return { label: item, value: item }
  })
}

function getFilterItem() {
  return {
    fieldName: '',
    name: '',
    formType: '',
    isOut: 0,
    condition: 'contains',
    type: 3,
    value: '',
    setting: []
  }
}

function fieldChange(formItem) {
  const field = normalizedFields.value.find(item => item.fieldName === formItem.fieldName)
  formItem.name = field?.name || ''
  formItem.formType = field?.formType || 'text'
  formItem.setting = normalizeSetting(field?.setting || [])
  formItem.value = formItem.formType === 'checkbox' ? [] : ''
  conditionChange(formItem)
}

function conditionChange(formItem) {
  const option = conditionOptions.find(item => item.value === formItem.condition)
  formItem.type = option?.type || 3
}

function handleAdd() {
  form.push(getFilterItem())
}

function handleDelete(index) {
  form.splice(index, 1)
  if (form.length === 0) {
    form.push(getFilterItem())
  }
}

function handleCancel() {
  visible.value = false
}

function handleConfirm() {
  if (getError()) return
  if (saveChecked.value && !saveName.value.trim()) {
    showErrors.value = true
    errorText.value = '场景名称不能为空'
    return
  }
  const nextForm = form.map(item => ({ ...item, setting: normalizeSetting(item.setting || []) }))
  emit('filter', {
    form: nextForm,
    obj: nextForm
      .filter(item => item.fieldName)
      .map(item => ({
        fieldName: item.fieldName,
        name: item.name,
        formType: item.formType,
        condition: item.condition,
        type: item.type,
        values: Array.isArray(item.value) ? item.value : [item.value].filter(value => value !== ''),
        isOut: item.isOut
      })),
    saveChecked: saveChecked.value,
    saveDefault: saveDefault.value,
    saveName: saveName.value,
    syncAll: sceneSyncAll.value ? 1 : 0,
    exportSyncAll: exportSyncAll.value ? 1 : 0
  })
  visible.value = false
}

function getError() {
  showErrors.value = false
  errorText.value = ''
  const fieldNames = []
  for (const item of form) {
    if (!item.fieldName) {
      showErrors.value = true
      errorText.value = '请选择筛选字段'
      break
    }
    if (fieldNames.includes(item.fieldName)) {
      showErrors.value = true
      errorText.value = '筛选字段不能重复'
      break
    }
    fieldNames.push(item.fieldName)
  }
  return showErrors.value
}
</script>
