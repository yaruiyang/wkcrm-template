<template>
  <section class="app-container crm-page" data-section="crm-list-page">
      <CrmPageHeader
        :title="template.title"
        :module-name="template.moduleName"
        @create="$emit('create')"
        @dedupe="dedupeVisible = true"
        @import="importVisible = true"
        @export="exportVisible = true"
      />

    <div class="crm-container">
      <CrmTableHeader
        ref="tableHeaderRef"
        v-model:search="search"
        v-model:active-tab="activeScene"
        v-model:view-type="tableStyle.viewType"
        :scene-list="template.sceneList"
        :view-types="viewTypes"
        :selection-list="selectedRows"
        :selectable-count="filteredRows.length"
        :operations="template.operations"
        :search-placeholder="template.searchPlaceholder"
        @advanced-filter="advancedVisible = true"
        @clear-all="clearSelection"
        @toggle-all-selection="toggleAllSelection"
        @operations-click="selectionActionClick"
      />

      <CrmMainTableWrap
        ref="mainTableRef"
        :rows="filteredRows"
        :fields="template.fieldList"
        :main-field="template.mainField"
        :selected-rows="selectedRows"
        :table-height="tableHeight"
        :view-type="tableStyle.viewType"
        :stage-flow="template.stageFlow"
        :card-rows="template.cardRows"
        @selection-change="handleSelectionChange"
        @open-detail="emit('openDetail', $event)"
        @favorite-toggle="emit('favoriteToggle', $event)"
      />
    </div>

    <CrmSmallDialog v-model="smallVisible" :type="smallType" />
    <CrmAdvancedFilterDialog
      v-model="advancedVisible"
      :fields="advancedFieldOptions"
      :initial-form="advancedFilterForm"
      @filter="applyAdvancedFilter"
    />
    <CrmImportDialog
      v-model="importVisible"
      :module-name="template.moduleName"
      :fields="template.fieldList"
    />
    <CrmExportDialog
      v-model="exportVisible"
      :module-name="template.moduleName"
      :fields="template.fieldList"
      :rows="filteredRows"
    />
    <el-dialog
      v-model="dedupeVisible"
      title="查重"
      width="450px"
      :close-on-click-modal="false"
      append-to-body
      data-section="crm-dedupe-dialog"
    >
      <div class="crm-mock-dialog">
        <el-form label-position="top">
          <el-form-item label="查重范围">
            <el-select v-model="dedupeField" style="width: 100%;">
              <el-option label="客户名称" :value="template.mainField" />
              <el-option label="手机" value="mobile" />
              <el-option label="电话" value="telephone" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="crm-mock-result">
          <div class="crm-mock-result__title">疑似重复数据</div>
          <div
            v-for="row in dedupeRows"
            :key="row.__rowUid"
            class="crm-mock-result__item"
          >
            <span class="can-visit--underline">{{ row[template.mainField] }}</span>
            <span>{{ row.mobile || row.telephone || '暂无联系方式' }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="dedupeVisible = false">确认</el-button>
        <el-button text bg @click="dedupeVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import CrmAdvancedFilterDialog from './CrmAdvancedFilterDialog.vue'
import CrmExportDialog from './CrmExportDialog.vue'
import CrmImportDialog from './CrmImportDialog.vue'
import CrmMainTableWrap from './CrmMainTableWrap.vue'
import CrmPageHeader from './CrmPageHeader.vue'
import CrmSmallDialog from './CrmSmallDialog.vue'
import CrmTableHeader from './CrmTableHeader.vue'
import { tableStyleObj, viewTypes } from '../mock/crm'
import {
  getWkcrmTableHeight,
  wkcrmUiDimensions
} from '../constants/wkcrmUiTokens'

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['create', 'openDetail', 'favoriteToggle'])

const mainTableRef = ref(null)
const tableHeaderRef = ref(null)
const search = ref('')
const activeScene = ref('all')
const tableStyle = reactive({ ...tableStyleObj })
const selectedRows = ref([])
const tableHeight = ref(wkcrmUiDimensions.tableMinHeight)
const smallVisible = ref(false)
const smallType = ref('pool')
const advancedVisible = ref(false)
const advancedFilterForm = ref([])
const advancedApplied = ref([])
const dedupeVisible = ref(false)
const importVisible = ref(false)
const exportVisible = ref(false)
const dedupeField = ref(props.template.mainField)

