<template>
  <section class="app-container crm-page" data-section="crm-list-page">
    <CrmPageHeader
      :title="template.title"
      :module-name="template.moduleName"
      @create="createVisible = true"
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
      />
    </div>

    <CrmCreateDialog
      v-model="createVisible"
      :module-name="template.moduleName"
      :field-groups="template.createFieldGroups"
    />
    <CrmSmallDialog v-model="smallVisible" :type="smallType" />
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import CrmCreateDialog from './CrmCreateDialog.vue'
import CrmMainTableWrap from './CrmMainTableWrap.vue'
import CrmPageHeader from './CrmPageHeader.vue'
import CrmSmallDialog from './CrmSmallDialog.vue'
import CrmTableHeader from './CrmTableHeader.vue'
import { tableStyleObj, viewTypes } from '../mock/crm'
import {
  getSourceTableHeight,
  sourceDimensions
} from '../contracts/wkcrmSourceContract'

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['openDetail'])

const mainTableRef = ref(null)
const tableHeaderRef = ref(null)
const search = ref('')
const activeScene = ref('all')
const tableStyle = reactive({ ...tableStyleObj })
const selectedRows = ref([])
const tableHeight = ref(sourceDimensions.tableMinHeight)
const createVisible = ref(false)
const smallVisible = ref(false)
const smallType = ref('pool')

const filteredRows = computed(() => {
  const keyword = search.value.trim()
  const rows = props.template.rows || []
  if (!keyword) return rows
  const searchFields = [
    props.template.mainField,
    'customerName',
    'mobile',
    'telephone',
    'contractName'
  ]
  return rows.filter((row) => {
    return searchFields.some((field) => String(row[field] || '').includes(keyword))
  })
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
  tableHeight.value = getSourceTableHeight(window.innerHeight, tableHeaderHeight)
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
</script>
