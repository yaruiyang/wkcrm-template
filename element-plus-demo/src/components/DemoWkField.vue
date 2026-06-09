<template>
  <el-input
    v-if="['text', 'mobile', 'email', 'website', 'number', 'money', 'floatnumber'].includes(formType)"
    v-model="modelValue"
    :maxlength="field.maxlength || field.maxLength || 100"
    :placeholder="placeholder"
  />

  <el-input
    v-else-if="formType === 'textarea'"
    v-model="modelValue"
    type="textarea"
    :autosize="{ minRows: 3, maxRows: 6 }"
    :maxlength="field.maxlength || field.maxLength || 800"
    :placeholder="placeholder"
    resize="none"
  />

  <el-select
    v-else-if="['select', 'customer_relations'].includes(formType)"
    v-model="modelValue"
    clearable
    filterable
    :placeholder="placeholder || '请选择'"
  >
    <el-option
      v-for="option in normalizedOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>

  <el-select
    v-else-if="formType === 'checkbox'"
    v-model="modelValue"
    clearable
    multiple
    :placeholder="placeholder || '请选择'"
  >
    <el-option
      v-for="option in normalizedOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>

  <el-radio-group v-else-if="formType === 'radio'" v-model="modelValue">
    <el-radio
      v-for="option in normalizedOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>

  <el-select
    v-else-if="formType === 'user'"
    v-model="modelValue"
    clearable
    :multiple="field.isMulti === 1"
    :placeholder="placeholder || '请选择'"
  >
    <el-option label="admin" value="admin" />
    <el-option label="林舟" value="林舟" />
    <el-option label="张敏" value="张敏" />
  </el-select>

  <div v-else-if="formType === 'visitPlan'" class="demo-visit-plan-field">
    <el-input v-model="modelValue" placeholder="请选择" />
    <el-button :icon="Plus" />
  </div>

  <el-input
    v-else-if="['datetime', 'date'].includes(formType)"
    v-model="modelValue"
    :placeholder="formType === 'datetime' ? '选择日期时间' : '选择日期'"
  />

  <div v-else-if="formType === 'map_address'" class="address-field">
    <el-select v-model="modelValue" class="address-select" placeholder="请选择省/市/区">
      <el-option label="北京市 / 北京城区 / 东城区" value="beijing-dongcheng" />
      <el-option label="江苏省 / 苏州市 / 工业园区" value="suzhou-park" />
    </el-select>
    <el-input
      v-model="fieldFrom.addressDetail"
      class="address-detail"
      type="textarea"
      :rows="2"
      resize="none"
      placeholder="请输入详细地址"
    />
  </div>

  <div v-else-if="formType === 'rich_text_format'" class="rich-txt">
    <div class="rich-toolbar">
      <span>↶</span>
      <span>↷</span>
      <strong>B</strong>
      <em>I</em>
      <span>U</span>
      <span>S</span>
      <span>Ω</span>
      <span>☻</span>
      <span>sans...</span>
      <span>16px</span>
      <span>段落</span>
      <span>•••</span>
    </div>
    <el-input v-model="modelValue" type="textarea" :rows="7" resize="none" />
  </div>

  <div v-else-if="formType === 'pic'" class="upload-field">
    <el-button text bg :icon="Plus" @click="mockUpload('图片')">上传图片</el-button>
  </div>

  <div v-else-if="formType === 'file'" class="upload-field">
    <el-button text bg :icon="Plus" @click="mockUpload('附件')">上传附件</el-button>
  </div>

  <el-input v-else v-model="modelValue" :placeholder="placeholder" />
</template>

<script setup>
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  fieldFrom: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['change'])

const key = computed(() => props.field.field || props.field.fieldName)
const formType = computed(() => props.field.formType || 'text')
const placeholder = computed(() => props.field.placeholder || props.field.inputTips || (formType.value === 'textarea' ? '请输入' : '请选择'))
const normalizedOptions = computed(() => {
  const rawOptions = props.field.setting?.length ? props.field.setting : (props.field.options ? String(props.field.options).split(',') : [])
  return rawOptions.map(option => {
    if (typeof option === 'object') {
      return {
        label: option.label || option.name || option.value,
        value: option.value ?? option.label ?? option.name
      }
    }
    return { label: option, value: option }
  })
})

const modelValue = computed({
  get() {
    return props.fieldFrom[key.value]
  },
  set(value) {
    props.fieldFrom[key.value] = value
    emit('change', props.field, value)
  }
})

function mockUpload(label) {
  // 原型模板只表达上传入口，不做真实文件流；值用于列表回显和契约定位。
  modelValue.value = [{ name: `${label}示例`, size: '0KB' }]
}
</script>
