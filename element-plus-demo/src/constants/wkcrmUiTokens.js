export const wkcrmUiDimensions = {
  maxVisibleSceneCount: 8,
  tableRowHeight: 32,
  tableMinHeight: 320,
  tableStaticOffset: 206,
  stageViewExtraHeight: 64,
  adminEmployeeTableOffset: 290,
  adminRoleTableOffset: 300,
  adminRoleTreeOffset: 230,
  adminFieldEntryTableOffset: 155,
  adminApprovalTableOffset: 220,
  adminLogTableOffset: 270,
  adminBizParamTableOffset: 344,
  adminBizParamLimitTableOffset: 290,
  adminPoolActionColumnWidth: 200,
  adminPrintActionColumnWidth: 250,
  adminPrintTemplateDialogWidth: 400,
  adminPrintSizeDialogWidth: 480,
  adminPrintFieldNavWidth: 300,
  adminLogDetailDialogWidth: 700,
  adminFlowTabsHeight: 60,
  adminFlowBaseInfoWidth: 900,
  adminFlowNodeDialogWidth: 500,
  adminPoolSlideViewMinWidth: 950,
  adminPoolTransferDialogWidth: 450,
  adminPrintPreviewDialogWidth: 520,
  adminBizParamDialogWidth: 500,
  activityComposerTabsHeight: 48,
  activityContentEditableMinHeight: 77,
  activityFilterRowHeight: 40,
  activityTimelineDotSize: 36,
  activityFollowCardRadius: 6,
  activityFollowCardFontSize: 14,
  activityFollowCardPadding: '12px 8px 8px 16px'
}

export function getWkcrmTableHeight(windowHeight, tableHeaderHeight) {
  // 运行态列表高度只保留可交付模板需要的计算，不依赖内部源码契约文件。
  return Math.max(
    wkcrmUiDimensions.tableMinHeight,
    windowHeight - tableHeaderHeight - wkcrmUiDimensions.tableStaticOffset
  )
}
