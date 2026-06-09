<template>
  <div class="stage-view" data-section="stage-view">
    <div class="staget-list-wrap">
      <div
        v-for="(stage, index) in stageFlow.settingList"
        :key="stage.settingId"
        class="stage-list"
      >
        <div class="stage-header" :class="{ 'is-first': index === 0 }">
          <span v-if="!stage.isEnd">{{ index < 9 ? `0${index + 1}` : index + 1 }}&nbsp;&nbsp;</span>
          <span class="text-one-line">{{ stage.settingName }}</span>
          <span>（{{ stage.count }}个）</span>
        </div>
        <div class="stage-wrapper">
          <div class="stage-body">
            <article
              v-for="row in stage.rows"
              :key="row.__rowUid"
              class="business-item"
              @click="$emit('open-detail', row)"
            >
              <div class="title text-one-line">
                <el-icon class="module-icon"><Grid /></el-icon>
                <span class="can-visit--underline">{{ row[mainField] }}</span>
              </div>
              <div class="main-info">
                <div class="main-info-item">
                  <span class="label">客户级别</span>
                  <span class="value">{{ row.level }}</span>
                </div>
                <div class="main-info-item">
                  <span class="label">成交状态</span>
                  <span class="value">{{ row.dealStatus ? '已成交' : '未成交' }}</span>
                </div>
                <div class="main-info-item">
                  <span class="label">负责人</span>
                  <span class="value">{{ row.ownerUserName }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Grid } from '@element-plus/icons-vue'

defineProps({
  stageFlow: {
    type: Object,
    required: true
  },
  mainField: {
    type: String,
    default: 'customerName'
  }
})

defineEmits(['open-detail'])
</script>
