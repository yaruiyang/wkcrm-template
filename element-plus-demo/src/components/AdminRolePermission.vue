<template>
  <section class="role-authorization main admin-role-page" data-section="admin-role">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">角色权限管理</div>
    </header>

    <div class="main-content-wrap">
      <aside class="main-nav admin-main-nav" data-section="admin-role-nav">
        <div class="main-nav__title">
          <div>
            客户管理角色
            <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
          </div>
          <el-button link class="add-btn" :icon="Plus" @click="openRoleCreate">新建角色</el-button>
        </div>
        <div class="main-nav__content">
          <div class="nav-sections-wrap" data-section="admin-role-list-wrap">
            <div class="nav-section">
              <button
                v-for="role in roles"
                :key="role.roleId"
                :class="['menu-item admin-role-menu-item', { 'is-select': activeRoleId === role.roleId }]"
                :style="activeRoleId === role.roleId ? selectedRoleItemStyle : undefined"
                type="button"
                @click="selectRole(role)"
              >
                <span class="menu-item__content">{{ role.roleName }}</span>
                <div
                  v-if="canManageRole(role)"
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
                <el-input
                  v-model="userKeyword"
                  placeholder="请输入员工姓名/手机号"
                  style="width: 240px;"
                  @keyup.enter="headerSearch"
                  @blur="headerSearch"
                >
                  <template #suffix>
                    <el-button link class="search-suffix-btn" :icon="Search" @click="headerSearch" />
                  </template>
                </el-input>
                <div class="content-table-header-reminder">{{ activeRoleName }} 下的员工会继承当前角色的数据权限和字段权限。</div>
                <el-button text bg :disabled="!activeRole" @click="openRelateEmployee">关联员工</el-button>
                <i class="wk wk-icon-fill-help wk-help-tips" aria-hidden="true" />
              </div>
              <el-table
                class="admin-source-table"
                :data="filteredRoleUsers"
                :height="roleTableHeight"
                data-section="admin-role-user-table"
              >
                <el-table-column prop="realname" label="员工姓名" width="150">
                  <template #default="{ row }">
                    <span class="admin-link">{{ row.realname }}</span>
                    <el-tag v-if="row.userIdentity === 0" disable-transitions type="warning">主账号</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="deptName" label="部门" />
                <el-table-column prop="post" label="职位" />
                <el-table-column prop="roleName" label="角色" />
                <el-table-column label="操作" width="160" fixed="right">
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      link
                      :disabled="row.userIdentity === 0"
                      @click="openEmployeeRoleAction('编辑角色', row)"
                    >编辑</el-button>
                    <el-button type="primary" link @click="openEmployeeRoleAction('复制角色', row)">复制</el-button>
                    <el-button
                      type="primary"
                      link
                      :disabled="row.userIdentity === 0"
                      @click="removeRoleUser(row)"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="p-contianer admin-pagination">
                <el-pagination
                  v-model:current-page="rolePage"
                  v-model:page-size="rolePageSize"
                  background
                  layout="prev, pager, next, sizes, total, jumper"
                  :total="filteredRoleUsers.length"
                  :page-sizes="[15, 30, 60]"
                />
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane v-if="showRoleRules" label="角色权限" name="rule">
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
                <el-button type="primary" class="jurisdiction-edit" @click="saveRolePermission">保存</el-button>
              </div>

              <div
                v-if="activeRuleMenu === 'module'"
                class="jurisdiction-content"
                :style="{ height: `${roleTreeHeight}px` }"
                data-section="admin-permission-tree"
              >
                <div class="jurisdiction-content-checkbox">
                  <el-tree
                    :key="permissionTreeKey"
                    ref="permissionTreeRef"
                    :data="permissionTree"
                    node-key="menuId"
                    default-expand-all
                    show-checkbox
                    :indent="0"
                    :expand-on-click-node="false"
                    :default-checked-keys="activeRoleRules"
                    :props="{ children: 'childMenu', label: 'menuName' }"
                    @check="handlePermissionCheck"
                  >
                    <template #default="{ node, data }">
                      <span :class="{ 'node-label': node.level <= 2 }">
                        {{ node.label }}
                        <el-button
                          v-if="node.level === 2 && data.realm"
                          class="role-field-auth-btn"
                          type="primary"
                          link
                          @click.stop.prevent="openFieldAuth(data)"
                        >字段授权</el-button>
                      </span>
                    </template>
                  </el-tree>
                </div>
              </div>

              <div
                v-else
                class="jurisdiction-content"
                :style="{ height: `${roleTreeHeight}px` }"
                data-section="admin-role-data-range"
              >
                <div class="data-radio">
                  <el-radio-group v-model="activeRole.dataType">
                    <el-radio :value="1">本人</el-radio>
                    <el-radio :value="2">本人及下属</el-radio>
                    <el-radio :value="3">本部门</el-radio>
                    <el-radio :value="4">本部门及下属部门</el-radio>
                    <el-radio :value="5">全部</el-radio>
                    <el-radio :value="0">
                      <span>自定义</span>
                      <div v-if="activeRole.dataType === 0" class="custom-wrap" @click.stop>
                        <div class="custom-select">
                          <el-button type="primary" size="small" @click="openDepartmentRange">选择</el-button>
                          <el-button type="primary" link size="small" @click="clearDepartmentRange">清空</el-button>
                        </div>
                        <div class="custom-value">
                          <el-tag
                            v-for="dept in activeRole.deptList"
                            :key="dept.deptId"
                            type="info"
                            closable
                            @close.stop="removeDepartmentTag(dept.deptId)"
                          >{{ dept.name }}</el-tag>
                        </div>
                        <div v-if="dataRangeError" class="role-error">{{ dataRangeError }}</div>
                      </div>
                    </el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog
      v-model="roleDialogVisible"
      :title="roleDialogTitle"
      width="30%"
      :close-on-click-modal="false"
      data-section="admin-role-dialog"
    >
      <label class="label-title">角色名称</label>
      <el-input v-model="roleForm.roleName" class="input-role" maxlength="100" placeholder="请输入角色名称" />
      <div v-if="roleFormError" class="role-error">{{ roleFormError }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitRoleDialog">确定</el-button>
          <el-button text bg @click="roleDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="relateEmployeeVisible"
      title="关联员工"
      width="600px"
      :close-on-click-modal="false"
      data-section="admin-role-relate-dialog"
    >
      <div class="role-relate-list">
        <el-checkbox-group v-model="relateSelectedUserIds">
          <el-checkbox
            v-for="employee in employeeRows"
            :key="employee.userId"
            :value="employee.userId"
            :disabled="activeRoleUserIds.includes(employee.userId)"
          >
            {{ employee.realname }} / {{ employee.deptName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveRelateEmployees">保存</el-button>
          <el-button text bg @click="relateEmployeeVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="employeeRoleActionVisible"
      :title="employeeRoleActionTitle"
      width="500px"
      :close-on-click-modal="false"
      data-section="admin-role-employee-action-dialog"
    >
      <div class="admin-employee-action-copy">
        当前模板只对齐源码员工角色操作入口，不执行真实角色变更。
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="employeeRoleActionVisible = false">确定</el-button>
          <el-button text bg @click="employeeRoleActionVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="departmentRangeVisible"
      title="选择部门"
      width="500px"
      :close-on-click-modal="false"
      data-section="admin-role-department-dialog"
    >
      <el-checkbox v-model="departmentIncludeChild">包含下级部门</el-checkbox>
      <el-checkbox-group v-model="departmentSelection" class="role-department-options">
        <el-checkbox v-for="dept in flatDepartments" :key="dept.deptId" :value="dept.deptId">{{ dept.name }}</el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveDepartmentRange">确定</el-button>
          <el-button text bg @click="departmentRangeVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="fieldDialogVisible"
      :title="fieldDialogTitle"
      width="700px"
      :append-to-body="true"
      :close-on-click-modal="false"
      data-section="admin-field-auth-dialog"
    >
      <el-table
        class="admin-source-table"
        :data="fieldDialogRows"
        height="50vh"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'childField' }"
      >
        <el-table-column label="字段名称" prop="name" width="200" />
        <el-table-column label="字段权限">
          <template #default="{ row }">
            <el-checkbox
              v-model="row.canCheck"
              :disabled="!canOperateRead(row.operateType)"
              @change="handleCanCheckChange(row)"
            >可以查看</el-checkbox>
            <el-checkbox
              v-model="row.canEdit"
              :disabled="!canOperateEdit(row.operateType)"
              @change="handleCanEditChange(row)"
            >可以修改</el-checkbox>
            <template v-if="getMaskIsShow(row)">
              <el-checkbox v-model="row.canMask" @change="handleMaskChange(row)">掩码显示</el-checkbox>
              <el-button :disabled="!row.canMask" class="mask-button" link @click="openMaskDialog(row)">设置掩码规则</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button link style="float: left;" @click="resetFieldDialog">重置</el-button>
          <el-button type="primary" @click="saveFieldDialog">保存</el-button>
          <el-button text bg @click="fieldDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-if="maskDialogVisible"
      v-model="maskDialogVisible"
      title="设置掩码规则"
      width="500px"
      :close-on-click-modal="false"
      data-section="admin-field-mask-dialog"
    >
      <div class="mask-wrap">
        <div class="mask-wrap__des">
          1、勾选该选项后，该字段的值在页面上将以掩码显示，比如手机 188****8888、邮箱 wa*****@5kcrm.com。<br>
          2、字段配置掩码后，若用户看到的是掩码显示，那该用户导出的也是掩码显示。<br>
          3、编辑页面为非掩码显示。
        </div>
        <div class="mask-wrap__body">
          <div>掩码显示的页面</div>
          <div class="handle">
            <el-checkbox v-model="maskEditDetail.tableMask" disabled>列表页面</el-checkbox>
            <el-checkbox v-model="maskEditDetail.viewMask">详情页面</el-checkbox>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveMaskDialog">确定</el-button>
          <el-button text bg @click="maskDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import {
  departmentTree,
  employeeRows,
  fieldAuthRows,
  permissionTree,
  roleList as roleListSeed,
  rolePermissionMenus
} from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const cloneDeep = value => JSON.parse(JSON.stringify(value))

const roles = ref(cloneDeep(roleListSeed))
const activeRoleId = ref(roles.value.find(role => role.remark !== 'admin')?.roleId || roles.value[0]?.roleId || '')
const activeTab = ref('user')
const activeRuleMenu = ref('module')
const userKeyword = ref('')
const roleDialogVisible = ref(false)
const roleDialogMode = ref('create')
const roleForm = ref({ roleName: '' })
const roleFormError = ref('')
const selectedRoleItemStyle = { backgroundColor: '#DEEBFF' }
const relateEmployeeVisible = ref(false)
const relateSelectedUserIds = ref([])
const employeeRoleActionVisible = ref(false)
const employeeRoleActionTitle = ref('')
const departmentRangeVisible = ref(false)
const departmentSelection = ref([])
const departmentIncludeChild = ref(false)
const dataRangeError = ref('')
const fieldDialogVisible = ref(false)
const fieldDialogTitle = ref('字段授权')
const fieldDialogRows = ref([])
const fieldDialogRoleId = ref('')
const maskDialogVisible = ref(false)
const maskEditDetail = ref(null)
const maskRowDetail = ref(null)
const dropdownHandleRole = ref(null)
const permissionTreeRef = ref(null)
const roleTableHeight = ref(320)
const roleTreeHeight = ref(320)
const rolePage = ref(1)
const rolePageSize = ref(15)
const roleIdSeed = ref(1)

const fieldAuthState = ref(Object.fromEntries(
  roles.value.map(role => [role.roleId, cloneDeep(fieldAuthRows)])
))

const activeRole = computed(() => roles.value.find(role => role.roleId === activeRoleId.value) || null)
const activeRoleName = computed(() => activeRole.value?.roleName || '当前角色')
const activeRoleUserIds = computed(() => activeRole.value?.userIds || [])
const showRoleRules = computed(() => Boolean(activeRole.value && !['admin', 'project'].includes(activeRole.value.remark)))
const activeRoleRules = computed(() => activeRole.value?.rules?.module || [])
const permissionTreeKey = computed(() => `${activeRoleId.value}-${activeRuleMenu.value}`)

const filteredRoleUsers = computed(() => {
  if (!activeRole.value) return []
  const ids = new Set(activeRole.value.userIds || [])
  const keyword = userKeyword.value.trim()
  return employeeRows
    .filter(row => ids.has(row.userId))
    .filter(row => !keyword || `${row.realname}${row.mobile}`.includes(keyword))
    .map(row => ({
      ...row,
      roleName: activeRole.value.roleName
    }))
})

const flatDepartments = computed(() => {
  const result = []
  const walk = list => {
    list.forEach(node => {
      if (node.type !== 1) result.push({ deptId: node.deptId, name: node.name })
      if (node.children?.length) walk(node.children)
    })
  }
  walk(departmentTree)
  return result
})

const roleDialogTitle = computed(() => roleDialogMode.value === 'create' ? '新建角色' : '编辑角色')

watch(activeRole, role => {
  if (!role) return
  if (!showRoleRules.value && activeTab.value === 'rule') {
    activeTab.value = 'user'
  }
  dataRangeError.value = ''
  nextTick(syncPermissionTree)
})

function updateRoleHeights() {
  // 源码角色页分别用不同扣减值控制员工表和权限树可视高度。
  roleTableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminRoleTableOffset)
  roleTreeHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminRoleTreeOffset)
}

