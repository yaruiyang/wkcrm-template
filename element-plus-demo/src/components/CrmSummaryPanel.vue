<template>
  <aside class="wk-head-section wrap summary-card" data-section="detail-summary">
    <div class="section-head">
      <div class="section-title text-one-line">{{ detail.crmType }}摘要</div>
      <div class="section-right"><el-icon><ArrowDown /></el-icon></div>
    </div>
    <div class="section-body summary-body">
      <div
        v-for="item in detail.abstractList"
        :key="item.title"
        class="wk-section-item summary-item"
      >
        <div class="item-label summary-label">
          {{ item.title }}<el-icon v-if="item.help" class="summary-help"><QuestionFilled /></el-icon>
        </div>
        <div class="item-content summary-value">{{ item.value }}<span>{{ item.unit }}</span></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ArrowDown, QuestionFilled } from '@element-plus/icons-vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>
