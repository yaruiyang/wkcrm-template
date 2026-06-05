<template>
  <section
    v-if="!designerVisible"
    class="system-customer main admin-custom-field-page"
    data-section="admin-fields-list"
  >
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">自定义字段设置</div>
    </header>
    <div class="main-body admin-main-body">
      <el-table
        class="admin-source-table"
        :data="customFieldModules"
        :height="fieldModuleTableHeight"
      >
        <el-table-column label="模块图标" width="100">
          <template #default="{ row }">
            <div class="table-icon"><i :class="row.icon" /></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模块" show-overflow-tooltip />
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openDesigner(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>

  <section
    v-else
    class="admin-field-designer fields-index body"
    data-section="admin-field-designer"
  >
    <aside class="body-left" data-section="admin-field-library">
      <div class="body-left_title">
        字段类型
        <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
      </div>
      <div class="lib-wrapper">
        <button
          v-for="item in fieldTypeLib"
          :key="item.formType"
          type="button"
          class="lib-item text-one-line"
        >
          <i :class="item.icon" class="lib-item-icon" />
          <span>{{ item.name }}</span>
        </button>
      </div>
    </aside>

    <main class="body-content">
      <div class="body-content-warp" data-section="admin-field-canvas">
        <el-header>
          <div class="title">编辑{{ activeModule?.name || '客户' }}字段</div>
          <div>
            <el-button type="primary">保存</el-button>
            <el-button text bg @click="designerVisible = false">返回</el-button>
          </div>
        </el-header>
        <div class="body-content-main">
          <el-main>
            <el-form
              v-for="row in designerFields"
              :key="row.map(item => item.formAssistId).join('-')"
              class="field-row"
              label-position="top"
            >
              <div
                v-for="field in row"
                :key="field.formAssistId"
                class="field-item"
                :class="{ activate: activeField?.formAssistId === field.formAssistId }"
                :style="{ flexBasis: `${field.stylePercent}%` }"
                @click="activeField = field"
              >
                <el-form-item :label="field.name" :required="field.required">
                  <el-input v-if="field.formType !== 'textarea'" :placeholder="`请输入${field.name}`" />
                  <el-input v-else type="textarea" rows="3" :placeholder="`请输入${field.name}`" />
                </el-form-item>
                <span class="field-drag-handle" aria-hidden="true" />
              </div>
            </el-form>
          </el-main>
        </div>
      </div>
    </main>

    <aside class="body-right" data-section="admin-field-setting">
      <div class="field-setting">
        <div class="setting-title">单行文本</div>
        <div class="setting-body">
          <div class="item-section">
            <div class="name"><span>*</span>标识名</div>
            <el-input :model-value="activeField?.name || '客户名称'" />
            <div class="input-tips">标识名不能为空</div>
          </div>
          <div class="item-section">
            <div class="name">说明文字</div>
            <el-input :model-value="activeField?.inputTips || ''" :rows="3" type="textarea" resize="none" />
            <div class="input-tips">显示在字段右侧</div>
          </div>
          <div class="item-section">
            <div class="name">字段占比 %</div>
            <el-radio-group :model-value="activeField?.stylePercent || 50" size="small">
              <el-radio-button :value="25">25</el-radio-button>
              <el-radio-button :value="50">50</el-radio-button>
              <el-radio-button :value="75">75</el-radio-button>
              <el-radio-button :value="100">100</el-radio-button>
            </el-radio-group>
          </div>
          <div class="item-section">
            <div class="item-check-section is-flex">
              <el-checkbox :model-value="Boolean(activeField?.required)">设置为必填</el-checkbox>
              <i class="wk wk-icon-fill-help wk-help-tips" data-type="27" data-id="243" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { customFieldModules, designerFields, fieldTypeLib } from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const designerVisible = ref(false)
const activeModule = ref(customFieldModules[1])
const activeField = ref(designerFields[0][0])
const fieldModuleTableHeight = ref(320)

function updateFieldModuleTableHeight() {
  // 源码自定义字段入口表格仅扣除页面标题和少量间距。
  fieldModuleTableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminFieldEntryTableOffset)
}

function openDesigner(row) {
  activeModule.value = row
  activeField.value = designerFields[0][0]
  designerVisible.value = true
}

onMounted(() => {
  updateFieldModuleTableHeight()
  window.addEventListener('resize', updateFieldModuleTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFieldModuleTableHeight)
})
</script>
