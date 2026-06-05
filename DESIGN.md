---
version: beta
name: WKCRM-design-md
standalone: true
target_stack: "Vue 3 + Element Plus"
audience: "AI Studio / Codex CLI / 二开前端"
recommended_use: "作为独立 WKCRM UI 规范包，用于快速生成 Vue 3 + Element Plus 的 CRM 核心页面和二开模块模板。"
description: >
  WKCRM 是密集型 CRM 管理系统，核心不是营销展示页，而是客户管理闭环、后台组织配置和信息配置能力。
  本规范已经把产品观察结果转成可独立使用的 UI 合约；使用者不需要访问任何源码项目。
colors:
  n0: "#FFFFFF"
  n10: "#FAFBFC"
  n20: "#F4F5F7"
  n30: "#EBECF0"
  n40: "#DFE1E6"
  n50: "#C1C7D0"
  n90: "#8993A4"
  n100: "#7A869A"
  n200: "#6B778C"
  n500: "#42526E"
  n700: "#253858"
  n800: "#172B4D"
  n900: "#091E42"
  primary: "#0052CC"
  primary-hover: "#0065FF"
  primary-soft: "#DEEBFF"
  success: "#00875A"
  warning: "#FF991F"
  danger: "#DE350B"
  info: "#5243AA"
  canvas: "#F4F5F7"
  detail-canvas: "#F4F9FC"
  table-head: "#DFE1E6"
  overlay: "rgba(23, 43, 77, 0.50)"
typography:
  font-family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
  page-title: "24px / 700 / 32px"
  create-title: "20px / 700 / 50px"
  section-title: "16px / 600 / 24px"
  body: "14px / 400-500 / 22px"
  caption: "12px / 400 / 18px"
layout:
  top-nav-height: "56px"
  crm-page-padding: "20px 20px 0"
  admin-page-padding: "24px 40px"
  admin-local-nav-width: "240px"
  create-modal-width: "900px"
  create-modal-padding-y: "40px"
  create-header-height: "50px"
  detail-slide-min-width: "950px"
  field-builder: "280px + 900px + 280px"
shape:
  radius-base: "4px"
  create-radius: "16px"
  detail-card-radius: "12px"
  shadow-base: "0 2px 8px rgba(23, 43, 77, 0.10)"
  shadow-light: "0 2px 12px rgba(0, 0, 0, 0.10)"
---

# WKCRM Design System

## 使用方式

本文件是 GitHub 模板仓库 `yaruiyang/wkcrm-template` 的 WKCRM UI 规范入口。使用者优先依赖 `DESIGN.md` 和 `element-plus-demo/`，在 AI Studio、Codex CLI 或前端二开中生成 WKCRM 风格的 Vue 3 + Element Plus 页面。

典型使用场景：

1. **AI Studio 生成项目**：读取 GitHub 仓库 `https://github.com/yaruiyang/wkcrm-template`，把本文件作为设计约束，把 `element-plus-demo/` 作为 Vue 3 + Element Plus 模板来源。
2. **Codex CLI 生成页面**：让 Codex 先读 `DESIGN.md`，再参考 `element-plus-demo/src/components`、`element-plus-demo/src/mock/schema.js` 和 `element-plus-demo/src/styles/wkcrm.scss`。
3. **二开新模块 UI 约束**：新增业务对象时，按本规范复用列表、新建大弹窗、勾选条、小 dialog、右侧详情滑层和后台配置模板。

使用优先级：

1. 先遵守本文件的布局、组件、尺寸、颜色、交互和反模式。
2. 再参考 `element-plus-demo` 的组件边界、Element Plus 用法、状态切换和 mock schema。
3. 最后根据具体业务字段替换模拟数据，不改变通用 UI 模式。

## 资产定位

本规范不是源码阅读笔记，也不是某个项目目录的使用说明。它是已经提炼完成的 UI 合约，面向无法接触原始工程的使用者。

必须满足：

- 不要求访问任何本地项目路径。
- 不要求理解历史组件名。
- 不要求运行原系统。
- 生成结果应优先接近 WKCRM 的高密度后台产品气质，而不是营销站、门户页或装饰型仪表盘。

设计依据摘要：

- WKCRM 的核心体验由 CRM 业务对象、后台组织治理和信息配置能力组成。
- CRM 业务对象以列表、批量操作、新建/编辑、右侧详情、活动、详细资料、关联数据、附件、操作记录构成闭环。
- 后台管理以员工部门、角色权限、客户管理配置、业务审批流、业务参数、系统日志构成管理底座。
- `element-plus-demo/` 是后续 AI Studio、Codex CLI 和二开生成的唯一实现参考，负责表达真实 Element Plus 组件结构、业务状态和 mock schema。
- Vite 应用入口文件只负责启动 demo，不是视觉规范；对标说明以 Vue 组件、`schema.js` 和 `wkcrm.scss` 为准。

## 产品骨架

WKCRM 的核心 UI 由三类能力组成：

1. **客户管理闭环**：仪表盘、客户列表、勾选批量操作、新建/编辑、右侧详情、活动、详细资料、关联数据、附件、操作记录。
2. **后台组织治理**：员工部门管理、角色权限管理。这是系统组织架构底座，视觉优先级不低于客户管理。
3. **信息配置能力**：自定义字段、业务审批流、规则池列表、自定义打印模板、业务参数、系统日志。它决定后续二开模块如何生成字段、流程、配置列表和审计页面。

生成页面时不要做营销型大首页、装饰性 hero、插画卡片堆叠。这个系统的视觉语言是高密度、低噪声、可长期操作。

## 视觉基础

### 色彩

| 角色 | Token | Hex | 用途 | 状态规则 |
| --- | --- | --- | --- |
| 主色 | `primary` | `#0052CC` | 主按钮、选中、链接、关键操作 | hover 使用 `primary-hover`，禁用时降为 40% 透明或浅灰 |
| 主色 hover | `primary-hover` | `#0065FF` | Hover 与强调链接 | 只用于交互态，不做大面积背景 |
| 主色浅底 | `primary-soft` | `#DEEBFF` | 选中菜单、浅色激活态 | 配合 `primary` 文本，不单独承载正文 |
| 页面底 | `canvas` | `#F4F5F7` | CRM 页面和后台页面主背景 | 页面级背景，白色内容面板放在其上 |
| 详情底 | `detail-canvas` | `#F4F9FC` | 右侧详情滑层背景 | 只用于详情滑层和摘要区域 |
| 表头底 | `table-head` | `#DFE1E6` | CRM 主表格表头 | 与边框 `n40` 同时使用；不要用页面底色替代表头 |
| 遮罩 | `overlay` | `rgba(23,43,77,.50)` | 弹窗遮罩 | 业务对象创建大弹窗和 Dialog 共用 |
| 白色面 | `n0` | `#FFFFFF` | 表格、卡片、弹窗 | 主内容承载面 |
| 浅底 | `n10` / `n20` | `#FAFBFC` / `#F4F5F7` | 新建头部、禁用底、浅色区域 | 禁用底不要低于 `n20` |
| 边框 | `n40` | `#DFE1E6` | 输入框、表格、分割线 | 常规边框；hover 可提升到 `n50` |
| 主文本 | `n800` | `#172B4D` | 标题、正文 | 标题和重要字段 |
| 常规文本 | `n500` | `#42526E` | 表单 label、表格内容 | 大部分可读正文 |
| 次级文本 | `n200` | `#6B778C` | 描述、摘要、辅助信息 | 不用于关键字段值 |
| 成功 | `success` | `#00875A` | 已成交、启用 | Tag 使用浅绿底 + 成功文字 |
| 警告 | `warning` | `#FF991F` | 待处理、提示 | Tag 使用浅黄底 + 警告文字 |
| 危险 | `danger` | `#DE350B` | 删除、锁定、错误 | 删除按钮、错误边框、危险提示 |
| 信息/紫色 | `info` | `#5243AA` | 扩展信息、特殊标识 | 只作为辅助语义色，不大面积铺底 |

### 字体与密度

- 字体：系统中文字体栈，不使用装饰字体。
- 常规字号：14px。
- 页面标题：24px / 700 / 32px，用于客户管理、员工与部门管理等页面标题。
- 区块标题：18px / 700 / 28px，用于后台内容面板和设置区域。
- 创建弹窗标题：20px / 700 / 50px，用于业务对象创建大弹窗 header。
- 字段分组标题：16px / 600 / 24px，左侧配 4px 主色竖条。
- 表格正文：14px / 400 / 22px；主字段链接使用主色和 500 字重，不做大面积加粗。
- 辅助说明：12px / 400 / 18px，颜色使用 `n100` 或 `n200`。
- 数字指标：20px-24px / 700，用于摘要、看板和客户统计。
- 表格、按钮、输入框保持紧凑，常规高度 32px；CRM 主列表表头和数据行使用 32px。
- 字距保持 `0`，不要使用视口宽度缩放字号。

### 间距

间距使用 4px 递进体系：

| Token | 值 | 用途 |
| --- | --- | --- |
| `space-4` | 4px | label 与输入框间距、图标与文字紧贴 |
| `space-8` | 8px | 按钮组、表单字段小间距、表格工具按钮间距 |
| `space-12` | 12px | 表单项内边距、表格单元格水平 padding |
| `space-16` | 16px | 内容面板 padding、区块间距、卡片内边距 |
| `space-20` | 20px | Dialog footer、表单组底部留白 |
| `space-24` | 24px | 页面内容区左右 padding、弹窗 body padding |
| `space-32` | 32px | 大区块上下间距、后台模块间距 |
| `space-40` | 40px | 页面级安全间距、大弹窗上下留白 |

### 圆角与阴影

- 基础圆角：4px。
- 可选圆角：8px，只用于基础元素图库和轻量信息面板，不作为主业务卡片默认值。
- 业务对象创建大弹窗：16px。
- 详情信息块：12px。
- 表格、后台内容面板、小 dialog：4px。
- 基础阴影：`0 2px 8px rgba(23, 43, 77, 0.10)`。
- 弹层阴影：`0 2px 12px rgba(0, 0, 0, 0.10)` 或等价 Element Plus dialog 阴影。

