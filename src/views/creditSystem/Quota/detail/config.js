import { toAmountStr } from '@/utils/util'

const getAddress = dataSource => dataSource && dataSource.province ? `${dataSource.province || ''}${dataSource.city ? '-' + dataSource.city : ''}${dataSource.region ? '-' + dataSource.region : ''}${dataSource.detailAddress ? ',' + dataSource.detailAddress : ''}` : '- -'

export const defaultActiveName = ['user', 'credit', 'project', 'contract']

export const colColumns = [
  { label: '客户信息', key: 'user' },
  { label: '授信信息', key: 'credit' },
]

export const colProColumns = [
  { label: '项目信息', key: 'project' },
  { label: '合同信息', key: 'contract' }
]

export const userColumns = [
  { label: '经销商名称：', key: 'customerName' },
  { label: '社会信用代码：', key: 'socialCode' },
  { label: '客户编号：', key: 'extCustomCode' },
  { label: '法人姓名：', key: 'legalPersonName' },
  { label: '法人身份证号码：', key: 'legalPersonCode' },
  { label: '法人手机号：', key: 'legalPersonMobile' },
]

export const creditColumns = [
  { label: '授信类型：', key: 'creditTypeName' },
  { label: '申报时间：', key: 'createdTime' },
  { label: '授信状态：', key: 'creditStatusName' },
  { label: '授信额度：', key: 'creditAmount', render: (dataSource, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '授信已使用额度', key: 'test1' },
  { label: '剩余额度：', key: 'remainingAmount', render: (dataSource, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '授信使用已超出额度', key: 'test2' },
  { label: '失效时间：', key: 'validTo' },
  { label: '额度来源：', key: 'salesAreaName' },
  { label: '销区年度总额：', key: 'salesAreaAmount', render: (dataSource, item) => item ? toAmountStr(item, undefined, true) : '- -' },
]

export const projectColumns = [
  { label: '项目名称：', key: 'name' },
  { label: '项目地址：', key: 'province', render: (dataSource = {}) => getAddress(dataSource) },
  { label: '项目编号：', key: 'extId' },
  { label: '项目方：', key: 'projectCompany' },
  { label: '累积合同金额：', key: 'contractAmount', render: (dataSource, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '项目文件：', key: 'fileList' },
]

export const contractColumns = [
  { label: '合同编号：', key: 'contractCode' },
  { label: '合同名称：', key: 'contractName' },
  { label: '合同金额：', key: 'contractAmount', render: (dataSource, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '合同签署日期：', key: 'signingDate' },
]
