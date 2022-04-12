import { assetsBaseUrl } from '@/utils/config'

export const dataSource = [
  {
    title: '发起授信',
    url: `${assetsBaseUrl}/creditSystem/overview/credit.png`,
    info: '客户向厂家发起授信额度的申请',
    bg: '#E8F0FB',
    name: 'QuotaAdd',
    menuTag: 'credit_system_launch_add'
  },
  {
    title: '新建用信单',
    url: `${assetsBaseUrl}/creditSystem/overview/createUse.png`,
    info: '客户根据实际的业务订单使用授信额度',
    bg: '#FFF8E7',
    name: 'createUseCredit',
    menuTag: 'credit_system_create_use'
  },
  {
    title: '新建还款单',
    url: `${assetsBaseUrl}/creditSystem/overview/createPay.png`,
    info: '客户根据实际的业务发货生成还款单',
    bg: '#EDF8F1',
    name: 'createRePayMent',
    menuTag: 'credit_system_create_pay'
  }
]
