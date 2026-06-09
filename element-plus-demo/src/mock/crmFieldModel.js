export const supportedCustomerFieldTypeLib = [
  { componentName: 'FieldInput', formType: 'text', name: '单行文本', type: 1, icon: 'wk wk-icon-text' },
  { componentName: 'FieldTextarea', formType: 'textarea', name: '多行文本', type: 2, icon: 'wk wk-icon-textarea' },
  { componentName: 'FieldSelect', formType: 'select', name: '单选', type: 3, icon: 'wk wk-icon-select' },
  { componentName: 'FieldCheckbox', formType: 'checkbox', name: '多选', type: 9, icon: 'wk wk-icon-checkbox' },
  { componentName: 'FieldInput', formType: 'radio', name: '单选按钮', type: 48, icon: 'wk wk-icon-radio' },
  { componentName: 'FieldInput', formType: 'mobile', name: '手机', type: 7, icon: 'wk wk-icon-mobile2' },
  { componentName: 'FieldInput', formType: 'email', name: '邮箱', type: 14, icon: 'wk wk-icon-mail' },
  { componentName: 'FieldInput', formType: 'website', name: '网址', type: 25, icon: 'wk wk-icon-link' },
  { componentName: 'FieldInput', formType: 'datetime', name: '日期时间', type: 13, icon: 'wk wk-icon-datetime2' },
  { componentName: 'FieldInput', formType: 'user', name: '人员', type: 10, icon: 'wk wk-s-contacts-line' },
  { componentName: 'FieldInput', formType: 'map_address', name: '地址', type: 43, icon: 'wk wk-icon-location' },
  { componentName: 'FieldFile', formType: 'pic', name: '图片', type: 29, icon: 'wk wk-icon-status' },
  { componentName: 'FieldFile', formType: 'file', name: '附件', type: 8, icon: 'wk wk-icon-file' },
  { componentName: 'FieldTextarea', formType: 'rich_text_format', name: '富文本', type: 70, icon: 'wk wk-icon-rich-text' },
  { componentName: 'FieldSelect', formType: 'customer_relations', name: '客户关系', type: 113, icon: 'wk wk-customer' }
]

