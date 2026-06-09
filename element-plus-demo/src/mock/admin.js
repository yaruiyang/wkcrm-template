import {
  customerFieldModel,
  createDesignerFieldsFromModel,
  supportedCustomerFieldTypeLib
} from './crmFieldModel.js'

export const adminSections = [
  { key: 'employee', label: '员工与部门管理', icon: 'icon-s-seas-line', description: '组织架构与成员账号' },
  { key: 'role', label: '角色权限管理', icon: 'icon-employees-line', description: '角色、员工和数据权限' },
  { key: 'fields', label: '自定义字段设置', icon: 'wk wk-icon-all-solid', description: '业务对象字段配置' },
  { key: 'approval', label: '业务审批流', icon: 'wk wk-icon-stage', description: '审批流程与启停' },
  { key: 'logs', label: '系统日志', icon: 'icon-record-line', description: '操作记录和审计' }
]

export const adminManageMenu = [
  { key: 'employee', path: '/manage/employee-dep', meta: { title: '员工与部门管理', icon: 'icon-s-seas-line' }, target: 'employee' },
  { key: 'role', path: '/manage/role-auth', meta: { title: '角色权限管理', icon: 'icon-employees-line' }, target: 'role' },
  {
    key: 'customer',
    path: '/manage/customer',
    meta: { title: '客户管理', icon: 'customer-line' },
    children: [
      { key: 'customer-custom-field', path: '/manage/customer/custom-field', meta: { title: '自定义字段设置' }, target: 'fields' },
      { key: 'customer-approval', path: '/manage/customer/examine', meta: { title: '业务审批流' }, target: 'approval' },
      { key: 'customer-leads-pool', path: '/manage/customer/leads', meta: { title: '线索池规则设置' }, target: 'leadsPool' },
      { key: 'customer-pool', path: '/manage/customer/customer', meta: { title: '客户公海规则设置' }, target: 'customerPool' },
      { key: 'customer-print-template', path: '/manage/customer/print-templates', meta: { title: '自定义打印模板' }, target: 'printTemplate' },
      { key: 'customer-biz-param', path: '/manage/customer/biz-param', meta: { title: '业务参数设置' }, target: 'bizParam' }
    ]
  },
  {
    key: 'logs',
    path: '/manage/log',
    meta: { title: '系统日志', icon: 'icon-record-line' },
    target: 'logs'
  }
]

