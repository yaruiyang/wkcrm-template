<template>
  <section class="system-customer main admin-biz-param-page" data-section="admin-biz-param">
    <header class="admin-xr-header xr-header">
      <div class="admin-xr-label">{{ businessParamTemplate.title }}</div>
    </header>

    <div class="main-content-wrap">
      <aside class="main-nav admin-main-nav" data-section="admin-biz-param-nav">
        <div class="main-nav__content">
          <div class="nav-sections-wrap admin-biz-param-menu">
            <button
              v-for="item in businessParamTemplate.nav"
              :key="item.key"
              :class="['admin-biz-param-menu-item', { 'is-select': activeKey === item.key }]"
              type="button"
              :title="item.label"
              @click="activeKey = item.key"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </aside>

      <div class="main-content admin-main-content admin-biz-param-panel" data-section="admin-biz-param-panel">
        <div class="content-header">
          <span>{{ activePanel.title }}</span>
          <el-button type="primary">{{ activeKey === 'reason' ? '保存' : activeKey === 'category' ? '更多操作' : '新增' }}</el-button>
        </div>

        <div v-if="activeKey === 'stage'" class="stage-content">
          <div class="stage-filter">
            <el-select model-value="" class="el-select" clearable placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="停用" :value="2" />
            </el-select>
            <el-select model-value="" class="el-select" clearable placeholder="请选择关联对象">
              <el-option label="客户" :value="2" />
              <el-option label="商机" :value="5" />
              <el-option label="合同" :value="6" />
            </el-select>
          </div>
          <div class="customer-table">
            <el-table
              class="admin-source-table admin-setting-table"
              :data="stageRows"
              :height="bizParamTableHeight"
            >
              <el-table-column prop="flowName" label="阶段流程名称" min-width="150" show-overflow-tooltip />
              <el-table-column prop="label" label="关联对象" min-width="80" show-overflow-tooltip />
              <el-table-column prop="scope" label="适用范围" min-width="110" show-overflow-tooltip />
              <el-table-column prop="updateTime" label="最后修改时间" min-width="150" show-overflow-tooltip />
              <el-table-column prop="status" label="状态" min-width="80" show-overflow-tooltip />
              <el-table-column fixed="right" label="操作" width="400">
                <template #default>
                  <el-button type="primary" link>编辑基本信息</el-button>
                  <el-button type="primary" link>编辑阶段信息</el-button>
                  <el-button type="primary" link>停用</el-button>
                  <el-button type="primary" link>复制并新建</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="p-contianer admin-pagination">
              <el-pagination
                background
                layout="prev, pager, next, sizes, total, jumper"
                :total="stageRows.length"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>

        <div v-else-if="activeKey === 'reason'" class="content-body">
          <div class="reason-list">
            <div class="switch-wrap">
              <el-switch :model-value="true" :active-value="1" :inactive-value="0" />
              <span>设置为必填</span>
            </div>
            <div
              v-for="row in reasonRows"
              :key="row.id"
              class="reason-item"
            >
              <el-input :model-value="row.reason" />
              <span class="handle-btn">
                <i class="wk wk-icon-drag drag-handle move-btn" aria-hidden="true" />
                <i class="wk wk-delete del-btn" aria-hidden="true" />
              </span>
            </div>
            <div class="reason-item">
              <el-button text bg class="el-icon-plus">添加原因</el-button>
            </div>
          </div>
        </div>

        <div v-else class="rule-content">
          <div class="rule-filter">
            <el-select model-value="" clearable placeholder="请选择模块">
              <el-option label="客户" value="2" />
              <el-option label="联系人" value="3" />
              <el-option label="商机" value="5" />
            </el-select>
          </div>
          <div class="customer-table">
            <el-table
              class="admin-source-table admin-setting-table"
              :data="panelRows"
              :height="activeKey === 'limit' ? bizParamLimitTableHeight : bizParamTableHeight"
            >
              <el-table-column prop="name" label="名称" min-width="150" show-overflow-tooltip />
              <el-table-column prop="description" label="说明" min-width="260" show-overflow-tooltip />
              <el-table-column prop="status" label="状态" min-width="80" show-overflow-tooltip />
              <el-table-column label="操作" width="120" fixed="right">
                <template #default>
                  <el-button type="primary" link>编辑</el-button>
                  <el-button type="primary" link>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="p-contianer admin-pagination">
              <el-pagination
                background
                layout="prev, pager, next, sizes, total, jumper"
                :total="panelRows.length"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { businessParamTemplate } from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const activeKey = ref(businessParamTemplate.nav[0]?.key || 'stage')
const bizParamTableHeight = ref(320)
const bizParamLimitTableHeight = ref(320)

const activePanel = computed(() => {
  return businessParamTemplate.panels[activeKey.value] || businessParamTemplate.panels.stage
})

const panelRows = computed(() => {
  return activePanel.value.rows.map((name, index) => ({
    id: `${activeKey.value}-${index}`,
    name,
    description: activePanel.value.summary,
    status: index % 2 === 0 ? '启用' : '停用'
  }))
})

const stageRows = computed(() => activePanel.value.rows.map((name, index) => ({
  id: `stage-${index}`,
  flowName: name,
  label: index % 2 === 0 ? '商机' : '客户',
  scope: '全公司',
  updateTime: '2026-06-03 10:20',
  status: '启用'
})))

const reasonRows = computed(() => activePanel.value.rows.map((reason, index) => ({
  id: `reason-${index}`,
  reason
})))

function updateBizParamTableHeights() {
  // 源码业务参数中阶段/校验表和客户限制表使用不同视口扣减。
  bizParamTableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminBizParamTableOffset)
  bizParamLimitTableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminBizParamLimitTableOffset)
}

onMounted(() => {
  updateBizParamTableHeights()
  window.addEventListener('resize', updateBizParamTableHeights)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBizParamTableHeights)
})
</script>
