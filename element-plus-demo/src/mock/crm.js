import {
  customerFieldModel,
  createDetailGroupsFromModel,
  createFieldGroupsFromModel,
  createFieldListFromModel,
  createFilterFieldsFromModel
} from './crmFieldModel.js'

export { customerFieldModel }

export const crmModules = [
  '仪表盘',
  '日历',
  '线索',
  '客户',
  '联系人',
  '商机',
  '报价单',
  '合同',
  '回款',
  '发票',
  '回访',
  '产品'
]

export const crmSideMenus = [
  { label: '客户', icon: 'wk-customer' }
]

export const sceneList = [
  { label: '全部客户', value: 'all' },
  { label: '我负责的客户', value: 'owner' },
  { label: '下属负责的客户', value: 'subordinate' },
  { label: '我关注的客户', value: 'focus' },
  { label: '今天需联系', value: 'today' },
  { label: '重点客户', value: 'key-account' },
  { label: '本周需联系', value: 'week-follow' },
  { label: '高价值客户', value: 'high-value' },
  { label: '待跟进客户', value: 'pending-follow' }
]

export const tableStyleObj = {
  viewType: '1',
  stripe: false
}

export const viewTypes = [
  { value: '1', label: '表格视图', icon: '☰' },
  { value: '2', label: '阶段视图', icon: '▥' },
  { value: '3', label: '卡片视图', icon: '▣' }
]

export const operations = [
  { type: 'put_seas', name: '放入公海' }
]

export const uiProfile = {
  list: {
    headerActions: ['create', 'dedupe', 'import', 'export'],
    toolbarActions: ['advancedFilter'],
    disabledActions: ['expandFilter', 'biChart', 'phoneCall'],
    fixedColumns: ['selection', 'favorite', 'mainField']
  },
  detail: {
    headerActions: ['edit'],
    activityTypes: ['followRecord', 'dynamic'],
    disabledActions: ['pageSwitch', 'quickCreate', 'pendingSchedule', 'activityFilter']
  },
  create: {
    showAllFields: true,
    disabledActions: ['dataCollapse', 'saveAndNewContact']
  }
}

export const customerRows = [
  {
    customerId: '304001',
    __rowUid: '304001-0',
    customerName: '苏州星禾精密制造',
    telephone: '0512-88990012',
    source: '搜索引擎',
    mobile: '139****6182',
    email: 'contact@xinghe.demo',
    website: 'https://xinghe.demo',
    industry: '智能制造',
    level: 'A',
    nextTime: '2026-06-10 10:30:00',
    ownerUserName: 'admin',
    dealStatus: 1,
    updateTime: '2026-06-03 14:29:19',
    businessCount: 2,
    star: 1,
    callShow: true
  },
  {
    customerId: '304002',
    __rowUid: '304002-0',
    customerName: '上海云启设备服务',
    telephone: '021-66558899',
    source: '客户介绍',
    mobile: '155****5545',
    email: 'sales@yunqi.demo',
    website: '',
    industry: '企业服务',
    level: 'A',
    nextTime: '2026-06-12 15:00:00',
    ownerUserName: '林舟',
    dealStatus: 1,
    updateTime: '2026-06-02 09:57:02',
    businessCount: 1,
    star: 1,
    callShow: true
  },
  {
    customerId: '304003',
    __rowUid: '304003-0',
    customerName: '杭州明策科技',
    telephone: '',
    source: '线上咨询',
    mobile: '186****6803',
    email: 'hello@mingce.demo',
    website: '',
    industry: '软件服务',
    level: 'B',
    nextTime: '',
    ownerUserName: '张敏',
    dealStatus: 0,
    updateTime: '2026-05-30 15:41:26',
    businessCount: 0,
    star: 0,
    callShow: true
  },
  {
    customerId: '304004',
    __rowUid: '304004-0',
    customerName: '南京科锐自动化',
    telephone: '025-77889900',
    source: '市场活动',
    mobile: '',
    email: '',
    website: '',
    industry: '装备制造',
    level: 'B',
    nextTime: '',
    ownerUserName: '陈启',
    dealStatus: 0,
    updateTime: '2026-05-28 09:10:22',
    businessCount: 0,
    star: 0,
    callShow: false
  },
  {
    customerId: '304005',
    __rowUid: '304005-0',
    customerName: '广州南辰医疗设备',
    telephone: '',
    source: '广告投放',
    mobile: '138****9041',
    email: '',
    website: '',
    industry: '医疗器械',
    level: 'B',
    nextTime: '2026-06-15 09:30:00',
    ownerUserName: '周宁',
    dealStatus: 0,
    updateTime: '2026-05-24 17:05:12',
    businessCount: 0,
    star: 0,
    callShow: false
  },
  {
    customerId: '304006',
    __rowUid: '304006-0',
    customerName: '成都远航供应链',
    telephone: '028-66778890',
    source: '客户介绍',
    mobile: '137****2206',
    email: '',
    website: '',
    industry: '物流服务',
    level: 'A',
    nextTime: '',
    ownerUserName: '林舟',
    dealStatus: 0,
    updateTime: '2026-05-22 11:18:12',
    businessCount: 1,
    star: 0,
    callShow: false
  }
]

