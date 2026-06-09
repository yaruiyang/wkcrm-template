<template>
  <div
    v-if="modelValue && employee"
    class="admin-employee-detail-overlay"
    data-section="admin-employee-detail-overlay"
    @click.self="close"
  >
    <aside class="admin-employee-detail d-view" data-section="admin-employee-detail">
      <button class="admin-employee-detail__close" type="button" aria-label="关闭" @click="close">
        <el-icon><Close /></el-icon>
      </button>

      <div class="admin-employee-detail__main">
        <div class="admin-employee-detail__body">
          <div class="content-header admin-employee-detail__header">
            <div class="dialog-top">
              <div class="xr-avatar admin-employee-avatar" data-section="admin-employee-detail-avatar">
                <img v-if="employee.img" :src="employee.img" :alt="employee.realname" />
                <span v-else>{{ employeeInitial }}</span>
              </div>
              <div class="user-name" data-section="admin-employee-detail-name">
                <span>{{ employee.realname }}</span>
                <el-button-group v-if="pageList.length > 1" class="wk-header-page-btn">
                  <el-button text :icon="ArrowLeft" @click="pageChange('left')" />
                  <el-button text :icon="ArrowRight" @click="pageChange('right')" />
                </el-button-group>
              </div>
              <div class="dialog-btn-group">
                <el-button type="primary" @click="$emit('edit', employee)">编辑</el-button>
                <el-dropdown trigger="click" @command="$emit('action', $event, employee)">
                  <el-button class="dropdown-btn" text bg :icon="MoreFilled" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="reset">重置密码</el-dropdown-item>
                      <el-dropdown-item command="status">{{ employee.status === '停用' ? '激活' : '停用' }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div class="dialog-remark">
              <p><span>账号状态：</span>{{ employee.status || '--' }}</p>
              <p><span>创建时间：</span>{{ employee.createTime || '--' }}</p>
            </div>
          </div>

          <div class="dialog-content" data-section="admin-employee-detail-fields">
            <div v-for="item in detailList" :key="item.field" class="content-items">
              <div class="content-items-name">{{ item.label }}</div>
              <div class="content-items-value">{{ getValue(item.field) }}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowLeft, ArrowRight, Close, MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  employee: {
    type: Object,
    default: null
  },
  pageList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'update:employee', 'edit', 'action'])

const detailList = [
  { field: 'username', label: '手机号（登录名）' },
  { field: 'realname', label: '姓名' },
  { field: 'sex', label: '性别' },
  { field: 'email', label: '邮箱' },
  { field: 'deptName', label: '主部门' },
  { field: 'subsidiaryDeptName', label: '附属部门' },
  { field: 'post', label: '岗位' },
  { field: 'parentName', label: '直属上级' },
  { field: 'roleName', label: '角色' }
]

const currentIndex = computed(() => {
  if (!props.employee) return -1
  return props.pageList.findIndex(item => item.userId === props.employee.userId)
})

const employeeInitial = computed(() => {
  const name = props.employee?.realname || ''
  return name.slice(0, 1).toUpperCase()
})

function close() {
  emit('update:modelValue', false)
}

function pageChange(type) {
  const nextIndex = type === 'left'
    ? Math.max(0, currentIndex.value - 1)
    : Math.min(props.pageList.length - 1, currentIndex.value + 1)

  if (nextIndex >= 0 && nextIndex !== currentIndex.value) {
    emit('update:employee', props.pageList[nextIndex])
  }
}

function getValue(field) {
  const value = props.employee?.[field]
  if (field === 'sex') {
    return value || '--'
  }
  return value || '--'
}
</script>