### 密度

- 后台页面优先高密度，避免大面积留白。
- CRM 客户列表主 padding 使用 `20px 20px 0`；后台配置页可使用 `24px 40px`。
- 内容面板 padding 常用 `16px`。
- 按钮、输入框、选择器、日期选择器高度为 32px。
- CRM 主表格表头和数据行高度约 32px。
- 表单 label 与控件间距为 4px，字段组之间为 12px-16px。
- 弹窗 footer 高度不固定，但上下 padding 使用 20px，按钮右对齐。

## 基础元素规范

### Button 按钮

| 类型 | 用途 | 视觉规则 |
| --- | --- | --- |
| `primary` | 保存、新建、查询、发布 | 高 32px，主色背景，白字，hover 使用 `primary-hover` |
| `default` | 取消、返回、普通动作 | 高 32px，浅灰背景或白底，`n40` 边框，`n700` 文字 |
| `text-bg` | 次要工具动作 | 透明或浅底，hover 出现 `n20` 背景 |
| `link` | 表格行内操作 | 无边框，主色文字，不增加按钮背景 |
| `danger` | 删除、锁定、危险动作 | 危险色文字或危险色背景；批量删除要二次确认 |
| `disabled` | 不可操作 | 降低透明度，禁用 hover，不改变布局宽度 |
| `loading` | 提交中 | 保持原按钮宽度，显示加载状态，禁止重复点击 |

按钮规则：

- 同一操作区主按钮最多一个。
- Footer 按钮从左到右按视觉权重递减时，主按钮放在最左或最靠近主要动作的位置；业务弹窗 footer 通常右对齐。
- 表格行内操作优先用 `link`，不要塞入实心按钮。

### Form 表单

表单默认使用顶部 label，高度紧凑。

| 元素 | 高度/尺寸 | 状态规则 |
| --- | --- | --- |
| `input` | 32px | hover 边框加深，focus 使用主色边框 |
| `textarea` | 64px 起 | 多行字段可拉高，不影响其他行布局 |
| `select` | 32px | 占位文字用 `n100` |
| `date` / `datetime` | 32px | 与 input 一致 |
| `checkbox` | 14px | 用于表格选择、批量项、权限项 |
| `radio` | 14px | 单选组横向排列，间距 20px |
| `switch` | 36px x 20px | 启用/停用状态，主色表示启用 |
| `required` | `*` | 必填星号使用危险色，放在 label 前 |
| `error` | 文字 12px | 控件边框危险色，错误说明在控件下方 |
| `disabled` | 32px | 浅灰底、次级文字，不可聚焦 |

表单布局规则：

- 普通业务表单两列或一列；复杂字段可独占整行。
- label 与控件间距 4px。
- 字段组内横向间距 16px。
- 不要把字段卡片化；字段本身保持表单密度。

### Table 表格

表格是 WKCRM 的主要信息承载方式。

- CRM 主列表表头：高约 32px，`table-head` 背景，`#787D97` 文字，字重 500，底部和右侧使用 `n40` 边框。
- CRM 主列表行高：约 32px；关联表、后台表格可按内容提高密度，但不要做成稀疏卡片。
- 单元格水平 padding：`0 8px`；selection 列宽 40px，checkbox cell 左侧 padding 为 12px。
- 主字段：主色文字，500 字重，点击打开详情；普通数据单元格保持 400。
- Hover：行背景变为 `#FAFBFC`。
- 选中：checkbox 选中后触发 selection bar，行本身可使用浅蓝或浅灰底。
- 空状态：表格区域居中显示简洁空状态，提供主要行动按钮。
- 分页：表格容器底部右侧，页码输入和每页条数选择保持 32px 高；不要做成贴视口底部的 fixed 区。

### Tag / Status 标签

| 状态 | 用途 | 样式 |
| --- | --- | --- |
| 普通 | 未成交、普通状态 | 浅灰底，`n500` 文字 |
| 成功 | 已成交、启用、通过 | 浅绿底，`success` 文字 |
| 警告 | 待审批、待跟进 | 浅黄底，`warning` 文字 |
| 危险 | 删除、停用、拒绝 | 浅红底，`danger` 文字 |

Tag 高度 22px-24px，圆角 4px，文字 12px，不要做大胶囊。

### Tabs / Pagination

Tabs：

- 顶部 tabs 用于后台内容区切换，文字 14px-15px。
- 激活态使用主色文字 + 2px 底部线。
- 详情左侧 tabs 使用纵向小块，激活态深灰底白字。

Pagination：

- 高度 32px。
- 放在表格底部右侧。
- 包含每页条数、总数、页码输入或页码按钮。
- 不要把分页做成大卡片。

### Feedback 反馈

空状态：

- 用于表格无数据、关联数据为空、搜索无结果。
- 文案简短，最多一行主文案 + 一个行动按钮。
- 不使用大插画。

加载：

- 表格加载使用局部 loading，不遮住整个应用。
- 按钮 loading 保持原宽度。
- 大弹窗提交中只禁用 footer 操作，不改变表单布局。

错误：

- 表单错误贴近字段。
- 页面错误放在内容面板顶部。
- 删除、转移、放入公海等高风险动作使用确认提示。

### Dialog 基础层

Dialog 只定义基础弹层结构，业务大弹窗、小 dialog、详情滑层的完整模式在后续组件阶段细化。

基础结构：

```text
overlay
  dialog
    header: title + close
    body
    footer: primary action + cancel
```

基础规则：

- 遮罩使用 `overlay`。
- Header 高度 50px-54px。
- Body padding 20px-24px。
- Footer 右对齐，按钮间距 8px。
- 关闭按钮位于右上角。
- Dialog 关闭不应导致底层页面布局跳动。

## 通用组件模式

### 应用外壳

CRM 外壳：

- 顶部导航高度约 56px，深 navy 背景。
- 顶部横向模块包含：仪表盘、日历、线索、客户、联系人、商机、报价单、合同、回款、发票、回访、产品等。
- 左侧为 CRM 子模块菜单，当前模块使用主色浅底和主色文字。
- 主内容区由页面自身控制间距，常用 `24px 40px 0`。
- 顶部右侧可放快捷新建、消息、帮助、设置、用户头像等工具入口。
- 禁止把 CRM 外壳做成营销站导航；它必须服务高频模块切换和工作台操作。

后台外壳：

- 后台从顶部右侧系统设置齿轮进入；齿轮位于头像左侧，顶部主导航不新增“后台管理”菜单项。
- 后台外壳继续使用 56px 深蓝顶部导航；进入后台后左侧仍保留 WKCRM 导航头结构：品牌、应用入口和通用模块 tabs，默认显示 `客户 / 联系人 / 商机 / 合同 / 产品 / 更多`，`客户` 为 active，不新增“后台管理”菜单项。
- 后台态顶部右侧只保留核心工具：系统消息、系统设置齿轮、头像；不要再出现 `AI/购/色/办/铃/?` 这类文字按钮。
- 后台模板菜单使用后台路由语义，但只展示模板需要的内容：员工与部门管理、角色权限管理、客户管理、系统日志；客户管理默认展开，二级菜单为自定义字段设置、业务审批流、线索池规则设置、客户公海规则设置、自定义打印模板、业务参数设置。
- 后台页面内部常用 240px 本地左栏 + 右侧白色内容面板。
- 后台页面主 padding 使用 `20px`。
- 禁止把后台配置页做成单列营销表单；后台配置优先双栏、三栏或高密度表格。

### 页面头部

使用场景：所有业务列表页、后台配置页和字段设计器顶部。

结构：

```text
页面头部
  左侧：页面标题 + 帮助图标/说明
  右侧：主按钮 + 辅助按钮 + 更多操作
```

尺寸与状态：

- 高度根据内容控制，常规占 40px-48px。
- 页面标题使用 24px / 700。
- 主按钮使用 primary，常见文案为“新建客户”“添加员工”“新建审批流程”。
- 辅助按钮使用 default 或 text-bg，例如“查重”“导出”“更多操作”。
- 更多操作超过 3 项时使用下拉，不把所有动作平铺到头部。

禁止事项：

- 不要在页面头部放大段说明文案。
- 不要使用 hero 式大标题和装饰背景。
- 不要把危险动作作为头部唯一 primary。

### 表格工具条

使用场景：CRM 列表、员工表格、日志查询、审批流列表等高频列表。

结构：

```text
表格工具条
  左侧：搜索框 + 场景 tabs
  右侧：展开筛选 + 高级筛选 + 视图切换 + 设置
```

尺寸与状态：

- 工具条高度常用 48px。
- 搜索框高度 32px，宽度约 240px-300px。
- 场景 tabs 激活态使用深色底或主色底，保持紧凑。
- 筛选按钮使用 default/text-bg，图标可辅助但不替代必要文本。
- 高级筛选打开后不改变表格列宽；筛选条件区域应独立展开。

禁止事项：

- 不要把筛选条件全部塞进页面头部。
- 不要让工具条换行导致表格顶部跳动；空间不足时让右侧工具收纳。
- 不要省略搜索和高级筛选入口。

### 业务表格

使用场景：CRM 对象列表、员工列表、审批流、日志、关联数据表。

结构：

```text
业务表格
  selection 列
  主字段列
  业务字段列
  状态/负责人/时间列
  行内操作列
  分页
```

尺寸与状态：

- CRM 主列表表头和数据行高约 32px；后台表格和关联表可按内容使用 40px 左右。
- selection 列宽约 44px-54px。
- 主字段列宽通常 180px-240px，使用主色链接样式。
- 状态列用 Tag，不用大按钮。
- Hover 行使用浅底；勾选行可使用浅蓝底。
- 分页在表格底部右侧，控件高 32px。

禁止事项：

- 不要把表格行做成卡片列表。
- 不要把行内操作做成多个实心按钮。
- 不要省略 selection 列后又声称支持批量操作。

### 列表勾选操作条

这是列表勾选后的标准批量操作状态，不是 dialog：

