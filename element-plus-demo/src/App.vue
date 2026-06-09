<template>
  <CrmAppShell
    :active-mode="activeMode"
    :active-module="activeTemplate.moduleName"
    :object-templates="crmObjectTemplateList"
    @module-change="handleModuleChange"
    @admin-open="openAdmin"
  >
    <template #default>
      <template v-if="activeMode === 'crm'">
        <CrmCustomerList
          :template="activeTemplate"
          @create="openCreate"
          @open-detail="openDetail"
          @favorite-toggle="toggleFavorite"
        />
        <CrmCustomerDetail
          v-model="detailVisible"
          :detail="activeDetail"
          :tabs="activeTemplate.detailTabs"
          @edit="openEdit"
          @favorite-toggle="toggleFavorite(selectedRow)"
          @follow-create="handleFollowCreate"
        />
        <CrmCreateDialog
          v-model="createVisible"
          :module-name="activeTemplate.moduleName"
          :field-groups="activeTemplate.createFieldGroups"
          :mode="createMode"
          :initial-data="editingRow || {}"
          @save="saveRecord"
        />
      </template>
      <AdminShell v-else />
    </template>
  </CrmAppShell>
</template>

<script setup>
import { computed, reactive, ref, toRaw } from 'vue'
import AdminShell from './components/AdminShell.vue'
import CrmAppShell from './components/CrmAppShell.vue'
import CrmCreateDialog from './components/CrmCreateDialog.vue'
import CrmCustomerList from './components/CrmCustomerList.vue'
import CrmCustomerDetail from './components/CrmCustomerDetail.vue'
import { crmObjectTemplateList, crmObjectTemplates } from './mock/crm'

const templateState = reactive(clonePlain(crmObjectTemplates))
const activeMode = ref('crm')
const activeObjectType = ref('customer')
const detailVisible = ref(false)
const selectedRow = ref(null)
const createVisible = ref(false)
const createMode = ref('create')
const editingRow = ref(null)
const activeTemplate = computed(() => templateState[activeObjectType.value] || templateState.customer)
const activeDetail = computed(() => buildDetail(activeTemplate.value, selectedRow.value))

function handleModuleChange(type) {
  if (!templateState[type]) return
  activeMode.value = 'crm'
  activeObjectType.value = type
  detailVisible.value = false
  selectedRow.value = null
  editingRow.value = null
  createVisible.value = false
}

function openDetail(row) {
  selectedRow.value = row
  detailVisible.value = true
}

function openAdmin() {
  activeMode.value = 'admin'
  detailVisible.value = false
}

function openCreate() {
  createMode.value = 'create'
  editingRow.value = null
  createVisible.value = true
}

function openEdit() {
  if (!selectedRow.value) return
  createMode.value = 'edit'
  editingRow.value = selectedRow.value
  createVisible.value = true
}

function saveRecord(values) {
  const template = activeTemplate.value
  const normalized = toRowData(template, values)

  if (createMode.value === 'edit' && editingRow.value) {
    Object.assign(editingRow.value, normalized)
    selectedRow.value = editingRow.value
  } else {
    const index = template.rows.length + 1
    const id = `${template.type.toUpperCase()}-${Date.now()}`
    template.rows.unshift({
      ...normalized,
      [template.idField]: id,
      __rowUid: `${id}-${index}`,
      businessCount: 0,
      star: 0,
      callShow: false,
      dealStatus: 0,
      updateTime: '2026-06-05 10:00:00'
    })
  }
}

function toggleFavorite(row) {
  if (!row) return
  row.star = row.star ? 0 : 1
}

