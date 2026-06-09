<template>
  <CrmSlideView
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <CrmDetailMenuLayout v-model="activeTab" :tabs="tabs">
      <template #header>
        <div class="wmd-header">
          <CrmDetailHeaderCard
            :detail="detail"
            @edit="$emit('edit')"
            @favorite-toggle="$emit('favoriteToggle')"
          />
        </div>
        <CrmStageRecords :detail="detail" />
      </template>

      <template #body="{ tab }">
        <CrmActivityPanel
          v-if="tab.name === 'activity'"
          :detail="detail"
          @follow-create="$emit('followCreate', $event)"
        />
        <CrmReadonlyInfo v-else-if="tab.name === 'fields'" :groups="detail.baseInfoGroups" />
        <CrmRelativeContacts v-else-if="tab.name === 'contacts'" :detail="detail" />
        <CrmRelativeFiles v-else-if="tab.name === 'files'" :detail="detail" />
        <CrmRelativeHandle v-else-if="tab.name === 'logs'" :detail="detail" />
      </template>

      <template #right>
        <CrmSummaryPanel :detail="detail" />
      </template>
    </CrmDetailMenuLayout>
  </CrmSlideView>
</template>

<script setup>
import { ref, watch } from 'vue'
import CrmActivityPanel from './CrmActivityPanel.vue'
import CrmDetailHeaderCard from './CrmDetailHeaderCard.vue'
import CrmDetailMenuLayout from './CrmDetailMenuLayout.vue'
import CrmReadonlyInfo from './CrmReadonlyInfo.vue'
import CrmRelativeContacts from './CrmRelativeContacts.vue'
import CrmRelativeFiles from './CrmRelativeFiles.vue'
import CrmRelativeHandle from './CrmRelativeHandle.vue'
import CrmSlideView from './CrmSlideView.vue'
import CrmStageRecords from './CrmStageRecords.vue'
import CrmSummaryPanel from './CrmSummaryPanel.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  detail: {
    type: Object,
    required: true
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue', 'edit', 'favoriteToggle', 'followCreate'])

const activeTab = ref('activity')

watch(() => props.detail?.crmType, () => {
  activeTab.value = props.tabs[0]?.name || 'activity'
})
</script>
