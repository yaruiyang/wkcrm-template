<template>
  <div class="rc-cont" data-section="detail-contacts">
    <div class="rc-head">
      <el-button text bg>＋ 新建联系人</el-button>
    </div>
    <el-table
      :data="detail.contacts"
      height="400"
      stripe
    >
      <el-table-column
        v-for="field in detail.contactsFields"
        :key="field.prop"
        :prop="field.prop"
        :label="field.label"
        :width="field.width"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <span v-if="field.prop === 'name'" class="can-visit--underline">{{ row.name }}</span>
          <span v-else>{{ row[field.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <span v-if="row.chiefly" class="chief">✓ 首要联系人</span>
          <el-button v-else type="primary" link>设为首要联系人</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>