function handleFollowCreate(payload) {
  if (!selectedRow.value) return

  const detail = activeDetail.value
  const now = formatDateTime(new Date())
  const currentRecords = clonePlain(detail.followRecords || [])
  const currentDynamics = clonePlain(detail.dynamics || [])
  const currentCount = Number(detail.abstractList.find(item => item.title === '跟进次数')?.value) || currentRecords.length
  const activityFieldList = clonePlain(detail.activityFieldList || [])
  const remindTeamMembers = Array.isArray(payload.remindTeamMembers) ? payload.remindTeamMembers : []
  const record = {
    id: `activity-${Date.now()}`,
    primaryKeyId: `activity-${Date.now()}`,
    activityId: detail.customerId,
    type: 1,
    activityType: 2,
    activityTypeId: detail.customerId,
    activityTypeName: detail.title,
    createUserName: 'admin',
    createUser: {
      realname: 'admin',
      companyId: '1729083386843471872'
    },
    content: payload.content,
    category: payload.category,
    visitPlanId: payload.visitPlanId,
    visitPlanName: payload.visitPlanId,
    remindTeamMembers,
    teamMember: remindTeamMembers.map(realname => ({ realname })),
    nextTime: payload.nextTime,
    valid: null,
    favour: 0,
    favourList: [],
    replyNum: 0,
    img: [],
    file: [],
    relationDataOrig: {
      dataId: detail.customerId,
      moduleName: 'crm',
      moduleId: 2
    },
    fieldList: activityFieldList,
    createTime: now,
    updateTime: now
  }

  // 跟进记录是详情页核心状态，写回当前行后由 buildDetail 统一重建详情视图。
  selectedRow.value.followRecords = [record, ...currentRecords]
  selectedRow.value.dynamics = [
    {
      type: '动态',
      user: 'admin',
      action: '发布了跟进记录',
      object: detail.title,
      time: now
    },
    ...currentDynamics
  ]
  selectedRow.value.activityCount = currentCount + 1
  selectedRow.value.unfollowDays = 0
  selectedRow.value.nextTime = payload.nextTime
  selectedRow.value.updateTime = now
}

function toRowData(template, values) {
  const row = { ...values }
  const mainValue = row[template.mainField] || row.customerName || row.contactsName || row.contractName || `${template.moduleName}示例`
  row[template.mainField] = mainValue
  if (template.mainField !== 'customerName' && row.customerName === undefined) {
    row.customerName = values.customerName || ''
  }
  return row
}

function buildDetail(template, row) {
  const detail = clonePlain(template.detailData)
  if (!row) return detail

  const mainValue = row[template.mainField] || detail.title || detail.customerName
  detail[template.idField] = row[template.idField]
  detail[template.mainField] = mainValue
  detail.customerName = mainValue
  detail.title = mainValue
  detail.star = row.star || 0
  detail.dealStatus = row.dealStatus || 0
  detail.ownerUserName = row.ownerUserName || detail.ownerUserName
  detail.mobile = row.mobile || detail.mobile
  detail.telephone = row.telephone || detail.telephone
  detail.followRecords = clonePlain(row.followRecords || detail.followRecords || [])
  detail.dynamics = clonePlain(row.dynamics || detail.dynamics || [])
  detail.activityFieldGroups = clonePlain(row.activityFieldGroups || detail.activityFieldGroups || [])
  detail.activityFieldList = clonePlain(row.activityFieldList || detail.activityFieldList || [])
  detail.nextTime = row.nextTime || detail.nextTime

  detail.headBase = detail.headBase.map(item => {
    const sourceKey = {
      客户级别: 'level',
      负责人: 'ownerUserName',
      手机: 'mobile',
      电话: 'telephone',
      客户名称: 'customerName',
      合同金额: 'money',
      商机金额: 'money',
      商机阶段: 'stage'
    }[item.title]
    return sourceKey && row[sourceKey] !== undefined ? { ...item, value: row[sourceKey] } : item
  })

  detail.baseInfoGroups = detail.baseInfoGroups.map(group => ({
    ...group,
    list: group.list.map(field => {
      const key = field.fieldName || field.field
      return row[key] !== undefined ? { ...field, value: formatDetailFieldValue(field, row), mockValue: row[key] } : field
    })
  }))

  detail.abstractList = detail.abstractList.map(item => {
    if (item.title === '跟进次数' && row.activityCount !== undefined) {
      return { ...item, value: String(row.activityCount) }
    }
    if (item.title === '未跟进时长' && row.unfollowDays !== undefined) {
      return { ...item, value: String(row.unfollowDays) }
    }
    return item
  })

  return detail
}

function formatDetailFieldValue(field, row) {
  const key = field.fieldName || field.field
  const rawValue = key === 'address' ? (row.addressDetail || row[key]) : row[key]
  if (Array.isArray(rawValue)) {
    return rawValue.map(item => item?.name || item?.realname || item?.label || item).join('、')
  }
  if (field.setting?.length) {
    const hit = field.setting.find(option => option.value === rawValue || option.label === rawValue)
    return hit?.label ?? rawValue
  }
  return rawValue
}

function clonePlain(value) {
  // 模板状态进入 reactive 后会变成 Proxy，克隆前先取原始对象，避免浏览器 structuredClone 抛错。
  return JSON.parse(JSON.stringify(toRaw(value)))
}

function formatDateTime(date) {
  const pad = value => String(value).padStart(2, '0')
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
</script>
