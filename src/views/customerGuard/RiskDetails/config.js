const riskLevels = [{label: '预警', value: '预警'}, {label: '提醒', value: '提醒'}]
// tab
export const tabs = [
  {
    name: 'detail',
    label: '风险明细'
  },
  {
    name: 'news',
    label: '新闻舆情'
  }
]

// detail => form & table
export const cFormData = {
  companyName: undefined,
  riskLevel: undefined,
  riskTypes: undefined,
  time: undefined,
  startTime: undefined,
  endTime: undefined,
  address: undefined,
  provinceName: undefined
}
export const getFormConfig = [
  {
    type: 'input',
    key: 'companyName',
    label: '企业名称',
    clearable: true
  },
  {
    type: 'select',
    key: 'riskLevel',
    label: '风险等级',
    clearable: true,
    options: riskLevels
  },
  {
    type: 'cascader',
    key: 'address',
    label: '省区',
    options: [],
    props: { label: 'name', value: 'name' },
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    label: '推送时间',
    clearable: true,
    kind: 'daterange'
  },
  {
    type: null,
    key: 'riskTypes',
    label: '风险类型',
    span: 18,
    slotName: 'riskTypes'
  },
]

export const collectionColumns = [
  { label: '企业名称', key: 'companyName' },
  { label: '风险类型', key: 'riskType', slotName: 'riskType' },
  { label: '风险等级', key: 'riskLevel' },
  { label: '省区', key: 'provinceName' },
  { label: '推送时间', key: 'pushTime' },
  { label: '操作', key: 'operate', slotName: 'operate', width: 130 },
]

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
