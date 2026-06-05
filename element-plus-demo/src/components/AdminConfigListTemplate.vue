<template>
  <section
    class="admin-page admin-config-list-page main"
    data-section="admin-config-list"
    data-template="config-list"
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
            <span v-if="field.prop === 'templateName'" class="admin-link">{{ row.templateName }}</span>
            <span v-else>{{ row[field.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default>
            <el-button
              v-for="action in config.actions"
              :key="action"
              :type="action === '删除' ? 'danger' : 'primary'"
              link
            >{{ action }}</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { printTemplateConfig as config } from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const currentPage = ref(1)
const pageSize = ref(10)
const tableHeight = ref(320)
// 源码自定义打印模板操作列宽度：sourceDimensions.adminPrintActionColumnWidth。
const printActionColumnWidth = sourceDimensions.adminPrintActionColumnWidth

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
