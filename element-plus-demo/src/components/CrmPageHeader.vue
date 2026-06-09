<template>
  <div class="wk-page-header" data-section="crm-list-header">
    <div class="wk-page-header__left">
      <el-icon class="wk-page-header__icon"><Grid /></el-icon>
      <span class="wk-page-header-title">{{ title }}</span>
      <el-icon class="wk-help-tips"><QuestionFilled /></el-icon>
    </div>

    <div class="wk-page-header__right">
      <el-button type="primary" :icon="Plus" @click="$emit('create')">新建{{ moduleName }}</el-button>
      <el-button text bg :icon="CopyDocument" @click="$emit('dedupe')">查重</el-button>
      <el-button class="dropdown-button" text bg :icon="Upload" title="导入" @click="$emit('import')" />
      <el-button class="dropdown-button" text bg :icon="Download" title="导出" @click="$emit('export')" />
    </div>
  </div>
</template>

<script setup>
import { CopyDocument, Download, Grid, Plus, QuestionFilled, Upload } from '@element-plus/icons-vue'

defineProps({
  title: {
    type: String,
    default: '客户管理'
  },
  moduleName: {
    type: String,
    default: '客户'
  }
})

defineEmits(['create', 'dedupe', 'export', 'import'])
</script>
