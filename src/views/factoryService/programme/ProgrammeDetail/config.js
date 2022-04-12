export const contractColumns = [
  { label: '预算', prop: 'budget' },
  { label: '面积', prop: 'area' },
  { label: '承接方式', prop: 'undertakeMode' },
  { label: '结款方式', prop: 'paymentMethod' },
  { label: '回款周期', prop: 'paymentCycle' },
]
export const baseColumns = [
  { label: '成立时间', prop: 'fromTime' },
  { label: '注册资本', prop: 'regCapital' },
  { label: '实缴资本', prop: 'actualCapital' },
  { label: '行业排名', prop: 'rank' },
  { label: '股东结构', slotName: 'operate' },
]
export const realEstateBaseColumns = [
  { label: '成立时间', prop: 'fromTime' },
  { label: '注册资本', prop: 'regCapital' },
  { label: '实缴资本', prop: 'actualCapital' },
  { label: '2020年年度企业排名', prop: 'rank' },
  { label: '股东结构', slotName: 'operate' },
]
export const financeColumns = [
  { label: '归母净利润(亿元)', prop: 'gmjlr', minWidth: '110px' },
  { label: '归母净利润同比增长(%)', prop: 'gsjlrtbzz', minWidth: '130px' },
  { label: '净利率(%)', prop: 'jll', minWidth: '90px' },
  { label: '存货周转天数(天)', prop: 'chzzts', minWidth: '110px' },
  { label: '总资产周转率(次)', prop: 'zzczzy', minWidth: '110px' },
  { label: '销售现金比', prop: 'jyxjlyysr', minWidth: '130px' },
  { label: '速动比率', prop: 'sdbl', minWidth: '90px' },
  { label: '资产负债率(%)', prop: 'zcfzl', minWidth: '110px' },
  { label: '流动比率', prop: 'ldbl', minWidth: '110px' },
  { label: '利息倍数', prop: 'lxbs', minWidth: '130px' },
  { label: '-', minWidth: '90px' },
  { label: '-', minWidth: '110px' },
]
export const riskColumns = [
  { label: '司法诉讼', prop: 'sfssTotalCount', minWidth: '110px' },
  { label: '被执行人', prop: 'bzxrTotalCount', minWidth: '130px' },
  { label: '失信', prop: 'sxTotalCount', minWidth: '90px' },
  { label: '限制高消费', prop: 'xgTotalCount', minWidth: '110px' },
  { label: '股权质押', prop: 'stockPledge', minWidth: '110px' },
  { label: '经营异常', prop: 'jyycTotalCount', minWidth: '130px' },
  { label: '动产抵押', prop: 'dcdyTotalCount', minWidth: '90px' },
  { label: '新闻舆情', prop: 'newRiskTotalCount', minWidth: '110px' }
]
export const relationRiskColumns = [
  { label: '司法诉讼', prop: 'sfssTotalCount', minWidth: '110px' },
  { label: '被执行人', prop: 'bzxrTotalCount', minWidth: '130px' },
  { label: '失信', prop: 'sxTotalCount', minWidth: '90px' },
  { label: '限制高消费', prop: 'xgTotalCount', minWidth: '110px' },
  { label: '经营异常', prop: 'jyycTotalCount', minWidth: '110px' },
  { label: '动产抵押', prop: 'dcdyTotalCount', minWidth: '130px' },
  { label: '-', prop: '-', minWidth: '90px' },
  { label: '-', prop: '-', minWidth: '110px' }
]
export const projectBaseColumns = [
  { label: '项目类型', prop: 'ptype' },
  { label: '所在地', prop: 'address' }
]
