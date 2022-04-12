import { identity } from '@/utils/enums'
import { toAmountStr, toDateStr } from '@/utils/util'
export const riskConfigTabs = [
  { label: '司法诉讼', value: 'judicialLitigation' },
  { label: '被执行人', value: 'executee' },
  { label: '失信', value: 'breakPromise' },
  { label: '限制高消费', value: 'heightLimit' },
  { label: '经营异常', value: 'abnormalOperation' },
  { label: '动产抵押', value: 'chattelMortgage' },
  { label: '股权质押', value: 'equityPledge' },
  { label: '新闻舆情', value: 'newsPublicOpinion' },
]
export const riskRequest = {
  judicialLitigation: 'getSFSSList',
  executee: 'getBZXRList',
  breakPromise: 'getSXList',
  heightLimit: 'getXGList',
  abnormalOperation: 'getJYYCList',
  chattelMortgage: 'getDCDYList',
  equityPledge: 'getGYZYList',
  newsPublicOpinion: 'getXWYQList',
}
export const tableColumns = {
  judicialLitigation: [
    { label: '诉讼标题', key: 'title', minWidth: '180' },
    { label: '企业名称', key: 'dealerName', minWidth: '120' },
    { label: '案号', key: 'caseId', minWidth: '180' },
    { label: '身份', key: 'identity', minWidth: '50', render: (row) => identity[row.identity] },
    { label: '案由', key: 'caseReason', minWidth: '90' },
    { label: '判决时间', key: 'judgeDate', minWidth: '90' },
    { label: '法院层级', key: 'level', minWidth: '70' },
    { label: '法院', key: 'courtName', minWidth: '120' },
    { label: '发布时间', key: 'publishTime', minWidth: '90' },
  ],
  executee: [
    { label: '企业名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', minWidth: '180'},
    { label: '立案日期', key: 'regDate', minWidth: '90', align: 'right' },
    { label: '执行法院', key: 'court', minWidth: '110' },
    { label: '执行标的', key: 'caseAmount', minWidth: '150', align: 'right' }
  ],
  breakPromise: [
    { label: '企业名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', tdSlotName: 'caseId', minWidth: '100'},
    { label: '执行法院', key: 'court', minWidth: '120' },
    { label: '执行依据文号', key: 'zxDocId', minWidth: '100' },
    { label: '履行情况', key: 'performance', minWidth: '90' },
    { label: '失信行为', key: 'disruptTypeName', minWidth: '70' },
    { label: '立案日期', key: 'regDate', minWidth: '85', align: 'right' },
  ],
  heightLimit: [
    { label: '企业名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', tdSlotName: 'caseId', minWidth: '110' },
    { label: '限消令对象', key: 'xgName', minWidth: '120'},
    { label: '执行法院', key: 'court', minWidth: '120' },
    { label: '立案日期', key: 'regDate', minWidth: '100', align: 'right' },
  ],
  abnormalOperation: [
    { label: '企业名称', key: 'companyName', minWidth: '120'},
    { label: '列入日期', key: 'inDate', minWidth: '85', align: 'right' },
    { label: '列入经营异常名录原因', key: 'inCausion', minWidth: '140' },
    { label: '决定机关名称', key: 'inDecisionOrg', minWidth: '100'},
    { label: '移出日期', key: 'outDate', minWidth: '85', align: 'right', render: (row, v) => v || '-' },
    { label: '移出经营异常名录原因', key: 'outCausion', minWidth: '140', render: (row, v) => v || '-' },
  ],
  chattelMortgage: [
    { label: '企业名称', key: 'companyName', minWidth: '120'},
    { label: '登记编号', key: 'regNumber', tdSlotName: 'regNumber', minWidth: '120'},
    { label: '状态', key: 'status', minWidth: '50' },
    { label: '登记机关', key: 'regOrg', minWidth: '80' },
    { label: '被担保主债权数额', key: 'secAm', tdSlotName: 'secAm', minWidth: '80', align: 'right' },
    { label: '登记日期', key: 'regDate', minWidth: '80', align: 'right' },
  ],
  equityPledge: [
    { label: '股东名称', key: 'shareHolder', minWidth: '150'},
    { label: '质押股份市值（元）', key: 'lastValue', minWidth: '100', align: 'right', render: (row, v) => toAmountStr(v, 2, true) || '-'},
    { label: '质押移除⽇期', key: 'endDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
    { label: '质押股数（单位股）', key: 'pledgeAmount', minWidth: '100' },
    { label: '占所持股份⽐例（%）', key: 'proOfSelf', minWidth: '100' },
    { label: '质押开始⽇期', key: 'startDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
    { label: '公告⽇期', key: 'annDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
  ]
}
export const relatedRiskConfigTabs = [
  { label: '司法诉讼', value: 'judicialLitigation' },
  { label: '被执行人', value: 'executee' },
  { label: '失信', value: 'breakPromise' },
  { label: '限制高消费', value: 'heightLimit' },
  { label: '经营异常', value: 'abnormalOperation' },
  { label: '动产抵押', value: 'chattelMortgage' },
]
export const relatedRiskRequest = {
  judicialLitigation: 'getRelationSFSSList',
  executee: 'getRelationBZXRList',
  breakPromise: 'getRelationSXList',
  heightLimit: 'getRelationXGList',
  abnormalOperation: 'getRelationJYYCList',
  chattelMortgage: 'getRelationDCDYList',
}
export const relatedTableColumns = {
  judicialLitigation: [
    { label: '诉讼标题', key: 'title', minWidth: '180' },
    { label: '关联公司名称', key: 'dealerName', minWidth: '120' },
    { label: '案号', key: 'caseId', minWidth: '180' },
    { label: '身份', key: 'identity', minWidth: '50', render: (row) => identity[row.identity] },
    { label: '案由', key: 'caseReason', minWidth: '90' },
    { label: '判决时间', key: 'judgeDate', minWidth: '90' },
    { label: '法院层级', key: 'level', minWidth: '70' },
    { label: '法院', key: 'courtName', minWidth: '120' },
    { label: '发布时间', key: 'publishTime', minWidth: '90' },
  ],
  executee: [
    { label: '关联公司名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', minWidth: '180'},
    { label: '立案日期', key: 'regDate', minWidth: '90', align: 'right' },
    { label: '执行法院', key: 'court', minWidth: '110' },
    { label: '执行标的', key: 'caseAmount', minWidth: '150', align: 'right' }
  ],
  breakPromise: [
    { label: '关联公司名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', tdSlotName: 'caseId', minWidth: '100'},
    { label: '执行法院', key: 'court', minWidth: '120' },
    { label: '执行依据文号', key: 'zxDocId', minWidth: '100' },
    { label: '履行情况', key: 'performance', minWidth: '90' },
    { label: '失信行为', key: 'disruptTypeName', minWidth: '70' },
    { label: '立案日期', key: 'regDate', minWidth: '85', align: 'right' },
  ],
  heightLimit: [
    { label: '关联公司名称', key: 'companyName', minWidth: '120'},
    { label: '案号', key: 'caseId', tdSlotName: 'caseId', minWidth: '110' },
    { label: '限消令对象', key: 'xgName', minWidth: '120'},
    { label: '执行法院', key: 'court', minWidth: '120' },
    { label: '立案日期', key: 'regDate', minWidth: '100', align: 'right' },
  ],
  abnormalOperation: [
    { label: '关联公司名称', key: 'companyName', minWidth: '120'},
    { label: '列入日期', key: 'inDate', minWidth: '85', align: 'right' },
    { label: '列入经营异常名录原因', key: 'inCausion', minWidth: '140' },
    { label: '决定机关名称', key: 'inDecisionOrg', minWidth: '100'},
    { label: '移出日期', key: 'outDate', minWidth: '85', align: 'right', render: (row, v) => v || '-' },
    { label: '移出经营异常名录原因', key: 'outCausion', minWidth: '140', render: (row, v) => v || '-' },
  ],
  chattelMortgage: [
    { label: '关联公司名称', key: 'companyName', minWidth: '120'},
    { label: '登记编号', key: 'regNumber', tdSlotName: 'regNumber', minWidth: '120'},
    { label: '状态', key: 'status', minWidth: '50' },
    { label: '登记机关', key: 'regOrg', minWidth: '80' },
    { label: '被担保主债权数额', key: 'secAm', tdSlotName: 'secAm', minWidth: '80', align: 'right' },
    { label: '登记日期', key: 'regDate', minWidth: '80', align: 'right' },
  ],
  equityPledge: [
    { label: '股东名称', key: 'shareHolder', minWidth: '150'},
    { label: '质押股份市值（元）', key: 'lastValue', minWidth: '100', align: 'right', render: (row, v) => toAmountStr(v, 2, true) || '-'},
    { label: '质押移除⽇期', key: 'endDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
    { label: '质押股数（单位股）', key: 'pledgeAmount', minWidth: '100' },
    { label: '占所持股份⽐例（%）', key: 'proOfSelf', minWidth: '100' },
    { label: '质押开始⽇期', key: 'startDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
    { label: '公告⽇期', key: 'annDate', minWidth: '80', render: (row, v) => toDateStr(v, 'yyyy-MM-dd') || '-' },
  ]
}
export const sentimentTypeEnums = [
  {
    label: '正面',
    value: '1',
  },
  {
    label: '中性',
    value: '0',
  },
  {
    label: '负面',
    value: '-1',
  },
]
export const sentimentLabels = [
  {
    label: '资本运作',
    value: '0',
    children: [
      {
        label: '上市退市',
        value: '0'
      },
      {
        label: '股权变动',
        value: '1'
      },
      {
        label: '收购重组',
        value: '2'
      },
      {
        label: '投资融资',
        value: '3'
      },
      // {
      //   label: '股价变动',
      //   value: '4'
      // },
    ]
  },
  {
    label: '财务经营',
    value: '2',
    children: [
      // {
      //   label: '经营业务',
      //   value: '0'
      // },
      {
        label: '垄断行为',
        value: '1'
      },
      // {
      //   label: '破产停业',
      //   value: '2'
      // },
      {
        label: '债务抵押',
        value: '3'
      },
      {
        label: '重大交易',
        value: '4'
      },
      {
        label: '经营合作',
        value: '5'
      },
      {
        label: '亏损盈利',
        value: '6'
      },
      {
        label: '商票票据',
        value: '7'
      },
      {
        label: '评级变动',
        value: '8'
      },
      {
        label: '财务造假',
        value: '9'
      },
      {
        label: '业绩变动',
        value: '10'
      },
    ]
  },
  {
    label: '人事',
    value: '3',
    children: [
      {
        label: '员工信息',
        value: '0'
      },
      {
        label: '高管变动',
        value: '1'
      },
    ]
  },
  {
    label: '成果',
    value: '4',
    children: [
      {
        label: '成果获奖',
        value: '0'
      },
    ]
  },
  {
    label: '信誉',
    value: '5',
    children: [
      // {
      //   label: '信用信誉',
      //   value: '0'
      // },
      {
        label: '造假欺诈',
        value: '1'
      },
      // {
      //   label: '偷税漏税',
      //   value: '2'
      // },
      {
        label: '侵权抄袭',
        value: '3'
      },
    ]
  },
  {
    label: '事故纠纷',
    value: '6',
    children: [
      {
        label: '劳务纠纷',
        value: '0'
      },
      // {
      //   label: '合同纠纷',
      //   value: '1'
      // },
      // {
      //   label: '环境问题',
      //   value: '2'
      // },
      {
        label: '安全隐患',
        value: '3'
      },
      {
        label: '违规行为',
        value: '4'
      },
    ]
  },
  {
    label: '产品相关',
    value: '7',
    children: [
      {
        label: '新品升级',
        value: '0'
      },
      // {
      //   label: '产品质量',
      //   value: '1'
      // },
      {
        label: '产品情况',
        value: '2'
      },
    ]
  },
  {
    label: '其他',
    value: '1',
    children: [
      {
        label: '其他',
        value: '0'
      }
    ]
  },
]
// ui展示标签顺序
export const sentimentLabelsIndex = ['0', '2', '3', '4', '5', '6', '7', '1']
