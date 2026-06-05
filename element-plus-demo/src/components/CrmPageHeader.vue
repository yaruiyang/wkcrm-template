<template>
  <div class="wk-page-header" data-section="crm-list-header">
    <div class="wk-page-header__left">
      <span class="wk-page-header__icon">▦</span>
      <span class="wk-page-header-title">{{ title }}</span>
      <span class="wk-help-tips">?</span>
    </div>

    <div class="wk-page-header__right">
      <el-button type="primary" :icon="Plus" @click="$emit('create')">新建{{ moduleName }}</el-button>
      <el-button text bg :icon="CopyDocument">查重</el-button>
      <el-button class="dropdown-button" text bg :icon="Download" title="导出" />
      <el-button class="dropdown-button" text bg :icon="Upload" title="导入" />
    </div>
  </div>
</template>

<script setup>
import { CopyDocument, Download, Plus, Upload } from '@element-plus/icons-vue'

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

defineEmits(['create'])
</script>