export const fieldList = createFieldListFromModel(customerFieldModel, customerRows)
export const customerFilterFieldList = createFilterFieldsFromModel(customerFieldModel)

export const stageFlow = {
  flowName: '客户阶段',
  settingList: [
    { settingId: 's1', settingName: '初步沟通', count: 2, rows: [customerRows[0], customerRows[1]] },
    { settingId: 's2', settingName: '有些意向', count: 1, rows: [customerRows[2]] },
    { settingId: 's3', settingName: '开始洽谈', count: 1, rows: [customerRows[3]] },
    { settingId: 's4', settingName: '正式合同', count: 1, rows: [customerRows[4]] },
    { settingId: 's5', settingName: '结束', count: 1, rows: [customerRows[5]], isEnd: true }
  ]
}

export const cardCustomers = customerRows.slice(0, 6).map((item) => ({
  ...item,
  dataImg: '',
  lastTime: item.nextTime || item.updateTime || '--'
}))

export const customerCreateFieldGroups = createFieldGroupsFromModel(customerFieldModel)

export const createFields = customerCreateFieldGroups.flatMap(group => group.fields)

export const poolDialogOptions = {
  status: 1,
  poolList: [
    { poolId: 'default', poolName: '默认客户公海' },
    { poolId: 'manufacture', poolName: '制造业公海' },
    { poolId: 'east', poolName: '华东公海' }
  ],
  reasonList: [
    { value: 'no-follow', name: '长期未跟进', status: 1 },
    { value: 'no-need', name: '客户暂不需要', status: 1 },
    { value: 'custom', name: '其他原因', status: 0 }
  ]
}

export const detailTabs = [
  { name: 'activity', label: '活动' },
  { name: 'fields', label: '详细资料' },
  { name: 'contacts', label: '联系人', num: 1 },
  { name: 'files', label: '附件' },
  { name: 'logs', label: '操作记录' }
]

export const activityFieldGroups = [
  [
    {
      field: 'content',
      fieldName: 'content',
      name: '跟进内容',
      formType: 'textarea',
      type: 2,
      isNull: 1,
      isMulti: 1,
      stylePercent: 100,
      maxLength: 800,
      inputTips: '输入@可选择需通知人员',
      defaultValue: ''
    }
  ],
  [
    {
      field: 'visitPlanId',
      fieldName: 'visitPlanId',
      name: '拜访计划',
      formType: 'visitPlan',
      type: 112,
      isNull: 0,
      isMulti: 0,
      stylePercent: 100,
      defaultValue: ''
    }
  ],
  [
    {
      field: 'remindTeamMembers',
      fieldName: 'remindTeamMembers',
      name: '提醒团队成员',
      formType: 'user',
      type: 10,
      isNull: 0,
      isMulti: 1,
      stylePercent: 50,
      defaultValue: []
    }
  ],
  [
    {
      field: 'nextTime',
      fieldName: 'nextTime',
      name: '下次联系时间',
      formType: 'datetime',
      type: 13,
      isNull: 0,
      isMulti: 1,
      stylePercent: 50,
      inputTips: '',
      defaultValue: ''
    },
    {
      field: 'category',
      fieldName: 'category',
      name: '跟进方式',
      formType: 'select',
      type: 3,
      options: '打电话,发邮件,发短信,见面拜访,活动',
      setting: ['打电话', '发邮件', '发短信', '见面拜访', '活动'],
      isNull: 0,
      isMulti: 1,
      stylePercent: 50,
      defaultValue: ''
    }
  ]
]

export const activityFieldList = activityFieldGroups.flat()

