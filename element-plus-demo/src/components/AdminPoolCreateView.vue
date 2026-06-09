<template>
  <div
    v-if="modelValue"
    class="c-view create-view admin-pool-create-view"
    data-section="admin-pool-create-view"
  >
    <el-card class="create-view-content">
      <div class="xr-create">
        <header class="xr-create__header">
          <div class="title">{{ row ? `编辑${shortName}` : config.createText }}</div>
          <button class="close" type="button" aria-label="关闭" @click="closeView">
            <el-icon><Close /></el-icon>
          </button>
        </header>

        <div class="xr-create__body">
          <section class="create-sections admin-pool-create-section">
            <div class="section-header">
              <span class="section-mark" />
              <span class="section-title">基本信息</span>
            </div>
            <el-form label-position="top" class="pool-add-items">
              <el-form-item class="pool-add-item pool-add-item__left" :label="nameLabel" required>
                <el-input v-model="form.poolName" maxlength="100" />
              </el-form-item>
              <el-form-item class="pool-add-item pool-add-item__right" required>
                <template #label>
                  <span>{{ adminLabel }}</span>
                  <span class="wk-help-tips" aria-hidden="true">?</span>
                </template>
                <el-select v-model="form.adminUserIds" multiple collapse-tags collapse-tags-tooltip style="width: 100%;">
                  <el-option
                    v-for="user in config.mockUsers"
                    :key="user.id || user.userId"
                    :label="user.realname"
                    :value="user.id || user.userId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="pool-add-item pool-add-item__left" required>
                <template #label>
                  <span>{{ memberLabel }}</span>
                  <span class="wk-help-tips" aria-hidden="true">?</span>
                </template>
                <div class="admin-pool-member-select">
                  <el-select v-model="form.memberUserIds" multiple collapse-tags collapse-tags-tooltip placeholder="选择员工" style="width: 100%;">
                    <el-option
                      v-for="user in config.mockUsers"
                      :key="user.id || user.userId"
                      :label="user.realname"
                      :value="user.id || user.userId"
                    />
                  </el-select>
                  <el-select v-model="form.memberDeptIds" multiple collapse-tags collapse-tags-tooltip placeholder="选择部门" style="width: 100%;">
                    <el-option
                      v-for="dept in config.mockDepartments"
                      :key="dept.deptId"
                      :label="dept.name"
                      :value="dept.deptId"
                    />
                  </el-select>
                  <el-checkbox v-model="form.isNeedChild" :true-value="1" :false-value="0">包含下级部门</el-checkbox>
                </div>
              </el-form-item>
            </el-form>
          </section>

          <section class="create-sections admin-pool-create-section">
            <div class="section-header">
              <span class="section-mark" />
              <span class="section-title">规则设置</span>
            </div>

            <div class="admin-pool-create-rules">
              <div class="admin-pool-create-row">
                <div class="row-label">领取限制</div>
                <div class="row-content">
                  <el-radio-group v-model="form.preOwnerSetting">
                    <el-radio :value="0">无限制</el-radio>
                    <el-radio :value="1">限制前负责人</el-radio>
                    <el-radio :value="2">限制所有人</el-radio>
                  </el-radio-group>
                  <div v-if="form.preOwnerSetting !== 0" class="xr-input">
                    <span>{{ form.preOwnerSetting === 1 ? '前负责人' : '所有人' }}</span>
                    <el-input-number v-model="form.preOwnerSettingDay" :min="1" :max="365" controls-position="right" />
                    <span>天内不能领取</span>
                  </div>
                </div>
              </div>

              <div class="admin-pool-create-row">
                <div class="row-label">领取频率规则</div>
                <div class="row-content">
                  <el-radio-group v-model="form.receiveSetting">
                    <el-radio :value="0">无限制</el-radio>
                    <el-radio :value="1">限制领取数量</el-radio>
                    <el-radio :value="2">不允许领取</el-radio>
                  </el-radio-group>
                  <div v-if="form.receiveSetting === 1" class="xr-input">
                    <span>每人每天最多领取</span>
                    <el-input-number v-model="form.receiveNum" :min="1" :max="999" controls-position="right" />
                    <span>{{ isLeads ? '条线索' : '个客户' }}</span>
                  </div>
                </div>
              </div>

              <div class="admin-pool-create-row">
                <div class="row-label">提醒规则</div>
                <div class="row-content">
                  <el-radio-group v-model="form.remindSetting">
                    <el-radio :value="0">不提醒</el-radio>
                    <el-radio :value="1">提醒</el-radio>
                  </el-radio-group>
                  <div v-if="form.remindSetting === 1" class="xr-input">
                    <span>提前</span>
                    <el-input-number v-model="form.remindDay" :min="1" :max="30" controls-position="right" />
                    <span>天提醒负责人</span>
                  </div>
                </div>
              </div>

              <div class="admin-pool-create-row">
                <div class="row-label">回收规则</div>
                <div class="row-content">
                  <el-radio-group v-model="form.putInRule">
                    <el-radio :value="1">自动回收</el-radio>
                    <el-radio :value="0">不自动回收</el-radio>
                  </el-radio-group>
                  <div v-if="form.putInRule === 1" class="admin-pool-recycle-list">
                    <div v-for="rule in form.rule" :key="rule.id" class="admin-pool-recycle-row">
                      <span>{{ rule.label }}</span>
                      <el-input v-model="rule.text" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="admin-pool-create-row">
                <div class="row-label">自动分配</div>
                <div class="row-content">
                  <el-radio-group v-model="form.autoAllot">
                    <el-radio :value="1">开启</el-radio>
                    <el-radio :value="0">关闭</el-radio>
                  </el-radio-group>
                  <div v-if="form.autoAllot === 1" class="admin-pool-allot-rule">
                    <el-radio-group v-model="form.allot.allocationPlan">
                      <el-radio label="按比例分配">按比例分配</el-radio>
                      <el-radio label="按数量分配">按数量分配</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-model="form.allot.triggerAction">
                      <el-checkbox label="新数据进入池后分配" />
                      <el-checkbox :label="isLeads ? '线索重新分配后触发' : '客户重新分配后触发'" />
                    </el-checkbox-group>
                  </div>
                </div>
              </div>

              <div class="admin-pool-create-row">
                <div class="row-label">{{ fieldLabel }}</div>
                <div class="row-content">
                  <div class="field-set">
                    <div class="field-set__name">选择{{ fieldLabel }}</div>
                    <el-checkbox-group v-model="form.visibleFieldKeys" class="admin-pool-field-list">
                      <el-checkbox
                        v-for="field in config.poolFields"
                        :key="field.key"
                        :label="field.key"
                      >
                        {{ field.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer class="xr-create__footer">
          <el-button @click="closeView">取消</el-button>
          <el-button type="primary" :disabled="!form.poolName" @click="saveView">保存</el-button>
        </footer>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
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
  config: {
    type: Object,
    required: true
  },
  row: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

const form = ref(buildForm())
const isLeads = computed(() => props.poolType === 'leads')
const shortName = computed(() => isLeads.value ? '线索池' : '客户公海')
const nameLabel = computed(() => isLeads.value ? '线索池名称' : '公海名称')
const adminLabel = computed(() => isLeads.value ? '线索池管理员' : '公海管理员')
const memberLabel = computed(() => isLeads.value ? '线索池成员' : '分配员工')
const fieldLabel = computed(() => isLeads.value ? '线索池字段' : '公海字段')

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildForm() {
  const source = props.row || props.config.defaultForm || {}
  const fieldSource = source.field || props.config.poolFields || []
  return {
    poolName: source.poolName || props.config.defaultForm?.poolName || '',
    adminUserIds: (source.adminUser || props.config.defaultForm?.adminUser || []).map(item => item.id || item.userId),
    memberUserIds: (source.memberUser || props.config.defaultForm?.memberUser || []).map(item => item.id || item.userId),
    memberDeptIds: (source.memberDept || props.config.defaultForm?.memberDept || []).map(item => item.deptId),
    isNeedChild: source.isNeedChild ?? props.config.defaultForm?.isNeedChild ?? 1,
    preOwnerSetting: source.preOwnerSetting ?? props.config.defaultForm?.preOwnerSetting ?? 0,
    preOwnerSettingDay: source.preOwnerSettingDay ?? props.config.defaultForm?.preOwnerSettingDay ?? 7,
    receiveSetting: source.receiveSetting ?? props.config.defaultForm?.receiveSetting ?? 1,
    receiveNum: source.receiveNum ?? props.config.defaultForm?.receiveNum ?? 10,
    remindSetting: source.remindSetting ?? props.config.defaultForm?.remindSetting ?? 1,
    remindDay: source.remindDay ?? props.config.defaultForm?.remindDay ?? 3,
    putInRule: source.putInRule ?? props.config.defaultForm?.putInRule ?? 1,
    rule: clone(source.rule || props.config.defaultForm?.rule || []),
    autoAllot: source.autoAllot ?? props.config.defaultForm?.autoAllot ?? 1,
    allot: clone(source.allot || props.config.defaultForm?.allot || { allocationPlan: '按比例分配', triggerAction: ['新数据进入池后分配'] }),
    visibleFieldKeys: fieldSource.filter(item => item.isHidden === 0).map(item => item.key)
  }
}

function usersByIds(ids) {
  return props.config.mockUsers.filter(user => ids.includes(user.id || user.userId))
}

function deptsByIds(ids) {
  return props.config.mockDepartments.filter(dept => ids.includes(dept.deptId))
}

function receiveRuleText(data) {
  if (data.receiveSetting === 1) return `每人每天领取 ${data.receiveNum} ${isLeads.value ? '条' : '个'}`
  if (data.receiveSetting === 2) return '暂停领取'
  return '不限制领取'
}

function recycleRuleText(data) {
  if (data.putInRule === 0) return '不自动回收'
  return data.rule.map(item => item.text).join('；')
}

function saveView() {
  const data = form.value
  const field = props.config.poolFields.map(item => ({
    ...item,
    isHidden: data.visibleFieldKeys.includes(item.key) ? 0 : 1
  }))
  emit('save', {
    poolName: data.poolName,
    adminUser: usersByIds(data.adminUserIds),
    memberUser: usersByIds(data.memberUserIds),
    memberDept: deptsByIds(data.memberDeptIds),
    isNeedChild: data.isNeedChild,
    preOwnerSetting: data.preOwnerSetting,
    preOwnerSettingDay: data.preOwnerSettingDay,
    receiveSetting: data.receiveSetting,
    receiveNum: data.receiveNum,
    remindSetting: data.remindSetting,
    remindDay: data.remindDay,
    putInRule: data.putInRule,
    rule: clone(data.rule),
    autoAllot: data.autoAllot,
    allot: clone(data.allot),
    field,
    receiveRule: receiveRuleText(data),
    recycleRule: recycleRuleText(data),
    allotRule: data.autoAllot === 1 ? data.allot.allocationPlan : '手动分配'
  })
}

function closeView() {
  emit('update:modelValue', false)
}

watch(() => [props.modelValue, props.row, props.config], () => {
  if (props.modelValue) form.value = buildForm()
}, { immediate: true, deep: true })
</script>
