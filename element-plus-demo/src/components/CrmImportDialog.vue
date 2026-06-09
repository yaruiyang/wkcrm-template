<template>
  <el-dialog
    v-model="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="750px"
    data-section="crm-import-dialog"
    @close="closeView"
  >
    <template #header>
      <div class="dialog-header">
        <span class="el-dialog__title">
          导入{{ moduleName }}
          <i class="wk wk-icon-fill-help wk-help-tips" data-type="8" data-id="96" />
        </span>
      </div>
    </template>

    <div class="dialog-body crm-source-import">
      <el-steps :active="stepsActive" simple>
        <el-step
          v-for="(item, index) in stepList"
          :key="index"
          :title="item.title"
          :status="item.status"
        >
          <template #icon>
            <i :class="item.icon" />
          </template>
        </el-step>
      </el-steps>

      <div v-if="stepsActive === 1" class="step-section">
        <div class="sections">
          <div class="sections__title">
            1. 请先下载{{ moduleName }}导入模板
            <span class="download" @click="downloadTemplate">下载{{ moduleName }}导入模板</span>
          </div>
          <div class="sections__tips">导入数据每次不超过 5000 条，建议按模板字段填写。</div>
        </div>

        <div class="sections">
          <div class="sections__title">
            2. 处理重复数据
            <el-tooltip effect="dark" placement="top">
              <template #content>覆盖旧数据<br>跳过重复数据<br>更新系统原有数据</template>
              <i class="wk wk-icon-fill-help wk-help-tips" />
            </el-tooltip>
            （查重规则：【{{ uniqueFieldText }}】）
          </div>
          <div class="sections__tips">系统将根据{{ uniqueFieldText }}判断{{ moduleName }}是否重复。</div>
          <div class="content">
            <el-select v-model="repeatHandling" @change="setMapConfig">
              <el-option label="覆盖旧数据" :value="1" />
              <el-option label="跳过" :value="2" />
              <el-option label="更新系统原有数据" :value="3" />
            </el-select>
          </div>
        </div>

        <div class="sections">
          <div class="sections__title">3. 选择导入文件</div>
          <div class="content">
            <div class="file-select">
              <el-input v-model="file.name" :disabled="true" />
              <el-button type="primary" @click="selectFile">选择文件</el-button>
            </div>
            <div class="file-tip">支持 xls、xlsx、csv 文件。</div>
          </div>
        </div>

        <input
          id="import-input-file"
          ref="importInputFile"
          type="file"
          @change="uploadFile"
        >
      </div>

      <div
        v-else-if="stepsActive === 2"
        v-loading="true"
        element-loading-text="正在导入数据"
        class="step-section"
      >
        <div class="step-section__tips">正在导入，当前导入不会影响已有页面操作。</div>
      </div>

      <div v-else class="step-section">
        <div class="result-info">
          <i class="wk wk-success result-info__icon" />
          <p class="result-info__des">数据导入完成</p>
          <p class="result-info__detail">
            共 <span class="result-info__detail--all">12</span> 条，
            成功 <span class="result-info__detail--suc">12</span> 条，
            失败 <span class="result-info__detail--err">0</span> 条
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-popover
          v-model:visible="historyPopoverShow"
          placement="top"
          width="800"
          popper-class="no-padding-popover"
          trigger="click"
        >
          <div class="import-history" data-section="crm-import-history">
            <div class="history-row">2026-06-05 admin 导入{{ moduleName }} 12 条</div>
          </div>
          <template #reference>
            <el-button class="history-btn" link>导入历史</el-button>
          </template>
        </el-popover>
        <el-button
          v-if="sureTitle"
          id="common-import-btn"
          type="primary"
          @click="sureClick"
        >
          {{ sureTitle }}
        </el-button>
        <el-button
          :class="{ 'is-hidden': !showCancel }"
          text
          bg
          @click="closeView"
        >
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'

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
  }
})

const emit = defineEmits(['update:modelValue', 'done'])

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const repeatHandling = ref(1)
const file = reactive({ name: '' })
const stepsActive = ref(1)
const historyPopoverShow = ref(false)
const importInputFile = ref(null)
const stepList = reactive([
  { icon: 'wk wk-upload', title: '上传文件', status: 'wait' },
  { icon: 'wk wk-data-import', title: '导入数据', status: 'wait' },
  { icon: 'wk wk-success', title: '导入完成', status: 'wait' }
])

const uniqueFieldText = computed(() => {
  const mainField = props.fields.find(field => field.prop === 'customerName' || field.field === 'customerName')
  return mainField?.label || mainField?.name || `${props.moduleName}名称`
})
const sureTitle = computed(() => ({
  1: '立即导入',
  2: '最小化',
  3: '确定'
}[stepsActive.value]))
const showCancel = computed(() => stepsActive.value !== 2)

function setMapConfig() {}

function downloadTemplate() {
  ElMessage.success(`${props.moduleName}导入模板已准备。`)
}

function selectFile() {
  file.name = `${props.moduleName}导入模板.xlsx`
}

function uploadFile(event) {
  file.name = event.target.files?.[0]?.name || file.name
}

function sureClick() {
  if (stepsActive.value === 1) {
    if (!file.name) {
      ElMessage.error('请选择导入文件')
      return
    }
    stepList[0].status = 'finish'
    stepList[1].status = 'finish'
    stepList[2].status = 'finish'
    stepsActive.value = 3
    emit('done')
  } else {
    closeView()
  }
}

function closeView() {
  visible.value = false
  stepsActive.value = 1
  file.name = ''
  stepList.forEach(item => {
    item.status = 'wait'
  })
}
</script>
