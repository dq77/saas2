const urlPrefix = '//cdn.qjdchina.com/static-online/saas/riskExperts/chooseMode/'
export const modeType = {
  credit: {
    fast: {
      title: '快速评估',
      detail: '无需任何被评估企业授权，秒级生成赊销评估建议，提前规避风险 提升应收款安全',
      background: `url("${urlPrefix}mode-bg-1.png") top right no-repeat`,
      icon: `${urlPrefix}mode-icon-1.png`,
      color: '#8D4BFE',
      info: ['被评估企业实控人信息'],
      service: ['暂无'],
      next: 'chooseCompany'
    },
    standard: {
      title: '标准评估',
      detail: '通过轻度授权完成对被评估企业、实控人进行风险筛查，输出建议额度',
      background: `url("${urlPrefix}mode-bg-2.png") top right no-repeat`,
      icon: `${urlPrefix}mode-icon-2.png`,
      color: '#4DC9C2',
      info: ['被评估企业经营数据', '贸易数据'],
      service: ['被评估企业舆情推送', '被评估企业赊后风险预警'],
      next: 'chooseCompany'
    },
    accurate: {
      title: '精准评估',
      detail: '调用独创大数据评估模型，针对目标企业建立10大维度的评估体系，有效降低逾期风险',
      background: `url("${urlPrefix}mode-bg-3.png") top right no-repeat`,
      icon: `${urlPrefix}mode-icon-3.png`,
      color: '#3B68F0',
      info: ['营业执照', '财务报表', '基本存款账户证明', '基本户流水', '企业银行账户清单', '财务报表'],
      service: ['被评估企业舆情推送', '被评估企业赊后风险预警'],
      next: 'chooseCompany'
    },
  },
  project: {
    fast: {
      title: '快速评估',
      detail: '调用独创大数据评估模型，针对目标企业建立10大维度的评估体系，有效降低逾期风险',
      background: `url("${urlPrefix}mode-bg-4.png") top right no-repeat`,
      icon: `${urlPrefix}mode-icon-4.png`,
      color: '#FFBF03',
      info: ['无'],
      service: ['全天候风险监控'],
      next: 'myRealEstateReport'
    },
    deep: {
      title: '深度评估',
      detail: '调用独创大数据评估模型，针对目标企业建立10大维度的评估体系，有效降低逾期风险',
      background: `url("${urlPrefix}mode-bg-5.png") top right no-repeat`,
      icon: `${urlPrefix}mode-icon-5.png`,
      color: '#8668FF',
      info: ['授权书', '税盘授权', '房产证书'],
      service: ['人工审查', '全天候风险监控'],
      next: 'projectAssess'
    },
  },
}
