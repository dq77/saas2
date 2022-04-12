import { assetsBaseUrl } from '@/utils/config'

export const dataSource = [
  {
    title: '添加计划',
    url: `${assetsBaseUrl}/receiveAdmin/addPlan.png`,
    desc: '创建应收账款信息与计划',
    bg: '#E8F0FB',
    name: 'AddPlain',
    menuTag: 'receivable_plan_management'
  },
  {
    title: '添加收款',
    url: `${assetsBaseUrl}/receiveAdmin/addPay.png`,
    desc: '收款后核销应收计划',
    bg: '#FFF8E7',
    name: 'AddPay',
    menuTag: 'receivable_payment_management'
  },
  {
    title: '应收信息查询',
    url: `${assetsBaseUrl}/receiveAdmin/infoSearch.png`,
    desc: '查询应收信息详情',
    bg: '#EDF8F1',
    name: 'InfoSearch',
    menuTag: 'receivable_search_management'
  },
  {
    title: '应收系统配置',
    url: `${assetsBaseUrl}/receiveAdmin/systemConfig.png`,
    desc: '个性化配置场景参数',
    bg: '#E6E5FA',
    name: 'SystemConfig',
    menuTag: 'receivable_config_management'
  }
]
