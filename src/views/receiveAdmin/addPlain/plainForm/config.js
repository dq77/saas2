export const formData = {
  receivableType: undefined,
  receivablePlanName: undefined,
  extPlanCode: undefined,
  customerId: undefined,
  customerName: undefined,
  customerType: undefined,
  receivableAmount: undefined,
  receivableEndDate: undefined,
  hasName: undefined,
  selectName: undefined,
  projectSn: undefined,
  address: undefined,
  detailAddress: undefined,
  projectCompany: undefined,
  jsxName: undefined,
  remark: undefined,
  contractName: undefined,
  contractCode: undefined,
  proFiles: null,
  bsFiles: null,
  otherFiles: null
}
export const formConfig = [
  { type: null, slotName: 'basic' },
  { type: 'radio', key: 'receivableType', label: '应收类型', width: '330px', options: [{ label: '项目应收', value: 1 }, { label: '其他应收', value: 2 }] },
  { type: 'input', key: 'receivablePlanName', label: '应收名称', width: '330px', maxlength: 50 },
  { type: 'input', key: 'extPlanCode', label: '应收内部编号', width: '330px', maxlength: 50 },
  { type: 'select', key: 'customerId', label: '收款对象', width: '330px', options: [], slotName: 'customerName', loading: false, otherKeys: { label: 'customerName', value: 'id' }, filterable: true, remote: true, remoteMethod: null },
  { type: 'inputNumber', key: 'receivableAmount', label: '应收总金额（元）', width: '330px', precision: 2, min: 0.01, max: 99999999999.99 },
  { type: 'datePicker', key: 'receivableEndDate', label: '最后应收时间', width: '330px', valueFormat: 'yyyy-MM-dd' },
  { type: null, slotName: 'progress' },
  { type: 'input', key: 'hasName', label: '项目名称', width: '330px', isHidden: false, maxlength: 50, disabled: true, slotName: 'customerProject' },
  { type: 'select', key: 'selectName', label: '项目名称', width: '330px', options: [], otherKeys: { label: 'name', value: 'name' }, isHidden: true, clearable: true, disabled: true },
  { type: 'input', key: 'projectSn', label: '项目内部编号', width: '330px', maxlength: 50, disabled: true },
  { type: 'cascader', key: 'address', label: '项目地址', width: '330px', options: [], props: { value: 'code', label: 'name' }, clearable: true, disabled: true },
  { type: 'input', key: 'detailAddress', label: '详细地址', width: '330px', disabled: true },
  { type: 'select', key: 'projectCompany', label: '项目方名称', width: '330px', options: [], loading: false, otherKeys: { label: 'name', value: 'name' }, filterable: true, remote: true, remoteMethod: null, clearable: true, disabled: true },
  { type: 'select', key: 'jsxName', label: '经销商名称', width: '330px', options: [], loading: false, otherKeys: { label: 'customerName', value: 'customerName' }, filterable: true, remote: true, remoteMethod: null, clearable: true, disabled: true },
  { type: 'input', key: 'remark', label: '备注', width: '330px', maxlength: 500, disabled: true },
  { type: null, slotName: 'constract' },
  { type: 'input', key: 'contractName', label: '合同名称', width: '330px', maxlength: 50 },
  { type: 'input', key: 'contractCode', label: '内部合同编号', width: '330px', maxlength: 50 },
  { type: null, slotName: 'filelists' },
  { type: null, label: '项目合同', key: 'proFiles', slotName: 'proFiles' },
  { type: null, label: '标书', key: 'bsFiles', slotName: 'bsFiles' },
  { type: null, label: '其他项目文件', key: 'otherFiles', slotName: 'otherFiles' }
]
export const formRules = {
  receivableType: [{ required: true, message: '请选择应收类型', trigger: 'blur' }],
  receivablePlanName: [{ required: true, message: '请输入应收名称', trigger: 'blur' }],
  customerId: [{ required: true, message: '请选择收款对象', trigger: 'blur' }],
  receivableAmount: [{ required: true, message: '请输入应收总金额', trigger: 'blur' }],
  receivableEndDate: [{ required: true, message: '请选择最后应收时间', trigger: 'blur' }],
}