function canManageRole(role) {
  return Boolean(role && !['admin', 'project'].includes(role.remark))
}

function selectRole(role) {
  activeRoleId.value = role.roleId
}

function headerSearch() {
  rolePage.value = 1
  return userKeyword.value
}

function roleDropdownClick(role) {
  dropdownHandleRole.value = role
}

function roleHandleClick(command) {
  const role = dropdownHandleRole.value
  if (!canManageRole(role)) return
  if (command === 'edit') openRoleEdit(role)
  if (command === 'copy') copyRole(role)
  if (command === 'delete') deleteRole(role)
}

function openRoleCreate() {
  roleDialogMode.value = 'create'
  roleForm.value = { roleName: '' }
  roleFormError.value = ''
  roleDialogVisible.value = true
}

function openRoleEdit(role) {
  roleDialogMode.value = 'edit'
  roleForm.value = { roleName: role.roleName }
  roleFormError.value = ''
  dropdownHandleRole.value = role
  roleDialogVisible.value = true
}

function submitRoleDialog() {
  const roleName = roleForm.value.roleName.trim()
  if (!roleName) {
    roleFormError.value = '角色名称不能为空'
    return
  }

  if (roleDialogMode.value === 'create') {
    const roleId = `r-local-${roleIdSeed.value++}`
    const role = {
      roleId,
      roleName,
      remark: 'crm',
      employeeCount: 0,
      userIds: [],
      rules: { module: [] },
      dataType: 2,
      deptList: [],
      isNeedChild: 0
    }
    roles.value.push(role)
    fieldAuthState.value[roleId] = cloneDeep(fieldAuthRows)
    activeRoleId.value = roleId
  } else if (dropdownHandleRole.value) {
    dropdownHandleRole.value.roleName = roleName
  }

  roleDialogVisible.value = false
}

