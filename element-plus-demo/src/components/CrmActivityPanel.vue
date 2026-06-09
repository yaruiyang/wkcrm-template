<template>
  <div data-section="detail-activity">
    <div class="activity activity-follow-editor">
      <div class="activity-tabs activity-tabs--source" data-section="detail-follow-tabs">
        <button type="button" class="activity-tab is-active">
          <i class="wk wk-icon-message-line" />
          <span>跟进记录</span>
        </button>
      </div>

      <div class="activity-input log-add" data-section="detail-follow-editor">
        <el-form class="wk-form" label-position="top" :model="fieldForm">
          <DemoWkFormItems
            v-for="(children, groupIndex) in activityFieldGroups"
            :key="groupIndex"
            :field-list="children"
            :field-from="fieldForm"
            @field-change="handleFieldChange"
          >
            <template #default="{ field }">
              <div v-if="getFieldKey(field) === 'content'" class="follow-content-field">
                <el-input
                  v-model="fieldForm.content"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  maxlength="800"
                  placeholder="输入@可选择需通知人员"
                  resize="none"
                />
              </div>
              <DemoWkField
                v-else
                :field="field"
                :field-from="fieldForm"
                @change="handleFieldChange"
              />
            </template>
          </DemoWkFormItems>
        </el-form>

        <div class="follow-editor-footer">
          <div class="follow-editor-tools">
            <button type="button" class="follow-tool"><i class="wk wk-picture" /></button>
            <button type="button" class="follow-tool"><i class="wk wk-file" /></button>
            <button type="button" class="follow-tool"><i class="wk wk-associated" /></button>
          </div>
          <el-button
            type="primary"
            data-action="detail-follow-submit"
            :disabled="!fieldForm.content.trim()"
            @click="handleSubmit"
          >
            发布
          </el-button>
        </div>
      </div>
    </div>

    <div class="activity activity-log">
      <div class="activity-filter-row">
        <span class="filter-text">显示:</span>
        <el-button
          text
          bg
          :class="{ 'el-button--selected': activeType === 'followRecord' }"
          @click="activeType = 'followRecord'"
        >
          跟进记录<template v-if="followRecords.length">({{ followRecords.length }})</template>
        </el-button>
      </div>

      <div class="activity-timeline activity-timeline--source">
        <CrmActivityRecordCard
          v-for="item in displayItems"
          :key="`${item.type || activeType}-${item.id || item.createTime || item.time}-${item.content || item.action}`"
          :item="item"
          :kind="item.type === 1 ? 'followRecord' : 'dynamic'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import CrmActivityRecordCard from './CrmActivityRecordCard.vue'
import DemoWkField from './DemoWkField.vue'
import DemoWkFormItems from './DemoWkFormItems.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['follow-create'])
const activeType = ref('followRecord')
const fieldForm = reactive({})

const activityFieldGroups = computed(() => props.detail.activityFieldGroups || [])
const activityFieldList = computed(() => props.detail.activityFieldList || activityFieldGroups.value.flat())
const legacyActivities = computed(() => props.detail.activities || [])
const followRecords = computed(() => {
  return (props.detail.followRecords || legacyActivities.value.filter(item => item.type?.includes?.('跟进'))).map(normalizeFollowRecord)
})
const displayItems = computed(() => followRecords.value)

watch(activityFieldGroups, () => {
  resetFieldForm()
}, { immediate: true })

function resetFieldForm() {
  Object.keys(fieldForm).forEach(key => {
    delete fieldForm[key]
  })
  activityFieldList.value.forEach(field => {
    const key = getFieldKey(field)
    fieldForm[key] = field.defaultValue ?? (field.formType === 'checkbox' || field.formType === 'user' && field.isMulti === 1 ? [] : '')
  })
}

function handleFieldChange() {}

function handleSubmit() {
  const content = fieldForm.content?.trim()
  if (!content) return

  emit('follow-create', {
    ...fieldForm,
    content,
    title: content,
    related: props.detail.title || props.detail.customerName || '客户'
  })
  // 源码发布成功后重置 LogAdd，这里只保留字段默认值。
  resetFieldForm()
}

function normalizeFollowRecord(record) {
  if (record.type === 1) {
    return {
      ...record,
      fieldList: record.fieldList || activityFieldList.value
    }
  }
  return {
    ...record,
    id: `${record.time}-${record.user}`,
    type: 1,
    activityType: 2,
    activityTypeName: record.related || props.detail.title,
    createUserName: record.user,
    createUser: { realname: record.user },
    content: record.title || record.content,
    createTime: record.time,
    fieldList: activityFieldList.value
  }
}

function getFieldKey(field) {
  return field.field || field.fieldName
}
</script>
