<template>
  <div class="detail-head-wrap" data-section="detail-header">
    <div class="wk-detail-header">
      <div class="wk-detail-header-subtitle">{{ detail.crmType }}</div>
      <div class="wk-detail-header-body">
        <div class="wk-detail-header-left">
          <span class="wk-detail-header-title text-one-line">{{ detail.customerName }}</span>
          <el-icon
            :class="['focus-icon', 'is-clickable', { active: detail.star }]"
            @click="$emit('favoriteToggle')"
          >
            <StarFilled v-if="detail.star" />
            <Star v-else />
          </el-icon>
          <span :class="['status-pill', detail.dealStatus ? 'is-success' : 'is-warning']">
            {{ detail.dealStatus ? '已成交' : '未成交' }}
          </span>
        </div>
        <div class="wk-detail-header-right">
          <el-button type="primary" @click="$emit('edit')"><el-icon><EditPen /></el-icon><span>编辑</span></el-button>
        </div>
      </div>
    </div>

    <div class="detail-base">
      <div
        v-for="item in detail.headBase"
        :key="item.title"
        class="base-item"
      >
        <div class="base-title">{{ item.title }}:</div>
        <div class="base-value text-one-line">
          <span :class="{ 'is-link': item.formType === 'link' }">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EditPen, Star, StarFilled } from '@element-plus/icons-vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'favoriteToggle'])
</script>
