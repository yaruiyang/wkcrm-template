<template>
  <section class="employee-dep-management main admin-employee-page" data-section="admin-employee">
    <header class="xr-header admin-xr-header">
      <div class="admin-xr-label">
        员工与部门管理
        <i class="wk wk-icon-fill-help wk-help-tips" data-type="21" data-id="170" aria-hidden="true" />
      </div>
      <div class="admin-xr-ft">
        <el-input
          v-model="keyword"
          class="search-input admin-header-search"
          placeholder="请输入员工姓名/手机号"
          @keyup.enter="headerSearch"
          @blur="headerSearch"
        >
          <template #suffix>
            <el-button link class="search-suffix-btn" :icon="Search" @click="headerSearch" />
          </template>
        </el-input>
        <el-button class="add-user-btn" type="primary" @click="employeeDialogVisible = true">添加员工</el-button>
      </div>
    </header>

    <div class="main-content-wrap">
      <div class="main-nav admin-main-nav" data-section="admin-local-nav">
        <div class="main-nav__title">
          <div>
            企业组织架构
            <i class="wk wk-icon-fill-help wk-help-tips" data-type="21" data-id="169" aria-hidden="true" />
          </div>
          <el-button link class="add-btn" :icon="Plus" @click="departmentDialogVisible = true">创建部门</el-button>
        </div>
        <div class="main-nav__content">
          <div class="nav-sections-wrap" data-section="admin-department-tree-wrap">
            <div class="nav-section is-padding">
              <div class="nav-section__content is-top-padding">
                <el-tree
                  ref="tree"
                  class="admin-department-tree"
                  :data="departmentTree"
                  node-key="deptId"
                  :current-node-key="currentDepartmentId"
                  :expand-on-click-node="false"
                  default-expand-all
                  highlight-current
                  :props="{ label: 'name' }"
                  @node-click="changeDepartment"
                >
                  <template #default="{ node, data }">
                    <div class="dept-tree">
                      <i v-if="node.level === 1" class="wk wk-customer dept-tree__root-icon" aria-hidden="true" />
                      <span class="dept-name">{{ data.name }}</span>
                      <div class="dept-tree-setting" @click.stop>
                        <el-dropdown @command="handleDepartmentSetting">
                          <span class="el-dropdown-link">
                            <i class="el-icon-s-tools" aria-hidden="true" />
                          </span>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item :command="`create:${data.deptId}`">创建子部门</el-dropdown-item>
                              <el-dropdown-item :command="`edit:${data.deptId}`">编辑部门</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </div>
                  </template>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content admin-main-content flex-index">
        <div v-if="selectedRows.length === 0" class="table-top admin-table-top">
          <div class="table-top__title">
            {{ currentDepartmentName }}
            <span class="des">
              所有员工 <span class="value">{{ employeeStats.total }}</span> 人，已激活 <span class="value">{{ employeeStats.active }}</span> 人，未激活 <span class="value">{{ employeeStats.inactive }}</span> 人，停用 <span class="value">{{ employeeStats.disabled }}</span> 人
            </span>
          </div>
          <div class="table-top__ft">
            <el-checkbox v-model="includeChild">包含子部门</el-checkbox>
            <el-select v-model="employeeStatus" class="el-select--no-bg admin-no-bg-select">
              <el-option label="所有员工" value="all" />
              <el-option label="已激活" value="active" />
              <el-option label="未激活" value="inactive" />
              <el-option label="停用" value="disabled" />
            </el-select>
          </div>
        </div>
        <div v-else class="admin-employee-selection-bar" data-section="admin-employee-selection-bar">
          <div class="employee-selected-title">已选中 <span class="employee-selected-count">{{ selectedRows.length }}</span> 项</div>
          <el-scrollbar>
            <div class="selection-items-box employee-selection-items">
              <el-button
                v-for="item in employeeSelectionActions"
                :key="item.type"
                class="employee-selection-action"
                :data-action="item.type"
                text
                bg
                @click="openEmployeeAction(item)"
              >
                <i :class="item.icon" aria-hidden="true" />
                {{ item.name }}
              </el-button>
            </div>
          </el-scrollbar>
        </div>

        <div class="flex-box admin-flex-box" data-section="admin-employee-table-wrap">
          <el-table
            id="depTable"
            class="admin-source-table"
            :data="filteredRows"
            :height="employeeTableHeight"
            row-key="userId"
            @selection-change="handleEmployeeSelectionChange"
            @row-click="openEmployeeDetail"
          >
            <el-table-column type="selection" width="55" fixed />
            <el-table-column
              v-for="field in employeeFields"
              :key="field.prop"
              :prop="field.prop"
              :label="field.label"
              :min-width="field.width"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                <span v-if="field.prop === 'status'" class="status-cell">
                  <span :class="['status-mark', row.status === '已激活' ? 'is-success' : row.status === '未激活' ? 'is-muted' : 'is-warning']" />
                  {{ row.status }}
                </span>
                <span v-else-if="field.prop === 'realname'" class="admin-link" @click.stop="openEmployeeDetail(row)">
                  {{ row.realname }}
                  <el-tag v-if="row.userIdentity === 0" disable-transitions type="warning">主账号</el-tag>
                </span>
                <span v-else>{{ row[field.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="p-contianer admin-pagination">
            <el-pagination
              v-model:current-page="employeePage"
              v-model:page-size="employeePageSize"
              background
              layout="prev, pager, next, sizes, total, jumper"
              :total="filteredRows.length"
              :page-sizes="[15, 30, 60]"
              :pager-count="5"
            />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="departmentDialogVisible"
      title="创建部门"
      width="500px"
      :close-on-click-modal="false"
      data-section="admin-department-dialog"
    >
      <div class="nav-dialog-div">
        <label>部门名称：</label>
        <el-input placeholder="请输入部门名称" />
      </div>
      <div class="nav-dialog-div">
        <label>上级部门：</label>
        <el-select model-value="销售中心">
          <el-option label="销售中心" value="销售中心" />
          <el-option label="华东销售组" value="华东销售组" />
        </el-select>
      </div>
      <div class="nav-dialog-div">
        <label>部门负责人：</label>
        <el-input placeholder="请选择部门负责人" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="departmentDialogVisible = false">确定</el-button>
          <el-button text bg @click="departmentDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="employeeDialogVisible" title="添加员工" width="700px" :close-on-click-modal="false">
      <el-form label-position="top" class="admin-two-col-form">
        <el-form-item label="姓名" required><el-input placeholder="请输入姓名" /></el-form-item>
        <el-form-item label="手机号" required><el-input placeholder="请输入手机号" /></el-form-item>
        <el-form-item label="主部门"><el-input model-value="销售中心" /></el-form-item>
        <el-form-item label="角色"><el-input model-value="销售人员" /></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="employeeDialogVisible = false">保存</el-button>
          <el-button text bg @click="employeeDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="employeeActionDialogVisible"
      :title="employeeActionTitle"
      width="500px"
      :close-on-click-modal="false"
      data-section="admin-employee-action-dialog"
    >
      <div class="admin-employee-action-copy">
        已选中 {{ selectedRows.length }} 项。当前模板只对齐源码操作入口和弹层形态，不执行真实状态、导出、角色、部门或密码修改。
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="employeeActionDialogVisible = false">确定</el-button>
          <el-button text bg @click="employeeActionDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <AdminEmployeeDetail
      v-model="employeeDetailVisible"
      v-model:employee="activeEmployee"
      :page-list="filteredRows"
      @edit="handleEmployeeDetailEdit"
      @action="handleEmployeeDetailAction"
    />
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import AdminEmployeeDetail from './AdminEmployeeDetail.vue'
import { departmentTree, employeeFields, employeeRows } from '../mock/admin'
import { wkcrmUiDimensions } from '../constants/wkcrmUiTokens'

const keyword = ref('')
const includeChild = ref(true)
const employeeStatus = ref('all')
const selectedRows = ref([])
const tree = ref(null)
const currentDepartmentId = ref('')
const currentDepartmentName = ref('')
const departmentDialogVisible = ref(false)
const employeeDialogVisible = ref(false)
const employeeActionDialogVisible = ref(false)
const employeeActionTitle = ref('')
const employeeDetailVisible = ref(false)
const activeEmployee = ref(null)
const employeeTableHeight = ref(320)
const employeePage = ref(1)
const employeePageSize = ref(15)
const currentCompanyId = 'current-company'

const filteredRows = computed(() => {
  if (!keyword.value) return employeeRows
  return employeeRows.filter(row => `${row.realname}${row.mobile}`.includes(keyword.value))
})

const employeeStats = computed(() => {
  // 员工列表统计由当前 mock 行计算，保证模板数据精简后标题和分页仍一致。
  const rows = filteredRows.value
  return {
    total: rows.length,
    active: rows.filter(row => row.status === '已激活').length,
    inactive: rows.filter(row => row.status === '未激活').length,
    disabled: rows.filter(row => row.status === '停用').length
  }
})

const employeeSelectionActions = computed(() => {
  const actions = [
    { name: '停用', type: 'lock', icon: 'wk wk-remove' },
    { name: '激活', type: 'unlock', icon: 'wk wk-activation' },
    { name: '导出选中项', type: 'selectExport', icon: 'wk wk-icon-export2' }
  ]
  const hasMainAccount = selectedRows.value.some(row => row.userIdentity === 0)

  if (selectedRows.value.length === 1) {
    actions.push(
      { name: '编辑', type: 'edit', icon: 'wk wk-edit' },
      { name: '重置密码', type: 'reset', icon: 'wk wk-circle-password' },
      { name: '复制角色', type: 'copyRole', icon: 'wk wk-icon-double-note' }
    )
  } else {
    actions.push({ name: '重置密码', type: 'reset', icon: 'wk wk-circle-password' })
  }

  if (!hasMainAccount) {
    actions.push({ name: '编辑角色', type: 'editRole', icon: 'wk wk-edit' })
  }

  actions.push({ name: '调整部门', type: 'editDep', icon: 'wk wk-employees' })
  return actions
})

function headerSearch() {
  return keyword.value
}

function findDefaultDepartment(list) {
  for (const node of list) {
    // 源码默认进入时优先选择本公司 type=2 部门，找不到才回落到树的第一项。
    if (node.type === 2 && node.companyId === currentCompanyId) {
      return node
    }

    if (node.children?.length) {
      const found = findDefaultDepartment(node.children)
      if (found) return found
    }
  }

  return null
}

function enterDefaultDepartment() {
  const firstDepartment = findDefaultDepartment(departmentTree) || departmentTree[0]
  if (!firstDepartment) return

  changeDepartment(firstDepartment)
  nextTick(() => {
    tree.value?.setCurrentNode(firstDepartment)
  })
}

function changeDepartment(data) {
  // 源码中 type=1 为公司类型节点，不作为右侧员工列表筛选部门。
  if (data.type === 1) return

  // 当前部门是组织树和右侧员工统计标题的共享业务状态。
  currentDepartmentId.value = data.deptId
  currentDepartmentName.value = data.name
}

function handleDepartmentSetting(command) {
  // 模板只承载源码的部门设置入口形态，命令值用于保持下拉交互可定位。
  return command
}

function handleEmployeeSelectionChange(rows) {
  selectedRows.value = rows
}

function openEmployeeAction(action) {
  employeeActionTitle.value = action.name
  employeeActionDialogVisible.value = true
}

function openEmployeeDetail(row, column) {
  if (column?.type === 'selection') return
  activeEmployee.value = row
  employeeDetailVisible.value = true
}

function handleEmployeeDetailEdit(employee) {
  activeEmployee.value = employee
  employeeDialogVisible.value = true
}

function handleEmployeeDetailAction(command) {
  employeeActionTitle.value = command === 'reset' ? '重置密码' : '停用/激活'
  employeeActionDialogVisible.value = true
}

function updateEmployeeTableHeight() {
  // 源码员工部门表格使用视口高度扣除顶部导航、页面头、table-top 和分页固定空间。
  employeeTableHeight.value = Math.max(320, window.innerHeight - wkcrmUiDimensions.adminEmployeeTableOffset)
}

onMounted(() => {
  enterDefaultDepartment()
  updateEmployeeTableHeight()
  window.addEventListener('resize', updateEmployeeTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateEmployeeTableHeight)
})
</script>
