<template>
  <div class="b-cont" data-section="detail-fields">
    <section
      v-for="group in groups"
      :key="group.name"
      class="wk-head-section b-cells"
    >
      <div class="section-header">
        <el-icon class="section-arrow"><ArrowDown /></el-icon>
        <span>{{ group.name }}</span>
      </div>
      <el-form class="el-form--flex" label-position="top">
        <el-form-item
          v-for="item in group.list"
          :key="item.fieldName"
          :label="item.name"
          :class="[`is-${item.formType}`, { 'is-block': item.isBlock }]"
        >
          <div class="form-item__value value-box">
            <span>{{ item.value }}</span>
            <el-icon class="form-item__edit"><EditPen /></el-icon>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script setup>
import { ArrowDown, EditPen } from '@element-plus/icons-vue'

defineProps({
  groups: {
    type: Array,
    default: () => []
  }
})
</script>