export const detailData = {
  customerId: '304001',
  customerName: '苏州星禾精密制造',
  crmType: '客户',
  dealStatus: 1,
  level: '',
  ownerUserName: 'admin',
  mobile: '',
  contactsName: '沈琳',
  contactsPhone: '?',
  tags: [],
  headBase: [
    { title: '客户级别', value: '' },
    { title: '负责人', value: 'admin' },
    { title: '手机', value: '' },
    { title: '首要联系人', value: '沈琳', formType: 'link' },
    { title: '首要联系人电话', value: '?', showIcon: true }
  ],
  stageStatus: {
    dataId: 'stage-1',
    finalStatus: 0,
    settingList: [
      { id: 'stage-1', flowName: '初步沟通', class: 'state-doing' },
      { id: 'stage-2', flowName: '有些意向', class: 'state-undo' },
      { id: 'stage-3', flowName: '开始洽谈', class: 'state-undo' },
      { id: 'stage-4', flowName: '正式合同', class: 'state-undo' },
      { id: 'stage-5', flowName: '结束', class: 'state-undo' }
    ]
  },
  abstractList: [
    { title: '跟进次数', value: '1', unit: '次', help: true },
    { title: '未跟进时长', value: '12', unit: '天' },
    { title: '商机数量', value: '1' },
    { title: '商机总额', value: '0.30', unit: '万元', help: true },
    { title: '成交次数', value: '5', unit: '次' },
    { title: '成交总额', value: '0.3123', unit: '万元' },
    { title: '回款总额', value: '0.0341', unit: '万元' },
    { title: '未回款总额', value: '0.2782', unit: '万元' },
    { title: '开票总额', value: '0.251', unit: '万元' }
  ],
  baseInfoGroups: createDetailGroupsFromModel(customerFieldModel, customerRows[0]),
  activityTypes: [
    { type: 'followRecord', label: '跟进记录' },
    { type: 'dynamic', label: '动态' }
  ],
  activityFieldGroups,
  activityFieldList,
  followRecords: [
    {
      id: '2063073800048930816',
      primaryKeyId: '2063073800048930816',
      activityId: '2061703936361164800',
      type: 1,
      activityType: 2,
      activityTypeId: '2061703936361164800',
      activityTypeName: '苏州星禾精密制造',
      createUserName: 'admin',
      createUser: { realname: 'admin', companyId: '1729083386843471872', img: '/adminFile/down/1990756825826697216' },
      content: '确认样品交付时间，需补充报价单和合同审批节点。',
      category: '打电话',
      visitPlanId: '',
      visitPlanName: '',
      remindTeamMembers: [],
      teamMember: [],
      nextTime: '2026-06-25 00:00:00',
      valid: null,
      favour: 0,
      favourList: [],
      replyNum: 0,
      img: [],
      file: [],
      relationDataOrig: { dataId: '2061703936361164800', moduleName: 'crm', moduleId: 2 },
      fieldList: activityFieldList,
      createTime: '2026-04-20 09:57:03',
      updateTime: '2026-04-20 09:57:03'
    },
    {
      id: '2063073800048930817',
      primaryKeyId: '2063073800048930817',
      activityId: '2061703936361164800',
      type: 1,
      activityType: 2,
      activityTypeId: '2061703936361164800',
      activityTypeName: '智能制造服务合同',
      createUserName: '林舟',
      createUser: { realname: '林舟', companyId: '1729083386843471872' },
      content: '客户确认本月继续推进合同审批，待补充联系人电话。',
      category: '见面拜访',
      visitPlanId: '',
      visitPlanName: '',
      remindTeamMembers: ['admin'],
      teamMember: [{ realname: 'admin' }],
      nextTime: '',
      valid: null,
      favour: 0,
      favourList: [],
      replyNum: 0,
      img: [],
      file: [],
      relationDataOrig: { dataId: '2061703936361164800', moduleName: 'crm', moduleId: 2 },
      fieldList: activityFieldList,
      createTime: '2026-04-18 16:20:05',
      updateTime: '2026-04-18 16:20:05'
    }
  ],
  dynamics: [
    { type: '动态', user: 'admin', action: '创建了客户', object: '苏州星禾精密制造', time: '2026-04-17 09:10:22' },
    { type: '动态', user: '林舟', action: '更新了客户级别', object: '苏州星禾精密制造', time: '2026-04-20 11:58:31' }
  ],
  contactsFields: [
    { prop: 'name', label: '联系人姓名', width: 160 },
    { prop: 'mobile', label: '手机', width: 140 },
    { prop: 'telephone', label: '电话', width: 140 },
    { prop: 'post', label: '职务', width: 140 },
    { prop: 'role', label: '决策角色', width: 140 }
  ],
  contacts: [
    { contactsId: 'ct-1', name: '沈琳', mobile: '155****5545', telephone: '166****4542', post: '采购经理', role: '关键人', chiefly: true },
    { contactsId: 'ct-2', name: '王琪', mobile: '139****6182', telephone: '-', post: '技术负责人', role: '影响者', chiefly: false }
  ],
  files: [
    { fileId: 'f-1', name: '客户需求确认表.pdf', size: '2.4MB', createUserName: '林舟', createTime: '2026-04-20 10:12:31', source: '客户' },
    { fileId: 'f-2', name: '报价附件.xlsx', size: '680KB', createUserName: 'admin', createTime: '2026-04-21 09:22:10', source: '回款' }
  ],
  logs: [
    { createTime: '2026-04-20 11:58:31', realname: '林舟', content: ['将客户级别从 C级 调整为 A级。'] },
    { createTime: '2026-04-18 16:20:05', realname: 'admin', content: ['将客户负责人转移给 林舟。'] },
    { createTime: '2026-04-17 09:10:22', realname: 'admin', content: ['创建客户 苏州星禾精密制造。'] }
  ]
}