function copyRole(role) {
  const roleId = `r-copy-${roleIdSeed.value++}`
  const copiedRole = {
    ...cloneDeep(role),
    roleId,
    roleName: `${role.roleName} 副本`,
    visible: false
  }
  roles.value.push(copiedRole)
  fieldAuthState.value[roleId] = cloneDeep(fieldAuthState.value[role.roleId] || fieldAuthRows)
  activeRoleId.value = roleId
}

function deleteRole(role) {
  roles.value = roles.value.filter(item => item.roleId !== role.roleId)
  delete fieldAuthState.value[role.roleId]
  if (activeRoleId.value === role.roleId) {
    activeRoleId.value = roles.value.find(item => item.remark !== 'admin')?.roleId || roles.value[0]?.roleId || ''
  }
}

function openRelateEmployee() {
  relateSelectedUserIds.value = []
  relateEmployeeVisible.value = true
}

function saveRelateEmployees() {
  if (!activeRole.value) return
  activeRole.value.userIds = Array.from(new Set([
    ...(activeRole.value.userIds || []),
    ...relateSelectedUserIds.value
  ]))
  activeRole.value.employeeCount = activeRole.value.userIds.length
  relateEmployeeVisible.value = false
}

function removeRoleUser(row) {
  if (!activeRole.value || row.userIdentity === 0) return
  activeRole.value.userIds = activeRole.value.userIds.filter(userId => userId !== row.userId)
  activeRole.value.employeeCount = activeRole.value.userIds.length
}

