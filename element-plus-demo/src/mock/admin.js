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
    name: '子二公司-admin',
    children: [
      {
        deptId: 'dept-young',
        name: 'YOUNG',
        children: [
          {
            deptId: 'dept-admin',
            name: 'admin',
            children: [
              {
                deptId: 'dept-123',
                name: '123',
                children: [
                  { deptId: 'dept-321', name: '321' }
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
    userIdentity: 0,
    activeModuleList: '',
    mobile: '15638733939',
    wxBindStatus: '未绑定',
    sex: '',
    email: '693685409@qq...',
    deptName: 'admin',
    parentDeptName: '',
    post: '标准岗位'
  },
  {
    userId: 'u-002',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'yang2',
    activeModuleList: 'CRM,进销存',
    mobile: '15638733937',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-003',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'yang1',
    activeModuleList: '',
    mobile: '15638733938',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-004',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'yang3',
    activeModuleList: '',
    mobile: '15638733936',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-005',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '测试权限',
    activeModuleList: 'CRM,进销存',
    mobile: '13366667778',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-006',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '777',
    activeModuleList: '',
    mobile: '15638733931',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-007',
    sokingStatus: '未开启',
    status: '已激活',
    realname: '马田',
    activeModuleList: '',
    mobile: '13366667777',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-008',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'xiaoxu',
    activeModuleList: 'CRM',
    mobile: '18638136803',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-009',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'cg',
    activeModuleList: '',
    mobile: '1880000000',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-010',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'lc',
    activeModuleList: '',
    mobile: '1880000001',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-011',
    sokingStatus: '未开启',
    status: '已激活',
    realname: 'xiaoxu1',
    activeModuleList: 'CRM',
    mobile: '18638136804',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-012',
    sokingStatus: '未开启',
    status: '未激活',
    realname: '123',
    activeModuleList: '',
    mobile: '123123123111',
    wxBindStatus: '未绑定',
    sex: '',
    email: '123123123111',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-013',
    sokingStatus: '未开启',
    status: '未激活',
    realname: '1111',
    activeModuleList: '',
    mobile: '15638733901',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-014',
    sokingStatus: '未开启',
    status: '未激活',
    realname: '12311',
    activeModuleList: '',
    mobile: '18729953211',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-015',
    sokingStatus: '未开启',
    status: '未激活',
    realname: '1231',
    activeModuleList: '',
    mobile: '15638739366',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
  },
  {
    userId: 'u-016',
    sokingStatus: '未开启',
    status: '未激活',
    realname: 'yang4',
    activeModuleList: '',
    mobile: '15638739367',
    wxBindStatus: '未绑定',
    sex: '',
    email: '',
    deptName: 'admin',
    parentDeptName: '',
    post: ''
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
  { roleId: 'r-admin', roleName: '超级管理员', remark: 'admin', employeeCount: 1 },
  { roleId: 'r-sales-manager', roleName: '销售主管', remark: 'crm', employeeCount: 8 },
  { roleId: 'r-sales', roleName: '销售人员', remark: 'crm', employeeCount: 28 },
  { roleId: 'r-finance', roleName: '财务角色', remark: 'finance', employeeCount: 5 },
  { roleId: 'r-service', roleName: '客户成功', remark: 'crm', employeeCount: 12 }
]

export const roleUserRows = employeeRows.map(item => ({
  ...item,
  roleName: item.roleName || '销售人员'
}))

export const rolePermissionMenus = [
  { index: 'data', label: '数据权限', type: 'range' },
  { index: 'crm', label: '客户管理', type: 'tree' },
  { index: 'system', label: '系统管理', type: 'tree' },
  { index: 'finance', label: '财务管理', type: 'tree' }
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
    childField: [
      { id: 'customerName', name: '客户名称', canCheck: true, canEdit: true, canMask: false },
      { id: 'mobile', name: '手机', canCheck: true, canEdit: true, canMask: true },
      { id: 'telephone', name: '电话', canCheck: true, canEdit: false, canMask: true }
    ]
  },
  {
    id: 'deal',
    name: '业务信息',
    childField: [
      { id: 'ownerUserName', name: '负责人', canCheck: true, canEdit: false, canMask: false },
      { id: 'nextTime', name: '下次联系时间', canCheck: true, canEdit: true, canMask: false }
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

export const fieldTypeLib = [
  { formType: 'text', name: '单行文本', icon: 'wk wk-icon-field-text' },
  { formType: 'textarea', name: '多行文本', icon: 'wk wk-icon-field-textarea' },
  { formType: 'select', name: '单选', icon: 'wk wk-icon-field-select' },
  { formType: 'checkbox', name: '多选', icon: 'wk wk-icon-field-checkbox' },
  { formType: 'number', name: '数字', icon: 'wk wk-icon-field-number' },
  { formType: 'money', name: '货币', icon: 'wk wk-icon-field-money' },
  { formType: 'mobile', name: '手机', icon: 'wk wk-icon-field-mobile' },
  { formType: 'date', name: '日期', icon: 'wk wk-icon-field-date' },
  { formType: 'user', name: '人员', icon: 'wk wk-icon-field-user' },
  { formType: 'structure', name: '部门', icon: 'wk wk-icon-field-structure' },
  { formType: 'file', name: '附件', icon: 'wk wk-icon-field-file' },
  { formType: 'desc', name: '描述文字', icon: 'wk wk-icon-field-desc' }
]

export const designerFields = [
  [
    { formAssistId: 'field-name', name: '客户名称', formType: 'text', stylePercent: 50, required: true },
    { formAssistId: 'field-source', name: '客户来源', formType: 'select', stylePercent: 50, required: false }
  ],
  [
    { formAssistId: 'field-mobile', name: '手机', formType: 'mobile', stylePercent: 50, required: false },
    { formAssistId: 'field-owner', name: '负责人', formType: 'user', stylePercent: 50, required: true }
  ],
  [
    { formAssistId: 'field-remark', name: '备注', formType: 'textarea', stylePercent: 100, required: false }
  ]
]

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

export const poolRuleTemplates = {
  leads: {
    title: '线索池规则设置',
    createText: '新建线索池',
    idField: 'poolId',
    fields: [
      { prop: 'poolName', label: '线索池名称', width: 160 },
      { prop: 'adminUser', label: '线索池管理员', width: 180 },
      { prop: 'memberUser', label: '线索池成员', width: 220 },
      { prop: 'leadsNum', label: '线索数量', width: 110 },
      { prop: 'status', label: '状态', width: 100 }
    ],
    rows: [
      { poolId: 'leads-pool-001', poolName: '默认线索池', adminUser: 'admin', memberUser: '销售一部、销售二部', leadsNum: 128, status: '启用' },
      { poolId: 'leads-pool-002', poolName: '华东线索池', adminUser: '林舟', memberUser: '华东销售组', leadsNum: 86, status: '启用' },
      { poolId: 'leads-pool-003', poolName: '沉睡线索池', adminUser: '张敏', memberUser: '运营组', leadsNum: 32, status: '停用' }
    ]
  },
  customer: {
    title: '客户公海规则设置',
    createText: '新建客户公海',
    idField: 'poolId',
    fields: [
      { prop: 'poolName', label: '公海名称', width: 160 },
      { prop: 'adminUser', label: '公海管理员', width: 180 },
      { prop: 'memberUser', label: '分配员工', width: 220 },
      { prop: 'customerNum', label: '客户数量', width: 110 },
      { prop: 'status', label: '状态', width: 100 }
    ],
    rows: [
      { poolId: 'customer-pool-001', poolName: '默认客户公海', adminUser: 'admin', memberUser: '销售一部、销售二部', customerNum: 240, status: '启用' },
      { poolId: 'customer-pool-002', poolName: '重点行业公海', adminUser: '林舟', memberUser: '行业销售组', customerNum: 76, status: '启用' },
      { poolId: 'customer-pool-003', poolName: '历史客户公海', adminUser: '张敏', memberUser: '客户成功组', customerNum: 45, status: '停用' }
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
    { templateId: 'print-001', templateName: '客户拜访记录模板', type: '客户', createTime: '2026-05-21 10:20', createUserName: 'admin', updateTime: '2026-06-01 16:10' },
    { templateId: 'print-002', templateName: '合同标准打印模板', type: '合同', createTime: '2026-05-18 09:35', createUserName: '林舟', updateTime: '2026-05-30 11:40' },
    { templateId: 'print-003', templateName: '报价单模板', type: '报价单', createTime: '2026-05-10 14:28', createUserName: '张敏', updateTime: '2026-05-28 18:12' }
  ],
  actions: ['编辑名称', '复制', '删除']
}

export const businessParamTemplate = {
  title: '业务参数设置',
  nav: [
    { key: 'stage', label: '阶段流程设置', description: '维护客户、商机等对象的阶段流转。' },
    { key: 'verification', label: '数据验证规则', description: '配置保存前的数据完整性校验。' },
    { key: 'category', label: '产品类别设置', description: '维护产品分类和层级。' },
    { key: 'limit', label: '拥有/锁定客户数限制', description: '控制员工客户持有上限。' },
    { key: 'reason', label: '公海/线索池理由设置', description: '维护放入、领取、转移原因。' }
  ],
  panels: {
    stage: {
      title: '阶段流程设置',
      summary: '用表单和步骤列表表达阶段流配置，后续生成时可替换为具体对象阶段。',
      rows: ['初始接触', '需求确认', '方案报价', '成交/归档'],
      controls: ['启用阶段推进校验', '允许退回上一阶段']
    },
    verification: {
      title: '数据验证规则',
      summary: '用规则列表表达字段校验能力，避免在模板中铺满所有业务规则。',
      rows: ['客户名称必填', '手机号格式校验', '合同金额大于 0'],
      controls: ['保存时校验', '导入时校验']
    },
    category: {
      title: '产品类别设置',
      summary: '用树形列表表达分类配置能力。',
      rows: ['硬件产品', '软件服务', '实施服务'],
      controls: ['允许多级分类']
    },
    limit: {
      title: '拥有/锁定客户数限制',
      summary: '用数值输入和开关表达限制类业务参数。',
      rows: ['销售人员 500 个', '销售主管 1000 个', '超级管理员不限'],
      controls: ['启用拥有客户数限制', '启用锁定客户数限制']
    },
    reason: {
      title: '公海/线索池理由设置',
      summary: '用可编辑列表表达原因字典配置。',
      rows: ['长期未跟进', '客户主动放弃', '区域调整', '重复数据'],
      controls: ['启用原因必填']
    }
  }
}

export const logFilters = {
  applications: ['CRM', '后台管理', '财务管理', '人力资源'],
  modules: ['客户', '联系人', '商机', '合同', '员工部门', '角色权限'],
  behaviors: ['新建', '编辑', '删除', '导入', '导出', '启用', '停用']
}

export const systemLogRows = [
  { id: 'log-001', userName: 'admin', createTime: '2026-06-03 10:21:35', behaviorName: '编辑', moduleName: '客户', applyName: 'CRM', operationObj: '合同客户', clientIp: '192.168.1.22', operationInfo: '将客户级别从 C 级调整为 A 级。' },
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
      sections: ['基础信息', '审批流程', '高级配置'],
      nodeTypes: ['审批人', '抄送人', '条件分支']
    }
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
      create: { title: poolRuleTemplates.leads.createText, width: 500 },
      transfer: { title: '转移线索池', width: 500 }
    },
    layout: {
      mode: 'pool-rule-list-template',
      tableOffset: 220,
      sharedTemplate: 'pool-rule-list'
    }
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
      create: { title: poolRuleTemplates.customer.createText, width: 500 },
      transfer: { title: '转移客户公海', width: 500 }
    },
    layout: {
      mode: 'pool-rule-list-template',
      tableOffset: 220,
      sharedTemplate: 'pool-rule-list'
    }
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
      create: { title: printTemplateConfig.createText, width: 520 }
    },
    layout: {
      mode: 'config-list-template',
      tableOffset: 220
    }
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
