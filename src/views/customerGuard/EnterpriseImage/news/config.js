export const hotWordsOption = {
  series: [{
    type: 'wordCloud',
    left: 'center',
    top: 'center',
    width: '90%',
    height: '90%',
    right: null,
    bottom: null,
    gridSize: 10,
    sizeRange: [12, 40],
    rotationRange: [-45, 45],
    shape: 'circle',
    drawOutOfBound: true,
    layoutAnimation: true,
    textStyle: {
      color: '#3C5DA4'
    },
    emphasis: {
      focus: 'self',
      textStyle: {
        textShadowBlur: 10,
        textShadowColor: '#ddd'
      }
    },
    data: []
  }]
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

