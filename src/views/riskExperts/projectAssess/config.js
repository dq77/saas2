// 评估-项目类型
// 1居住建筑，2市政建筑，3企事业建筑，4商业娱乐建筑，5生产性建筑
const projectType = {
  1: '居住建筑',
  2: '市政建筑',
  3: '企事业建筑',
  4: '商业娱乐建筑',
  5: '生产性建筑',
}
// 评估-股东性质
// 1上市公司，2普通公司
const shareholdersType = {
  1: '上市公司',
  2: '普通公司',
}
// 评估-项目方类型
// 1直签项目，2总包项目，3挂靠项目
const projectPartyType = {
  1: '直签项目',
  2: '总包项目',
  3: '挂靠项目',
}

export const pFormData = {
  name: undefined,
  projectType: undefined,
  buildingName: undefined,
  projectCompany: undefined,
  uniformCreditCode: undefined,
  shareholdersType: undefined,
  projectPartyType: undefined,
  hasFile: undefined,
  fileList: [],
}

export const getFormConfig = (getBuildingName, getProjectCompany) => {
  return [
    { type: 'input', key: 'name', label: '项目名称', span: 12 },
    { type: 'select', key: 'projectType', label: '项目类型', span: 12, options: Object.keys(projectType).map(key => ({ label: projectType[key], value: parseInt(key) })) },
    {
      type: 'select',
      key: 'buildingName',
      label: '建筑工程商名称',
      span: 12,
      filterable: true,
      remote: true,
      otherKeys: { label: 'name', value: 'name' },
      remoteMethod: getBuildingName,
      options: [],
      clearable: true
    },
    {
      type: 'select',
      key: 'uniformCreditCode',
      label: '项目公司',
      span: 12,
      filterable: true,
      remote: true,
      otherKeys: { label: 'name', value: 'creditCode' },
      remoteMethod: getProjectCompany,
      options: [],
      clearable: true
    },
    { type: 'select', key: 'shareholdersType', label: '股东性质', span: 12, options: Object.keys(shareholdersType).map(key => ({ label: shareholdersType[key], value: parseInt(key) })) },
    { type: 'select', key: 'projectPartyType', label: '项目方类型', span: 12, options: Object.keys(projectPartyType).map(key => ({ label: projectPartyType[key], value: parseInt(key) })) },
    {
      key: 'hasFile', label: '合同附件', slotName: 'hasFile', isHidden: false, disabled: false,
    },
  ]
}

export const pFormRules = (checkFile) => {
  return {
    name: [
      { required: true, message: '请输入项目名称', trigger: ['change', 'blur'] },
    ],
    projectType: [
      { required: true, message: '请选择项目类型', trigger: ['change', 'blur'] },
    ],
    addressCode: [
      { required: true, message: '请输入项目地址', trigger: ['change', 'blur'] },
    ],
    detailAddress: [
      { required: true, message: '请输入项目详细地址', trigger: ['change', 'blur'] },
    ],
    buildingName: [
      { required: true, message: '请输入建筑工程商名称', trigger: ['change', 'blur'] },
    ],
    uniformCreditCode: [
      { required: true, message: '请输入项目公司', trigger: ['change', 'blur'] },
    ],
    shareholdersType: [
      { required: true, message: '请选择股东性质', trigger: ['change', 'blur'] },
    ],
    projectPartyType: [
      { required: true, message: '请选择项目方类型', trigger: ['change', 'blur'] },
    ],
    hasFile: [
      { required: true, message: '请选择是否有合同附件', trigger: ['change', 'blur'] },
      { validator: checkFile, trigger: 'blur' },
    ]
  }
}
