<template>
  <div
    class="timeline-item"
    data-section="detail-follow-record"
  >
    <div class="timeline-left">
      <div class="timeline-dot">
        <i :class="isFollow ? 'wk wk-icon-message-line' : 'wk wk-customer'" />
      </div>
    </div>

    <div class="timeline-right">
      <div
        v-if="isFollow"
        class="fl-c is-follow-record"
      >
        <div class="fl-h">
          <div class="fl-h-b">
            <div class="fl-h-name">
              <span class="realname">{{ createUserName }}</span>
              <span class="record-name">客户跟进记录</span>
              <el-tag v-if="item.category" type="info">{{ item.category }}</el-tag>
            </div>
          </div>
          <div class="more-drop">
            <i class="wk wk-copy copy-btn" />
            <i class="wk wk-icon-edit-line copy-btn" />
            <i class="wk wk-delete copy-btn" />
            <i class="wk wk-icon-more copy-btn" />
          </div>
        </div>

        <div class="fl-b">
          <div class="fl-b-content">{{ item.content || item.title }}</div>
          <div v-if="item.visitPlanName || item.visitPlanId" class="cell">
            <span class="cell-label">拜访计划</span>
            <span class="cell-value">{{ item.visitPlanName || item.visitPlanId }}</span>
          </div>
          <div class="cell">
            <span class="cell-label">提醒团队成员</span>
            <span class="cell-value">{{ remindTeamMemberText }}</span>
          </div>
          <div v-if="item.nextTime" class="cell cell-next-time">
            <i class="wk wk-time" />
            <span class="cell-label">下次联系时间：</span>
            <span class="cell-value">{{ item.nextTime }}</span>
          </div>
          <div class="flex-cell">
            <span class="flex-cell-hd">有效跟进人：</span>
            <span class="flex-cell-bd">{{ validUserText }}</span>
          </div>
          <div class="handle-bar">
            <span class="handle-tag"><i class="wk wk-expression" />标记有效</span>
            <span class="handle-tag"><i class="wk wk-icon-sad-l" />无效</span>
            <span class="handle-tag"><i class="wk wk-icon-message-line" />评论</span>
            <span class="handle-tag"><i class="wk wk-praise" />{{ item.favour ? item.favour : '' }}</span>
          </div>
        </div>

        <div class="fl-footer">
          <span>{{ item.createTime || item.time }}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>由 {{ createUserName }} 创建</span>
        </div>
      </div>

      <div v-else class="fl-c is-dynamic">
        <div class="fl-h">
          <div class="fl-h-name">
            <span class="realname">{{ item.user }}</span>
            <span>{{ item.action }}</span>
            <span v-if="item.object" class="can-visit--underline">{{ item.object }}</span>
          </div>
        </div>
        <div class="fl-footer">
          <span>{{ item.time || item.createTime }}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>由 {{ item.user }} 创建</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  kind: {
    type: String,
    default: 'followRecord'
  }
})

const isFollow = computed(() => props.kind === 'followRecord' || props.item.type === 1)
const item = computed(() => props.item)
const createUserName = computed(() => item.value.createUser?.realname || item.value.createUserName || item.value.user || 'admin')
const remindTeamMemberText = computed(() => {
  const members = item.value.remindTeamMembers || item.value.teamMember || []
  const names = members.map(member => typeof member === 'string' ? member : member.realname).filter(Boolean)
  return names.length ? names.join('、') : ''
})
const validUserText = computed(() => {
  const members = item.value.teamMember || []
  const names = members.map(member => member.realname).filter(Boolean)
  return names.length ? names.join('、') : ''
})
</script>