const crmScenesByModule = moduleName => [
  { label: `全部${moduleName}`, value: 'all' },
  { label: `我负责的${moduleName}`, value: 'owner' },
  { label: `下属负责的${moduleName}`, value: 'subordinate' },
  { label: `我关注的${moduleName}`, value: 'focus' },
  { label: '今天需联系', value: 'today' },
  { label: `重点${moduleName}`, value: 'key-object' },
  { label: `本周需联系`, value: 'week-follow' },
  { label: `高价值${moduleName}`, value: 'high-value' },
  { label: `待跟进${moduleName}`, value: 'pending-follow' }
]

const createStageFlow = (flowName, rows) => ({
  flowName,
  settingList: [
    { settingId: 's1', settingName: '初步沟通', count: rows.slice(0, 2).length, rows: rows.slice(0, 2) },
    { settingId: 's2', settingName: '有些意向', count: rows.slice(2, 3).length, rows: rows.slice(2, 3) },
    { settingId: 's3', settingName: '开始洽谈', count: rows.slice(3, 4).length, rows: rows.slice(3, 4) },
    { settingId: 's4', settingName: '正式合同', count: 0, rows: [] },
    { settingId: 's5', settingName: '结束', count: 0, rows: [], isEnd: true }
  ]
})

const toCardRows = rows => rows.slice(0, 6).map(item => ({
  ...item,
  dataImg: '',
  lastTime: item.nextTime || item.updateTime || '--'
}))

const createBaseInfoGroups = (mainField, mainName, mainValue, extras = []) => [
  {
    name: '基本信息',
    list: [
      { fieldName: mainField, name: mainName, formType: 'text', value: mainValue },
      ...extras,
      { fieldName: 'ownerUserName', name: '负责人', formType: 'user', value: 'admin' },
      { fieldName: 'updateTime', name: '更新时间', formType: 'datetime', value: '2026-05-20 14:29:19' }
    ]
  },
  {
    name: '系统信息',
    list: [
      { fieldName: 'createUserName', name: '创建人', formType: 'text', value: 'admin' },
      { fieldName: 'createTime', name: '创建时间', formType: 'datetime', value: '2026-04-17 09:10:22' }
    ]
  }
]

const createDetailData = ({
  idField,
  id,
  crmType,
  mainField,
  mainName,
  mainValue,
  headBase,
  baseExtras = [],
  abstractList = detailData.abstractList
}) => ({
  ...detailData,
  [idField]: id,
  customerId: id,
  [mainField]: mainValue,
  customerName: mainValue,
  crmType,
  dealStatus: crmType === '商机' || crmType === '合同' ? 0 : detailData.dealStatus,
  headBase,
  abstractList,
  baseInfoGroups: createBaseInfoGroups(mainField, mainName, mainValue, baseExtras),
  logs: [
    { createTime: '2026-05-20 11:58:31', realname: '林舟', content: [`更新${crmType} ${mainValue}。`] },
    { createTime: '2026-04-17 09:10:22', realname: 'admin', content: [`创建${crmType} ${mainValue}。`] }
  ]
})

const createFieldGroups = (moduleName, mainField, mainLabel, extraFields = []) => [
  {
    name: '基本信息',
    fields: [
      {
        field: mainField,
        name: mainLabel,
        formType: 'text',
        isNull: 1,
        stylePercent: 100,
        placeholder: `请输入${mainLabel}`,
        defaultValue: `${moduleName}示例`
      },
      ...extraFields,
      {
        field: 'source',
        name: `${moduleName}来源`,
        formType: 'select',
        stylePercent: 50,
        placeholder: '请选择',
        setting: ['市场活动', '线上咨询', '客户介绍'],
        defaultValue: '市场活动'
      },
      {
        field: 'ownerUserName',
        name: '负责人',
        formType: 'select',
        isNull: 1,
        stylePercent: 50,
        placeholder: '请选择',
        setting: ['admin', '林舟', '张敏'],
        defaultValue: 'admin'
      },
      {
        field: 'remark',
        name: '备注',
        formType: 'rich_text_format',
        stylePercent: 100,
        placeholder: `填写${moduleName}备注`,
        defaultValue: ''
      }
    ]
  }
]

const leadsFieldList = [
  { prop: 'leadsName', label: '线索名称', width: 210, fixed: true, sortable: true },
  { prop: 'telephone', label: '电话', width: 150 },
  { prop: 'source', label: '线索来源', width: 150 },
  { prop: 'mobile', label: '手机', width: 150 },
  { prop: 'industry', label: '行业', width: 150 },
  { prop: 'level', label: '线索级别', width: 130 },
  { prop: 'ownerUserName', label: '负责人', width: 130 },
  { prop: 'nextTime', label: '下次联系时间', width: 180 }
]

