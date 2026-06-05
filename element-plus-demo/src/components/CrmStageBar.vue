<template>
  <div class="stage-state-main">
    <div class="stage-state">
      <a
        v-for="(item, index) in status.settingList"
        :key="item.id"
      >
        <div
          :class="[item.class, { 'state-check': index === activeIndex, 'is-center': index !== 0 }]"
          class="stage-state-item"
          @click="activeIndex = index"
        >
          <div class="stage-name text-one-ellipsis">{{ item.flowName }}</div>
          <div v-if="index === 0" class="state-circle circle-left" />
          <div v-if="index !== 0" class="state-arrow arrow-left" />
          <div class="state-arrow arrow-right" />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  status: {
    type: Object,
    required: true
  }
})

const activeIndex = ref(0)
</script>