export const customerFieldModel = [
  {
    field: 'customerName',
    name: '客户名称',
    formType: 'text',
    type: 1,
    width: 210,
    fixed: true,
    sortable: true,
    stylePercent: 100,
    isNull: 1,
    placeholder: '请输入客户名称',
    defaultValue: '苏州星禾精密制造',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '苏州星禾精密制造'
  },
  {
    field: 'telephone',
    name: '电话',
    formType: 'text',
    type: 1,
    width: 150,
    stylePercent: 50,
    placeholder: '请输入电话',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '0512-88990012'
  },
  {
    field: 'source',
    name: '客户来源',
    formType: 'select',
    type: 3,
    width: 150,
    stylePercent: 50,
    placeholder: '请选择',
    setting: ['市场活动', '线上咨询', '客户介绍', '广告投放', '搜索引擎'],
    defaultValue: '市场活动',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '搜索引擎'
  },
  {
    field: 'mobile',
    name: '手机',
    formType: 'mobile',
    type: 7,
    width: 150,
    stylePercent: 50,
    placeholder: '请输入手机',
    defaultValue: '139****6182',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '139****6182'
  },
  {
    field: 'email',
    name: '邮箱',
    formType: 'email',
    type: 14,
    width: 170,
    stylePercent: 50,
    placeholder: '请输入邮箱',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: 'contact@xinghe.demo'
  },
  {
    field: 'website',
    name: '网址',
    formType: 'website',
    type: 25,
    width: 170,
    stylePercent: 50,
    placeholder: '请输入网址',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: 'https://xinghe.demo'
  },
  {
    field: 'industry',
    name: '客户行业',
    formType: 'select',
    type: 3,
    width: 150,
    stylePercent: 50,
    placeholder: '请选择',
    setting: ['智能制造', '装备制造', '软件服务', '医疗器械', '物流服务', '企业服务'],
    defaultValue: '智能制造',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '智能制造'
  },
  {
    field: 'level',
    name: '客户级别',
    formType: 'select',
    type: 3,
    width: 130,
    stylePercent: 50,
    placeholder: '请选择',
    setting: ['A', 'B', 'C'],
    defaultValue: 'A',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: 'A'
  },
  {
    field: 'nextTime',
    name: '下次联系时间',
    formType: 'datetime',
    type: 13,
    width: 180,
    stylePercent: 50,
    placeholder: '选择日期时间',
    tableVisible: true,
    createVisible: false,
    detailVisible: true,
    filterVisible: true,
    mockValue: '2026-06-10 10:30:00',
    designerVisible: false
  },
  {
    field: 'ownerUserName',
    name: '负责人',
    formType: 'user',
    type: 10,
    width: 130,
    stylePercent: 50,
    isNull: 1,
    placeholder: '请选择',
    defaultValue: 'admin',
    tableVisible: true,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: 'admin'
  },
  {
    field: 'dealStatus',
    name: '成交状态',
    formType: 'select',
    type: 3,
    width: 130,
    stylePercent: 50,
    setting: [
      { label: '已成交', value: 1 },
      { label: '未成交', value: 0 }
    ],
    tableVisible: true,
    createVisible: false,
    detailVisible: true,
    filterVisible: true,
    mockValue: 1,
    designerVisible: false
  },
  {
    field: 'updateTime',
    name: '更新时间',
    formType: 'datetime',
    type: 13,
    width: 180,
    stylePercent: 50,
    tableVisible: true,
    createVisible: false,
    detailVisible: true,
    filterVisible: true,
    mockValue: '2026-06-03 14:29:19',
    detailGroupName: '系统信息',
    designerVisible: false
  },
  {
    field: 'address',
    name: '地址',
    formType: 'map_address',
    type: 43,
    stylePercent: 100,
    placeholder: '请选择地址或输入详细地址',
    defaultValue: 'suzhou-park',
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: '江苏省 / 苏州市 / 工业园区',
    isBlock: true
  },
  {
    field: 'commonOptions',
    name: '通用选项集',
    formType: 'select',
    type: 3,
    stylePercent: 50,
    placeholder: '请选择',
    setting: ['市场活动', '线上咨询', '客户介绍'],
    defaultValue: '',
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: true,
    mockValue: '市场活动'
  },
  {
    field: 'richText',
    name: '富文本',
    formType: 'rich_text_format',
    type: 70,
    stylePercent: 100,
    placeholder: '填写客户背景、需求、沟通备注',
    defaultValue: '',
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: '客户关注交付周期和售后响应，需要保留报价版本记录。',
    isBlock: true
  },
  {
    field: 'single',
    name: '单选',
    formType: 'radio',
    type: 48,
    stylePercent: 50,
    setting: ['A', 'B'],
    defaultValue: 'A',
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: 'A'
  },
  {
    field: 'multiple',
    name: '多选',
    formType: 'checkbox',
    type: 9,
    stylePercent: 50,
    setting: ['智能制造', '装备制造'],
    defaultValue: ['智能制造'],
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: ['智能制造']
  },
  {
    field: 'logo',
    name: '企业Logo',
    formType: 'pic',
    type: 29,
    stylePercent: 50,
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: []
  },
  {
    field: 'customerRelation',
    name: '客户关系',
    formType: 'customer_relations',
    type: 113,
    stylePercent: 50,
    placeholder: '请选择',
    setting: ['母公司', '子公司', '关联企业'],
    defaultValue: '',
    tableVisible: false,
    createVisible: true,
    detailVisible: true,
    filterVisible: false,
    mockValue: '关联企业'
  },
  {
    field: 'createUserName',
    name: '创建人',
    formType: 'user',
    type: 10,
    stylePercent: 50,
    tableVisible: false,
    createVisible: false,
    detailVisible: true,
    filterVisible: false,
    mockValue: 'admin',
    detailGroupName: '系统信息',
    designerVisible: false
  },
  {
    field: 'createTime',
    name: '创建时间',
    formType: 'datetime',
    type: 13,
    stylePercent: 50,
    tableVisible: false,
    createVisible: false,
    detailVisible: true,
    filterVisible: false,
    mockValue: '2026-04-17 09:10:22',
    detailGroupName: '系统信息',
    designerVisible: false
  },
  {
    field: 'ownerDeptName',
    name: '所属部门',
    formType: 'text',
    type: 1,
    stylePercent: 50,
    tableVisible: false,
    createVisible: false,
    detailVisible: true,
    filterVisible: false,
    mockValue: '销售中心',
    detailGroupName: '系统信息',
    designerVisible: false
  }
]

