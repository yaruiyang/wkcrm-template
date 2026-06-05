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
                新建{{ moduleName }}
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
                    <div class="wk-form-items">
                      <template v-for="field in renderedFields" :key="field.field">
                        <el-form-item
                          v-if="field.formType === 'data_collapse'"
                          class="wk-form-item is-data_collapse"
                          :style="{ width: '100%' }"
                        >
                          <div class="wk-field-collapse">
                            <el-button link type="primary" @click="collapseVisible = !collapseVisible">
                              {{ collapseVisible ? '收起' : '展开' }}
                              <el-icon class="collapse-icon">
                                <component :is="collapseVisible ? ArrowUp : ArrowDown" />
                              </el-icon>
                            </el-button>
                          </div>
                        </el-form-item>
                        <el-form-item
                          v-else
                          class="wk-form-item"
                          :class="[`is-${field.formType}`, `is-field-${field.field}`, { 'is-required': field.isNull === 1 }]"
                          :label="field.name"
                          :required="field.isNull === 1"
                          :style="{ width: `${field.stylePercent || 50}%` }"
                        >
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

                          <template v-else-if="field.formType === 'map_address'">
                            <el-select
                              v-model="form[field.field]"
                              class="address-select"
                              placeholder="请选择省/市/区"
                            >
                              <el-option label="北京市 / 北京城区 / 东城区" value="beijing-dongcheng" />
                              <el-option label="江苏省 / 苏州市 / 工业园区" value="suzhou-park" />
                            </el-select>
                            <el-input
                              v-model="form.addressDetail"
                              class="address-detail"
                              type="textarea"
                              :rows="2"
                              resize="none"
                              placeholder="请输入详细地址"
                            />
                          </template>

                          <template v-else-if="field.formType === 'rich_text_format'">
                            <div class="rich-txt">
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
                              <el-input
                                v-model="form[field.field]"
                                type="textarea"
                                :rows="7"
                                resize="none"
                              />
                            </div>
                          </template>

                          <el-select
                            v-else-if="['select', 'customer_relations'].includes(field.formType)"
                            v-model="form[field.field]"
                            filterable
                            clearable
                            :placeholder="field.placeholder || '请选择'"
                          >
                            <el-option
                              v-for="option in field.setting"
                              :key="option.value || option"
                              :label="option.label || option"
                              :value="option.value || option"
                            />
                          </el-select>

                          <el-select
                            v-else-if="field.formType === 'checkbox'"
                            v-model="form[field.field]"
                            multiple
                            clearable
                            :placeholder="field.placeholder || '请选择'"
                          >
                            <el-option
                              v-for="option in field.setting"
                              :key="option.value || option"
                              :label="option.label || option"
                              :value="option.value || option"
                            />
                          </el-select>

                          <el-radio-group v-else-if="field.formType === 'radio'" v-model="form[field.field]">
                            <el-radio
                              v-for="option in field.setting"
                              :key="option.value || option"
                              :value="option.value || option"
                            >
                              {{ option.label || option }}
                            </el-radio>
                          </el-radio-group>

                          <div v-else-if="field.formType === 'pic'" class="upload-field">
                            <el-button text bg :icon="Plus">上传图片</el-button>
                          </div>

                          <el-input
                            v-else
                            v-model="form[field.field]"
                            :maxlength="field.maxlength || 100"
                            :placeholder="field.placeholder"
                          />
                        </el-form-item>
                      </template>
                    </div>
                  </el-form>
                </div>
              </section>
            </div>

            <div class="xr-create__footer">
              <el-button type="primary" @click="close">保存</el-button>
              <el-button text bg @click="close">{{ saveAndNewLabel }}</el-button>
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
import { ArrowDown, ArrowUp, Close, Plus } from '@element-plus/icons-vue'

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
  }
})

const emit = defineEmits(['update:modelValue'])

const collapseVisible = ref(false)
const fields = computed(() => props.fieldGroups.flatMap(group => group.fields || []))
const saveAndNewLabel = computed(() => props.moduleName === '客户' ? '保存并新建联系人' : `保存并新建${props.moduleName}`)
const form = reactive({ addressDetail: '123' })

const renderedFields = computed(() => {
  return fields.value.filter(field => {
    // data_collapse 之后的字段默认收起，点击展开后再进入表单布局。
    return !field.collapseOnly || collapseVisible.value
  })
})

watch(fields, resetForm, { immediate: true })

function resetForm(nextFields) {
  Object.keys(form).forEach((key) => {
    delete form[key]
  })
  form.addressDetail = '123'
  nextFields.forEach((field) => {
    if (field.formType !== 'data_collapse') {
      // mock 表单按字段类型初始化，保持和源码 fieldForm 的动态字段模型一致。
      form[field.field] = field.defaultValue ?? (field.formType === 'checkbox' ? [] : '')
    }
  })
}

function close() {
  emit('update:modelValue', false)
}
</script>
