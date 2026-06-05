<template>
  <div class="admin-shell admin-layout" data-section="admin-shell">
    <aside class="sidebar-container admin-global-side" data-section="admin-global-side">
      <div class="sidebar-container-main">
        <el-scrollbar wrap-class="scrollbar-wrapper" :min-size="10">
          <div class="main-menu">
            <div
              v-for="item in adminManageMenu"
              :key="item.key"
              class="main-block"
            >
              <div
                class="main-row admin-menu-item"
                :class="[
                  hasChildren(item) ? 'is-controller' : 'is-leaf',
                  { 'is-active': isActive(item) }
                ]"
                :data-menu-key="item.key"
                @click="activateMenu(item)"
              >
                <div class="main-row__content">
                  <i v-if="getIconClass(item)" :class="[getIconClass(item), 'main-row__icon']" />
                  <span class="main-row__label text-one-line">{{ getLabel(item) }}</span>
                </div>
                <i
                  v-if="hasChildren(item)"
                  :class="['el-icon-arrow-down', 'main-row__arrow', { 'is-open': isOpen(item) }]"
                />
              </div>

              <transition name="slide-fade">
                <div v-if="hasChildren(item) && isOpen(item)" class="second-list">
                  <div
                    v-for="child in item.children"
                    :key="child.key"
                    class="second-row"
                    :class="{ 'is-active': isActive(child, item) }"
                    :data-menu-key="child.key"
                    @click.stop="activateMenu(child, item)"
                  >
                    <span class="second-row__label text-one-line">{{ getLabel(child) }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </aside>

    <main class="admin-workspace" data-section="admin-workspace">
      <AdminEmployeeDepartment v-if="activeSection === 'employee'" />
      <AdminRolePermission v-else-if="activeSection === 'role'" />
      <AdminFieldDesigner v-else-if="activeSection === 'fields'" />
      <AdminApprovalFlow v-else-if="activeSection === 'approval'" />
      <AdminPoolRuleList v-else-if="activeSection === 'leadsPool'" pool-type="leads" />
      <AdminPoolRuleList v-else-if="activeSection === 'customerPool'" pool-type="customer" />
      <AdminConfigListTemplate v-else-if="activeSection === 'printTemplate'" />
      <AdminBusinessParamTemplate v-else-if="activeSection === 'bizParam'" />
      <AdminSystemLog v-else-if="activeSection === 'logs'" />
      <AdminEmployeeDepartment v-else />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminManageMenu } from '../mock/admin'
import AdminEmployeeDepartment from './AdminEmployeeDepartment.vue'
import AdminRolePermission from './AdminRolePermission.vue'
import AdminFieldDesigner from './AdminFieldDesigner.vue'
import AdminApprovalFlow from './AdminApprovalFlow.vue'
import AdminPoolRuleList from './AdminPoolRuleList.vue'
import AdminConfigListTemplate from './AdminConfigListTemplate.vue'
import AdminBusinessParamTemplate from './AdminBusinessParamTemplate.vue'
import AdminSystemLog from './AdminSystemLog.vue'

const activeSection = ref('employee')
const activePath = ref('/manage/employee-dep')
const openKeys = ref(['/manage/customer'])

function hasChildren(item) {
  return Array.isArray(item.children) && item.children.length > 0
}

function isOpen(item) {
  return openKeys.value.includes(item.path)
}

function getLabel(item) {
  return item.label || item.meta?.title || ''
}

function getIconClass(item) {
  const icon = item.icon || item.meta?.icon || ''
  if (!icon) return ''
  return icon.startsWith('wk ') || icon.startsWith('el-') || icon.startsWith('fm ')
    ? icon
    : `wk wk-${icon}`
}

function resolveMenuPath(item, parent) {
  if (!parent) return item.path
  return item.path.startsWith('/') ? item.path : `${parent.path}/${item.path}`.replace(/\/+/g, '/')
}

function hasActivePath(item) {
  if (!hasChildren(item)) return activePath.value === item.path
  return item.children.some(child => resolveMenuPath(child, item) === activePath.value)
}

function isActive(item, parent) {
  return hasChildren(item) ? hasActivePath(item) : activePath.value === resolveMenuPath(item, parent)
}

function activateMenu(item, parent) {
  if (hasChildren(item)) {
    openKeys.value = isOpen(item)
      ? openKeys.value.filter(path => path !== item.path)
      : [...openKeys.value, item.path]
    return
  }

  if (parent && !isOpen(parent)) {
    openKeys.value = [...openKeys.value, parent.path]
  }

  activePath.value = resolveMenuPath(item, parent)
  if (item.target) {
    activeSection.value = item.target
  }
}
</script>