const leadsRows = [
  { leadsId: 'L-001', __rowUid: 'L-001-0', leadsName: '华东设备升级线索', telephone: '', source: '市场活动', mobile: '139****6182', industry: '装备制造', level: 'A', ownerUserName: 'admin', nextTime: '2026-06-05 10:30:00', updateTime: '2026-06-03 09:20:00', businessCount: 0, star: 1, callShow: true },
  { leadsId: 'L-002', __rowUid: 'L-002-0', leadsName: '汽车零部件采购线索', telephone: '010-88990012', source: '广告投放', mobile: '', industry: '汽车制造', level: 'B', ownerUserName: '林舟', nextTime: '', updateTime: '2026-05-20 14:29:19', businessCount: 0, star: 0, callShow: false },
  { leadsId: 'L-003', __rowUid: 'L-003-0', leadsName: '智能仓储咨询线索', telephone: '', source: '线上咨询', mobile: '155****5545', industry: '智能制造', level: 'A', ownerUserName: '张敏', nextTime: '', updateTime: '2026-05-18 11:12:31', businessCount: 0, star: 0, callShow: true }
]

const contactsFieldList = [
  { prop: 'contactsName', label: '联系人姓名', width: 210, fixed: true, sortable: true },
  { prop: 'customerName', label: '客户名称', width: 180 },
  { prop: 'mobile', label: '手机', width: 150 },
  { prop: 'telephone', label: '电话', width: 150 },
  { prop: 'post', label: '职务', width: 140 },
  { prop: 'role', label: '决策角色', width: 140 },
  { prop: 'ownerUserName', label: '负责人', width: 130 },
  { prop: 'updateTime', label: '更新时间', width: 180 }
]

const contactsRows = [
  { contactsId: 'CT-001', __rowUid: 'CT-001-0', contactsName: '沈琳', customerName: '苏州星禾精密制造', mobile: '155****5545', telephone: '166****4542', post: '采购经理', role: '关键人', ownerUserName: 'admin', updateTime: '2026-05-20 14:29:19', businessCount: 0, star: 1, callShow: true },
  { contactsId: 'CT-002', __rowUid: 'CT-002-0', contactsName: '王琪', customerName: '上海云启设备服务', mobile: '139****6182', telephone: '', post: '技术负责人', role: '影响者', ownerUserName: '林舟', updateTime: '2026-04-20 09:57:03', businessCount: 0, star: 0, callShow: true },
  { contactsId: 'CT-003', __rowUid: 'CT-003-0', contactsName: '张敏', customerName: '深圳临熵精密科技', mobile: '', telephone: '', post: '总经理', role: '决策人', ownerUserName: '张敏', updateTime: '2026-03-09 15:41:26', businessCount: 0, star: 0, callShow: false }
]

const businessFieldList = [
  { prop: 'businessName', label: '商机名称', width: 220, fixed: true, sortable: true },
  { prop: 'customerName', label: '客户名称', width: 180 },
  { prop: 'money', label: '商机金额', width: 140 },
  { prop: 'stage', label: '商机阶段', width: 150 },
  { prop: 'source', label: '商机来源', width: 150 },
  { prop: 'ownerUserName', label: '负责人', width: 130 },
  { prop: 'nextTime', label: '下次联系时间', width: 180 },
  { prop: 'updateTime', label: '更新时间', width: 180 }
]

const businessRows = [
  { businessId: 'B-001', __rowUid: 'B-001-0', businessName: '智能制造扩容项目', customerName: '苏州星禾精密制造', money: '104k', stage: '初步沟通', source: '客户介绍', ownerUserName: 'admin', nextTime: '2026-06-05 10:30:00', updateTime: '2026-05-20 14:29:19', businessCount: 0, star: 1, callShow: false },
  { businessId: 'B-002', __rowUid: 'B-002-0', businessName: '装备产线升级商机', customerName: '苏州星禾精密制造', money: '0.30万元', stage: '有些意向', source: '市场活动', ownerUserName: '林舟', nextTime: '', updateTime: '2026-04-20 09:57:02', businessCount: 0, star: 0, callShow: false },
  { businessId: 'B-003', __rowUid: 'B-003-0', businessName: '汽车零部件改造项目', customerName: '南京科锐自动化', money: '50k', stage: '开始洽谈', source: '广告投放', ownerUserName: '张敏', nextTime: '', updateTime: '2026-03-09 15:41:26', businessCount: 0, star: 0, callShow: false }
]

