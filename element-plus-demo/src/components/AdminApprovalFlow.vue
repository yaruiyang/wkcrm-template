<template>
  <section v-if="!createVisible" class="main admin-approval-page" data-section="admin-approval">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">业务审批流</div>
      <div class="admin-xr-ft">
        <el-button type="primary" @click="createVisible = true">新建审批流程</el-button>
      </div>
    </header>
    <div class="main-body admin-main-body">
      <el-table
        class="admin-source-table"
        :data="approvalRows"
        :height="approvalTableHeight"
        row-key="metadataId"
        highlight-current-row
      >
        <el-table-column width="100" label="审批流图标">
          <template #default>
            <div class="table-icon"><i class="wk wk-icon-stage" /></div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="field in approvalFields"
          :key="field.prop"
          :prop="field.prop"
          :min-width="field.width"
          :label="field.label"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag v-if="field.prop === 'status'" :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '启用' : '停用' }}
            </el-tag>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="primary" link>删除</el-button>
            <el-button type="primary" link>停用</el-button>
            <el-button type="primary" link>复制并新建</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer admin-pagination">
        <el-pagination
          v-model:current-page="approvalPage"
          v-model:page-size="approvalPageSize"
          background
          layout="prev, pager, next, sizes, total, jumper"
          :total="24"
          :page-sizes="[20, 40, 80]"
        />
      </div>
    </div>
  </section>

  <section v-else class="business-approve-flow-create admin-flow-create" data-section="admin-flow-create">
    <header
      class="wk-backgroud-tabs"
      :style="{ height: `${sourceDimensions.adminFlowTabsHeight}px` }"
    >
      <div class="wk-tabs__left" />
      <div class="wk-tabs__wrap">
        <div class="wk-tabs">
          <button
            v-for="tab in flowTabs"
            :key="tab.value"
            :class="['wk-tabs__item', { active: activeFlowTab === tab.value }]"
            type="button"
            @click="activeFlowTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      <div class="admin-flow-actions">
        <el-button type="primary" @click="createVisible = false">发布</el-button>
        <i class="el-icon-close create-close" aria-hidden="true" @click="createVisible = false" />
      </div>
    </header>
    <div
      v-show="activeFlowTab === 'base'"
      class="base-info-set flow-base-panel"
      :style="{ width: `${sourceDimensions.adminFlowBaseInfoWidth}px` }"
    >
        <div class="base-info-set__header">设置基础信息</div>
        <el-form label-position="top">
          <el-form-item label="审批流名称" required><el-input model-value="合同审批流程" /></el-form-item>
          <el-form-item label="关联对象" required>
            <el-select model-value="合同" style="width: 100%;">
              <el-option label="合同" value="合同" />
              <el-option label="回款" value="回款" />
              <el-option label="发票" value="发票" />
              <el-option label="报价单" value="报价单" />
            </el-select>
          </el-form-item>
          <el-form-item label="审批被拒后">
            <el-radio-group model-value="resubmit">
              <el-radio value="resubmit">允许重新提交</el-radio>
              <el-radio value="restart">重新审批</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
    </div>
    <main v-show="activeFlowTab === 'flow'" class="wk-approve-flow-wrap flow-canvas">
      <div class="wk-approve-flow">
        <div class="wk-node">
          <div class="wk-node-wrap is-first">
            <div class="header is-start"><i class="wk wk-user icon" /> <span class="title">发起人</span></div>
            <div class="content">拥有发起权限</div>
          </div>
        </div>
        <div class="add-node-btn-wrap">
          <div class="add-node-btn">
            <el-button circle type="primary">+</el-button>
          </div>
        </div>
        <div class="wk-node">
          <div class="wk-node-wrap">
            <div class="header is-approve"><i class="wk wk-approve icon" /> <span class="title">审批人</span></div>
            <div class="content">部门负责人审批</div>
          </div>
        </div>
        <div class="add-node-btn-wrap">
          <div class="add-node-btn">
            <el-button circle>+</el-button>
          </div>
        </div>
        <div class="wk-node">
          <div class="wk-node-wrap">
            <div class="header is-copy"><i class="wk wk-associated icon" /> <span class="title">抄送人</span></div>
            <div class="content">流程结束后抄送</div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { approvalFields, approvalRows } from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const createVisible = ref(false)
const activeFlowTab = ref('base')
const approvalTableHeight = ref(320)
const approvalPage = ref(1)
const approvalPageSize = ref(20)
const flowTabs = [
  { label: '1.设置基础信息', value: 'base' },
  { label: '2.配置流程', value: 'flow' }
]

function updateApprovalTableHeight() {
  // 源码审批列表用 220 扣除顶部标题和分页区域。
  approvalTableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminApprovalTableOffset)
}

onMounted(() => {
  updateApprovalTableHeight()
  window.addEventListener('resize', updateApprovalTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateApprovalTableHeight)
})
</script>
