import { vPhone, vIdcardNumber } from '@/utils/validateRules'
// 如果非必填，则只检测有值情况的规范
const curPhone = (status) => {
  if (status === '1') return vPhone
  return (rule, value, callback) => {
    return value ? vPhone(rule, value, callback) : callback()
  }
}
const curIdcardNumber = (status) => {
  if (status === '1') return vIdcardNumber
  return (rule, value, callback) => {
    return value ? vIdcardNumber(rule, value, callback) : callback()
  }
}
const maritalStatus = {
  1: '已婚',
  2: '未婚',
  3: '离异'
}

const houseOwnerOptions = [
  { label: '法人', value: '1' },
  { label: '法人配偶', value: '2' },
  { label: '共有', value: '3' },
]

export const cFormConfig = [
  { type: 'input', key: 'name', label: '法人代表姓名', span: 12 },
  { type: 'input', key: 'idCardNo', label: '法人代表证件号', span: 12 },
  { type: 'input', key: 'contactPhone', label: '法人联系号', span: 12 },
  { type: 'select', key: 'maritalStatus', label: '婚姻状况', span: 12, options: Object.keys(maritalStatus).map(key => ({ label: maritalStatus[key], value: key })) },
]
export const spouseFormConfig = [
  { type: 'input', key: 'name', label: '配偶姓名', span: 12 },
  { type: 'input', key: 'idCardNo', label: '配偶证件号', span: 12 },
  { type: 'input', key: 'contactPhone', label: '配偶联系号码', span: 12 },
]
export const cFormData = {
  name: undefined,
  idCardNo: undefined,
  contactPhone: undefined,
  maritalStatus: undefined,
}
export const spouseFormData = {
  name: undefined,
  idCardNo: undefined,
  contactPhone: undefined,
}
export const formRules = {
  name: [
    { required: true, message: '请输入法人代表姓名', trigger: 'blur' }
  ],
  idCardNo: [
    { required: true, validator: vIdcardNumber, trigger: ['change', 'blur'] },
  ],
  contactPhone: [
    { required: true, validator: vPhone, trigger: ['change', 'blur'] },
  ],
  maritalStatus: [
    { required: true, message: '请输入婚姻状况', trigger: 'blur' }
  ],
}
export const setSpouseFormRules = (status) => {
  return {
    name: [
      { required: status === '1', message: '请输入配偶姓名', trigger: ['change', 'blur'] },
    ],
    idCardNo: [
      { required: status === '1', validator: curIdcardNumber(status), trigger: ['change', 'blur'] },
    ],
    contactPhone: [
      { required: status === '1', validator: curPhone(status), trigger: ['change', 'blur'] },
    ],
  }
}
export const columns = [
  { label: '房产资料', key: 'fileKey', type: 'input', width: 200, fixed: 'left' },
  { label: '房产编号', key: 'ownershipNumber', type: 'input', width: 200 },
  { label: '房屋所有人', key: 'rightHolder', type: 'select', width: 200, options: houseOwnerOptions },
  { label: '房屋地区', key: 'locateLocationCode', type: 'input', width: 260 },
  { label: '房屋详细地址', key: 'locateLocation', type: 'input', width: 200 },
  // { label: '房屋楼层', key: 'houseFloor', type: 'input', width: 200 },
  { label: '建筑面积(平方米)', key: 'buildingArea', type: 'inputNumber', min: 0, max: 'repaymentAmount', precision: 2, align: 'center', width: 200 },
  { label: '房产价值(万元)', key: 'houseValue', type: 'inputNumber', min: 0, max: 'repaymentAmount', precision: 2, align: 'center', width: 200 },
  { label: '规划用途', key: 'planningUse', type: 'input', width: 200 },
  { label: '房屋性质', key: 'houseNature', type: 'input', width: 200 },
  { label: '操作', key: 'operate', width: 100, fixed: 'right' },
]

// 可编辑table的插入行默认数据
export const dataSample = {
  fileKey: undefined,
  fileName: undefined,
  ownershipNumber: undefined,
  rightHolder: undefined,
  locateLocationCode: [],
  locateLocation: undefined,
  // houseFloor: undefined,
  buildingArea: undefined,
  houseValue: undefined,
  planningUse: undefined,
  houseNature: undefined,
}
