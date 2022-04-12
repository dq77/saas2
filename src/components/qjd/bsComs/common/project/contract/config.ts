// 签署方式
const kindOptions = [
  // { label: '在线签署', value: 0 },
  { label: '线下签署', value: 1 }
]
// 签署状态
const statusOptions = [
  { label: '待签署', value: 0 },
  { label: '签署中', value: 1 },
  { label: '签署完成', value: 2 },
  { label: '签署失败', value: 3 },
  { label: '作废', value: 4 },
]

export const columns = [
  { label: '合同编号', key: 'contractCode', type: 'input', maxlength: 50, minWidth: 150 },
  { label: '合同名称', key: 'contractName', type: 'input', maxlength: 50, minWidth: 150 },
  { label: '创建日期', key: 'startTime', type: 'datePicker', minWidth: 150 },
  { label: '签署方式', key: 'signType', type: 'select', options: kindOptions, minWidth: 150 },
  { label: '签署状态', key: 'signStatus', type: 'select', options: statusOptions, minWidth: 150 },
  { label: '签署日期', key: 'signingDate', type: 'datePicker', minWidth: 150 },
  { label: '合同有效期', key: 'time', type: 'datePicker', kind: 'daterange', minWidth: 300 },
  { label: '合同附件', key: 'files', minWidth: 150 },
  { label: '操作', key: 'operate', options: [{ label: '删除' }], width: 60, fixed: 'right' }
]

export const dataSample = { contractCode: null, contractName: null, startTime: null, signType: null, signStatus: null, signingDate: null, time: null, projectContractFileList: null, defaultFileList: [], files: [] }