const advancedFieldOptions = computed(() => {
  return (props.template.filterFieldList || props.template.fieldList || [])
    .filter(field => !['handwriting_sign', 'desc_text', 'bar_qr_code'].includes(field.formType || 'text'))
})

const dedupeRows = computed(() => {
  return filteredRows.value.slice(0, 3)
})

const filteredRows = computed(() => {
  const keyword = search.value.trim()
  const rows = props.template.rows || []
  let result = rows
  const searchFields = [
    props.template.mainField,
    'customerName',
    'mobile',
    'telephone',
    'contractName'
  ]
  if (keyword) {
    result = result.filter((row) => {
      return searchFields.some((field) => String(row[field] || '').includes(keyword))
    })
  }
  if (advancedApplied.value.length > 0) {
    result = result.filter(row => advancedApplied.value.every(condition => matchAdvancedCondition(row, condition)))
  }
  return result
})

onMounted(() => {
  window.addEventListener('resize', updateTableHeight)
  scheduleUpdateTableHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})

watch(() => tableStyle.viewType, () => {
  clearSelection()
})

watch(() => props.template.type, () => {
  search.value = ''
  activeScene.value = props.template.sceneList?.[0]?.value || 'all'
  tableStyle.viewType = tableStyleObj.viewType
  resetAdvancedFilter()
  dedupeField.value = props.template.mainField
  clearSelection()
}, { flush: 'post' })

watch([filteredRows, () => selectedRows.value.length], () => {
  scheduleUpdateTableHeight()
}, { flush: 'post' })

function getTableHeaderElement() {
  const exposedRoot = tableHeaderRef.value?.rootEl
  return exposedRoot?.value || exposedRoot || null
}

function scheduleUpdateTableHeight() {
  nextTick(updateTableHeight)
}

function updateTableHeight() {
  const tableHeaderEl = getTableHeaderElement()
  const tableHeaderHeight = tableHeaderEl?.clientHeight || 0
  tableHeight.value = getWkcrmTableHeight(window.innerHeight, tableHeaderHeight)
  nextTick(() => {
    mainTableRef.value?.doLayout()
  })
}

function handleSelectionChange(rows) {
  selectedRows.value = rows
  scheduleUpdateTableHeight()
}

function clearSelection() {
  mainTableRef.value?.clearSelection()
  selectedRows.value = []
  scheduleUpdateTableHeight()
}

function toggleAllSelection(checked) {
  if (checked) {
    mainTableRef.value?.toggleAllSelection()
  } else {
    clearSelection()
  }
  scheduleUpdateTableHeight()
}

function selectionActionClick(type) {
  if (type === 'put_seas') {
    smallType.value = 'pool'
    smallVisible.value = true
  }
}

function applyAdvancedFilter(data) {
  advancedFilterForm.value = data.form
  advancedApplied.value = data.obj.filter(item => {
    return ['isNull', 'isNotNull'].includes(item.condition) || item.values.length > 0
  })
  scheduleUpdateTableHeight()
}

function resetAdvancedFilter() {
  advancedFilterForm.value = []
  advancedApplied.value = []
  scheduleUpdateTableHeight()
}

function matchAdvancedCondition(row, condition) {
  const rawValue = row[condition.fieldName]
  const values = condition.values || []
  if (condition.condition === 'isNull') {
    return rawValue === undefined || rawValue === null || rawValue === '' || (Array.isArray(rawValue) && rawValue.length === 0)
  }
  if (condition.condition === 'isNotNull') {
    return rawValue !== undefined && rawValue !== null && rawValue !== '' && (!Array.isArray(rawValue) || rawValue.length > 0)
  }
  const sourceValues = Array.isArray(rawValue) ? rawValue : [rawValue]
  const targetValues = values.length ? values : ['']
  const normalizedSource = sourceValues.map(normalizeFilterValue)
  const normalizedTarget = targetValues.map(normalizeFilterValue)
  if (condition.condition === 'equals') {
    return normalizedSource.some(source => normalizedTarget.includes(source))
  }
  if (condition.condition === 'notEqual') {
    return normalizedSource.every(source => !normalizedTarget.includes(source))
  }
  return normalizedSource.some(source => normalizedTarget.some(target => source.includes(target)))
}

function normalizeFilterValue(value) {
  if (value && typeof value === 'object') {
    return String(value.value ?? value.label ?? value.name ?? value.realname ?? '')
  }
  return String(value ?? '')
}
</script>
