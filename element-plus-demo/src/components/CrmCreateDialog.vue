<template>
  <teleport to="body">
    <transition name="opacity-fade" appear>
      <div
        v-show="modelValue"
        class="c-view create-view"
        data-section="create-modal"
      >
        <el-card
          class="create-view-content"
          :body-style="{ height: '100%' }"
        >
          <div class="xr-create">
            <div class="xr-create__header">
              <div class="title">
                {{ mode === 'edit' ? '编辑' : '新建' }}{{ moduleName }}
                <i class="wk wk-icon-fill-help wk-help-tips" data-type="8" data-id="35" />
              </div>
              <el-button
                class="close"
                text
                :icon="Close"
                @click="close"
              />
            </div>

            <div class="xr-create__body">
              <section class="section create-sections">
                <div class="section-header">
                  <div class="section-mark" />
                  <div class="section-title">基本信息</div>
                </div>
                <div class="content create-sections-content">
                  <el-form
                    ref="crmFormRef"
                    class="wk-form"
                    label-position="top"
                    :model="form"
                    :validate-on-rule-change="false"
                  >
                    <DemoWkFormItems
                      :field-list="renderedFields"
                      :field-from="form"
                      @field-change="handleFieldChange"
                    >
                      <template #default="{ field }">
                        <template v-if="field.field === 'customerName'">
                          <el-input
                            v-model="form[field.field]"
                            :maxlength="100"
                            :placeholder="field.placeholder"
                          />
                          <el-button
                            text
                            class="wk-premium-info-btn"
                            data-type="BusinessInformation"
                          >
                            <i class="wk wk-icon-lightning-solid wk-premium-info-icon" />
                            <span class="wk-premium-info-label">工商信息</span>
                          </el-button>
                        </template>
                        <DemoWkField
                          v-else
                          :field="field"
                          :field-from="form"
                          @change="handleFieldChange"
                        />
                      </template>
                    </DemoWkFormItems>
                  </el-form>
                </div>
              </section>
            </div>

            <div class="xr-create__footer">
              <el-button type="primary" @click="save">保存</el-button>
              <el-button text bg @click="close">取消</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import DemoWkField from './DemoWkField.vue'
import DemoWkFormItems from './DemoWkFormItems.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  moduleName: {
    type: String,
    default: '客户'
  },
  fieldGroups: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'create'
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

const fields = computed(() => props.fieldGroups.flatMap(group => group.fields || []))
const form = reactive({ addressDetail: '苏州工业园区星港街 88 号' })

const renderedFields = computed(() => {
  return fields.value
})

watch([fields, () => props.initialData, () => props.modelValue], () => {
  if (props.modelValue) {
    resetForm(fields.value)
  }
}, { immediate: true })

function resetForm(nextFields) {
  Object.keys(form).forEach((key) => {
    delete form[key]
  })
  form.addressDetail = '苏州工业园区星港街 88 号'
  nextFields.forEach((field) => {
    // mock 表单按字段类型初始化，保持和源码 fieldForm 的动态字段模型一致。
    form[field.field] = props.initialData[field.field] ?? field.defaultValue ?? (isMultiField(field) ? [] : '')
  })
}

function isMultiField(field) {
  return field.formType === 'checkbox' || field.isMulti === 1
}

function save() {
  emit('save', { ...form })
  close()
}

function handleFieldChange() {}

function close() {
  emit('update:modelValue', false)
}
</script>
