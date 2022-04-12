// 签署方式
const kindOptions = {
  0: '在线签署',
  1: '线下签署'
}
// 签署状态
const statusOptions = {
  0: '待签署',
  1: '签署中',
  2: '签署完成',
  3: '签署失败',
  4: '作废'
}

export const columns = [
  { label: '合同编号', key: 'contractCode', maxlength: 50, minWidth: 150 },
  { label: '合同名称', key: 'contractName', maxlength: 50, minWidth: 150 },
  { label: '创建日期', key: 'startTime', minWidth: 150 },
  { label: '签署方式', key: 'signType', minWidth: 150, render: (data, item) => item && kindOptions[item] ? kindOptions[item] : '' },
  { label: '签署状态', key: 'signStatus', minWidth: 150, render: (data, item) => item && statusOptions[item] ? statusOptions[item] : '' },
  { label: '签署日期', key: 'signingDate', minWidth: 150 },
  { label: '合同有效期', key: 'time', minWidth: 300, render: (data, item) => data.validTime && data.invalidTime ? `${data.validTime} - ${data.invalidTime}` : '- -' },
  { label: '合同附件', key: 'files', minWidth: 150 },
]
