import { toAmountStr, isNumber } from '@/utils/util'
import { percent2, getDate } from '@/utils/qjd'
// 公司地址
const getCompanyAddress = dataSource => dataSource && dataSource.companyProvince ? `${dataSource.companyProvince || ''}
${dataSource.companyCity ? '-' + dataSource.companyCity : ''}${dataSource.companyRegion ? '-' + dataSource.companyRegion : ''}
${dataSource.companyAddressDetails ? ',' +
dataSource.companyAddressDetails : ''}` : '- -'
// 家庭地址
const getHouseAddress = dataSource => dataSource && dataSource.houseProvince ? `${dataSource.houseProvince	 || ''}
${dataSource.houseCity ? '-' + dataSource.houseCity : ''}${dataSource.houseRegion ? '-' + dataSource.houseRegion : ''}
${dataSource.houseAddress ? ',' + dataSource.houseAddress : ''}` : '- -'

export const defaultActiveName = ['collection', 'receive', 'linkWay', 'paymentCycle', 'record']

export const colColumns = [
  { label: '催收详情', key: 'collection' },
  { label: '应收详情', key: 'receive' },
  { label: '联系方式', key: 'linkWay' },
  { label: '阶段回款记录', key: 'paymentCycle' },
  { label: '催收记录', key: 'record' },
]

export const collectionColumns = [
  { label: '客户名称：', key: 'customerName' },
  { label: '剩余应收总金额：', key: 'remainReceivableAmount' },
  { label: '逾期总金额：', key: 'overdueAmount' },
  { label: '系统催收总记录数：', key: 'systemUrgeCount' },
  { label: '人工催收总记录数：', key: 'manualUrgeCount' },
  { label: '客户回款总记录数：', key: 'customerReturnCount' },
]

export const receiveColumns = [
  { label: '应收类型', key: 'receivableTypeName' },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '编号', key: 'receivablePlanCode' },
  { label: '外部编号', key: 'extendPlanItemCode' },
  { label: '计划应收时间', key: 'planEndDate', render: (row, item) => item ? getDate(item) : '- -' },
  { label: '计划应收金额', key: 'receivableAmount', render: (row, item) => item ? percent2(item) : '- -' },
  { label: '剩余未收回金额', key: 'remainingAmount', align: 'right', render: (row, item) => item ? percent2(item) : '- -' },
]

export const linkWayColumns = [
  { label: '联系人关系', key: 'contractRelationshipName' },
  { label: '联系人姓名', key: 'contractName' },
  { label: '联系电话', key: 'contractTel' },
  { label: '联系邮箱', key: 'contractEmail' },
  { label: '公司地址', key: 'companyProvince', render: (row, item) => item ? getCompanyAddress(row) : '- -' },
  { label: '家庭地址', key: 'houseProvince', render: (row, item) => item ? getHouseAddress(row) : '- -' },
]

export const paymentCycleColumns = [
  { label: '回款日期', key: 'returnDate', render: (row, item) => item ? getDate(item) : '- -' },
  { label: '银行流水号', key: 'bankSerialNo' },
  { label: '回款金额', key: 'returnAmount', render: (row, item) => item ? toAmountStr(isNumber(item) ? item : 0, undefined, true) : '- -' },
  { label: '银行凭证', key: 'saArmBusinessFileList', slotName: 'saArmBusinessFileList' },
  { label: '备注', key: 'remark' },
]

export const recordColumns = [
  { label: '催收行动时间', key: 'urgeTime', minWidth: 120 },
  { label: '行动类型', key: 'actionType' },
  { label: '本次催收联系人', key: 'urgeContact', minWidth: 120 },
  { label: '联系电话', key: 'contractTel' },
  { label: '联系邮箱', key: 'contractEmail' },
  { label: '实际催收人', key: 'urgePerson' },
  { label: '催收类型', key: 'urgeType' },
  { label: '是否触达', key: 'isTouch', render: (row, item) => item === 1 ? '是' : '否' },
  { label: '备注', key: 'remark' },
]

export const detailColums = [
  { label: '剩余应收总金额', key: 'remainReceivableAmount', transform: true },
  { label: '逾期总金额', key: 'overdueAmount', transform: true },
  { label: '系统催收总记录数', key: 'systemUrgeCount' },
  { label: '人工催收总记录数', key: 'manualUrgeCount' },
  { label: '客户回款总记录数', key: 'customerReturnCount' }
]
