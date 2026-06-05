<template>
  <section
    class="admin-page admin-pool-rule-page main"
    data-section="admin-pool-rule"
    data-template="pool-rule-list"
  >
    <header class="admin-xr-header xr-header">
      <div class="admin-xr-label">{{ config.title }}</div>
      <div class="admin-xr-ft">
        <el-button type="primary">{{ config.createText }}</el-button>
      </div>
    </header>

    <div class="admin-list-body main-body">
      <el-table
        class="admin-source-table"
        :data="config.rows"
        :height="tableHeight"
        :row-key="config.idField"
        highlight-current-row
      >
        <el-table-column
          v-for="field in config.fields"
          :key="field.prop"
          :prop="field.prop"
          :label="field.label"
          :min-width="field.width"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="field.prop === 'status'" class="status-cell">
              <span :class="['status-mark', row.status === '启用' ? 'is-success' : 'is-muted']" />
              {{ row.status }}
            </span>
            <span v-else-if="field.prop === 'poolName'" class="admin-link">{{ row.poolName }}</span>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link>{{ row.status === '启用' ? '停用' : '启用' }}</el-button>
            <el-button type="primary" link>转移</el-button>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="p-contianer admin-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="prev, pager, next, sizes, total, jumper"
          :total="config.rows.length"
          :page-sizes="[15, 30, 60]"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { poolRuleTemplates } from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const props = defineProps({
  poolType: {
    type: String,
    default: 'leads'
  }
})

const currentPage = ref(1)
const pageSize = ref(15)
const tableHeight = ref(320)
const config = computed(() => poolRuleTemplates[props.poolType] || poolRuleTemplates.leads)
// 源码线索池和客户公海列表操作列宽度为 200px，区别于审批/打印的 250px。
const poolActionColumnWidth = sourceDimensions.adminPoolActionColumnWidth

function updateTableHeight() {
  tableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminApprovalTableOffset)
}

onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})
</script>