- 高度：48px。
- 背景：`#42526E`。
- 圆角：顶部左右 4px。
- 文案：`已选中 {n} 项`，左侧可有全选 checkbox 和关闭/清空按钮。
- 操作按钮：白色文字，hover 变浅底深字。
- 操作过多时横向滚动。
- 显示位置应贴近表格头部，替代表格工具条或位于工具条下方。
- 清空选择后恢复普通表格工具条。

客户列表常见操作：

```js
export const customerSelectionActions = [
  '发送邮件',
  '发送短信',
  '转移',
  '放入公海',
  '更改成交状态',
  '导出选中',
  '删除',
  '锁定',
  '解锁',
  '添加团队成员',
  '移除团队成员',
  '批量编辑',
  '跨组织共享',
  '批量打印'
]
```

禁止事项：

- 不要用普通 toast 或小弹窗替代 selection bar。
- 不要只显示 checkbox 而不提供批量操作区。
- 不要让批量操作换行撑高到两行以上；操作过多时横向滚动。

### 业务对象创建大弹窗

客户、联系人、商机、合同等字段较多的业务对象，新建/编辑必须使用居中大弹层，不使用 Element Plus `el-dialog`，也不使用右侧抽屉。小 dialog 只服务转移、放入公海、成交状态等轻量操作。

结构：

```text
全屏遮罩
  居中创建卡片                 width 900px, height calc(100vh - 80px), radius 16px
    弹窗头部                   height 50px, padding 0 24px, bg #F4F5F7
    滚动内容区                 flex 1, padding 0 24px, overflow-y auto
    底部操作区                 padding 20px 24px, text-align right
```

视觉规则：

- 大记录创建宽度使用 900px。
- 页面上下留 40px 安全间距。
- Header 标题 20px bold；右侧关闭图标 24px。
- Header 背景 `#F4F5F7`。
- 内容区按字段分组，分组标题左侧 4px 蓝色竖条，标题 16px/600。
- 表单使用顶部 label。
- 字段按后台字段配置生成，字段项默认两列 `50%`，字段项内边距 `12px 12px 0`，输入/select 高度 `32px`。
- 地址、富文本、明细表格、折叠控制等复杂字段占整行。
- 客户名称字段右上可出现“工商信息”入口。
- 字段过多时使用“展开/收起”控制；默认展示核心字段，展开后显示补充字段。
- Footer 右侧按钮顺序：`保存`、可选 `保存并新建联系人`、`取消`。
- Body 滚动时 header 和 footer 保持稳定。
- 提交中只禁用 footer 操作，不改变表单布局。

禁止事项：

- 不要把业务对象创建画成 500px 小表单 dialog。
- 不要用 `el-dialog` 直接实现业务对象新建/编辑大弹层。
- 不要把业务对象创建做成右侧详情滑层。
- 不要把字段分组做成多个漂浮卡片。

### 小 dialog

小 dialog 只用于单一批量操作或轻量配置。不要和业务对象创建大弹窗混用。

典型宽度：

- 转移：500px。
- 客户成交状态：400px。
- 放入公海：450px。
- 字段授权：700px。
- 部门新增/编辑：500px。

结构规则：

- 标题明确，如“转移”“客户成交状态”“放入公海”。
- 表单使用顶部 label。
- Body 紧凑，不出现大面积字段分组和长滚动创建表单。
- Footer 右侧：`保存/确定` primary + `取消`。
- Header 高度约 50px-54px。
- Body padding 使用 20px。
- Footer 高度约 56px，按钮间距 8px。
- 单一任务字段超过 6 个时，应重新评估是否应该使用创建大弹窗或配置页。

禁止事项：

- 不要在小 dialog 内放复杂字段设计器。
- 不要在小 dialog 内嵌套业务详情。
- 不要把小 dialog 宽度随意拉到 900px。

### 右侧详情滑层

CRM 详情不是普通全页跳转，而是从右侧滑出的详情层：

- 固定在视口右侧，top/bottom 为 0。
- 宽度公式使用 `100vw - 210px - 160px`，并受最小宽度约束。
- 最小宽度 950px。
- 背景使用 `#F4F9FC`。
- 左侧关闭按钮使用 primary 外凸形态，位置为 `top:160px; left:-40px; padding:19px 6px`，图标为 Close。
- 内部由左侧 WMD tabs、中间内容区、右侧摘要区和右侧控制条组成。
- 左侧 tabs 是 41px 外层行 + 25px 菜单块，激活态深灰底白字，8px 圆点必须与纵向竖线对齐。
- 中间内容区承载活动、详细资料、关联数据、附件、操作记录。
- 右侧摘要区宽度约 330px-340px，使用 48px header 和 16px body padding 展示统计信息。
- 行点击打开详情滑层；返回列表时保留列表上下文。

禁止事项：

- 不要把 CRM 详情做成普通全页跳转。
- 不要移除活动、详细资料、附件、操作记录这些基础 tabs。
- 不要把右侧摘要做成大面积营销卡片。

详情 tabs 常见项：

```js
export const customerDetailTabs = [
  '活动',
  '详细资料',
  '360视图',
  '拜访计划',
  '工商信息',
  '客户关系',
  '联系人',
  '团队成员',
  '商机',
  '报价单',
  '合同',
  '产品',
  '任务',
  '回款',
  '回访',
  '发票',
  '客户地址',
  '费用',
  '金额比例设置',
  '附件',
  '操作记录',
  '打印记录',
  '呼叫记录',
  '音视频助手'
]
```

### 后台双栏布局

使用场景：员工部门、角色权限、业务参数、配置列表等后台管理页面。

结构：

```text
后台页面
  页面头部
  主区域
    左侧本地导航/树/列表       width 240px
    右侧内容面板               white surface, radius 4px, padding 16px
```

尺寸与状态：

- 页面 padding 使用 `24px 40px`。
- 左侧本地导航宽 240px，背景为浅灰或白色树面板。
- 右侧内容面板白底、4px 圆角、基础阴影。
- 左侧选中项使用主色浅底 + 主色文字。
- 右侧内容可使用 tabs、表格、权限树、字段授权按钮。

禁止事项：

- 不要把员工部门和角色权限压缩成单表格。
- 不要把左侧组织树移到顶部横向 tabs。
- 不要把后台配置页做成低密度大卡片陈列。

## CRM 业务对象模板

客户是 CRM 业务对象模板的代表模块。后续生成线索、联系人、商机、合同、回款、发票等模块时，优先复用这一套页面结构、交互密度和弹层规则，只替换模块名称、字段和关联对象。

CRM 生成的主参考是 `element-plus-demo/`。真正约束生成质量的是 Vue 3 + 官方 Element Plus 的组件结构、WKCRM 覆盖样式、mock schema 和交互状态。验收目标是尽量接近 WKCRM 的结构、密度、状态和观感，但不承诺像素级完美复刻。

独立 Element Plus 模板必须遵守：

- 使用官方 Element Plus，不要求特殊定制分支。
- 通过 `wkcrm.scss` 之类的本地覆盖样式实现 WKCRM 色彩、密度、表格、弹层、详情滑层和只读字段框。
- 自定义组件命名面向通用 CRM，例如 `CrmCustomerList`、`CrmCustomerDetail`、`CrmCreateDialog`，不要求使用者理解历史工程组件名。
- 所有 mock 数据和字段模型必须独立维护，便于 AI Studio 直接替换模块名和字段生成新业务对象。
- 生成代码时优先参考 demo 的 Element Plus 组件组合和状态逻辑；不要另起一套静态结构。
- demo 内部通过统一尺寸、颜色、选择器和验收规则约束实现；生成或二开时不要绕过这些规则重新手写尺寸、状态和交互。

### CRMObjectTemplate 生成契约

`element-plus-demo` 的 CRM 页面由 `CRMObjectTemplate` 驱动。客户是最高保真样板，线索、联系人、商机、合同等对象复用同一套 UI 结构和交互密度，只替换对象配置。

每个对象模板必须包含：

```js
{
  type: 'business',
  moduleName: '商机',
  title: '商机管理',
  mainField: 'businessName',
  idField: 'businessId',
  searchPlaceholder: '商机名称/客户名称',
  sceneList: [],
  fieldList: [],
  rows: [],
  stageFlow: {},
  cardRows: [],
  createFieldGroups: [],
  detailTabs: [],
  detailData: {},
  operations: []
}
```

生成规则：

- `title` 控制页面标题；主按钮文案始终为 `新建{moduleName}`。
- `mainField` 控制列表主链接、阶段卡片标题、卡片视图标题和详情标题。
- `fieldList` 控制业务表格列；固定列仍由模板组件提供，不写进业务字段列。
- `createFieldGroups` 控制新建/编辑大弹窗字段；字段项继续使用 `stylePercent`、`formType`、`isNull`、`collapseOnly`。
- `detailTabs` 和 `detailData` 控制右侧详情滑层；首版保留活动、详细资料、联系人、附件、操作记录五个核心 tabs。
- 对象切换不改变表格 32px 密度、selection bar 48px、新建大弹窗 900px、详情滑层宽度公式和右侧摘要规则。

对象复用边界：

- 客户默认作为主验收对象。
- 商机、联系人、线索、合同可作为最小生成示例，不要求在首版重复复刻每个模块的全部专属业务逻辑。
- 联系人表格作为关联数据列表代表；商机、合同、报价单、回款等关联表复用同一模式，不在核心模板中重复铺开。

Element Plus demo 是“真实产品结构翻译”，不是“截图临摹”：