export function createFieldListFromModel(model, rows = []) {
  return model
    .filter(field => field.tableVisible)
    .map(field => normalizeField(field, firstMockValue(rows, field.field)))
}

export function createFieldGroupsFromModel(model) {
  const groups = new Map()
  model
    .filter(field => field.createVisible)
    .map(field => normalizeField(field))
    .forEach((field) => {
      const groupName = field.createGroupName || field.groupName || '基本信息'
      if (!groups.has(groupName)) groups.set(groupName, [])
      groups.get(groupName).push(field)
    })

  return Array.from(groups, ([name, fields]) => ({ name, fields }))
}

export function createDetailGroupsFromModel(model, row = {}) {
  const groups = new Map()
  model
    .filter(field => field.detailVisible)
    .map(field => {
      const normalized = normalizeField(field, row[field.field])
      return {
        ...normalized,
        fieldName: normalized.field,
        value: formatFieldValue(normalized, row),
        isBlock: normalized.isBlock || normalized.stylePercent === 100
      }
    })
    .forEach((field) => {
      const groupName = field.detailGroupName || field.groupName || '基本信息'
      if (!groups.has(groupName)) groups.set(groupName, [])
      groups.get(groupName).push(field)
    })

  return Array.from(groups, ([name, list]) => ({ name, list }))
}

export function createFilterFieldsFromModel(model) {
  return model
    .filter(field => field.filterVisible)
    .map(field => normalizeField(field))
}

export function createDesignerFieldsFromModel(model) {
  const fields = model
    .filter(field => field.designerVisible !== false && (field.createVisible || field.detailVisible))
    .map((field, index) => ({
      formAssistId: `customer-field-${field.field}`,
      name: field.name,
      formType: field.formType,
      type: field.type,
      stylePercent: field.stylePercent || 50,
      required: field.isNull === 1,
      inputTips: field.inputTips || field.placeholder || '',
      setting: normalizeSetting(field.setting || []),
      sort: index + 1
    }))

  return chunkRows(fields, 2)
}

function normalizeField(field, fallbackMockValue = '') {
  const prop = field.prop || field.field
  const label = field.label || field.name
  return {
    ...field,
    prop,
    field: prop,
    fieldName: field.fieldName || prop,
    label,
    name: label,
    formType: field.formType || 'text',
    type: field.type || 1,
    width: field.width || 150,
    stylePercent: field.stylePercent || 50,
    isNull: field.isNull || 0,
    placeholder: field.placeholder || '',
    setting: normalizeSetting(field.setting || []),
    defaultValue: field.defaultValue ?? (field.formType === 'checkbox' ? [] : ''),
    tableVisible: Boolean(field.tableVisible),
    createVisible: Boolean(field.createVisible),
    detailVisible: Boolean(field.detailVisible),
    filterVisible: Boolean(field.filterVisible),
    mockValue: field.mockValue ?? fallbackMockValue ?? ''
  }
}

function firstMockValue(rows, field) {
  const hit = rows.find(row => row[field] !== undefined && row[field] !== '')
  return hit ? hit[field] : ''
}

function formatFieldValue(field, row) {
  const rawValue = row[field.field] ?? field.mockValue ?? field.defaultValue ?? ''
  if (field.field === 'address') {
    return row.addressDetail || rawValue || ''
  }
  if (Array.isArray(rawValue)) {
    return rawValue.map(item => item?.name || item?.realname || item?.label || item).join('、')
  }
  if (field.setting?.length) {
    const hit = field.setting.find(option => option.value === rawValue || option.label === rawValue)
    return hit?.label ?? rawValue
  }
  return rawValue
}

function normalizeSetting(setting) {
  return setting.map(item => {
    if (typeof item === 'object') {
      return {
        label: item.label || item.name || item.value,
        value: item.value ?? item.label ?? item.name
      }
    }
    return { label: item, value: item }
  })
}

function chunkRows(fields, size) {
  const rows = []
  for (let index = 0; index < fields.length; index += size) {
    rows.push(fields.slice(index, index + size))
  }
  return rows
}