const contractFieldList = [
  { prop: 'contractNum', label: '合同编号', width: 200, fixed: true, sortable: true },
  { prop: 'contractName', label: '合同名称', width: 220 },
  { prop: 'customerName', label: '客户名称', width: 180 },
  { prop: 'money', label: '合同金额', width: 140 },
  { prop: 'checkStatus', label: '审核状态', width: 140 },
  { prop: 'ownerUserName', label: '负责人', width: 130 },
  { prop: 'startTime', label: '开始时间', width: 160 },
  { prop: 'updateTime', label: '更新时间', width: 180 }
]

const contractRows = [
  { contractId: 'CO-001', __rowUid: 'CO-001-0', contractNum: 'HT20260520-0009', contractName: '智能制造服务合同', customerName: '苏州星禾精密制造', money: '0.3123万元', checkStatus: '审核中', ownerUserName: 'admin', startTime: '2026-05-20', updateTime: '2026-05-20 15:34:12', businessCount: 0, star: 1, callShow: false },
  { contractId: 'CO-002', __rowUid: 'CO-002-0', contractNum: 'HT20260420-0001', contractName: '设备维护合同', customerName: '上海云启设备服务', money: '0.251万元', checkStatus: '通过', ownerUserName: '林舟', startTime: '2026-04-20', updateTime: '2026-04-20 12:56:56', businessCount: 0, star: 0, callShow: false },
  { contractId: 'CO-003', __rowUid: 'CO-003-0', contractNum: 'HT20260309-0007', contractName: '汽车动力电池合同', customerName: '南京科锐自动化', money: '50k', checkStatus: '草稿', ownerUserName: '张敏', startTime: '', updateTime: '2026-03-09 15:41:26', businessCount: 0, star: 0, callShow: false }
]

function firstMockValue(rows, field) {
  const hit = rows.find(row => row[field] !== undefined && row[field] !== '')
  return hit ? hit[field] : ''
}

function normalizeTableFields(fields, rows) {
  return fields.map(field => {
    const prop = field.prop || field.field
    const label = field.label || field.name

    return {
      ...field,
      prop,
      field: prop,
      label,
      name: label,
      formType: field.formType || 'text',
      width: field.width || 150,
      stylePercent: field.stylePercent || 50,
      isNull: field.isNull || 0,
      placeholder: field.placeholder || '',
      setting: field.setting || [],
      tableVisible: field.tableVisible ?? true,
      createVisible: field.createVisible ?? false,
      detailVisible: field.detailVisible ?? true,
      mockValue: field.mockValue ?? firstMockValue(rows, prop)
    }
  })
}

function normalizeCreateField(field) {
  const prop = field.prop || field.field
  const label = field.label || field.name

  return {
    ...field,
    prop,
    field: prop,
    label,
    name: label,
    width: field.width || 150,
    stylePercent: field.stylePercent || (field.formType === 'rich_text_format' ? 100 : 50),
    isNull: field.isNull || 0,
    placeholder: field.placeholder || '',
    setting: field.setting || [],
    tableVisible: field.tableVisible ?? false,
    createVisible: field.createVisible ?? true,
    detailVisible: field.detailVisible ?? true,
    mockValue: field.mockValue ?? field.defaultValue ?? ''
  }
}

function normalizeCreateFieldGroups(groups) {
  return groups.map(group => ({
    ...group,
    fields: group.fields.map(normalizeCreateField)
  }))
}

function normalizeDetailBaseInfo(detailDataSource) {
  return (detailDataSource.baseInfoGroups || []).map(group => ({
    ...group,
    list: group.list.map(field => {
      const prop = field.prop || field.field || field.fieldName
      const label = field.label || field.name

      return {
        ...field,
        prop,
        field: prop,
        fieldName: prop,
        label,
        name: label,
        formType: field.formType || 'text',
        stylePercent: field.stylePercent || 50,
        isNull: field.isNull || 0,
        placeholder: field.placeholder || '',
        setting: field.setting || [],
        tableVisible: field.tableVisible ?? false,
        createVisible: field.createVisible ?? false,
        detailVisible: field.detailVisible ?? true,
        mockValue: field.mockValue ?? field.value ?? ''
      }
    })
  }))
}

function normalizeDetailData(template, data) {
  const mainValue = data[template.mainField] || data.customerName || data.contactsName || data.contractNum || ''

  return {
    ...data,
    idField: template.idField,
    mainField: template.mainField,
    moduleName: template.moduleName,
    title: mainValue,
    baseInfoGroups: normalizeDetailBaseInfo(data),
    contactsFields: normalizeTableFields(data.contactsFields || [], data.contacts || []),
    filesFields: [
      { prop: 'name', field: 'name', label: '附件名称', name: '附件名称', formType: 'text', width: 220, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.files || [], 'name') },
      { prop: 'size', field: 'size', label: '大小', name: '大小', formType: 'text', width: 100, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.files || [], 'size') },
      { prop: 'createUserName', field: 'createUserName', label: '上传人', name: '上传人', formType: 'user', width: 120, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.files || [], 'createUserName') },
      { prop: 'createTime', field: 'createTime', label: '上传时间', name: '上传时间', formType: 'datetime', width: 180, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.files || [], 'createTime') }
    ],
    logFields: [
      { prop: 'createTime', field: 'createTime', label: '操作时间', name: '操作时间', formType: 'datetime', width: 180, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.logs || [], 'createTime') },
      { prop: 'realname', field: 'realname', label: '操作人', name: '操作人', formType: 'user', width: 120, stylePercent: 50, isNull: 0, placeholder: '', setting: [], tableVisible: true, createVisible: false, detailVisible: true, mockValue: firstMockValue(data.logs || [], 'realname') }
    ]
  }
}

