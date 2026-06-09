<template>
  <div class="wk-form-items">
    <el-form-item
      v-for="(field, index) in fieldList"
      :key="fieldKey(field)"
      class="wk-form-item"
      :class="[`is-${field.formType}`, `is-field-${fieldKey(field)}`, { 'is-required': isRequired(field) }]"
      :label="field.name"
      :required="isRequired(field)"
      :style="{ width: `${field.stylePercent || 50}%` }"
    >
      <slot :field="field" :index="index">
        <DemoWkField
          :field="field"
          :field-from="fieldFrom"
          @change="(...args) => fieldChange(field, index, args[1])"
        />
      </slot>
    </el-form-item>
  </div>
</template>

<script setup>
import DemoWkField from './DemoWkField.vue'

defineProps({
  fieldList: {
    type: Array,
    default: () => []
  },
  fieldFrom: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['field-change'])

function fieldKey(field) {
  return field.field || field.fieldName
}

function isRequired(field) {
  return field.isNull === 1 || field.required === true
}

function fieldChange(field, index, value) {
  emit('field-change', field, index, value)
}
</script>
