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
          @open-detail="openDetail"
        />
        <CrmCustomerDetail
          v-model="detailVisible"
          :detail="activeTemplate.detailData"
          :tabs="activeTemplate.detailTabs"
        />
      </template>
      <AdminShell v-else />
    </template>
  </CrmAppShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminShell from './components/AdminShell.vue'
import CrmAppShell from './components/CrmAppShell.vue'
import CrmCustomerList from './components/CrmCustomerList.vue'
import CrmCustomerDetail from './components/CrmCustomerDetail.vue'
import { crmObjectTemplateList, crmObjectTemplates } from './mock/crm'

const activeMode = ref('crm')
const activeObjectType = ref('customer')
const detailVisible = ref(false)
const activeTemplate = computed(() => crmObjectTemplates[activeObjectType.value] || crmObjectTemplates.customer)

function handleModuleChange(type) {
  if (!crmObjectTemplates[type]) return
  activeMode.value = 'crm'
  activeObjectType.value = type
  detailVisible.value = false
}

function openDetail() {
  detailVisible.value = true
}

function openAdmin() {
  activeMode.value = 'admin'
  detailVisible.value = false
}
</script>