function normalizeOperations(sourceOperations) {
  return sourceOperations.map(operation => ({
    ...operation,
    dialog: operation.dialog || (operation.type === 'put_seas' ? 'putPool' : ''),
    width: operation.width || (operation.type === 'put_seas' ? 450 : 0)
  }))
}

function normalizeTemplate(template) {
  const rows = template.rows.map(row => ({
    ...row,
    // 业务对象模板必须同时保留业务主键和主字段，生成列表、详情、阶段卡片时都依赖这两个字段。
    [template.idField]: row[template.idField],
    [template.mainField]: row[template.mainField],
    __rowUid: row.__rowUid || `${row[template.idField]}-0`
  }))

  return {
    ...template,
    rows,
    fieldList: normalizeTableFields(template.fieldList, rows),
    filterFieldList: normalizeTableFields(template.filterFieldList || template.fieldList, rows),
    cardRows: template.cardRows.length ? template.cardRows : toCardRows(rows),
    createFieldGroups: normalizeCreateFieldGroups(template.createFieldGroups),
    detailData: normalizeDetailData(template, template.detailData),
    operations: normalizeOperations(template.operations),
    uiProfile
  }
}

function normalizeTemplates(templates) {
  return Object.fromEntries(Object.entries(templates).map(([key, template]) => [key, normalizeTemplate(template)]))
}

