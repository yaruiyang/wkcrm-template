<template>
  <div class="rc-cont relative-handle" data-section="detail-logs">
    <div
      v-for="(item, index) in detail.logs"
      :key="`${item.createTime}-${item.realname}`"
      class="ha-cont"
    >
      <div class="ha-week">{{ item.createTime }}</div>
      <div class="ha-circle" />
      <div class="xr-avatar">{{ item.realname.slice(0, 1) }}</div>
      <div class="ha-name">{{ item.realname }}</div>
      <div class="ha-content">
        <p
          v-for="content in item.content"
          :key="content"
        >
          {{ content }}
        </p>
      </div>
      <div v-if="detail.logs.length - 1 > index" class="ha-line" />
    </div>
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
