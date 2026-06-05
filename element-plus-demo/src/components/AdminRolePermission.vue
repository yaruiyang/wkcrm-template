<template>
  <section class="role-authorization main admin-role-page" data-section="admin-role">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">角色权限管理</div>
      <div class="admin-xr-ft">
        <el-button type="primary" @click="roleDialogVisible = true">新建角色</el-button>
      </div>
    </header>

    <div class="main-content-wrap">
      <aside class="main-nav admin-main-nav" data-section="admin-role-nav">
        <div class="main-nav__title">
          <div>
            客户管理角色
            <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
          </div>
          <el-button link class="add-btn" :icon="Plus" @click="roleDialogVisible = true">新建角色</el-button>
        </div>
        <div class="main-nav__content">
          <div class="nav-sections-wrap" data-section="admin-role-list-wrap">
            <div class="nav-section">
              <button
                v-for="role in roleList"
                :key="role.roleId"
                :class="['menu-item admin-role-menu-item', { 'is-select': activeRoleId === role.roleId }]"
                type="button"
                @click="activeRoleId = role.roleId"
              >
                <span class="menu-item__content">{{ role.roleName }}</span>
                <div
                  v-if="role.remark !== 'admin' && role.remark !== 'project'"
                  class="icon-close"
                  :class="{ 'is-visible': role.visible }"
                  @click.stop
                >
                  <el-dropdown
                    trigger="click"
                    @visible-change="role.visible = $event"
                    @command="roleHandleClick"
                  >
                    <el-button
                      class="dropdown-btn menu-edit-btn"
                      size="small"
                      link
                      @click="roleDropdownClick(role)"
                    >
                      <i class="wk wk-manage" aria-hidden="true" />
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="copy">复制</el-dropdown-item>
                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div class="main-content admin-main-content flex-index">
        <el-tabs v-model="activeTab" class="admin-role-tabs">
          <el-tab-pane label="角色员工" name="user">
            <div class="content-table">
              <div class="content-table-header">
                <el-input v-model="userKeyword" placeholder="请输入员工姓名/手机号" style="width: 240px;">
                  <template #suffix>
                    <el-button link class="search-suffix-btn" :icon="Search" />
                  </template>
                </el-input>
                <div class="content-table-header-reminder">员工会继承当前角色的数据权限和字段权限。</div>
                <el-button text bg>关联员工</el-button>
                <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
              </div>
              <el-table
                class="admin-source-table"
                :data="roleUserRows"
                :height="roleTableHeight"
              >
                <el-table-column prop="realname" label="员工姓名" width="150">
                  <template #default="{ row }">
                    <span class="admin-link">{{ row.realname }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="deptName" label="部门" />
                <el-table-column prop="post" label="职位" />
                <el-table-column prop="roleName" label="角色" />
                <el-table-column label="操作" width="160" fixed="right">
                  <template #default>
                    <el-button type="primary" link>编辑</el-button>
                    <el-button type="primary" link>移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="p-contianer admin-pagination">
                <el-pagination
                  v-model:current-page="rolePage"
                  v-model:page-size="rolePageSize"
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :total="128"
                  :page-sizes="[15, 30, 60]"
                />
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="角色权限" name="rule">
            <div class="jurisdiction-box">
              <div class="jurisdiction-box-bar">
                <el-button
                  v-for="item in rolePermissionMenus"
                  :key="item.index"
                  :class="{ 'el-button--selected': activeRuleMenu === item.index }"
                  text
                  bg
                  @click="activeRuleMenu = item.index"
                >{{ item.label }}</el-button>
                <el-button type="primary" class="jurisdiction-edit">保存</el-button>
              </div>
              <div
                v-if="activeRuleMenu === 'data'"
                class="jurisdiction-content"
                :style="{ height: `${roleTreeHeight}px` }"
                data-section="admin-role-range"
              >
                <div class="data-radio">
                  <el-radio-group model-value="2">
                    <el-radio :value="2">本人及下属</el-radio>
                    <el-radio :value="3">本部门</el-radio>
                    <el-radio :value="4">本部门及下属部门</el-radio>
                    <el-radio :value="5">全部</el-radio>
                    <el-radio :value="0">自定义</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div
                v-else
                class="jurisdiction-content"
                :style="{ height: `${roleTreeHeight}px` }"
                data-section="admin-permission-tree"
              >
                <div class="jurisdiction-content-checkbox">
                  <el-tree
                    :data="permissionTree"
                    node-key="menuId"
                    default-expand-all
                    show-checkbox
                    :props="{ children: 'childMenu', label: 'menuName' }"
                  >
                    <template #default="{ node, data }">
                      <span :class="{ 'node-label': node.level <= 2 }">
                        {{ node.label }}
                        <el-button
                          v-if="node.level === 2 && data.realm"
                          type="primary"
                          link
                          @click.stop="fieldDialogVisible = true"
                        >字段授权</el-button>
                      </span>
                    </template>
                  </el-tree>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog v-model="roleDialogVisible" title="新建角色" width="30%" :close-on-click-modal="false">
      <label class="label-title">角色名称</label>
      <el-input class="input-role" placeholder="请输入角色名称" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="roleDialogVisible = false">确定</el-button>
          <el-button text bg @click="roleDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="fieldDialogVisible"
      title="客户字段授权"
      width="700px"
      :append-to-body="true"
      :close-on-click-modal="false"
      data-section="admin-field-auth-dialog"
    >
      <el-table
        class="admin-source-table"
        :data="fieldAuthRows"
        height="50vh"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'childField' }"
      >
        <el-table-column label="字段名称" prop="name" width="200" />
        <el-table-column label="字段权限">
          <template #default="{ row }">
            <el-checkbox v-model="row.canCheck">可以查看</el-checkbox>
            <el-checkbox v-model="row.canEdit">可以修改</el-checkbox>
            <el-checkbox v-model="row.canMask">掩码显示</el-checkbox>
            <el-button :disabled="!row.canMask" link @click="maskDialogVisible = true">设置掩码规则</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button link style="float: left;">重置</el-button>
          <el-button type="primary" @click="fieldDialogVisible = false">保存</el-button>
          <el-button text bg @click="fieldDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="maskDialogVisible" title="设置掩码规则" width="500px" :close-on-click-modal="false">
      <div class="mask-wrap__des">勾选后字段值在列表或详情中以掩码显示，例如手机 188****8888。</div>
      <div class="mask-wrap__body">
        <div>掩码页面</div>
        <div class="handle">
          <el-checkbox :model-value="true" disabled>列表页</el-checkbox>
          <el-checkbox :model-value="true">详情页</el-checkbox>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="maskDialogVisible = false">确定</el-button>
          <el-button text bg @click="maskDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import {
  fieldAuthRows,
  permissionTree,
  roleList,
  rolePermissionMenus,
  roleUserRows
} from '../mock/admin'
import { sourceDimensions } from '../contracts/wkcrmSourceContract'

