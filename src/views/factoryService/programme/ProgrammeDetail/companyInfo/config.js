// 三条红线配置
export const threeRedLineConfig = [
  {
    name: '净负债率',
    tip: '企业的净负债率不得大于100%',
    configName: 'netDebtRatio',
    leftText: '良好',
    rightText: '差',
    centerText: '100%',
    standard: 1,
    renderText: (value) => { return value ? parseFloat(value * 100).toFixed(2) + '%' : '暂无数据' }
  },
  {
    name: '剔除预收款后的资产负债率',
    tip: '企业剔除预收款后的资产负债率不得大于70%',
    configName: 'ebtratioaftereliminatedepositreceived',
    leftText: '良好',
    rightText: '差',
    centerText: '70%',
    standard: 0.7,
    renderText: (value) => { return value ? parseFloat(value * 100).toFixed(2) + '%' : '暂无数据' }
  },
  {
    name: '现金短债比',
    tip: '企业的“现金短债比”不小于1',
    configName: 'cashFlowsCoverageRatio',
    leftText: '差',
    rightText: '良好',
    centerText: '1',
    isHit: true,
    standard: 1,
    isReverse: true,
    renderText: (value) => { return value ? value.toFixed(2) : '暂无数据' }
  },
]
