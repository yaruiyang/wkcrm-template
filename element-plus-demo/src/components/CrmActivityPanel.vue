<template>
  <div data-section="detail-activity">
    <div class="activity">
      <div class="activity-tabs">
        <button
          v-for="(item, index) in detail.activityTabs"
          :key="item"
          :class="['activity-tab', { 'is-active': index === 0 }]"
          type="button"
        >
          <el-icon><component :is="activityIconMap[item]" /></el-icon>
          {{ item }}
        </button>
        <el-button class="activity-filter" text bg><el-icon><Operation /></el-icon></el-button>
      </div>
      <div class="activity-input">添加日程...</div>
    </div>

    <div class="activity todo-card">
      <div class="panel-head"><span><el-icon><Calendar /></el-icon>待处理及逾期</span><el-icon><ArrowDown /></el-icon></div>
      <div class="empty-todo">
        <div>
          <strong>暂无待处理事项</strong>
          <div>已安排的任务、日程及预定的会议会在此处展示</div>
          <div class="empty-actions">＋ 创建日程　　＋ 创建任务</div>
        </div>
      </div>
    </div>

    <div class="activity">
      <div class="panel-head"><span><el-icon><ChatLineRound /></el-icon>活动</span><el-icon><ArrowDown /></el-icon></div>
      <div class="activity-filter-row">
        <span>显示:</span>
        <el-button text bg class="el-button--selected">全部</el-button>
        <el-button text bg>跟进记录(7)</el-button>
        <el-button text bg>任务</el-button>
        <el-button text bg>日程</el-button>
        <el-button text bg>发邮件</el-button>
        <el-button text bg>通话记录</el-button>
        <el-button text bg>动态(76)</el-button>
      </div>
      <div class="activity-timeline">
        <div
          v-for="item in detail.activities"
          :key="`${item.type}-${item.time}`"
          class="activity-item"
        >
          <div class="activity-node"><el-icon><Money /></el-icon></div>
          <div class="activity-content">
            <div class="activity-title">
              <span class="activity-user">{{ item.user }}</span>
              <span>{{ item.title }}</span>
            </div>
            <div v-if="item.number" class="activity-number">
              回款编号：<span class="can-visit--underline">{{ item.number }}</span>
              <span v-if="item.status" class="status-pill is-warning">{{ item.status }}</span>
            </div>
            <div class="activity-time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown, Calendar, ChatLineRound, Checked, Message, Money, Operation } from '@element-plus/icons-vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const activityIconMap = {
  日程: Calendar,
  跟进记录: ChatLineRound,
  任务: Checked,
  发邮件: Message
}
</script>