- 新增或修改核心 UI 前，必须先确认本文件和 demo 中对应的组件契约：入口、子组件、样式 token、运行态计算和必测样式。
- 列表页必须按 `app-container -> 页面头 -> crm-container -> 筛选头 -> selection bar -> 主表格外壳 -> 分页` 的边界拆分。
- 表格必须使用 Element Plus `el-table`，通过固定列、行高、表头、cell padding 和 selection 状态覆盖形成 WKCRM 密度；不要用普通 div 网格替代表格。
- 详情页必须使用右侧滑层 + 左侧 `el-tabs tab-position="left"` 轨道 + `wmd-main / wmd-body / wmd-right / wmd-controls` 的结构；不要做成普通三栏页面。
- 详情头卡片和客户阶段卡片必须是兄弟块：详情头使用 `.wmd-header` 卡片；客户阶段使用独立 `relative-stage-records` 卡片，不要把阶段条塞进详情头卡片内部。
- 详情左侧菜单的圆点和竖线必须在同一个 tabs 坐标系中对齐，圆点是菜单项状态的一部分，不是漂浮装饰。
- 客户阶段必须使用两行结构：第一行标题和推进按钮，第二行 22px 高的横向阶段条。当前阶段、已完成、未完成状态用类名控制；不要用普通 pill、进度条、宽扁分段条或纵向阶段列表替代。
- 详细资料必须使用分组表单只读态：分组头、两列字段、label top、32px 灰色 `value-box`。不要用大字段卡片或营销式信息卡替代。
- mock schema 必须包含 `sceneList`、`fieldList`、`operations`、`tableStyleObj`、`detailTabs`、`abstractList`、`baseInfoGroups`、联系人、附件、操作记录等结构字段。
- demo 的关键尺寸、颜色、选择器和字体权重应集中维护，运行态计算优先复用契约函数；不要在组件里散落 `206`、`320`、`32`、`48` 等关键尺寸魔法值。

列表和详情 demo 的验收优先看尺寸、状态和交互契约，而不是另起一套静态实现：

- 每轮完成后至少运行 demo 构建和契约静态检查；涉及实际 DOM 的列表、详情、弹框变更需要再运行浏览器 computed style 检查。
- 顶部导航固定 56px，左侧 CRM 菜单固定 210px，菜单行高 40px，菜单项左右 12px 内边距，激活态使用 `#d4e4f9` 浅蓝底和主蓝文字。
- 客户列表主内容保持 `20px 20px 0`，不要在窄屏媒体查询里改成更大的左右 padding。
- 搜索框宽度 220px；场景 tabs 与“显示:”同排；右侧筛选按钮、视图切换按钮保持 32px 密度，视图切换内部 item 为 24px。
- 表格必须使用 Element Plus `el-table border`，固定列宽 40px，固定列顺序为 selection、电话呼叫、星标、主字段；电话和星标使用 Element Plus 图标按钮，不用文本字符占位；主字段内的关联商机提示使用业务图标语义，不要用 `¥`、圆点或普通文本替代。
- 表格表头和数据行高保持 32px，表头 padding 约 `4px 0`，cell padding 为 `0 8px`，表头背景 `#DFE1E6`，右边线和底边线形成细网格；表头字重 500，正文单元格字重 400，主字段链接字重 500；空字段也保留空单元格。
- 客户列表表格区使用定高，不随数据内容自然变高；高度按 `window.innerHeight - 筛选头实际高度 - 206` 计算，最小高度 320px。
- 勾选态下 `selection bar` 高度 48px、背景 `#42526E`，并让普通表头隐藏，不要同时展示两套表头；selection bar 接管表头状态后必须重新测量筛选头实际高度并重算表格高度，避免分页底部位置跳动；左侧布局按 `checkbox + 已选数量 + icon-only 清空按钮 + 横向操作区` 组织，checkbox 左右间距 20px，已选数量不额外加粗，操作按钮使用自然宽度；demo 默认只展示一个核心批量动作，例如“放入公海”。
- “放入公海”小 dialog 使用 WKCRM 等价结构：`el-dialog width="450px"`，不加自定义 dialog class，不手调 header/body/footer；标题通过 header slot 放 `el-dialog__title + wk-icon-fill-help`，表单为 `el-form label-position="top"`，字段为“公海”和“放入公海理由”，footer 为“保存 / 取消”。
- 详情滑层宽度公式保持 `100vw - 左侧菜单宽度 - 160px`，最小宽度 950px；不要再用媒体查询改成 `100vw - 230px` 或缩窄右侧摘要。
- 关闭按钮保持 WKCRM 外凸形态：primary、`top:160px; left:-40px; padding:19px 6px`、Close 图标，不要做成返回箭头或大色块。
- WMD 布局必须保持 `wmd-tabs / container-wrapper / wmd-content / wmd-main / wmd-body / wmd-right / wmd-controls`；`wmd-main` 可以收缩，右侧摘要保持 330px-340px。
- 左侧详情菜单外层 tab 行提供纵向间距，菜单块自身高 25px；8px 圆点与竖线的 x 坐标偏差不超过 2px。
- 右侧摘要采用 `WkHeadSection` 风格，48px header、16px body padding、条目 16px 间距，摘要值保持 14px-16px 正文字号。
- 右侧摘要控制条需要表达展开/收起、锁定、拖动把手的视觉结构；首版 demo 只需要实现展开/收起，拖动和持久化属于高级可选能力。

### 高保真列表视觉解剖

客户列表是 CRM 业务对象列表的主样板：

- 顶部为 56px 深蓝导航，客户模块激活态使用底部 3px 主蓝线。
- 左侧 CRM 菜单宽约 210px，白底；模板只保留当前业务对象的核心入口，客户模块只展示“客户”，激活项为浅蓝底 + 主蓝文字，菜单项高度约 40px。
- 主内容区使用浅灰页面底，客户列表页面密度为 `20px 20px 0`。
- 页面标题区高度约 48px，标题为 24px 粗体，右侧主按钮为 32px。
- 搜索框宽约 220px，高 32px；场景 tabs 与“显示:”文案同排，按钮为 text bg 风格。
- 展开筛选、高级筛选、视图切换位于右侧，按钮高度 32px，图标按钮保持 32px 正方形。
- 表格是核心，不要用卡片列表替代表格。表头为浅灰底，表头和数据行高 32px，列之间保留细边框；除页面标题、表头、主字段链接和必要状态外，正文不要加粗。
- 默认表格视图需要保留固定列：selection、电话呼叫、星标、主字段；关联商机提示放在主字段单元格内，主字段为主蓝链接。
- 空字段也必须保留网格占位，形成真实 CRM 数据稀疏感，不要把空字段压缩掉。
- 当前行或选中行使用浅蓝底；分页位于固定高度表格外壳下方，保留 15条/页、总数、页码和跳转，不要做成 fixed bottom，也不要让表格随内容高度慢慢撑开。
- 勾选后 selection bar 紧贴表格上方，48px 高，深灰蓝背景，左侧 checkbox + 已选数量 + icon-only 清空按钮，中间横向批量操作。勾选 1 条但未全选时，左侧 checkbox 使用半选减号状态；全选态 checkbox 背景与 selection bar 同色；勾选态下普通表头隐藏，由 selection bar 接管表格顶部；选中和未选中两种状态下分页底部位置应保持稳定。
- 列表支持三视图切换：表格视图、阶段视图、卡片视图。三者必须在同一列表区域切换展示，不要同时铺开；切换后列表区域高度仍由同一套表格高度契约控制，不允许塌陷或按内容自然撑高。
- 阶段视图使用横向阶段列，阶段头约 40px 高、主蓝底、箭头切口；每列最小宽度约 230px，列内客户卡片为白底小卡片。
- 卡片视图使用 318px x 137px 客户卡片，包含头像块、客户名、来源、成交状态、级别、负责人、手机、最后跟进时间。

### 高保真详情视觉解剖

客户详情不是普通三栏后台页面，而是列表上下文上的右侧覆盖滑层：

- 左侧仍能看到客户列表背景，详情滑层从右侧覆盖，左边缘有蓝色关闭把手。
- 滑层背景为浅蓝灰，宽度按 `100vw - 左侧菜单宽度 - 160px` 计算，最小宽度 950px；内容由左侧 tab 轨道、中间滚动内容、右侧 330px-340px 客户摘要组成。
- 左侧 tab 轨道不是普通 sidebar，而是沿纵向排列的 25px 高小块，激活项深灰蓝底白字。圆点必须绑定到每个菜单项，8px 圆点中心与纵向竖线对齐，不能手工漂浮。
- 关闭把手是 primary 小按钮，位于滑层左侧外凸位置，`top:160px; left:-40px; padding:19px 6px`，图标为关闭，不是返回箭头。
- Header 是白色 12px 圆角卡片，包含客户类型、客户名称、星标、成交状态、上一条/下一条、编辑、更多、基础字段和右下角快捷新建入口。
- 客户阶段是独立白色卡片，不放进 Header 内部；阶段条约 22px 高，使用当前阶段蓝底白字、后续阶段浅灰底深色字，并通过左右箭头块衔接，不用普通梯形条替代。
- 日程/跟进/任务/发邮件是活动输入区的一组顶部 tabs，下方为输入框，不要简化成普通说明文本。
- 待处理及逾期是独立白色卡片，空状态居中，并提供“创建日程”“创建任务”入口。
- 活动流是独立白色卡片，包含筛选 pills、时间线、图标节点、人员、业务对象编号和状态 tag。
- 详情左侧菜单在模板中精简为核心 5 项：活动、详细资料、联系人、附件、操作记录。
- 详情内容必须与左侧菜单一一对应：点击“活动”只展示活动布局；点击“详细资料”只展示详细资料布局；点击“联系人”展示关联表格；点击“附件”展示附件表格；点击“操作记录”展示记录时间线。
- 详细资料不是大字段卡片，而是分组详情：48px 分组头 + 两列字段；字段 label 在上，value 为 32px 左右的灰色只读输入框，背景 `#ebecf0`、边框 `#dfe1e6`、圆角 3px。
- 联系人作为关联数据列表代表；联系人、商机、合同等重复表格模式不需要在同一模板中全部展开。
- 右侧客户摘要为白色卡片，标题区 48px，body padding 16px；条目纵向排列，条目间距 16px，值使用普通 14px-16px 正文字号，不做大号 KPI 指标卡。

### 仪表盘

CRM 仪表盘是业务对象列表前的经营入口。当前 `element-plus-demo/` 以客户列表为核心模板；后续生成仪表盘时必须遵守以下结构：