export const crmObjectTemplates = normalizeTemplates({
  customer: {
    type: 'customer',
    moduleName: '客户',
    title: '客户管理',
    mainField: 'customerName',
    idField: 'customerId',
    searchPlaceholder: '客户名称/手机/电话',
    sceneList: sceneList,
    fieldList: fieldList,
    filterFieldList: createFilterFieldsFromModel(customerFieldModel),
    rows: customerRows,
    stageFlow: stageFlow,
    cardRows: cardCustomers,
    createFieldGroups: customerCreateFieldGroups,
    detailTabs: detailTabs,
    detailData: detailData,
    operations: operations
  },
  leads: {
    type: 'leads',
    moduleName: '线索',
    title: '线索管理',
    mainField: 'leadsName',
    idField: 'leadsId',
    searchPlaceholder: '线索名称/手机/电话',
    sceneList: crmScenesByModule('线索'),
    fieldList: leadsFieldList,
    rows: leadsRows,
    stageFlow: createStageFlow('线索阶段', leadsRows),
    cardRows: toCardRows(leadsRows),
    createFieldGroups: createFieldGroups('线索', 'leadsName', '线索名称', [
      { field: 'mobile', name: '手机', formType: 'text', stylePercent: 50, placeholder: '请输入手机', defaultValue: '139****6182' }
    ]),
    detailTabs: detailTabs,
    detailData: createDetailData({
      idField: 'leadsId',
      id: 'L-001',
      crmType: '线索',
      mainField: 'leadsName',
      mainName: '线索名称',
      mainValue: '华东设备升级线索',
      headBase: [
        { title: '线索级别', value: 'A' },
        { title: '负责人', value: 'admin' },
        { title: '手机', value: '139****6182' },
        { title: '线索来源', value: '市场活动' }
      ],
      baseExtras: [
        { fieldName: 'mobile', name: '手机', formType: 'text', value: '139****6182' },
        { fieldName: 'source', name: '线索来源', formType: 'select', value: '市场活动' }
      ]
    }),
    operations: operations
  },
  contacts: {
    type: 'contacts',
    moduleName: '联系人',
    title: '联系人管理',
    mainField: 'contactsName',
    idField: 'contactsId',
    searchPlaceholder: '联系人姓名/手机/电话',
    sceneList: crmScenesByModule('联系人'),
    fieldList: contactsFieldList,
    rows: contactsRows,
    stageFlow: createStageFlow('联系人阶段', contactsRows),
    cardRows: toCardRows(contactsRows),
    createFieldGroups: createFieldGroups('联系人', 'contactsName', '联系人姓名', [
      { field: 'customerName', name: '客户名称', formType: 'select', isNull: 1, stylePercent: 50, placeholder: '请选择客户', setting: ['苏州星禾精密制造', '上海云启设备服务'], defaultValue: '苏州星禾精密制造' },
      { field: 'mobile', name: '手机', formType: 'text', stylePercent: 50, placeholder: '请输入手机', defaultValue: '155****5545' }
    ]),
    detailTabs: detailTabs,
    detailData: createDetailData({
      idField: 'contactsId',
      id: 'CT-001',
      crmType: '联系人',
      mainField: 'contactsName',
      mainName: '联系人姓名',
      mainValue: '沈琳',
      headBase: [
        { title: '客户名称', value: '苏州星禾精密制造', formType: 'link' },
        { title: '负责人', value: 'admin' },
        { title: '手机', value: '155****5545' },
        { title: '职务', value: '采购经理' }
      ],
      baseExtras: [
        { fieldName: 'customerName', name: '客户名称', formType: 'customer', value: '苏州星禾精密制造' },
        { fieldName: 'mobile', name: '手机', formType: 'text', value: '155****5545' },
        { fieldName: 'post', name: '职务', formType: 'text', value: '采购经理' }
      ]
    }),
    operations: operations
  },
  business: {
    type: 'business',
    moduleName: '商机',
    title: '商机管理',
    mainField: 'businessName',
    idField: 'businessId',
    searchPlaceholder: '商机名称/客户名称',
    sceneList: crmScenesByModule('商机'),
    fieldList: businessFieldList,
    rows: businessRows,
    stageFlow: createStageFlow('商机阶段', businessRows),
    cardRows: toCardRows(businessRows),
    createFieldGroups: createFieldGroups('商机', 'businessName', '商机名称', [
      { field: 'customerName', name: '客户名称', formType: 'select', isNull: 1, stylePercent: 50, placeholder: '请选择客户', setting: ['苏州星禾精密制造', '苏州星禾精密制造'], defaultValue: '苏州星禾精密制造' },
      { field: 'money', name: '商机金额', formType: 'text', stylePercent: 50, placeholder: '请输入金额', defaultValue: '104000' }
    ]),
    detailTabs: detailTabs,
    detailData: createDetailData({
      idField: 'businessId',
      id: 'B-001',
      crmType: '商机',
      mainField: 'businessName',
      mainName: '商机名称',
      mainValue: '智能制造扩容项目',
      headBase: [
        { title: '客户名称', value: '苏州星禾精密制造', formType: 'link' },
        { title: '负责人', value: 'admin' },
        { title: '商机金额', value: '104k' },
        { title: '商机阶段', value: '初步沟通' }
      ],
      baseExtras: [
        { fieldName: 'customerName', name: '客户名称', formType: 'customer', value: '苏州星禾精密制造' },
        { fieldName: 'money', name: '商机金额', formType: 'text', value: '104k' },
        { fieldName: 'stage', name: '商机阶段', formType: 'select', value: '初步沟通' }
      ]
    }),
    operations: operations
  },
  contract: {
    type: 'contract',
    moduleName: '合同',
    title: '合同管理',
    mainField: 'contractNum',
    idField: 'contractId',
    searchPlaceholder: '合同编号/合同名称/客户名称',
    sceneList: crmScenesByModule('合同'),
    fieldList: contractFieldList,
    rows: contractRows,
    stageFlow: createStageFlow('合同阶段', contractRows),
    cardRows: toCardRows(contractRows),
    createFieldGroups: createFieldGroups('合同', 'contractNum', '合同编号', [
      { field: 'contractName', name: '合同名称', formType: 'text', isNull: 1, stylePercent: 50, placeholder: '请输入合同名称', defaultValue: '智能制造服务合同' },
      { field: 'customerName', name: '客户名称', formType: 'select', isNull: 1, stylePercent: 50, placeholder: '请选择客户', setting: ['苏州星禾精密制造', '上海云启设备服务'], defaultValue: '苏州星禾精密制造' }
    ]),
    detailTabs: detailTabs,
    detailData: createDetailData({
      idField: 'contractId',
      id: 'CO-001',
      crmType: '合同',
      mainField: 'contractNum',
      mainName: '合同编号',
      mainValue: 'HT20260520-0009',
      headBase: [
        { title: '合同名称', value: '智能制造服务合同' },
        { title: '客户名称', value: '苏州星禾精密制造', formType: 'link' },
        { title: '负责人', value: 'admin' },
        { title: '合同金额', value: '0.3123万元' }
      ],
      baseExtras: [
        { fieldName: 'contractName', name: '合同名称', formType: 'text', value: '智能制造服务合同' },
        { fieldName: 'customerName', name: '客户名称', formType: 'customer', value: '苏州星禾精密制造' },
        { fieldName: 'money', name: '合同金额', formType: 'text', value: '0.3123万元' }
      ]
    }),
    operations: operations
  }
})

export const crmObjectTemplateList = Object.values(crmObjectTemplates)
