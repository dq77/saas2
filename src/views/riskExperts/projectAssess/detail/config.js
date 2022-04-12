// 评估-项目类型
// 1居住建筑，2市政建筑，3企事业建筑，4商业娱乐建筑，5生产性建筑
export const projectType = {
  1: '居住建筑',
  2: '市政建筑',
  3: '企事业建筑',
  4: '商业娱乐建筑',
  5: '生产性建筑',
}
// 评估-股东性质
// 1上市公司，2普通公司
export const shareholdersType = {
  1: '上市公司',
  2: '普通公司',
}
// 评估-项目方类型
// 1直签项目，2总包项目，3挂靠项目
export const projectPartyType = {
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
    { type: 'text', key: 'name', label: '项目名称', span: 12 },
    { type: 'text', key: 'projectType', label: '项目类型', span: 12 },
    {
      type: 'text',
      key: 'buildingName',
      label: '建筑工程商名称',
      span: 12,
    },
    {
      type: 'text',
      key: 'projectCompany',
      label: '项目公司',
      span: 12,
    },
    { type: 'text', key: 'shareholdersType', label: '股东性质', span: 12 },
    { type: 'text', key: 'projectPartyType', label: '项目方类型', span: 12 },
    {
      key: 'hasFile', label: '合同附件', slotName: 'hasFile', isHidden: false, disabled: true,
    },
  ]
}