- 指标区：新增客户、新增商机、预计成交金额、今日需跟进、逾期跟进。
- 漏斗区：商机阶段漏斗，展示阶段名称、数量、金额和转化率。
- 趋势区：按日/周/月切换业绩趋势，默认展示最近 30 天。
- 待办区：待跟进、即将过期、未联系客户，使用密集列表而不是大卡片。
- 排行区：员工排行、客户来源、行业分布，支持表格或紧凑柱状图。

仪表盘可以用卡片，但卡片应服务于数据扫描，不做装饰性大图。

### 业务对象列表

列表模板用于客户、线索、联系人、商机、合同等高频业务对象。客户列表是标准样板，必须保留 CRM 左侧菜单和列表上下文；本模板的客户模块左侧菜单只保留“客户”入口，不展开时间轴、公海、会话、外勤等重复或非核心菜单。

标准结构：

1. 页面头部：标题、帮助图标、右侧主按钮和辅助操作。
2. 表格工具条：搜索、场景 tabs、展开筛选、高级筛选、视图切换。
3. 业务表格：selection、关注星标、主字段、业务字段列、分页。
4. 勾选后显示 48px 深灰 selection bar。
5. 行点击打开右侧详情滑层。
6. 新建按钮打开业务对象创建大弹窗。

列表生成规则：

- 页面标题使用“{模块名}管理”，例如“客户管理”。
- 主按钮使用“新建{模块名}”，例如“新建客户”。
- 搜索框 placeholder 使用“{模块名}名称/手机/电话”或该模块最常见的 2-3 个检索字段。
- 场景 tabs 至少包含“全部客户”“我负责的客户”“下属负责的客户”“我关注的客户”。
- 展开筛选用于常用字段，高级筛选用于复杂条件组合。
- 视图切换包含表格、阶段、卡片三种核心状态，默认激活表格。
- 表格第一列是 checkbox，后续固定列依次表达业务提示、电话呼叫、关注星标和主字段链接。
- 主字段点击打开右侧详情滑层，不跳普通全页。
- 分页位于表格外壳底部，默认每页 15 条；表格区使用视口公式定高，不使用 fixed bottom，也不按内容自然撑高。

客户列表代表性字段：

```js
export const customerListFields = [
  { prop: 'customerName', label: '客户名称', width: 220, formType: 'text', fixed: true },
  { prop: 'telephone', label: '电话', width: 140, formType: 'text' },
  { prop: 'source', label: '客户来源', width: 120, formType: 'select' },
  { prop: 'mobile', label: '手机', width: 140, formType: 'mobile' },
  { prop: 'email', label: '邮箱', width: 180, formType: 'email' },
  { prop: 'website', label: '网址', width: 180, formType: 'website' },
  { prop: 'industry', label: '客户行业', width: 140, formType: 'select' },
  { prop: 'level', label: '客户级别', width: 110, formType: 'select' },
  { prop: 'nextTime', label: '下次联系时间', width: 160, formType: 'datetime' },
  { prop: 'ownerUserName', label: '负责人', width: 120, formType: 'user' },
  { prop: 'dealStatus', label: '成交状态', width: 110, formType: 'select' },
  { prop: 'updateTime', label: '更新时间', width: 160, formType: 'datetime' }
]
```

客户列表模拟数据：

```js
export const customerRows = [
  {
    customerId: 'C-304-001',
    customerName: '合同客户',
    mobile: '',
    telephone: '',
    source: '',
    industry: '',
    level: '',
    dealStatus: 1,
    nextTime: '',
    ownerUserName: 'admin',
    updateTime: '2026-05-20 14:29:19',
    createTime: '2025-07-10 14:12:35',
    lastRecord: '123',
    star: 0,
    status: 1
  },
  {
    customerId: 'C-304-002',
    customerName: '小小亮',
    mobile: '155****5545',
    telephone: '166****4542',
    source: '',
    industry: '',
    level: '',
    dealStatus: 0,
    nextTime: '2026-04-20 12:56:56',
    ownerUserName: 'admin',
    updateTime: '2026-04-20 09:57:02',
    lastRecord: '联系人0001',
    star: 1,
    status: 1
  },
  {
    customerId: 'C-304-003',
    customerName: '东莞临熵精密科技有限公司',
    mobile: '',
    telephone: '',
    source: '',
    industry: '智能制造',
    level: 'A',
    dealStatus: 0,
    address: '广东省东莞市东城街道堑头路96号3036室',
    ownerUserName: 'admin',
    updateTime: '2026-03-09 15:41:26',
    star: 0,
    status: 1
  }
]
```

勾选操作条规则：

- 勾选 1 条或多条记录后，列表顶部必须出现 48px 深色 selection bar。
- 左侧显示已选数量，中间横向排列批量操作，右侧提供清空选择。
- 客户列表常见操作：发送邮件、发送短信、转移、放入公海、更改成交状态、导出选中、删除、锁定、解锁、添加团队成员、移除团队成员、批量编辑、批量打印。
- 批量操作数量较多时横向滚动，不换成多行按钮区。

### 业务对象新建/编辑

字段多于 3 个、会保存业务对象、存在自定义字段时，使用业务对象创建大弹窗。该弹层是自定义 fixed 遮罩卡片，不是 Element Plus `el-dialog`：

- 宽 900px。
- 50px 浅灰 header。
- 内容区滚动。
- Footer 固定在底部区域。
- 字段分组显示，分组标题左侧有蓝色竖条。
- 表单字段由字段 schema 生成，字段项按 `stylePercent` 控宽。
- 客户名称字段右上可出现“工商信息”入口。
- 表单 label 在上方；字段多时按两列排布，地址、富文本、折叠控制等复杂字段占整行。
- 默认核心字段后可放“展开/收起”，用于控制后续补充字段。
- Footer 右侧按钮顺序：`保存`、可选 `保存并新建联系人`、`取消`。
- 创建大弹窗只用于新建/编辑业务对象，不用于转移、成交状态、放入公海等轻操作。

客户新建代表性字段：

```js
export const customerCreateFields = [
  { field: 'customerName', name: '客户名称', formType: 'text', required: true, placeholder: '请输入客户名称' },
  { field: 'mapAddress', name: '地址', formType: 'map_address', required: false },
  { field: 'optionsType', name: '通用选项集', formType: 'data_dictionary', required: false, placeholder: '请选择' },
  { field: 'richText', name: '富文本', formType: 'rich_text_format', required: false },
  { field: 'source', name: '客户来源', formType: 'select', required: false },
  { field: 'ownerUserId', name: '负责人', formType: 'user', required: true },
  { field: 'mobile', name: '手机', formType: 'mobile', required: false },
  { field: 'telephone', name: '电话', formType: 'text', required: false },
  { field: 'email', name: '邮箱', formType: 'email', required: false },
  { field: 'website', name: '网址', formType: 'website', required: false },
  { field: 'industry', name: '客户行业', formType: 'select', required: false },
  { field: 'level', name: '客户级别', formType: 'select', required: false }
]
```

### 批量轻操作小 dialog

小 dialog 只用于单一轻量任务，不能替代业务对象创建大弹窗。

| 场景 | 宽度 | 内容规则 |
| --- | --- | --- |
| 转移 | 500px | 必填新负责人，可选是否移出原负责人、是否转移团队成员 |
| 成交状态 | 400px | 单选成交/未成交，必要时补充成交时间 |
| 放入公海 | 450px | 继承 Element Plus 默认 dialog 样式；两个 `el-select`：公海、放入公海理由；默认公海可预选第一项，理由默认为空 |

小 dialog 结构：

- Header 标题明确为“转移”“成交状态”“放入公海”；放入公海不加自定义 header 分割线，也不额外放大标题字号，继承 Element Plus 默认 dialog 标题。
- Body 只放完成任务所需字段，不放复杂字段设计器。
- 字段少时一行一个字段；字段多时一行两个字段；所有字段 label 在上方。
- `label-position="top"` 表单遵循 WKCRM 小 dialog 结构；放入公海只额外保留 scoped 规则 `.el-form-item { margin-bottom: 10px; }`，不要为截图观感重写输入框高度和 dialog padding。
- Footer 右侧放 `保存`、`取消`。
- 操作成功后回到列表，并保留当前筛选和分页上下文。

### 业务对象详情

详情默认用右侧详情滑层：

- Header 显示业务对象类型、名称、状态、上一条/下一条、编辑、更多。
- 基础摘要显示客户级别、负责人、手机、首要联系人等。
- 快捷创建区默认只展示右下角 `+ 新建` 主入口，不用整排按钮撑开详情头。
- 中间内容区根据左侧菜单切换展示活动、详细资料、联系人、附件、操作记录。
- 右侧摘要展示跟进次数、未跟进时长、商机数量、商机总额、成交次数、成交总额、回款总额、未回款总额、开票总额。

详情布局规则：

- 背景保留原列表，详情从右侧滑出，不进入普通全页。
- 滑层顶部包含关闭按钮、上一条、下一条、编辑、更多操作。
- 左侧纵向 tabs 默认激活“活动”。
- 中间内容区根据 tabs 切换，每次只展示当前 tab 的内容，不要把所有 tab 内容堆叠成一个长页面。
- 关联数据以联系人表格作为代表；商机、合同、报价单、回款等可复用同一表格模式，不在核心模板中重复展开。
- 右侧摘要区固定展示关键统计，便于客户沟通时快速说明 CRM 关系数据；摘要值保持 14px-16px 正文字号，不做大号 KPI。
- 关闭详情后回到原列表状态，不清空筛选、勾选和分页。

详情 tabs 代表项：

```js
export const customerDetailTabs = [
  '活动',
  '详细资料',
  '联系人',
  '附件',
  '操作记录'
]
```

详情模拟数据：