function openEmployeeRoleAction(title) {
  employeeRoleActionTitle.value = title
  employeeRoleActionVisible.value = true
}

function syncPermissionTree() {
  permissionTreeRef.value?.setCheckedKeys(activeRoleRules.value)
}

function handlePermissionCheck() {
  if (!activeRole.value || !permissionTreeRef.value) return
  activeRole.value.rules.module = permissionTreeRef.value.getCheckedKeys(false)
}

function saveRolePermission() {
  if (!activeRole.value) return

  if (activeRuleMenu.value === 'module') {
    handlePermissionCheck()
    return
  }

  if (activeRole.value.dataType === 0 && activeRole.value.deptList.length === 0) {
    dataRangeError.value = '自定义数据范围必须选择部门'
    return
  }

  dataRangeError.value = ''
}

function openDepartmentRange() {
  if (!activeRole.value) return
  departmentSelection.value = activeRole.value.deptList.map(dept => dept.deptId)
  departmentIncludeChild.value = Boolean(activeRole.value.isNeedChild)
  departmentRangeVisible.value = true
}

function saveDepartmentRange() {
  if (!activeRole.value) return
  const selected = new Set(departmentSelection.value)
  activeRole.value.deptList = flatDepartments.value.filter(dept => selected.has(dept.deptId))
  activeRole.value.isNeedChild = departmentIncludeChild.value ? 1 : 0
  dataRangeError.value = ''
  departmentRangeVisible.value = false
}

