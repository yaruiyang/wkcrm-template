<template>
  <div class="add-node-btn">
    <el-popover
      v-model:visible="popoverVisible"
      placement="right"
      trigger="click"
      :width="140"
      popper-class="no-padding-popover admin-flow-add-popper"
    >
      <div class="add-node-approve" data-section="admin-flow-add-popover">
        <button type="button" class="add-node-approve-btn" @click="selectCommand('approve')">
          <i class="wk wk-approve is-orange" />
          审批人
        </button>
        <button type="button" class="add-node-approve-btn" @click="selectCommand('condition')">
          <i class="wk wk-associate is-green" />
          分支
        </button>
        <button type="button" class="add-node-approve-btn" @click="selectCommand('copy')">
          <i class="wk wk-source-line" />
          抄送人
        </button>
        <button v-if="showPaste" type="button" class="add-node-approve-btn" @click="selectCommand('paste')">
          <i class="wk wk-icon-transfer2" />
          粘贴
        </button>
      </div>
      <template #reference>
        <el-button circle type="primary">+</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  showPaste: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['command'])
const popoverVisible = ref(false)

function selectCommand(command) {
  // 源码 AddNodeBtn 选择动作后立即收起菜单，避免流程画布残留浮层。
  popoverVisible.value = false
  emit('command', command)
}
</script>