```js
export const customerDetailMock = {
  customerId: 'C-304-002',
  customerName: '小小亮',
  dealStatus: 0,
  ownerUserName: 'admin',
  mobile: '15566655545',
  contactsName: '联系人0001',
  stage: '初步沟通',
  digest: {
    activityCount: 1,
    notFollowUpDay: 42,
    businessCount: 0,
    businessMoney: 0,
    contractCount: 0,
    contractMoney: 0,
    receivablesMoney: 0,
    receivablesUnreceivedMoney: 0,
    invoiceMoney: 0
  },
  activities: [
    {
      type: '客户跟进记录',
      user: 'xiaoxu',
      content: '联系人0001 明细表格 单行文本 多行文本 网址 布尔值 单选 百分数 手机 拜访计划',
      time: '2026-04-20 09:57:03'
    },
    {
      type: '日程',
      user: 'admin',
      content: '日程001，参与人 xiaoxu，5 分钟前提醒',
      time: '2026-04-17 14:10:05'
    }
  ],
  contacts: [
    { contactsName: '联系人0001', mobile: '155****5545', post: '采购经理', decisionRole: '关键人' }
  ],
  business: [
    { businessName: '智能制造扩容项目', stage: '初步沟通', money: 104000, ownerUserName: 'admin' }
  ],
  files: [
    { fileName: '客户需求确认表.pdf', size: '2.4MB', uploadUser: '林舟', uploadTime: '2026-04-20 10:12:31' }
  ],
  logs: [
    { user: '林舟', action: '将客户级别从 C级 调整为 B级', time: '2026-04-20 11:58:31' }
  ]
}
```

## 后台管理模板

后台管理主交付以 `element-plus-demo` 的 `AdminShell` 为准。后台是系统组织和配置底座，生成时必须覆盖员工部门、角色权限、自定义字段、业务审批流、线索池/客户公海规则、自定义打印模板、业务参数、系统日志等核心模板能力。

后台外壳：

- 后台入口来自顶部右侧系统设置齿轮，齿轮紧邻头像左侧；顶部主导航不增加“后台管理”入口。
- 后台态顶部使用 56px WKCRM 顶部导航，不再单独手写后台头部；左侧显示通用模块 tabs（默认 `客户` active），右侧保留系统消息、系统设置齿轮、头像。
- 后台全局侧栏宽 `210px`，使用 WKCRM 后台路由菜单语义，不使用“企业后台 / 管理配置信息”两行描述式卡片。
- 后台模板菜单支持父级展开和二级菜单；`客户管理` 默认展开并进入 6 个子菜单：`自定义字段设置`、`业务审批流`、`线索池规则设置`、`客户公海规则设置`、`自定义打印模板`、`业务参数设置`，不展示无关后台菜单。
- 模板抽象优先于重复复刻：`线索池规则设置` 和 `客户公海规则设置` 共用“规则池列表模板”，通过配置切换标题、主按钮、字段和 mock 数据；`业务参数设置` 只抽左侧参数菜单和右侧配置面板范式。
- 后台内容区背景 `#F4F5F7`，页面主容器 `height:100%; padding:20px`。
- 后台页面头使用 `xr-header` 等价结构：`min-height:32px`，标题 24px / 700，右侧按钮靠右。
- 双栏后台页使用 `240px` 本地左栏 + 右侧白色内容面板，右侧内容 `margin-left:255px`，白底、4px 圆角、轻阴影、padding 16px。
- 后台表格继续使用 Element Plus `el-table` 和 `.p-contianer` 分页，不手写 div 表格。

### 员工与部门管理

这是组织架构核心页面，二开原型必须覆盖。

布局：

- 顶部：标题“员工与部门管理”、搜索员工、添加员工、更多操作。
- 左侧本地导航：240px，灰色半透明背景，内部白色圆角部门树；树区域使用相对内容容器 + 绝对定位 `el-tree`，当前部门灰底选中态必须限制在白色树内容区内，不能贴 viewport 左边或撑出白色容器。
- 部门树节点高约 40px，当前节点使用灰色背景。
- 右侧内容：白底、4px 圆角、基础阴影、padding 16px。
- 表格顶部显示当前部门名称和人数统计；筛选包括“包含子部门”、员工状态。
- 勾选员工后顶部替换为 selection bar。
- 员工表高度按 `window.innerHeight - 290` 计算，最小 320px。
- 部门新增/编辑使用 500px 小 dialog。
- 员工新建/编辑表单字段两列。

员工字段：

```js
export const employeeFields = [
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'realname', label: '姓名', width: 150 },
  { prop: 'deptName', label: '主部门', width: 160 },
  { prop: 'parentDeptName', label: '附属部门', width: 180 },
  { prop: 'post', label: '职位', width: 120 },
  { prop: 'roleName', label: '角色', width: 180 },
  { prop: 'mobile', label: '手机号', width: 140 },
  { prop: 'email', label: '邮箱', width: 180 }
]
```

### 角色权限管理

这是权限治理核心页面，必须比普通设置页更完整。

布局：

- 左侧本地导航：角色列表，可拖拽排序，选中项蓝色浅底。
- 右侧内容：tabs。
- `角色员工` tab：搜索、提示、关联员工按钮、员工表格。
- `角色权限` tab：横向权限类别按钮、权限树、右侧或顶部保存按钮。
- 权限树二级节点可打开“字段授权”。
- 数据范围可选本人、本人及下属、本部门、本部门及下属部门、全部、自定义。
- 角色员工表高度按 `window.innerHeight - 300` 计算。
- 角色权限树高度按 `window.innerHeight - 230` 计算。

字段授权弹窗：

- 700px 小 dialog。
- 表格树：字段名称、字段权限。
- 权限项：可以查看、可以修改、掩码显示、设置掩码规则。
- 嵌套掩码规则使用 500px 小 dialog。

### 自定义字段

自定义字段是二开最重要的配置型页面之一。

入口页：

- 标题“自定义字段设置”。
- 表格列：模块图标、模块、更新时间、操作。
- 编辑按钮进入字段设计器。

字段设计器：

- 背景使用浅灰页面底。
- 左侧字段库：280px，不随视口压缩。
- 中间画布：900px 白色卡片，顶部“编辑{模块}字段”，右侧保存/返回。
- 右侧设置面板：280px，不随视口压缩。
- 字段库两列卡片，白底、边框、4px 圆角，hover 变主蓝。
- 字段设计器三栏总宽较大时允许内部横向滚动，但不要压缩三栏宽度。

字段类型：

```js
export const fieldTypes = [
  '单行文本',
  '多行文本',
  '网址',
  '布尔值',
  '单选',
  '多选',
  '数字',
  '货币',
  '百分数',
  '手机',
  '邮箱',
  '日期',
  '日期时间',
  '日期区间',
  '地址',
  '定位',
  '人员',
  '部门',
  '图片',
  '附件',
  '手写签名',
  '描述文字',
  '明细表格',
  '自定义编号',
  '自定义标签',
  '关注度',
  '分组标题',
  '富文本',
  '矩阵量表',
  '分割线',
  '数据关联',
  '条码',
  '视频'
]
```

### 业务审批流

列表页：

- 标题“业务审批流”。
- 右侧主按钮“新建审批流程”。
- 表格列：审批流图标、审批流名称、关联对象、审批被拒后重新提交/审批、最后修改人、最后修改时间、状态、操作。
- 操作：编辑、删除、启用/停用、复制并新建。
- 审批流列表表格高度按 `window.innerHeight - 220` 计算。

创建/编辑页：

- 全屏流程配置页面。
- 顶部步骤：`1.配置基础信息`、`2.配置流程`。
- 右侧：发布、关闭。
- 内容包含基础信息表单和审批流画布。
- CRM 审批对象包括合同、回款、发票、报价单。

### 系统日志

日志页是密集查询页：

- 顶部标题 + 帮助 tooltip。
- 查询条：日期范围、操作人、操作应用、操作对象、操作行为。
- 按钮：查询 primary、导出 text bg。
- 表格列：操作人、操作时间、操作行为、操作对象、所属应用、操作数据、IP 地址、操作详情。
- 日志表格高度按 `window.innerHeight - 270` 计算。
- 行点击打开详情 dialog；CRM 相关对象可以打开右侧详情滑层。

后台反模式：

- 不要把后台配置页做成营销式卡片陈列。
- 不要把员工部门、角色权限简化成单张普通表格。
- 不要把字段设计器简化成普通编辑表单；字段库、画布、属性面板三栏必须同时存在。
- 不要把审批流配置页做成普通 dialog；它应进入全屏流程配置模板。
- 不要把系统日志做成活动流；日志是筛选条 + 高密度表格 + 详情 dialog。

## 模拟数据与字段模型

生成代码时优先读取 `element-plus-demo/src/mock/schema.js`。该文件是 mock schema 的统一出口，导出 `crmSchema`、`adminSchema`、`schemaVersion`、`fieldTypeMap`、`requiredSchemaKeys`。`crm.js` 和 `admin.js` 继续保留 demo 组件所需的原始导出，但 AI Studio 和二开生成工具应以 `schema.js` 为入口。

```js
import { crmSchema, adminSchema, fieldTypeMap } from './mock/schema'
```

### CRMObjectTemplate schema

CRM 业务对象必须由 `crmObjectTemplates[type]` 驱动。客户是最高保真样板；线索、联系人、商机、合同是同结构复用样板。

每个对象必须包含：

| Key | 用途 |
| --- | --- |
| `type` | 对象类型，例如 `customer`、`business` |
| `moduleName` | 中文对象名，用于导航、按钮、详情类型 |
| `title` | 列表页标题，例如 `客户管理` |
| `mainField` | 主字段，控制列表主链接、卡片标题和详情标题 |
| `idField` | 主键字段，控制行唯一性和详情数据绑定 |
| `searchPlaceholder` | 搜索框 placeholder |
| `sceneList` | 场景 tabs |
| `fieldList` | 列表业务字段列，不包含 selection、电话、星标等固定列 |
| `rows` | 列表模拟数据 |
| `stageFlow` | 阶段视图数据 |
| `cardRows` | 卡片视图数据 |
| `createFieldGroups` | 新建/编辑大弹窗字段分组 |
| `detailTabs` | 右侧详情 tabs |
| `detailData` | 详情头、摘要、活动、详细资料、关联表、附件、操作记录 |
| `operations` | 勾选操作条动作，demo 默认只保留 `放入公海` |

### 字段对象 schema

列表字段、新建字段和详情字段都必须归一到同一字段模型，避免 AI 生成时混用不同命名。

