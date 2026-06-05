<template>
  <div class="card-container" data-section="card-view">
    <article
      v-for="row in rows"
      :key="row.__rowUid"
      class="customer-card-source"
      @click="$emit('open-detail', row)"
    >
      <div class="customer-card-source__top">
        <div class="customer-card-source__image">客</div>
        <div class="customer-card-source__main">
          <div class="customer-card-source__name text-one-line">{{ row[mainField] }}</div>
          <div class="customer-card-source__source text-one-line">{{ row.source || '暂无来源' }}</div>
        </div>
        <div class="customer-card-source__state">
          <span :class="['deal-tag', row.dealStatus ? 'is-success' : 'is-error']">
            {{ row.dealStatus ? '已成交' : '未成交' }}
          </span>
          <span v-if="row.level" class="level-tag">{{ row.level }}</span>
        </div>
      </div>
      <div class="customer-card-source__row">
        <span>👤 {{ row.ownerUserName }}</span>
        <span v-if="row.mobile">☎ {{ row.mobile }}</span>
      </div>
      <div class="customer-card-source__follow text-one-line">
        最后跟进时间：{{ row.lastTime || '--' }}
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  mainField: {
    type: String,
    default: 'customerName'
  }
})

defineEmits(['open-detail'])
</script>
