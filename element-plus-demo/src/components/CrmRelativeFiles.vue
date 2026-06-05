<template>
  <div class="rc-cont" data-section="detail-files">
    <div class="rc-head">
      <el-button text bg>＋ 上传附件</el-button>
    </div>
    <el-table
      :data="detail.files"
      height="400"
      class="file-table"
      stripe
    >
      <el-table-column prop="name" label="附件名称" min-width="180" show-overflow-tooltip />
      <el-table-column prop="size" label="附件大小" width="110" />
      <el-table-column prop="createUserName" label="上传人" width="110" />
      <el-table-column prop="createTime" label="上传时间" width="180" />
      <el-table-column prop="source" label="来源" width="100" />
      <el-table-column label="操作" width="220">
        <template #default>
          <el-button type="primary" link>预览</el-button>
          <el-button type="primary" link>下载</el-button>
          <el-button type="primary" link>重命名</el-button>
          <el-button type="primary" link>删除</el-button>
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