| Key | 用途 |
| --- | --- |
| `prop` / `field` | 字段 key，二者必须一致 |
| `label` / `name` | 字段中文名，二者必须一致 |
| `formType` | 表单控件类型，如 `text`、`select`、`map_address`、`rich_text_format` |
| `width` | 表格列宽或默认列宽 |
| `stylePercent` | 创建弹窗字段宽度，50 表示半行，100 表示整行 |
| `isNull` | 1 表示必填，0 表示非必填 |
| `placeholder` | 表单占位 |
| `setting` | 选项集合，非选项字段为空数组 |
| `tableVisible` | 是否出现在列表字段列 |
| `createVisible` | 是否出现在新建/编辑大弹窗 |
| `detailVisible` | 是否出现在详情详细资料 |
| `mockValue` | 生成 demo 时使用的默认展示值 |

字段类型映射由 `fieldTypeMap` 维护。常用映射：

| formType | Element Plus 表达 |
| --- | --- |
| `text` | `el-input` |
| `textarea` | `el-input type="textarea"` |
| `select` | `el-select` |
| `radio` | `el-radio-group` |
| `checkbox` | `el-checkbox-group` |
| `date` / `datetime` | `el-date-picker` |
| `date-range` | `el-date-picker type="daterange"` |
| `user` | 人员选择，下拉或弹层选择 |
| `structure` / `tree-select` | 部门树选择 |
| `map_address` | 地址级联 + 详细地址输入 |
| `rich_text_format` | 富文本占位工具条 + 内容区 |
| `data_collapse` | 创建弹窗展开/收起控制，不生成普通输入控件 |

### CRM 数据生成规则

- 生成列表时，固定列由模板提供：selection、电话呼叫、星标、主字段。`fieldList` 只负责后续业务列。
- 生成新建/编辑时，只读取 `createFieldGroups`，并按 `stylePercent` 排列字段；`data_collapse` 只控制折叠，不渲染输入框。
- 生成详情时，只读取当前 tab 对应数据，不要把活动、详细资料、联系人、附件、操作记录堆叠在同一个页面里。
- `rows` 中每条数据必须包含对象的 `idField`、`mainField` 和 `__rowUid`；空字段保留空单元格，不用标签或卡片补齐。
- `detailData.baseInfoGroups` 使用分组只读字段，字段值必须落在 32px `value-box` 中。

### Admin schema

后台模板由 `adminSchema.modules` 驱动，必须覆盖五类核心模块：

| Key | 模块 |
| --- | --- |
| `employeeDepartment` | 员工与部门管理 |
| `rolePermission` | 角色权限管理 |
| `customField` | 自定义字段设置 |
| `approvalFlow` | 业务审批流 |
| `systemLog` | 系统日志 |

每个后台模块必须包含：

| Key | 用途 |
| --- | --- |
| `title` | 页面标题 |
| `navKey` | 后台菜单 key |
| `filters` | 查询筛选字段 |
| `fields` | 表格字段或主要列表字段 |
| `rows` | 表格模拟数据 |
| `actions` | 页面或表格操作 |
| `dialogs` | 弹框定义，包含标题、宽度和字段 |
| `layout` | 页面布局契约，例如本地导航宽度、表格高度扣减、字段设计器三栏宽度 |

后台生成规则：

- 员工部门使用 `departmentTree + employeeFields + employeeRows`。
- 角色权限使用 `roleList + roleUserRows + permissionTree + fieldAuthRows`。
- 自定义字段使用 `fieldTypeLib + designerFields + fieldSettingFields`。
- 审批流使用 `approvalFields + approvalRows + flowCanvas`。
- 系统日志使用 `logFilters + systemLogFields + systemLogRows + detailData`。

### Schema 反模式

- 不要只给页面截图，缺少 `fieldList`、`rows`、`createFieldGroups`、`detailData` 时不能生成稳定模块。
- 不要让同一字段在列表叫 `prop`、新建叫 `field`、详情叫 `fieldName` 且缺少归一层；最终生成入口必须同时提供统一 key。
- 不要把字段类型写成自然语言，例如“下拉框字段”；必须使用稳定 `formType`。
- 不要在后台 schema 里只给菜单名，必须同时给筛选项、字段列、数据行、动作和布局。
- 不要把阶段记录、联系人、附件、日志等详情数据混成一组普通字段；它们是不同 tab 的数据源。

## AI 代码生成提示词

本节是通用 prompt pack，不绑定具体工具。Codex、Cursor、Claude Code、AI Studio 等工具都可以使用；差异只在于上下文提供方式。

使用模式：

- **仓库感知模式**：适合 Codex、Cursor、Claude Code 等能读取项目文件的工具。要求工具直接读取 `DESIGN.md`、`element-plus-demo/src/mock/schema.js`、demo components 和 `element-plus-demo/src/styles/wkcrm.scss`。
- **粘贴上下文模式**：适合无法访问仓库文件的工具。需要粘贴本文件的视觉规则、目标对象 schema、关键组件契约和生成后自检要求。

通用禁止项：

- 不要依赖任何本地源码路径。
- 不要复制或 import 原始产品源码组件。
- 不要脱离 `element-plus-demo/` 自行手绘一次性代码结构；生成时必须优先复用 demo 的组件边界、schema 和样式 token。
- 不要把新建大弹窗做成 `el-dialog`；业务对象新建/编辑必须使用 900px 创建大弹层。
- 不要把详情做成普通全页或普通三栏后台页；CRM 详情必须是右侧滑层 + WMD tabs。

### 通用系统提示词

```text
你是一个 Vue 3 + Element Plus 前端工程师。目标是根据 WKCRM UI 规范生成可运行的管理系统页面。

上下文读取方式：
1. 仓库感知模式：读取 wkcrm/DESIGN.md、wkcrm/element-plus-demo/src/mock/schema.js、wkcrm/element-plus-demo/src/styles/wkcrm.scss，以及 demo components。
2. 粘贴上下文模式：使用我粘贴的 DESIGN 规则、schema 片段、组件契约和验收标准。

生成要求：
- 使用 Vue 3 Composition API + 官方 Element Plus。
- 使用 schema 驱动字段、列表、详情、弹层和后台模块，不要硬编码一次性页面。
- 视觉和交互优先参考 element-plus-demo 的组件边界和 wkcrm.scss token。
- 输出必须包含 Vue 组件、mock 数据引用、必要样式、交互状态和自检说明。

禁止：
- 不要引用本地源码路径。
- 不要复制或 import 原始产品源码组件。
- 不要脱离 `element-plus-demo/` 手绘 div 表格或卡片原型。
- 不要引入营销页、hero、插画或低密度 SaaS 卡片风格。
```

### 通用 CRMObjectTemplate 生成

```text
基于 WKCRM 规范生成一个 CRM 业务对象模块。

输入：
- 目标对象 type：{type}
- 从 schema.js 读取 crmSchema.objects[type]，字段包括 type、moduleName、title、mainField、idField、searchPlaceholder、sceneList、fieldList、rows、stageFlow、cardRows、createFieldGroups、detailTabs、detailData、operations。

输出：
- 一个 CRM 列表页，包含页面头、搜索、场景 tabs、筛选按钮、三视图切换、Element Plus el-table、selection bar、分页。
- 一个 900px 新建/编辑创建大弹层，字段来自 createFieldGroups。
- 一个 450px 放入公海小 dialog，作为轻量批量操作代表。
- 一个 CRM 右侧详情滑层，tabs 来自 detailTabs，数据来自 detailData。

必须遵守：
- 表格视图使用 Element Plus el-table border，不用 div 表格。
- 主表格表头和数据行都是 32px，固定列为 selection、电话呼叫、星标、主字段。
- selection bar 为 48px 深灰蓝，只在勾选后接管表头状态。
- 新建/编辑是 900px 创建大弹层，不是 el-dialog。
- 放入公海小弹框是 450px el-dialog。
- 详情是右侧滑层，最小宽 950px，左侧 WMD tabs，右侧摘要 330-340px。
- 详情 tabs 默认只渲染当前 tab，不堆叠所有内容。
```

### 客户模块

```text
生成 WKCRM 客户管理模块。

仓库感知模式：
- 读取 crmSchema.objects.customer。
- 参考 CrmCustomerList、CrmCreateDialog、CrmCustomerDetail、CrmMainTableWrap、CrmTableHeader、CrmSlideView、CrmDetailMenuLayout。

粘贴上下文模式：
- 使用 customer 的 fieldList、rows、createFieldGroups、detailTabs、detailData。

生成目标：
- 标题为“客户管理”，主按钮为“新建客户”，搜索框为“客户名称/手机/电话”。
- 列表包含客户名称、电话、客户来源、手机、邮箱、网址、客户行业、客户级别、下次联系时间等字段。
- 新建客户使用 900px 创建大弹层，包含基本信息分组、工商信息入口、展开/收起、label top 表单。
- 勾选后只展示一个批量动作：放入公海。
- 详情保留活动、详细资料、联系人、附件、操作记录五个 tabs。

验收：
- 表格 32px，selection bar 48px，新建 900px，放入公海 450px，详情滑层最小 950px。
```

### 商机模块

```text
生成 WKCRM 商机管理模块。

读取 crmSchema.objects.business，把客户模块结构替换为商机对象配置。

生成目标：
- 页面标题为“商机管理”，主按钮为“新建商机”，搜索框为“商机名称/客户名称”。
- 主字段列为“商机名称”，点击主字段打开右侧详情滑层。
- 列表字段至少包含客户名称、商机金额、商机阶段、商机来源、负责人、下次联系时间、更新时间。
- 新建商机字段来自 createFieldGroups，至少包含商机名称、客户名称、商机金额、商机来源、负责人、备注。
- 详情右侧摘要展示商机金额、阶段、成交概率、预计成交日期等业务摘要。

保持不变：
- CRM 列表、三视图、新建大弹层、selection bar、小 dialog、详情滑层的 UI 契约不随对象变化。
```

### 联系人模块

