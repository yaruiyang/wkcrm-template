<template>
  <div class="main relative-stage-records" data-section="customer-stage">
    <div class="header">
      <div class="header-top">
        <div class="header-title">
          <span class="title-text">{{ detail.crmType }}阶段</span>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="small">推进至阶段【初步沟通】</el-button>
          <el-icon class="stage-full"><FullScreen /></el-icon>
        </div>
      </div>
      <div class="header-bottom">
        <CrmStageBar :status="detail.stageStatus" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { FullScreen } from '@element-plus/icons-vue'
import CrmStageBar from './CrmStageBar.vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>
