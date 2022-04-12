export const pieOption = {
  series: [
    {
      type: 'pie',
      radius: ['82%', '100%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      color: ['#3B68F0', '#8CC5F6', '#7D6FF9'],
      data: [
        {value: 0, name: '项目应收'},
        {value: 0, name: '赊销应收'},
        {value: 0, name: '其他应收'}
      ]
    }
  ]
}

export const infos = [
  { label: '项目应收', color: '#3B68F0', key: 'projectVal', percet: 'projectPer' },
  { label: '赊销应收', color: '#8CC5F6', key: 'creditVal', percet: 'creditPer' },
  { label: '其他应收', color: '#7D6FF9', key: 'otherVal', percet: 'otherPer' }
]
