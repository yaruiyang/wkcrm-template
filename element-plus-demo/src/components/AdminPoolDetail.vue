<template>
  <div v-if="modelValue" class="slide-view-root admin-pool-slide-root">
    <transition name="slide-fade" appear>
      <el-card
        class="slide-detail-card-container admin-pool-detail-card"
        data-section="admin-pool-detail-slide"
        :body-style="{ padding: 0, height: '100%' }"
      >
        <el-button class="close-btn" type="primary" aria-label="关闭" @click="$emit('update:modelValue', false)">
          <el-icon><Close /></el-icon>
        </el-button>
        <div v-if="row" class="admin-pool-detail-main">
          <div class="admin-pool-detail-header">
            <div class="admin-pool-detail-icon">海</div>
            <div>
              <div class="admin-pool-detail-title">{{ nameLabel }}</div>
              <div class="admin-pool-detail-name">{{ row.poolName }}</div>
            </div>
            <span class="admin-pool-detail-count">
              {{ countLabel }}：<strong>{{ countValue }} 个</strong>
            </span>
          </div>

          <div class="admin-pool-member">
            <div class="admin-pool-member-item">
              <div class="label">{{ adminLabel }}</div>
              <div class="value">
                <span
                  v-for="user in row.adminUser"
                  :key="user.id || user.userId"
                  class="admin-pool-avatar"
                  :title="user.realname"
                >
                  {{ avatarName(user.realname) }}
                </span>
              </div>
            </div>
            <div class="admin-pool-member-item">
              <div class="label">{{ memberLabel }}</div>
              <div class="value">
                <span
                  v-for="dept in row.memberDept"
                  :key="dept.deptId"
                  class="admin-pool-avatar is-dept"
                  :title="dept.name"
                >
                  {{ avatarName(dept.name) }}
                </span>
                <span
                  v-for="user in row.memberUser"
                  :key="user.id || user.userId"
                  class="admin-pool-avatar"
                  :title="user.realname"
                >
                  {{ avatarName(user.realname) }}
                </span>
              </div>
            </div>
          </div>

          <section class="create-sections admin-pool-detail-section">
            <div class="section-header">
              <span class="section-mark" />
              <span class="section-title">规则设置</span>
            </div>
            <div class="admin-pool-rule">
              <div class="admin-pool-rule-item">
                <div class="label">领取规则</div>
                <div class="value">{{ receiveLimitText(row) }}</div>
              </div>
              <div class="admin-pool-rule-item">
                <div class="label">领取频率规则</div>
                <div class="value">{{ receiveFrequencyText(row) }}</div>
              </div>
              <div class="admin-pool-rule-item">
                <div class="label">提醒规则</div>
                <div class="value">{{ remindText(row) }}</div>
              </div>
              <div class="admin-pool-rule-item">
                <div class="label">回收规则</div>
                <div class="value rule-value">
                  <template v-if="row.putInRule === 1">
                    <p v-for="rule in row.rule" :key="rule.id">{{ rule.label }}：{{ rule.text }}</p>
                  </template>
                  <template v-else>不自动回收</template>
                </div>
              </div>
              <div class="admin-pool-rule-item">
                <div class="label">自动分配</div>
                <div class="value rule-value">
                  <template v-if="row.autoAllot === 1">
                    <p>{{ row.allot?.allocationPlan || '按比例分配' }}</p>
                    <p>{{ row.allot?.triggerAction?.join('、') || '新数据进入池后分配' }}</p>
                  </template>
                  <template v-else>关闭</template>
                </div>
              </div>
              <div class="admin-pool-rule-item">
                <div class="label">{{ fieldLabel }}</div>
                <div class="value field-value">{{ visibleFieldText(row.field) }}</div>
              </div>
            </div>
          </section>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  poolType: {
    type: String,
    default: 'leads'
  },
  row: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue'])

const isLeads = computed(() => props.poolType === 'leads')
const nameLabel = computed(() => isLeads.value ? '线索池名称' : '公海名称')
const countLabel = computed(() => isLeads.value ? '线索数量' : '客户数量')
const adminLabel = computed(() => isLeads.value ? '线索池管理员' : '公海管理员')
const memberLabel = computed(() => isLeads.value ? '线索池成员' : '分配员工')
const fieldLabel = computed(() => isLeads.value ? '线索池字段' : '公海字段')
const countValue = computed(() => props.row?.leadsNum ?? props.row?.customerNum ?? 0)

function avatarName(name = '') {
  return name.slice(0, 1).toUpperCase()
}

function receiveLimitText(row) {
  if (row.preOwnerSetting === 1) return `前负责人 ${row.preOwnerSettingDay} 天内不能领取`
  if (row.preOwnerSetting === 2) return `所有人 ${row.preOwnerSettingDay} 天内不能领取`
  return '无限制'
}

function receiveFrequencyText(row) {
  if (row.receiveSetting === 1) return `每人每天最多领取 ${row.receiveNum} 个`
  if (row.receiveSetting === 2) return '不允许领取'
  return '无限制'
}

function remindText(row) {
  if (row.remindSetting === 1) return `提前 ${row.remindDay} 天提醒负责人`
  return '不提醒'
}

function visibleFieldText(fields = []) {
  return fields.filter(item => item.isHidden === 0).map(item => item.name).join('，')
}
</script>
