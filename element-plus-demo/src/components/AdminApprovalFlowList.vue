<template>
  <template v-for="(node, index) in nodes" :key="node.nodeId">
    <div v-if="node.type === 'condition'" class="wk-conditon-node" data-section="admin-flow-condition-wrap">
      <div class="wk-conditon-node-wrap">
        <div class="conditon-wrap-body">
          <el-button class="add-btn" plain @click="$emit('add-condition', node)">添加条件</el-button>
          <div
            v-for="(condition, conditionIndex) in node.conditionList"
            :key="condition.nodeId"
            class="condition"
          >
            <template v-if="conditionIndex === 0">
              <div class="cover-line is-top-left" />
              <div class="cover-line is-bottom-left" />
            </template>
            <template v-if="conditionIndex === node.conditionList.length - 1">
              <div class="cover-line is-top-right" />
              <div class="cover-line is-bottom-right" />
            </template>
            <div class="condition-node">
              <div class="condition-node-wrap">
                <div
                  :class="['condition-wrap', { 'is-active': selectedNodeId === condition.nodeId }]"
                  @click="$emit('open-node', { node: condition, mode: 'condition', parent: node.conditionList, index: conditionIndex })"
                >
                  <div class="header">
                    <span class="title">{{ condition.conditionName }}</span>
                    <span class="priority">优先级 {{ conditionIndex + 1 }}</span>
                    <i class="wk wk-copy" @click.stop="$emit('copy-node', condition)" />
                    <i class="el-icon-close close" @click.stop="$emit('delete-condition', { node, conditionIndex, parent: nodes, index })" />
                  </div>
                  <div class="content">{{ conditionContent(condition) }}</div>
                </div>
                <AdminApprovalAddNodeButton
                  :show-paste="showPaste"
                  @command="command => $emit('add-node', { target: condition.examineDataList, index: -1, command })"
                />
              </div>
              <AdminApprovalFlowList
                v-if="condition.examineDataList?.length"
                :nodes="condition.examineDataList"
                :selected-node-id="selectedNodeId"
                :show-paste="showPaste"
                nested
                @open-node="$emit('open-node', $event)"
                @add-node="$emit('add-node', $event)"
                @delete-node="$emit('delete-node', $event)"
                @copy-node="$emit('copy-node', $event)"
                @add-condition="$emit('add-condition', $event)"
                @delete-condition="$emit('delete-condition', $event)"
              />
            </div>
          </div>
        </div>
        <div class="add-node-btn-wrap">
          <AdminApprovalAddNodeButton
            :show-paste="showPaste"
            @command="command => $emit('add-node', { target: nodes, index, command })"
          />
        </div>
      </div>
    </div>

    <div v-else class="wk-node">
      <div
        :class="['wk-node-wrap', { 'is-active': selectedNodeId === node.nodeId, 'is-disabled': node.disabled }]"
        @click="$emit('open-node', { node, mode: node.type, parent: nodes, index })"
      >
        <div :class="['header', nodeHeaderClass(node)]">
          <i :class="[nodeIcon(node), 'icon']" />
          <span class="title">{{ node.name }}</span>
          <i v-if="!node.disabled" class="wk wk-copy" @click.stop="$emit('copy-node', node)" />
          <i v-if="!node.disabled" class="el-icon-close close" @click.stop="$emit('delete-node', { target: nodes, index })" />
        </div>
        <div class="body">
          <div class="content">{{ nodeContent(node) }}</div>
          <i v-if="!node.disabled" class="el-icon-arrow-right" />
        </div>
      </div>
      <div class="add-node-btn-wrap">
        <AdminApprovalAddNodeButton
          :show-paste="showPaste"
          @command="command => $emit('add-node', { target: nodes, index, command })"
        />
      </div>
    </div>
  </template>
</template>

<script setup>
import AdminApprovalAddNodeButton from './AdminApprovalAddNodeButton.vue'

defineOptions({ name: 'AdminApprovalFlowList' })

defineProps({
  nodes: {
    type: Array,
    default: () => []
  },
  selectedNodeId: {
    type: String,
    default: ''
  },
  showPaste: {
    type: Boolean,
    default: false
  },
  nested: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'open-node',
  'add-node',
  'delete-node',
  'copy-node',
  'add-condition',
  'delete-condition'
])

function nodeHeaderClass(node) {
  return `is-${node.theme || node.type || 'approve'}`
}

function nodeIcon(node) {
  const iconMap = {
    approve: 'wk wk-approve-line',
    copy: 'wk wk-source-line',
    fill: 'wk wk-edit',
    start: 'wk wk-visit-contract'
  }
  return node.icon || iconMap[node.type] || 'wk wk-approve-line'
}

function nodeContent(node) {
  return node.content || node.description || '点击设置节点规则'
}

function conditionContent(condition) {
  return condition.content || condition.conditionText || '无条件'
}
</script>
