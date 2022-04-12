import { assetsBaseUrl } from '@/utils/config'

export const companyData = [
  {
    key: 'orgYear',
    logo: `${assetsBaseUrl}/creditSystem/overview/iconManufactor.png`,
    title: '厂家年度授信总额',
    content: '该额度读取“授信设置”模块中的企业年度授信总额度',
    money: null
  },
  {
    key: 'dealerCredit',
    logo: `${assetsBaseUrl}/creditSystem/overview/iconUser.png`,
    title: '经销商授信总额',
    content: '统计授信类型为经销商授信且授信状态为“已授信”的额度汇总',
    money: null
  },
  {
    key: 'projectCredit',
    logo: `${assetsBaseUrl}/creditSystem/overview/iconPackage.png`,
    title: '项目授信总额',
    content: '统计授信类型为项目授信且授信状态为“已授信”的额度汇总',
    money: null
  }
]

export const pieOption = {
  series: [
    {
      type: 'pie',
      radius: ['62%', '80%'],
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
      color: ['#3C5DA4', '#25BECD'],
      data: [
        {value: 0, name: '年度授信已使用额度'},
        {value: 0, name: '年度授信剩余额度'}
      ]
    }
  ]
}
