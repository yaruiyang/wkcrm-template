import {
  crmObjectTemplateList,
  crmObjectTemplates,
  operations,
  poolDialogOptions,
  tableStyleObj,
  viewTypes
} from './crm.js'
import { adminSchema } from './admin.js'

export const schemaVersion = 'p5.1'

export const fieldTypeMap = {
  text: { label: '单行文本', element: 'el-input' },
  textarea: { label: '多行文本', element: 'el-input textarea' },
  select: { label: '下拉选择', element: 'el-select' },
  radio: { label: '单选', element: 'el-radio-group' },
  checkbox: { label: '多选', element: 'el-checkbox-group' },
  switch: { label: '开关', element: 'el-switch' },
  date: { label: '日期', element: 'el-date-picker' },
  datetime: { label: '日期时间', element: 'el-date-picker' },
  'date-range': { label: '日期范围', element: 'el-date-picker daterange' },
  number: { label: '数字', element: 'el-input-number' },
  money: { label: '金额', element: 'el-input' },
  user: { label: '人员', element: 'el-select' },
  structure: { label: '部门', element: 'el-tree-select' },
  'tree-select': { label: '树选择', element: 'el-tree-select' },
  map_address: { label: '地址', element: 'el-cascader + el-input' },
  rich_text_format: { label: '富文本', element: 'rich-text-placeholder' },
  pic: { label: '图片', element: 'el-upload' },
  file: { label: '附件', element: 'el-upload' },
  customer_relations: { label: '客户关系', element: 'el-select' },
  data_collapse: { label: '折叠控制', element: 'collapse-toggle' }
}

export const requiredSchemaKeys = {
  crmTemplate: [
    'type',
    'moduleName',
    'title',
    'mainField',
    'idField',
    'searchPlaceholder',
    'sceneList',
    'fieldList',
    'rows',
    'stageFlow',
    'cardRows',
    'createFieldGroups',
    'detailTabs',
    'detailData',
    'operations'
  ],
  crmField: [
    'prop',
    'field',
    'label',
    'name',
    'formType',
    'width',
    'stylePercent',
    'isNull',
    'placeholder',
    'setting',
    'tableVisible',
    'createVisible',
    'detailVisible',
    'mockValue'
  ],
  adminModule: [
    'title',
    'navKey',
    'filters',
    'fields',
    'rows',
    'actions',
    'dialogs',
    'layout'
  ]
}

export const crmSchema = {
  schemaVersion,
  defaultType: 'customer',
  objects: crmObjectTemplates,
  objectList: crmObjectTemplateList,
  tableStyleObj,
  viewTypes,
  operations,
  poolDialogOptions
}

export { adminSchema }

export default {
  schemaVersion,
  fieldTypeMap,
  requiredSchemaKeys,
  crmSchema,
  adminSchema
}