const activeRoleId = ref(roleList[1].roleId)
const activeTab = ref('user')
const activeRuleMenu = ref('crm')
const userKeyword = ref('')
const roleDialogVisible = ref(false)
const fieldDialogVisible = ref(false)
const maskDialogVisible = ref(false)
const dropdownHandleRole = ref(null)
const roleTableHeight = ref(320)
const roleTreeHeight = ref(320)
const rolePage = ref(1)
const rolePageSize = ref(15)

function updateRoleHeights() {
  // 源码角色页分别用不同扣减值控制员工表和权限树的可视高度。
  roleTableHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminRoleTableOffset)
  roleTreeHeight.value = Math.max(320, window.innerHeight - sourceDimensions.adminRoleTreeOffset)
}

function roleDropdownClick(role) {
  dropdownHandleRole.value = role
}

function roleHandleClick(command) {
  if (command === 'edit') roleDialogVisible.value = true
  if (command === 'copy') roleDialogVisible.value = true
  if (command === 'delete' && dropdownHandleRole.value?.roleId === activeRoleId.value) {
    activeRoleId.value = roleList[0]?.roleId || ''
  }
}

onMounted(() => {
  updateRoleHeights()
  window.addEventListener('resize', updateRoleHeights)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateRoleHeights)
})
</script>