export const departmentTree = [
  {
    deptId: 'root',
    name: '总公司',
    type: 1,
    companyId: 'current-company',
    children: [
      {
        deptId: 'dept-sales',
        name: '销售中心',
        type: 2,
        companyId: 'current-company',
        children: [
          {
            deptId: 'dept-east',
            name: '华东销售组',
            type: 2,
            companyId: 'current-company',
            children: [
              {
                deptId: 'dept-key-account',
                name: '大客户组',
                type: 2,
                companyId: 'current-company',
                children: [
                  { deptId: 'dept-success', name: '客户成功部', type: 2, companyId: 'current-company' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

export const employeeRows = [
  {
    userId: 'u-001',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'admin',
    username: '15639390000',
    userIdentity: 0,
    activeModuleList: 'CRM,后台管理',
    mobile: '156****3939',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'admin@wkcrm.demo',
    deptName: '总公司',
    parentDeptName: '',
    subsidiaryDeptName: '',
    parentName: '',
    roleName: '超级管理员',
    post: '标准岗位',
    createTime: '2026-05-16 09:12',
    img: ''
  },
  {
    userId: 'u-002',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '林舟',
    username: '13961820000',
    userIdentity: 1,
    activeModuleList: 'CRM',
    mobile: '139****6182',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'linzhou@wkcrm.demo',
    deptName: '销售中心',
    parentDeptName: '',
    subsidiaryDeptName: '',
    parentName: 'admin',
    roleName: '销售主管',
    post: '销售主管',
    createTime: '2026-05-18 10:26',
    img: ''
  },
  {
    userId: 'u-003',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '张敏',
    username: '15555450000',
    userIdentity: 1,
    activeModuleList: 'CRM',
    mobile: '155****5545',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'zhangmin@wkcrm.demo',
    deptName: '华东销售组',
    parentDeptName: '销售中心',
    subsidiaryDeptName: '销售中心',
    parentName: '林舟',
    roleName: '销售人员',
    post: '客户经理',
    createTime: '2026-05-19 14:48',
    img: ''
  },
  {
    userId: 'u-004',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '陈启',
    username: '18668030000',
    userIdentity: 1,
    activeModuleList: 'CRM,办公',
    mobile: '186****6803',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'chenqi@wkcrm.demo',
    deptName: '大客户组',
    parentDeptName: '华东销售组',
    subsidiaryDeptName: '华东销售组',
    parentName: '林舟',
    roleName: '销售人员',
    post: '大客户经理',
    createTime: '2026-05-21 11:08',
    img: ''
  },
  {
    userId: 'u-005',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '周宁',
    username: '13890410000',
    userIdentity: 1,
    activeModuleList: 'CRM',
    mobile: '138****9041',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'zhouning@wkcrm.demo',
    deptName: '客户成功部',
    parentDeptName: '大客户组',
    subsidiaryDeptName: '大客户组',
    parentName: '陈启',
    roleName: '客户成功',
    post: '客户成功',
    createTime: '2026-05-23 16:35',
    img: ''
  },
  {
    userId: 'u-006',
    sokingStatus: '未开启',
    status: '未激活',
    realname: '赵然',
    username: '13722060000',
    userIdentity: 1,
    activeModuleList: '',
    mobile: '137****2206',
    wxBindStatus: '未绑定',
    sex: '',
    email: 'zhaoran@wkcrm.demo',
    deptName: '客户成功部',
    parentDeptName: '大客户组',
    subsidiaryDeptName: '大客户组',
    parentName: '周宁',
    roleName: '销售人员',
    post: '试用员工',
    createTime: '2026-05-27 09:40',
    img: ''
  }
]

export const employeeFields = [
  { prop: 'sokingStatus', label: '搜索状态', width: 110 },
  { prop: 'status', label: '状态', width: 90 },
  { prop: 'realname', label: '姓名', width: 150 },
  { prop: 'activeModuleList', label: '应用', width: 160 },
  { prop: 'mobile', label: '手机号（登录名）', width: 165 },
  { prop: 'wxBindStatus', label: '是否绑定企业微信', width: 165 },
  { prop: 'sex', label: '性别', width: 70 },
  { prop: 'email', label: '邮箱', width: 170 },
  { prop: 'deptName', label: '主部门', width: 110 },
  { prop: 'parentDeptName', label: '附属部门', width: 110 },
  { prop: 'post', label: '岗位', width: 130 }
]

export const roleList = [
  {
    roleId: 'r-admin',
    roleName: '超级管理员',
    remark: 'admin',
    employeeCount: 1,
    userIds: ['u-001'],
    rules: {
      module: ['crm', 'crm-customer', 'crm-customer-read', 'crm-customer-save', 'crm-customer-delete', 'crm-business', 'crm-business-read', 'crm-business-save', 'system', 'system-employee', 'system-employee-read', 'system-employee-save']
    },
    dataType: 5,
    deptList: [],
    isNeedChild: 0
  },
  {
    roleId: 'r-sales-manager',
    roleName: '销售主管',
    remark: 'crm',
    employeeCount: 2,
    userIds: ['u-002', 'u-003'],
    rules: {
      module: ['crm-customer-read', 'crm-customer-save', 'crm-business-read', 'crm-business-save']
    },
    dataType: 2,
    deptList: [],
    isNeedChild: 0
  },
  {
    roleId: 'r-sales',
    roleName: '销售人员',
    remark: 'crm',
    employeeCount: 2,
    userIds: ['u-003', 'u-004'],
    rules: {
      module: ['crm-customer-read', 'crm-business-read']
    },
    dataType: 1,
    deptList: [],
    isNeedChild: 0
  },
  {
    roleId: 'r-finance',
    roleName: '财务角色',
    remark: 'finance',
    employeeCount: 1,
    userIds: ['u-006'],
    rules: {
      module: ['crm-business-read']
    },
    dataType: 3,
    deptList: [],
    isNeedChild: 0
  },
  {
    roleId: 'r-service',
    roleName: '客户成功',
    remark: 'crm',
    employeeCount: 1,
    userIds: ['u-005'],
    rules: {
      module: ['crm-customer-read']
    },
    dataType: 0,
    deptList: [{ deptId: 'dept-cs', name: '客户成功部' }],
    isNeedChild: 1
  }
]

export const roleUserRows = employeeRows.map(item => ({
  ...item,
  roleName: item.roleName || '销售人员'
}))

export const rolePermissionMenus = [
  { index: 'module', label: '模块权限', type: 'tree' },
  { index: 'dataRange', label: '数据权限', type: 'data' }
]

export const permissionTree = [
  {
    menuId: 'crm',
    menuName: '客户管理',
    childMenu: [
      {
        menuId: 'crm-customer',
        menuName: '客户',
        realm: 'crm_customer',
        childMenu: [
          { menuId: 'crm-customer-read', menuName: '查看' },
          { menuId: 'crm-customer-save', menuName: '新建/编辑' },
          { menuId: 'crm-customer-delete', menuName: '删除' }
        ]
      },
      {
        menuId: 'crm-business',
        menuName: '商机',
        realm: 'crm_business',
        childMenu: [
          { menuId: 'crm-business-read', menuName: '查看' },
          { menuId: 'crm-business-save', menuName: '新建/编辑' }
        ]
      }
    ]
  },
  {
    menuId: 'system',
    menuName: '系统管理',
    childMenu: [
      {
        menuId: 'system-employee',
        menuName: '员工部门',
        realm: 'system_employee',
        childMenu: [
          { menuId: 'system-employee-read', menuName: '查看' },
          { menuId: 'system-employee-save', menuName: '添加员工' }
        ]
      }
    ]
  }
]

export const fieldAuthRows = [
  {
    id: 'base',
    name: '基本信息',
    operateType: 1,
    type: 0,
    fieldName: 'base',
    canCheck: true,
    canEdit: true,
    canMask: false,
    tableMask: false,
    viewMask: false,
    childField: [
      { id: 'customerName', parentId: 'base', name: '客户名称', operateType: 1, type: 1, fieldName: 'customerName', canCheck: true, canEdit: true, canMask: false, tableMask: false, viewMask: false },
      { id: 'mobile', parentId: 'base', name: '手机', operateType: 1, type: 7, fieldName: 'mobile', canCheck: true, canEdit: true, canMask: true, tableMask: true, viewMask: true },
      { id: 'telephone', parentId: 'base', name: '电话', operateType: 1, type: 7, fieldName: 'telephone', canCheck: true, canEdit: false, canMask: true, tableMask: true, viewMask: false }
    ]
  },
  {
    id: 'deal',
    name: '业务信息',
    operateType: 1,
    type: 0,
    fieldName: 'deal',
    canCheck: true,
    canEdit: false,
    canMask: false,
    tableMask: false,
    viewMask: false,
    childField: [
      { id: 'ownerUserName', parentId: 'deal', name: '负责人', operateType: 2, type: 8, fieldName: 'ownerUserName', canCheck: true, canEdit: false, canMask: false, tableMask: false, viewMask: false },
      { id: 'nextTime', parentId: 'deal', name: '下次联系时间', operateType: 1, type: 13, fieldName: 'nextTime', canCheck: true, canEdit: true, canMask: false, tableMask: false, viewMask: false }
    ]
  }
]

export const customFieldModules = [
  { label: 1, icon: 'wk wk-leads', name: '线索', updateTime: '2026-05-28 14:20' },
  { label: 2, icon: 'wk wk-customer', name: '客户', updateTime: '2026-06-01 10:35' },
  { label: 3, icon: 'wk wk-contacts', name: '联系人', updateTime: '2026-05-30 09:12' },
  { label: 5, icon: 'wk wk-business', name: '商机', updateTime: '2026-05-24 17:44' },
  { label: 6, icon: 'wk wk-contract', name: '合同', updateTime: '2026-05-22 11:08' }
]

export const fieldTypeLib = supportedCustomerFieldTypeLib

export const designerFields = createDesignerFieldsFromModel(customerFieldModel)

export const approvalRows = [
  { metadataId: 'flow-001', examineName: '合同审批流程', label: '合同', advancedConfigVO: '允许重新提交', updateUserName: 'admin', updateTime: '2026-05-31 11:22', status: 1 },
  { metadataId: 'flow-002', examineName: '回款审批流程', label: '回款', advancedConfigVO: '拒绝后重新审批', updateUserName: '林舟', updateTime: '2026-05-25 16:40', status: 1 },
  { metadataId: 'flow-003', examineName: '发票审批流程', label: '发票', advancedConfigVO: '不允许重新提交', updateUserName: '张敏', updateTime: '2026-05-20 09:10', status: 2 },
  { metadataId: 'flow-004', examineName: '报价单审批流程', label: '报价单', advancedConfigVO: '允许重新提交', updateUserName: 'admin', updateTime: '2026-05-18 14:15', status: 1 }
]

export const approvalFields = [
  { prop: 'examineName', label: '审批流名称', width: 150 },
  { prop: 'label', label: '关联对象', width: 150 },
  { prop: 'advancedConfigVO', label: '审批被拒后重新提交/审批', width: 180 },
  { prop: 'updateUserName', label: '最后修改人', width: 150 },
  { prop: 'updateTime', label: '最后修改时间', width: 160 },
  { prop: 'status', label: '状态', width: 100 }
]

export const approvalFlowTemplate = {
  tabs: [
    { label: '1.设置基础信息', value: 'base' },
    { label: '2.配置流程', value: 'flow' }
  ],
  baseFields: [
    { field: 'examineName', label: '审批流名称', formType: 'text', value: '合同审批流程', required: true },
    { field: 'label', label: '关联对象', formType: 'select', value: '合同', options: ['合同', '回款', '发票', '报价单'], required: true },
    { field: 'description', label: '审批说明', formType: 'textarea', value: '合同金额达到规则后进入审批。' },
    { field: 'rejectType', label: '审批被拒后', formType: 'radio', value: '允许重新提交', options: ['允许重新提交', '重新审批', '不允许重新提交'] }
  ],
  nodePalette: [
    { type: 'start', label: '发起人', icon: 'wk wk-user', theme: 'start', description: '拥有发起权限' },
    { type: 'approve', label: '审批人', icon: 'wk wk-approve', theme: 'approve', description: '部门负责人审批' },
    { type: 'condition', label: '条件分支', icon: 'wk wk-icon-stage', theme: 'condition', description: '按金额或字段条件分流' },
    { type: 'fill', label: '填写', icon: 'wk wk-edit', theme: 'fill', description: '补充审批所需字段' },
    { type: 'copy', label: '抄送人', icon: 'wk wk-associated', theme: 'copy', description: '流程结束后抄送' }
  ],
  sendNode: {
    nodeId: 'flow-send-node',
    type: 'start',
    theme: 'start',
    name: '发起人',
    content: '拥有合同、回款、发票、报价单发起权限',
    disabled: true,
    icon: 'wk wk-visit-contract'
  },
  canvasNodes: [
    {
      nodeId: 'flow-approve-director',
      type: 'approve',
      theme: 'approve',
      examineType: 2,
      name: '直属上级审批',
      content: '发起人上级自动匹配',
      parentLevel: 1,
      approveWay: '依次审批'
    },
    {
      nodeId: 'flow-condition-amount',
      type: 'condition',
      theme: 'condition',
      examineType: 0,
      name: '金额条件分支',
      conditionList: [
        {
          nodeId: 'flow-condition-amount-high',
          conditionName: '合同金额大于 100000',
          content: '合同金额 大于 100000 元',
          conditionDataList: ['合同金额 大于 100000 元'],
          examineDataList: [
            {
              nodeId: 'flow-approve-finance',
              type: 'approve',
              theme: 'approve',
              examineType: 3,
              name: '财务复核',
              content: '财务负责人或签',
              roleText: '财务负责人',
              approveWay: '或签'
            }
          ]
        },
        {
          nodeId: 'flow-condition-amount-other',
          conditionName: '其他金额',
          content: '未命中其他条件',
          conditionDataList: [],
          examineDataList: [
            {
              nodeId: 'flow-copy-owner',
              type: 'copy',
              theme: 'copy',
              examineType: 7,
              name: '抄送人',
              content: '审批完成后抄送客户负责人',
              userText: '客户负责人',
              isSelf: false,
              isAdd: true
            }
          ]
        }
      ]
    },
    {
      nodeId: 'flow-fill-finance',
      type: 'fill',
      theme: 'fill',
      examineType: 9,
      name: '财务填写',
      content: '补充付款计划、开票信息'
    }
  ],
  advancedFields: [
    { field: 'resubmitPolicy', label: '重新提交策略', formType: 'radio', value: '回到当前节点', options: ['回到当前节点', '从头开始审批'] },
    { field: 'recallEnabled', label: '允许发起人撤回', formType: 'switch', value: true },
    { field: 'duplicateCheck', label: '同一审批人自动跳过', formType: 'switch', value: true },
    { field: 'carbonCopyEnd', label: '审批结束抄送', formType: 'select', value: '客户负责人', options: ['客户负责人', '直属上级', '部门负责人'] }
  ],
  excludedNodeTypes: ['通知', '邮件通知', 'Webhook', '定时触发', '字段更新', '删除数据']
}

const poolUsers = [
  { id: 'pool-user-001', realname: 'admin', img: '' },
  { id: 'pool-user-002', realname: '林舟', img: '' },
  { id: 'pool-user-003', realname: '张敏', img: '' },
  { id: 'pool-user-004', realname: '周芮', img: '' },
  { id: 'pool-user-005', realname: '韩予', img: '' }
]

const poolDepartments = [
  { deptId: 'dept-sales', name: '销售中心' },
  { deptId: 'dept-east', name: '华东销售组' },
  { deptId: 'dept-key-account', name: '大客户组' },
  { deptId: 'dept-success', name: '客户成功部' }
]

const leadsPoolFields = [
  { key: 'leadsName', name: '线索名称' },
  { key: 'mobile', name: '手机号' },
  { key: 'source', name: '来源' },
  { key: 'ownerUserName', name: '负责人' },
  { key: 'lastTime', name: '最后跟进时间' }
]

const customerPoolFields = [
  { key: 'customerName', name: '客户名称' },
  { key: 'level', name: '客户级别' },
  { key: 'ownerUserName', name: '负责人' },
  { key: 'lastTime', name: '最后跟进时间' },
  { key: 'dealStatus', name: '成交状态' }
]

function poolFieldList(fields, visibleKeys) {
  return fields.map(field => ({
    ...field,
    isHidden: visibleKeys.includes(field.key) ? 0 : 1
  }))
}

export const poolRuleTemplates = {
  leads: {
    title: '线索池规则设置',
    createText: '新建线索池',
    idField: 'poolId',
    mockUsers: poolUsers,
    mockDepartments: poolDepartments,
    poolFields: leadsPoolFields,
    fields: [
      { prop: 'poolName', label: '线索池名称', width: 150 },
      { prop: 'adminUser', label: '线索池管理员' },
      { prop: 'memberUser', label: '线索池成员' },
      { prop: 'leadsNum', label: '线索数量', width: 100 },
      { prop: 'status', label: '状态', width: 100 }
    ],
    rows: [
      {
        poolId: 'leads-pool-001',
        poolName: '默认线索池',
        adminUser: [poolUsers[0]],
        memberUser: [poolUsers[1], poolUsers[3]],
        memberDept: [poolDepartments[0], poolDepartments[1]],
        isNeedChild: 1,
        leadsNum: 128,
        status: 1,
        preOwnerSetting: 1,
        preOwnerSettingDay: 7,
        receiveSetting: 1,
        receiveNum: 20,
        remindSetting: 1,
        remindDay: 3,
        putInRule: 1,
        autoAllot: 1,
        rule: [
          { id: 'leads-recycle-1', label: '跟进规则', text: '7 天未跟进自动回收' },
          { id: 'leads-recycle-2', label: '转化规则', text: '15 天未转客户回收' }
        ],
        allot: {
          allocationPlan: '按比例分配',
          triggerAction: ['新数据进入池后分配']
        },
        field: poolFieldList(leadsPoolFields, ['leadsName', 'mobile', 'source']),
        recycleRule: '7 天未跟进自动回收',
        receiveRule: '每人每天领取 20 条',
        allotRule: '按比例分配'
      },
      {
        poolId: 'leads-pool-002',
        poolName: '华东线索池',
        adminUser: [poolUsers[1]],
        memberUser: [poolUsers[2], poolUsers[4]],
        memberDept: [poolDepartments[1]],
        isNeedChild: 1,
        leadsNum: 86,
        status: 1,
        preOwnerSetting: 2,
        preOwnerSettingDay: 10,
        receiveSetting: 1,
        receiveNum: 10,
        remindSetting: 1,
        remindDay: 5,
        putInRule: 1,
        autoAllot: 1,
        rule: [
          { id: 'leads-recycle-3', label: '区域规则', text: '15 天未转客户回收' }
        ],
        allot: {
          allocationPlan: '按数量分配',
          triggerAction: ['新数据进入池后分配', '线索重新分配后触发']
        },
        field: poolFieldList(leadsPoolFields, ['leadsName', 'source', 'ownerUserName']),
        recycleRule: '15 天未转客户回收',
        receiveRule: '每人每天领取 10 条',
        allotRule: '按数量分配'
      },
      {
        poolId: 'leads-pool-003',
        poolName: '沉睡线索池',
        adminUser: [poolUsers[2]],
        memberUser: [poolUsers[4]],
        memberDept: [poolDepartments[3]],
        isNeedChild: 0,
        leadsNum: 32,
        status: 0,
        preOwnerSetting: 0,
        preOwnerSettingDay: 7,
        receiveSetting: 2,
        receiveNum: 0,
        remindSetting: 0,
        remindDay: 3,
        putInRule: 0,
        autoAllot: 0,
        rule: [],
        allot: {
          allocationPlan: '按比例分配',
          triggerAction: []
        },
        field: poolFieldList(leadsPoolFields, ['leadsName', 'mobile', 'lastTime']),
        recycleRule: '不自动回收',
        receiveRule: '暂停领取',
        allotRule: '手动分配'
      }
    ],
    defaultForm: {
      poolName: '新建线索池',
      adminUser: [poolUsers[0]],
      memberUser: [poolUsers[1]],
      memberDept: [poolDepartments[0]],
      isNeedChild: 1,
      preOwnerSetting: 1,
      preOwnerSettingDay: 7,
      receiveSetting: 1,
      receiveNum: 20,
      remindSetting: 1,
      remindDay: 3,
      putInRule: 1,
      autoAllot: 1,
      rule: [
        { id: 'leads-recycle-default-1', label: '跟进规则', text: '7 天未跟进自动回收' }
      ],
      allot: {
        allocationPlan: '按比例分配',
        triggerAction: ['新数据进入池后分配']
      },
      field: poolFieldList(leadsPoolFields, ['leadsName', 'mobile', 'source'])
    },
    createSections: [
      {
        title: '基本信息',
        fields: [
          { field: 'poolName', label: '线索池名称', formType: 'text', required: true },
          { field: 'adminUser', label: '线索池管理员', formType: 'user-select', required: true },
          { field: 'memberUser', label: '线索池成员', formType: 'user-dep-select', required: true }
        ]
      },
      {
        title: '规则设置',
        fields: [
          { field: 'preOwnerSetting', label: '领取规则', formType: 'radio' },
          { field: 'receiveSetting', label: '领取频率规则', formType: 'radio' },
          { field: 'remindSetting', label: '提醒规则', formType: 'radio' },
          { field: 'putInRule', label: '回收规则', formType: 'radio' },
          { field: 'autoAllot', label: '自动分配', formType: 'radio' },
          { field: 'field', label: '线索池字段', formType: 'checkbox' }
        ]
      }
    ],
    transferFields: [
      { field: 'transferTo', label: '转移至', formType: 'select' }
    ]
  },
  customer: {
    title: '客户公海规则设置',
    createText: '新建客户公海',
    idField: 'poolId',
    mockUsers: poolUsers,
    mockDepartments: poolDepartments,
    poolFields: customerPoolFields,
    fields: [
      { prop: 'poolName', label: '公海名称', width: 150 },
      { prop: 'adminUser', label: '公海管理员' },
      { prop: 'memberUser', label: '分配员工' },
      { prop: 'customerNum', label: '客户数量', width: 100 },
      { prop: 'status', label: '状态', width: 100 }
    ],
    rows: [
      {
        poolId: 'customer-pool-001',
        poolName: '默认客户公海',
        adminUser: [poolUsers[0]],
        memberUser: [poolUsers[1], poolUsers[3]],
        memberDept: [poolDepartments[0], poolDepartments[2]],
        isNeedChild: 1,
        customerNum: 240,
        status: 1,
        preOwnerSetting: 1,
        preOwnerSettingDay: 30,
        receiveSetting: 1,
        receiveNum: 10,
        remindSetting: 1,
        remindDay: 5,
        putInRule: 1,
        autoAllot: 1,
        rule: [
          { id: 'customer-recycle-1', label: '跟进规则', text: '30 天未跟进放入公海' },
          { id: 'customer-recycle-2', label: '成交规则', text: '90 天未成交放入公海' }
        ],
        allot: {
          allocationPlan: '按比例分配',
          triggerAction: ['新数据进入池后分配']
        },
        field: poolFieldList(customerPoolFields, ['customerName', 'level', 'ownerUserName']),
        recycleRule: '30 天未跟进放入公海',
        receiveRule: '每人每天领取 10 个',
        allotRule: '按比例分配'
      },
      {
        poolId: 'customer-pool-002',
        poolName: '重点行业公海',
        adminUser: [poolUsers[1]],
        memberUser: [poolUsers[2], poolUsers[4]],
        memberDept: [poolDepartments[2]],
        isNeedChild: 1,
        customerNum: 76,
        status: 1,
        preOwnerSetting: 2,
        preOwnerSettingDay: 60,
        receiveSetting: 0,
        receiveNum: 0,
        remindSetting: 1,
        remindDay: 7,
        putInRule: 1,
        autoAllot: 1,
        rule: [
          { id: 'customer-recycle-3', label: '行业规则', text: '90 天未成交放入公海' }
        ],
        allot: {
          allocationPlan: '按数量分配',
          triggerAction: ['新数据进入池后分配', '客户重新分配后触发']
        },
        field: poolFieldList(customerPoolFields, ['customerName', 'level', 'lastTime']),
        recycleRule: '90 天未成交放入公海',
        receiveRule: '不限制领取',
        allotRule: '按数量分配'
      },
      {
        poolId: 'customer-pool-003',
        poolName: '历史客户公海',
        adminUser: [poolUsers[2]],
        memberUser: [poolUsers[4]],
        memberDept: [poolDepartments[3]],
        isNeedChild: 0,
        customerNum: 45,
        status: 0,
        preOwnerSetting: 0,
        preOwnerSettingDay: 30,
        receiveSetting: 2,
        receiveNum: 0,
        remindSetting: 0,
        remindDay: 3,
        putInRule: 0,
        autoAllot: 0,
        rule: [],
        allot: {
          allocationPlan: '按比例分配',
          triggerAction: []
        },
        field: poolFieldList(customerPoolFields, ['customerName', 'ownerUserName', 'dealStatus']),
        recycleRule: '不自动回收',
        receiveRule: '暂停领取',
        allotRule: '手动分配'
      }
    ],
    defaultForm: {
      poolName: '新建客户公海',
      adminUser: [poolUsers[0]],
      memberUser: [poolUsers[1]],
      memberDept: [poolDepartments[0]],
      isNeedChild: 1,
      preOwnerSetting: 1,
      preOwnerSettingDay: 30,
      receiveSetting: 1,
      receiveNum: 10,
      remindSetting: 1,
      remindDay: 5,
      putInRule: 1,
      autoAllot: 1,
      rule: [
        { id: 'customer-recycle-default-1', label: '跟进规则', text: '30 天未跟进放入公海' }
      ],
      allot: {
        allocationPlan: '按比例分配',
        triggerAction: ['新数据进入池后分配']
      },
      field: poolFieldList(customerPoolFields, ['customerName', 'level', 'ownerUserName'])
    },
    createSections: [
      {
        title: '基本信息',
        fields: [
          { field: 'poolName', label: '公海名称', formType: 'text', required: true },
          { field: 'adminUser', label: '公海管理员', formType: 'user-select', required: true },
          { field: 'memberUser', label: '分配员工', formType: 'user-dep-select', required: true }
        ]
      },
      {
        title: '规则设置',
        fields: [
          { field: 'preOwnerSetting', label: '领取规则', formType: 'radio' },
          { field: 'receiveSetting', label: '领取频率规则', formType: 'radio' },
          { field: 'remindSetting', label: '提醒规则', formType: 'radio' },
          { field: 'putInRule', label: '回收规则', formType: 'radio' },
          { field: 'autoAllot', label: '自动分配', formType: 'radio' },
          { field: 'field', label: '公海字段', formType: 'checkbox' }
        ]
      }
    ],
    transferFields: [
      { field: 'transferTo', label: '转移至', formType: 'select' }
    ]
  }
}

export const printTemplateConfig = {
  title: '自定义打印模板',
  createText: '新建打印模板',
  idField: 'templateId',
  fields: [
    { prop: 'templateName', label: '模板名称', width: 180 },
    { prop: 'type', label: '关联对象', width: 150 },
    { prop: 'createTime', label: '创建时间', width: 160 },
    { prop: 'createUserName', label: '创建人', width: 120 },
    { prop: 'updateTime', label: '更新时间', width: 160 }
  ],
  rows: [
    { templateId: 'print-001', templateName: '客户拜访记录模板', type: 2, createTime: '2026-05-21 10:20', createUserName: 'admin', updateTime: '2026-06-01 16:10' },
    { templateId: 'print-002', templateName: '合同标准打印模板', type: 6, createTime: '2026-05-18 09:35', createUserName: '林舟', updateTime: '2026-05-30 11:40' },
    { templateId: 'print-003', templateName: '报价单模板', type: 26, createTime: '2026-05-10 14:28', createUserName: '张敏', updateTime: '2026-05-28 18:12' }
  ],
  actions: ['编辑名称', '复制', '删除'],
  createFields: [
    { field: 'templateName', label: '模板名称', formType: 'text', value: '客户拜访记录模板', required: true },
    {
      field: 'type',
      label: '关联对象',
      formType: 'select',
      value: 2,
      options: [
        { label: '线索', value: 1 },
        { label: '客户', value: 2 },
        { label: '联系人', value: 3 },
        { label: '产品', value: 4 },
        { label: '商机', value: 5 },
        { label: '报价单', value: 26 },
        { label: '合同', value: 6 },
        { label: '回款', value: 7 },
        { label: '发票', value: 18 },
        { label: '回访', value: 17 }
      ],
      required: true
    }
  ],
  editor: {
    title: '新建打印模板',
    printSize: {
      sizeName: '210,297',
      width: 210,
      height: 297,
      marginName: '25.4,25.4,31.8,31.8',
      top: 25.4,
      bottom: 25.4,
      left: 31.8,
      right: 31.8
    },
    fieldTabs: [
      {
        key: 'customer',
        label: '客户',
        fields: [
          { fieldName: 'customerName', name: '客户名称' },
          { fieldName: 'level', name: '客户级别' },
          { fieldName: 'ownerUserName', name: '负责人' },
          { fieldName: 'mobile', name: '手机' },
          { fieldName: 'telephone', name: '电话' },
          { fieldName: 'address', name: '详细地址' }
        ]
      },
      {
        key: 'stage',
        label: '阶段组',
        fields: []
      },
      {
        key: 'contacts',
        label: '联系人',
        fields: [
          { fieldName: 'contactsName', name: '联系人姓名' },
          { fieldName: 'contactsMobile', name: '联系人电话' },
          { fieldName: 'post', name: '职务' }
        ]
      },
      {
        key: 'business',
        label: '商机',
        fields: [
          { fieldName: 'businessName', name: '商机名称' },
          { fieldName: 'money', name: '商机金额' },
          { fieldName: 'stage', name: '商机阶段' }
        ]
      },
      {
        key: 'contract',
        label: '合同',
        fields: [
          { fieldName: 'contractNum', name: '合同编号' },
          { fieldName: 'contractName', name: '合同名称' },
          { fieldName: 'contractMoney', name: '合同金额' }
        ]
      }
    ],
    stageTree: [
      {
        label: '客户默认阶段流程',
        labelId: 'flow-customer',
        isChildren: true,
        children: [
          {
            label: '初始接触',
            labelId: 'stage-visit',
            isChildren: true,
            children: [
              { label: '拜访计划', labelId: 'visitPlan', labelType: 'task' },
              { label: '跟进记录', labelId: 'followRecord', labelType: 'form' }
            ]
          },
          {
            label: '审批记录明细',
            labelId: 'flowExamine',
            isChildren: true,
            children: [
              { label: '节点名称', labelId: 'flowName', labelType: 'flowExamine' },
              { label: '审核人', labelId: 'realname', labelType: 'flowExamine' },
              { label: '审核结果', labelId: 'examineStatus', labelType: 'flowExamine' }
            ]
          }
        ]
      }
    ],
    defaultContent: [
      { type: 'paragraph', text: '客户拜访记录' },
      { type: 'tokens', fields: ['客户名称', '客户级别', '负责人'] },
      { type: 'paragraph', text: '跟进内容：' },
      { type: 'tokens', fields: ['跟进记录', '下次联系时间'] }
    ]
  }
}

export const businessParamTemplate = {
  title: '业务参数设置',
  nav: [
    { key: 'stage', label: '阶段流程设置' },
    { key: 'verification', label: '数据验证规则' },
    { key: 'category', label: '产品类别设置' },
    { key: 'ownLimit', label: '拥有客户数限制' },
    { key: 'lockLimit', label: '锁定客户数限制' },
    { key: 'putReason', label: '放入客户公海原因' },
    { key: 'receiveReason', label: '客户领取公海原因' },
    { key: 'duplicateCheck', label: '信息查重配置' }
  ],
  panels: {
    stage: {
      title: '阶段流程设置',
      type: 'stage-flow',
      actionText: '新建阶段流程',
      summary: '维护客户、商机等对象的阶段流程、适用范围和启停状态。',
      filters: [
        { field: 'status', label: '状态', options: ['启用', '停用'] },
        { field: 'label', label: '关联对象', options: ['客户', '商机', '合同'] }
      ],
      rows: [
        { id: 'stage-001', flowName: '客户默认阶段流程', label: '客户', stageUserDep: '全公司', updateTime: '2026-06-01 10:20', status: '启用', stages: ['初始接触', '需求确认', '成交客户'] },
        { id: 'stage-002', flowName: '商机销售阶段流程', label: '商机', stageUserDep: '销售中心', updateTime: '2026-05-28 15:12', status: '启用', stages: ['需求确认', '方案报价', '赢单/输单'] },
        { id: 'stage-003', flowName: '合同履约阶段流程', label: '合同', stageUserDep: '客户成功部', updateTime: '2026-05-21 09:40', status: '停用', stages: ['待签署', '执行中', '已归档'] }
      ]
    },
    verification: {
      title: '数据验证规则',
      type: 'verification-rule',
      actionText: '新建规则',
      summary: '配置保存前的数据完整性校验，模板只保留规则列表和编辑入口。',
      filters: [
        { field: 'module', label: '模块', options: ['客户', '联系人', '商机', '合同'] }
      ],
      rows: [
        { id: 'rule-001', name: '客户名称必填', originalFormula: '客户名称 为空', formulaText: '保存客户时校验客户名称', targetModuleId: '客户', updateUserName: 'admin', createTime: '2026-06-02 11:10' },
        { id: 'rule-002', name: '手机号格式校验', originalFormula: '手机号 不符合格式', formulaText: '保存联系人时校验手机号', targetModuleId: '联系人', updateUserName: '林舟', createTime: '2026-05-29 16:18' },
        { id: 'rule-003', name: '合同金额大于 0', originalFormula: '合同金额 <= 0', formulaText: '保存合同时校验金额', targetModuleId: '合同', updateUserName: '张敏', createTime: '2026-05-20 09:36' }
      ]
    },
    category: {
      title: '产品类别设置',
      type: 'category-tree',
      actionText: '新建类别',
      summary: '维护产品分类层级，用树形列表表达可生成的分类配置能力。',
      rows: [
        {
          id: 'cat-001',
          name: '硬件产品',
          parentName: '-',
          productCount: 32,
          status: '启用',
          children: [
            { id: 'cat-001-1', name: '工业网关', parentName: '硬件产品', productCount: 12, status: '启用', children: [] },
            { id: 'cat-001-2', name: '采集终端', parentName: '硬件产品', productCount: 20, status: '启用', children: [] }
          ]
        },
        {
          id: 'cat-002',
          name: '软件服务',
          parentName: '-',
          productCount: 18,
          status: '启用',
          children: [
            { id: 'cat-002-1', name: '实施服务', parentName: '软件服务', productCount: 9, status: '启用', children: [] },
            { id: 'cat-002-2', name: '运维服务', parentName: '软件服务', productCount: 9, status: '停用', children: [] }
          ]
        }
      ]
    },
    ownLimit: {
      title: '拥有客户数限制',
      type: 'customer-limit',
      limitKind: 'own',
      actionText: '新增限制规则',
      switchLabel: '启用拥有客户数限制',
      switchValue: true,
      rows: [
        { id: 'own-limit-001', scope: '销售人员', userIds: '销售一部、销售二部', ownCustomerNum: 500, status: '启用' },
        { id: 'own-limit-002', scope: '销售主管', userIds: '销售中心', ownCustomerNum: 1000, status: '启用' },
        { id: 'own-limit-003', scope: '客户成功', userIds: '客户成功部', ownCustomerNum: 800, status: '停用' }
      ]
    },
    lockLimit: {
      title: '锁定客户数限制',
      type: 'customer-limit',
      limitKind: 'lock',
      actionText: '新增限制规则',
      switchLabel: '启用锁定客户数限制',
      switchValue: true,
      rows: [
        { id: 'lock-limit-001', scope: '销售人员', userIds: '销售一部、销售二部', lockCustomerNum: 120, status: '启用' },
        { id: 'lock-limit-002', scope: '销售主管', userIds: '销售中心', lockCustomerNum: 260, status: '启用' },
        { id: 'lock-limit-003', scope: '客户成功', userIds: '客户成功部', lockCustomerNum: 160, status: '停用' }
      ],
    },
    putReason: {
      title: '放入客户公海原因',
      type: 'reason-list',
      actionText: '保存',
      switchLabel: '设置为必填',
      requiredSwitch: true,
      reasonTitle: '放入客户公海原因',
      reasons: ['长期未跟进', '客户主动放弃', '区域调整']
    },
    receiveReason: {
      title: '客户领取公海原因',
      type: 'reason-list',
      actionText: '保存',
      switchLabel: '设置为必填',
      requiredSwitch: true,
      reasonTitle: '客户领取公海原因',
      reasons: ['主动开发', '客户咨询', '行业跟进']
    },
    duplicateCheck: {
      title: '信息查重配置',
      type: 'duplicate-check',
      actionText: '保存',
      enabled: true,
      fields: [
        { field: 'customerName', label: '客户名称', checked: true },
        { field: 'mobile', label: '手机', checked: true },
        { field: 'telephone', label: '电话', checked: false }
      ],
      ranges: [
        { label: '客户', checked: true },
        { label: '线索', checked: true }
      ],
      savedAt: ''
    }
  }
}

export const logFilters = {
  applications: ['CRM', '后台管理', '财务管理', '人力资源'],
  modules: ['客户', '联系人', '商机', '合同', '员工部门', '角色权限'],
  behaviors: ['新建', '编辑', '删除', '导入', '导出', '启用', '停用']
}

export const systemLogRows = [
  { id: 'log-001', userName: 'admin', createTime: '2026-06-03 10:21:35', behaviorName: '编辑', moduleName: '客户', applyName: 'CRM', operationObj: '苏州星禾精密制造', clientIp: '192.168.1.22', operationInfo: '将客户级别从 C 级调整为 A 级。' },
  { id: 'log-002', userName: '林舟', createTime: '2026-06-03 09:40:12', behaviorName: '新建', moduleName: '商机', applyName: 'CRM', operationObj: '智能制造扩容项目', clientIp: '192.168.1.31', operationInfo: '创建商机并关联客户。' },
  { id: 'log-003', userName: '张敏', createTime: '2026-06-02 17:36:51', behaviorName: '导出', moduleName: '合同', applyName: 'CRM', operationObj: '合同列表', clientIp: '192.168.1.18', operationInfo: '导出合同列表 15 条。' },
  { id: 'log-004', userName: 'admin', createTime: '2026-06-02 15:10:08', behaviorName: '启用', moduleName: '角色权限', applyName: '后台管理', operationObj: '销售主管', clientIp: '192.168.1.22', operationInfo: '更新客户管理字段授权。' }
]

export const systemLogFields = [
  { prop: 'userName', label: '操作人', width: 100 },
  { prop: 'createTime', label: '操作时间', width: 180 },
  { prop: 'behaviorName', label: '操作行为', width: 120 },
  { prop: 'moduleName', label: '操作对象', width: 120 },
  { prop: 'applyName', label: '所属应用', width: 100 },
  { prop: 'operationObj', label: '操作数据', width: 180 },
  { prop: 'clientIp', label: 'IP 地址', width: 140 },
  { prop: 'operationInfo', label: '操作详情', width: 260 }
]

export const roleFields = [
  { prop: 'roleName', label: '角色名称', width: 180 },
  { prop: 'remark', label: '角色说明', width: 180 },
  { prop: 'employeeCount', label: '员工数量', width: 100 }
]

export const customFieldModuleFields = [
  { prop: 'name', label: '模块名称', width: 160 },
  { prop: 'updateTime', label: '最后修改时间', width: 180 }
]

export const fieldSettingFields = [
  { prop: 'name', label: '字段名称', formType: 'text', placeholder: '请输入字段名称' },
  { prop: 'formType', label: '字段类型', formType: 'select', setting: fieldTypeLib.map(item => item.formType) },
  { prop: 'stylePercent', label: '字段宽度', formType: 'radio', setting: [50, 100] },
  { prop: 'required', label: '是否必填', formType: 'switch' }
]

const filterField = (field, label, formType = 'text', options = []) => ({
  field,
  label,
  formType,
  placeholder: formType === 'select' ? '请选择' : `请输入${label}`,
  options
})

const adminTableAction = (type, name, danger = false) => ({
  type,
  name,
  danger
})

export const adminModuleSchemas = {
  employeeDepartment: {
    title: '员工与部门管理',
    navKey: 'employee',
    filters: [
      filterField('keyword', '姓名/手机号')
    ],
    fields: employeeFields,
    rows: employeeRows,
    actions: [
      adminTableAction('createEmployee', '新建员工'),
      adminTableAction('createDepartment', '创建部门'),
      adminTableAction('disableEmployee', '禁用', true)
    ],
    dialogs: {
      department: {
        title: '创建部门',
        width: 500,
        fields: [
          { field: 'name', label: '部门名称', formType: 'text', isNull: 1, placeholder: '请输入部门名称' },
          { field: 'parentId', label: '上级部门', formType: 'tree-select', isNull: 1, placeholder: '请选择上级部门' }
        ]
      }
    },
    layout: {
      mode: 'local-nav-table',
      globalSidebarWidth: 210,
      localNavWidth: 240,
      tableOffset: 290
    },
    tree: departmentTree
  },
  rolePermission: {
    title: '角色权限管理',
    navKey: 'role',
    filters: [
      filterField('keyword', '角色名称')
    ],
    fields: roleFields,
    rows: roleList,
    actions: [
      adminTableAction('createRole', '新建角色'),
      adminTableAction('fieldAuth', '字段授权'),
      adminTableAction('deleteRole', '删除', true)
    ],
    dialogs: {
      fieldAuth: { title: '字段授权', width: 700, rows: fieldAuthRows },
      maskRule: { title: '掩码规则', width: 500 }
    },
    layout: {
      mode: 'role-tabs-permission-tree',
      globalSidebarWidth: 210,
      localNavWidth: 240,
      tableOffset: 300,
      treeOffset: 230
    },
    tabs: rolePermissionMenus,
    permissionTree,
    roleUserRows,
    fieldAuthRows
  },
  customField: {
    title: '自定义字段设置',
    navKey: 'fields',
    filters: [],
    fields: customFieldModuleFields,
    rows: customFieldModules,
    actions: [
      adminTableAction('editModule', '编辑'),
      adminTableAction('previewFields', '预览字段')
    ],
    dialogs: {},
    layout: {
      mode: 'field-designer',
      fieldLibraryWidth: 280,
      canvasWidth: 900,
      settingWidth: 280
    },
    fieldTypeLib,
    designerFields,
    settingFields: fieldSettingFields
  },
  approvalFlow: {
    title: '业务审批流',
    navKey: 'approval',
    filters: [
      filterField('keyword', '审批流名称'),
      filterField('label', '关联对象', 'select', ['合同', '回款', '发票', '报价单']),
      filterField('status', '状态', 'select', ['启用', '停用'])
    ],
    fields: approvalFields,
    rows: approvalRows,
    actions: [
      adminTableAction('createFlow', '新建审批流程'),
      adminTableAction('editFlow', '编辑'),
      adminTableAction('copyFlow', '复制并新建'),
      adminTableAction('deleteFlow', '删除', true)
    ],
    dialogs: {},
    layout: {
      mode: 'table-fullscreen-flow',
      tableOffset: 220
    },
    flowCanvas: {
      sections: ['基础信息', '高级配置', '审批流程'],
      nodeTypes: approvalFlowTemplate.nodePalette.map(item => item.label)
    },
    baseFields: approvalFlowTemplate.baseFields,
    sendNode: approvalFlowTemplate.sendNode,
    nodePalette: approvalFlowTemplate.nodePalette,
    canvasNodes: approvalFlowTemplate.canvasNodes,
    advancedFields: approvalFlowTemplate.advancedFields,
    excludedNodeTypes: approvalFlowTemplate.excludedNodeTypes
  },
  leadsPoolRule: {
    title: poolRuleTemplates.leads.title,
    navKey: 'leadsPool',
    filters: [
      filterField('keyword', '线索池名称'),
      filterField('status', '状态', 'select', ['启用', '停用'])
    ],
    fields: poolRuleTemplates.leads.fields,
    rows: poolRuleTemplates.leads.rows,
    actions: [
      adminTableAction('createPool', poolRuleTemplates.leads.createText),
      adminTableAction('status', '启用/停用'),
      adminTableAction('transfer', '转移'),
      adminTableAction('edit', '编辑'),
      adminTableAction('delete', '删除', true)
    ],
    dialogs: {
      create: { title: poolRuleTemplates.leads.createText, mode: 'xr-create' },
      detail: { title: '线索池详情', mode: 'slide-view', minWidth: 950 },
      transfer: { title: '转移', width: 450 }
    },
    layout: {
      mode: 'pool-rule-list-template',
      tableOffset: 220,
      sharedTemplate: 'pool-rule-list'
    },
    createSections: poolRuleTemplates.leads.createSections,
    transferFields: poolRuleTemplates.leads.transferFields
  },
  customerPoolRule: {
    title: poolRuleTemplates.customer.title,
    navKey: 'customerPool',
    filters: [
      filterField('keyword', '公海名称'),
      filterField('status', '状态', 'select', ['启用', '停用'])
    ],
    fields: poolRuleTemplates.customer.fields,
    rows: poolRuleTemplates.customer.rows,
    actions: [
      adminTableAction('createPool', poolRuleTemplates.customer.createText),
      adminTableAction('status', '启用/停用'),
      adminTableAction('transfer', '转移'),
      adminTableAction('edit', '编辑'),
      adminTableAction('delete', '删除', true)
    ],
    dialogs: {
      create: { title: poolRuleTemplates.customer.createText, mode: 'xr-create' },
      detail: { title: '客户公海详情', mode: 'slide-view', minWidth: 950 },
      transfer: { title: '转移', width: 450 }
    },
    layout: {
      mode: 'pool-rule-list-template',
      tableOffset: 220,
      sharedTemplate: 'pool-rule-list'
    },
    createSections: poolRuleTemplates.customer.createSections,
    transferFields: poolRuleTemplates.customer.transferFields
  },
  printTemplate: {
    title: printTemplateConfig.title,
    navKey: 'printTemplate',
    filters: [
      filterField('keyword', '模板名称'),
      filterField('type', '关联对象', 'select', ['客户', '合同', '报价单'])
    ],
    fields: printTemplateConfig.fields,
    rows: printTemplateConfig.rows,
    actions: [
      adminTableAction('createTemplate', printTemplateConfig.createText),
      adminTableAction('rename', '编辑名称'),
      adminTableAction('copy', '复制'),
      adminTableAction('delete', '删除', true)
    ],
    dialogs: {
      create: { title: printTemplateConfig.createText, width: 400 },
      printSize: { title: '纸张尺寸', width: 480 }
    },
    layout: {
      mode: 'config-list-template',
      tableOffset: 220,
      fieldNavWidth: 300
    },
    createFields: printTemplateConfig.createFields,
    editor: printTemplateConfig.editor
  },
  businessParam: {
    title: businessParamTemplate.title,
    navKey: 'bizParam',
    filters: [],
    fields: [
      { prop: 'label', label: '参数项', width: 180 },
      { prop: 'description', label: '模板说明', width: 260 }
    ],
    rows: businessParamTemplate.nav,
    actions: [
      adminTableAction('save', '保存'),
      adminTableAction('addOption', '添加配置项')
    ],
    dialogs: {},
    layout: {
      mode: 'local-nav-core-settings',
      localNavWidth: 240
    },
    nav: businessParamTemplate.nav,
    panels: businessParamTemplate.panels
  },
  systemLog: {
    title: '系统日志',
    navKey: 'logs',
    filters: [
      filterField('dateRange', '操作时间', 'date-range'),
      filterField('userName', '操作人'),
      filterField('applyName', '所属应用', 'select', logFilters.applications),
      filterField('moduleName', '操作对象', 'select', logFilters.modules),
      filterField('behaviorName', '操作行为', 'select', logFilters.behaviors)
    ],
    fields: systemLogFields,
    rows: systemLogRows,
    actions: [
      adminTableAction('query', '查询'),
      adminTableAction('reset', '重置'),
      adminTableAction('export', '导出')
    ],
    dialogs: {
      detail: {
        title: '日志详情',
        width: 600,
        fields: systemLogFields
      }
    },
    layout: {
      mode: 'filter-table-detail',
      tableOffset: 270
    },
    detailData: systemLogRows[0]
  }
}

export const adminSchema = {
  schemaVersion: 'p5.1',
  sections: adminSections,
  modules: adminModuleSchemas
}
