<template>
  <div class="wkcrm-demo" data-section="app-shell">
    <header
      class="new-navbar"
      :data-section="isAdminMode ? 'admin-top-nav' : 'crm-top-nav'"
    >
      <div class="navbar-left">
        <div class="company-btn" @click="openCustomerModule">
          <span class="brand-mark logo">WK</span>
          <span class="label text-one-line">星禾科技</span>
          <i class="el-icon-arrow-down navbar-company__arrow" aria-hidden="true" />
        </div>
        <div class="menus">
          <el-tabs
            :key="navbarRenderKey"
            :model-value="customerModuleName"
            class="new-header-menu"
            @tab-change="handleModuleClick"
          >
            <el-tab-pane
              v-for="item in displayedNavItems"
              :key="item"
              :name="item"
            >
              <template #label>
                <span class="router-link">
                  <span class="label">{{ item }}</span>
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="navbar-right">
        <div class="top-tools admin-top-tools">
          <el-tooltip content="消息通知" effect="dark" placement="bottom">
            <el-badge class="nav-badge" :value="6" :max="99" type="primary">
              <el-button class="top-tool top-tool--message" text circle aria-label="消息通知">
                <i class="wk wk-bell" aria-hidden="true" />
              </el-button>
            </el-badge>
          </el-tooltip>
          <el-tooltip content="系统设置" effect="dark" placement="bottom">
            <el-button
              class="top-tool top-tool--manage"
              text
              circle
              aria-label="系统设置"
              @click="$emit('adminOpen')"
            >
              <i class="wk wk-manage" aria-hidden="true" />
            </el-button>
          </el-tooltip>
          <div class="avatar-wrapper" aria-label="当前用户头像">
            <span class="top-avatar xr-avatar">WK</span>
          </div>
        </div>
      </div>
    </header>

    <div :class="['crm-shell-body', { 'is-admin': activeMode === 'admin' }]">
      <aside v-if="activeMode === 'crm'" class="crm-side" data-section="crm-side-menu">
        <div class="side-kicker">CRM {{ activeModule }}管理</div>
        <div
          v-for="item in sideItems"
          :key="item.label"
          :class="['side-item', { 'is-active': item.label === activeModule }]"
        >
          <i :class="['side-icon', 'wk', item.icon]" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </div>
      </aside>
      <main class="crm-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { crmModules as modules, crmSideMenus as sideItems } from '../mock/crm'

const customerModuleName = '客户'
const customerObjectType = 'customer'
const navbarRenderKey = ref(0)

const props = defineProps({
  activeMode: {
    type: String,
    default: 'crm'
  },
  activeModule: {
    type: String,
    default: '客户'
  },
  objectTemplates: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['moduleChange', 'adminOpen'])
const navItems = computed(() => [...modules])
const isAdminMode = computed(() => props.activeMode === 'admin')
const displayedNavItems = computed(() => navItems.value)

function handleModuleClick(moduleName) {
  openCustomerModule()
}

function openCustomerModule() {
  emit('moduleChange', customerObjectType)
  navbarRenderKey.value += 1
}
</script>
