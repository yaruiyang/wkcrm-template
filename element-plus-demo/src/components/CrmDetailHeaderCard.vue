<template>
  <div class="detail-head-wrap" data-section="detail-header">
    <div class="wk-detail-header">
      <div class="wk-detail-header-subtitle">{{ detail.crmType }}</div>
      <div class="wk-detail-header-body">
        <div class="wk-detail-header-left">
          <span class="wk-detail-header-title text-one-line">{{ detail.customerName }}</span>
          <span class="focus-icon">☆</span>
          <span :class="['status-pill', detail.dealStatus ? 'is-success' : 'is-warning']">
            {{ detail.dealStatus ? '已成交' : '未成交' }}
          </span>
          <el-button-group class="wk-detail-header-page-switch">
            <el-button text><el-icon><ArrowLeft /></el-icon></el-button>
            <el-button text><el-icon><ArrowRight /></el-icon></el-button>
          </el-button-group>
        </div>
        <div class="wk-detail-header-right">
          <el-button type="primary"><el-icon><EditPen /></el-icon><span>编辑</span></el-button>
          <el-button text bg><el-icon><MoreFilled /></el-icon></el-button>
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

    <div class="wk-quick-create-bar">
      <el-button text bg class="wk-quick-create-trigger"><el-icon><Plus /></el-icon><span>新建</span></el-button>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight, EditPen, MoreFilled, Plus } from '@element-plus/icons-vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>
