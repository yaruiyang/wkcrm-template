<template>
  <el-dialog
    ref="wkDialog"
    :model-value="modelValue"
    :append-to-body="true"
    :close-on-click-modal="false"
    :title="title"
    width="450px"
    @close="handleCancel"
  >
    <template #header>
      <span class="el-dialog__title">{{ title }}<i class="wk wk-icon-fill-help wk-help-tips" data-type="8" data-id="98" /></span>
    </template>

    <el-form
      ref="fieldForm"
      :model="form"
      :rules="rules"
      :validate-on-rule-change="false"
      label-position="top"
    >
      <el-form-item class="wk-form-item" :label="formTitle" prop="selectId">
        <el-select v-model="form.selectId" style="width: 100%;">
          <el-option
            v-for="item in list"
            :key="item.poolId"
            :label="item.poolName"
            :value="item.poolId"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="wk-form-item" :label="reasonLabel" prop="reason">
        <el-select
          v-model="form.reason"
          style="width: 100%;"
          :clearable="status === 0"
          @change="handleReason"
        >
          <el-option
            v-for="item in reasonList"
            :key="item.value"
            :label="item.name"
            :value="item"
          />
        </el-select>
        <el-input
          v-if="reasonStatus === 0"
          v-model="form.content"
          style="margin-top: 10px;"
          :rows="8"
          :maxlength="200"
          placeholder="请输入必填原因"
          type="textarea"
          resize="none"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">保存</el-button>
        <el-button text bg @click="handleCancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { poolDialogOptions } from '../mock/crm'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'pool'
  }
})

const emit = defineEmits(['update:modelValue'])

const title = '放入公海'
const formTitle = '公海'
const reasonLabel = '放入公海理由'
const wkDialog = ref(null)
const fieldForm = ref(null)
const list = poolDialogOptions.poolList
const reasonList = poolDialogOptions.reasonList
const status = ref(poolDialogOptions.status)
const reasonStatus = ref('')
const form = reactive({
  selectId: '',
  reason: '',
  content: ''
})
const rules = computed(() => {
  const baseRule = {
    selectId: [{ required: true, message: '请选择', trigger: 'change' }]
  }

  return status.value === 1
    ? {
        ...baseRule,
        reason: [{ required: true, message: '请选择放入公海理由', trigger: 'change' }]
      }
    : baseRule
})

watch(
  () => props.modelValue,
  (visible) => {
    if (!visible) return
    resetForm()
  },
  { immediate: true }
)

function resetForm() {
  form.selectId = list.length > 0 ? list[0].poolId : ''
  form.reason = ''
  form.content = ''
  reasonStatus.value = ''
  fieldForm.value?.clearValidate?.()
}

function handleReason(data) {
  reasonStatus.value = data?.status ?? ''
  if (reasonStatus.value !== 0) {
    form.content = ''
  }
}

function handleCancel() {
  emit('update:modelValue', false)
}

function handleConfirm() {
  fieldForm.value?.validate((valid) => {
    if (valid) {
      handleCancel()
    }
  })
}
</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 10px;
}
</style>