```text
生成 WKCRM 联系人管理模块。

读取 crmSchema.objects.contacts，把客户模块结构替换为联系人对象配置。

生成目标：
- 页面标题为“联系人管理”，主按钮为“新建联系人”，搜索框为“联系人姓名/手机/电话”。
- 主字段列为“联系人姓名”。
- 列表字段包含客户名称、手机、电话、职务、决策角色、负责人、更新时间。
- 新建联系人字段来自 createFieldGroups，至少包含联系人姓名、客户名称、手机、电话、职务、决策角色、负责人。
- 详情标题显示联系人姓名，详情类型为“联系人”。
- 五个核心 tabs 保持活动、详细资料、联系人、附件、操作记录；联系人 tab 可作为关联数据表代表。
```

### 自定义 CRM 对象

```text
生成一个自定义 CRM 对象模块。

先定义 CRMObjectTemplate：
- type、moduleName、title、mainField、idField、searchPlaceholder
- sceneList、fieldList、rows
- stageFlow、cardRows
- createFieldGroups
- detailTabs、detailData
- operations

字段要求：
- 列表字段、新建字段和详情字段都必须使用统一字段模型：prop/field、label/name、formType、width、stylePercent、isNull、placeholder、setting、tableVisible、createVisible、detailVisible、mockValue。
- rows 每条数据必须包含 idField、mainField 和 __rowUid。

生成要求：
- 复用 CRMObjectTemplate UI 契约，不改表格密度、弹层尺寸、详情滑层结构。
- 如果对象有阶段，stageFlow 用阶段视图；如果没有阶段，也保留同一区域切换能力但用空阶段模板。
```

### 员工部门

```text
生成 WKCRM 后台员工与部门管理页面。

读取 adminSchema.modules.employeeDepartment。

生成目标：
- 后台外壳使用 56px WKCRM 顶部导航，右上角系统设置齿轮进入后台；顶部仍展示通用模块 tabs，左侧为 210px 后台模板菜单。
- 页面内部使用 240px 部门树 + 右侧员工表格。
- 部门树数据来自 tree；员工表字段来自 fields；员工数据来自 rows。
- 顶部操作包含新建员工、创建部门等 actions。
- 创建部门 dialog 宽 500px，字段来自 dialogs.department.fields。

验收：
- 本地导航 240px，员工表高度使用 layout.tableOffset，表格使用 Element Plus el-table。
```

### 角色权限

```text
生成 WKCRM 后台角色权限管理页面。

读取 adminSchema.modules.rolePermission。

生成目标：
- 左侧角色列表，右侧包含“角色员工 / 角色权限”tabs。
- 角色员工使用 roleUserRows 和表格字段。
- 角色权限使用 permissionTree。
- 字段授权 dialog 宽 700px，掩码规则 dialog 宽 500px。
- 操作来自 actions，不额外发明无关按钮。

验收：
- 本地角色列表宽 240px，员工表和权限树高度使用 layout.tableOffset / layout.treeOffset。
```

### 自定义字段

```text
生成 WKCRM 后台自定义字段设置页面。

读取 adminSchema.modules.customField。

生成目标：
- 入口列表展示可配置 CRM 模块。
- 点击编辑进入字段设计器。
- 字段设计器使用 280px 字段库 + 900px 表单画布 + 280px 属性面板。
- 字段库来自 fieldTypeLib，画布字段来自 designerFields，属性面板来自 settingFields。

限制：
- 首版只表达结构和轻交互，不实现真实拖拽保存。
```

### 业务审批流

```text
生成 WKCRM 后台业务审批流页面。

读取 adminSchema.modules.approvalFlow。

生成目标：
- 列表字段来自 fields，数据来自 rows，筛选项来自 filters。
- 操作列包含编辑、删除、启用停用、复制并新建等 actions。
- 新建审批流程进入全屏流程配置模板，包含基础信息、审批流程、流程画布和高级配置。

验收：
- 表格高度使用 layout.tableOffset。
- 流程画布只表达结构，不接真实后端。
```

### 系统日志

```text
生成 WKCRM 后台系统日志页面。

读取 adminSchema.modules.systemLog。

生成目标：
- 筛选条包含日期范围、操作人、所属应用、操作对象、操作行为、查询、重置、导出。
- 日志表字段来自 fields，数据来自 rows。
- 点击日志行打开详情 dialog，宽度来自 dialogs.detail.width。

验收：
- 日志表高度使用 layout.tableOffset。
- 详情 dialog 展示 operationInfo、userName、createTime、clientIp 等审计信息。
```

### 后台综合页

```text
生成 WKCRM 后台管理综合模板。

读取 adminSchema.sections 和 adminSchema.modules。

生成目标：
- 生成后台外壳和模板菜单：员工部门、角色权限、客户管理展开菜单、系统日志；客户管理下展示自定义字段、业务审批流、线索池规则、客户公海规则、自定义打印模板、业务参数。
- 每个菜单切换到对应模块，不在同一屏堆叠五个页面。
- 所有页面使用 Element Plus 表格、tabs、tree、dialog、form。
- 视觉保持高密度后台产品风格，不做营销卡片或门户首页。
```

### 生成后自检

```text
请对刚生成的 WKCRM 页面做自检，并按以下清单逐项报告是否满足：

输入与 schema：
- 是否读取并使用 schema.js 的 crmSchema 或 adminSchema。
- 是否使用字段模型中的 prop/field、label/name、formType、width、stylePercent、isNull、placeholder、setting、可见性和 mockValue。
- 是否避免硬编码一次性字段。

CRM UI：
- CRM 主表格是否为 Element Plus el-table border。
- 表头和数据行是否为 32px。
- 固定列是否为 selection、电话呼叫、星标、主字段。
- selection bar 是否为 48px，是否只在勾选后显示。
- 新建/编辑是否为 900px 创建大弹层，而不是 el-dialog。
- 放入公海是否为 450px el-dialog。
- 详情是否为右侧滑层 + WMD tabs + 右侧摘要。
- 详情 tabs 是否只显示当前 tab，不堆叠所有内容。

后台 UI：
- 后台入口是否为右上角齿轮，顶部主导航不能有“后台管理”菜单项。
- 后台态顶部是否使用 56px WKCRM 顶部导航，显示通用模块 tabs（`客户` active），且右侧只保留系统消息、系统设置齿轮、头像。
- 后台模板菜单是否为 210px，且只展示员工部门、角色权限、客户管理、系统日志四个一级入口。
- 客户管理是否默认展开，并按 WKCRM 菜单顺序展示 6 个二级入口：自定义字段、业务审批流、线索池规则、客户公海规则、自定义打印模板、业务参数。
- 后台本地导航是否为 240px。
- 字段设计器是否为 280px / 900px / 280px。
- 员工、角色、审批、日志表格高度是否使用 schema/layout 的扣减规则。

禁止项：
- 是否出现本地源码路径。
- 是否 import 原始产品源码组件。
- 是否脱离 `element-plus-demo/` 手绘 div 表格。
- 是否把 CRM 详情做成普通全页。
```

## Element Plus Demo 对照

- GitHub 仓库：`https://github.com/yaruiyang/wkcrm-template`。
- `DESIGN.md`：AI Studio、Codex CLI 和二开生成项目时的设计规范入口。
- `element-plus-demo/`：独立 Vue 3 + 官方 Element Plus 最小模板，是后续 AI Studio 和二开生成 CRM 页面时的主参考。
- demo 的 mock 文件：客户字段、列表数据、阶段数据、卡片数据、详情摘要、联系人、附件、操作记录和弹层字段 schema。
- demo 的 `wkcrm.scss`：WKCRM tokens 和 Element Plus 覆盖样式，用于控制颜色、密度、表格、弹层、详情滑层、左侧菜单和只读字段框。
- demo 的 components 目录：客户列表、三视图、selection bar、分页、批量小 dialog、右侧详情滑层和 5 个核心 tabs。
- demo 的组件边界应优先表达真实产品结构契约：列表侧按页面头/筛选头/主表格外壳拆分，详情侧按滑层/WMD tabs/header/body/right 拆分。

生成代码时优先读取 demo 的 Vue 组件结构，再结合本文件规则扩展字段和业务模块。

## 验收清单与反模式

生成结果必须满足：

- 新建/编辑业务对象使用 900px 居中大弹窗。
- 转移、成交状态、放入公海、部门新增等轻量操作使用小 dialog。
- 列表勾选后必须出现 48px 深色 selection bar。
- 客户列表必须支持表格、阶段、卡片三视图切换，但不能同时堆叠展示。
- CRM 详情必须使用右侧滑层，不跳普通全页。
- 详情必须包含活动、详细资料、联系人、附件、操作记录五个核心 tabs，且内容一一对应切换。
- 客户列表必须保留表格网格、空字段占位、固定列、真实分页和高密度筛选区。
- 客户详情必须保留蓝色关闭把手、左侧 tab 轨道、圆点轨道、客户阶段、待处理及逾期、活动流和客户摘要。
- 后台必须覆盖员工部门、角色权限、自定义字段、审批流、系统日志。
- 自定义字段必须表现为三栏字段设计器，不简化为普通表单。

反模式：

- 不要把新建客户画成 500px 小表单 dialog。
- 不要把新建客户做成右侧抽屉。
- 不要省略勾选后的 selection bar。
- 不要把详情页做成普通全页。
- 不要把客户详情做成普通三栏后台页；它必须是列表上下文上的右侧覆盖滑层。
- 不要把客户列表做成稀疏 SaaS 表格；它必须保留 CRM 的紧凑行高、浅灰表头、空字段网格和固定列。
- 不要用大卡片陈列替代表格网格。
- 不要把左侧 tab 轨道改成顶部 tabs。
- 不要让详情左侧圆点脱离菜单项定位，圆点中心必须与竖线对齐。
- 不要把详情所有 tab 内容堆叠成一个长页面。
- 不要用大字段卡片替代详细资料的灰色只读字段框。
- 不要把活动、附件、操作记录从详情中删除。
- 不要用营销 hero、装饰插画、大面积渐变背景。
- 不要把后台员工部门和角色权限做成普通列表。
- 不要把自定义字段设置简化为单表单。
- 不要用紫蓝渐变、过大的圆角和漂浮装饰物替代 4px/16px 体系。