function clearDepartmentRange() {
  if (!activeRole.value) return
  activeRole.value.deptList = []
  activeRole.value.isNeedChild = 0
}

function removeDepartmentTag(deptId) {
  if (!activeRole.value) return
  activeRole.value.deptList = activeRole.value.deptList.filter(dept => dept.deptId !== deptId)
}

function openFieldAuth(data) {
  fieldDialogTitle.value = `${data.menuName}字段授权`
  fieldDialogRoleId.value = activeRoleId.value
  fieldDialogRows.value = cloneDeep(fieldAuthState.value[fieldDialogRoleId.value] || fieldAuthRows)
  fieldDialogVisible.value = true
}

function resetFieldDialog() {
  fieldDialogRows.value = cloneDeep(fieldAuthState.value[fieldDialogRoleId.value] || fieldAuthRows)
}

function saveFieldDialog() {
  fieldAuthState.value[fieldDialogRoleId.value] = cloneDeep(fieldDialogRows.value)
  fieldDialogVisible.value = false
}

function canOperateRead(operateType) {
  return operateType === 1 || operateType === 2
}

function canOperateEdit(operateType) {
  return operateType === 1 || operateType === 3
}

function getMaskIsShow({ type }) {
  return [7, 14, 6, 43].includes(type)
}

function eachChild(row, callback) {
  ;(row.childField || []).forEach(callback)
}

function findParent(rows, row) {
  for (const item of rows) {
    if ((item.childField || []).some(child => child.id === row.id)) return item
    const found = findParent(item.childField || [], row)
    if (found) return found
  }
  return null
}

function updateParentCheck(row) {
  const parent = findParent(fieldDialogRows.value, row)
  if (!parent) return
  const children = parent.childField || []
  parent.canCheck = children.some(child => child.canCheck)
  parent.canEdit = children.some(child => child.canEdit)
  if (parent.canEdit) parent.canCheck = true
}

function handleCanEditChange(row) {
  if (row.canEdit) {
    row.canCheck = true
  }

  if (row.childField?.length) {
    eachChild(row, child => {
      if (canOperateEdit(child.operateType)) child.canEdit = row.canEdit
      if (row.canEdit && canOperateRead(child.operateType)) child.canCheck = true
    })
  } else {
    updateParentCheck(row)
  }
}

function handleCanCheckChange(row) {
  if (!row.canCheck) {
    row.canEdit = false
  }

  if (row.childField?.length) {
    eachChild(row, child => {
      if (canOperateRead(child.operateType)) child.canCheck = row.canCheck
      if (!row.canCheck && canOperateEdit(child.operateType)) child.canEdit = false
    })
  } else {
    updateParentCheck(row)
  }
}

function handleMaskChange(row) {
  row.tableMask = row.canMask
  row.viewMask = row.canMask
}

function openMaskDialog(row) {
  maskRowDetail.value = row
  maskEditDetail.value = cloneDeep(row)
  maskDialogVisible.value = true
}

function saveMaskDialog() {
  if (!maskRowDetail.value || !maskEditDetail.value) return
  maskRowDetail.value.tableMask = maskEditDetail.value.tableMask
  maskRowDetail.value.viewMask = maskEditDetail.value.viewMask
  maskRowDetail.value.canMask = maskEditDetail.value.tableMask || maskEditDetail.value.viewMask
  maskDialogVisible.value = false
}

onMounted(() => {
  updateRoleHeights()
  window.addEventListener('resize', updateRoleHeights)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateRoleHeights)
})
</script>
