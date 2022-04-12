export const mFormData = {
  name: undefined,
  proName: undefined,
  extId: undefined
}

export const mFormConfig = [
  {
    type: 'text',
    key: 'proName',
    label: '所属属性',
    isHidden: true
  },
  {
    type: 'input',
    key: 'name',
    label: '属性名称'
  },
  {
    type: 'input',
    key: 'extId',
    label: '外部属性Id'
  }
]
export const mFormDataItem = {
  name: undefined,
  proName: undefined,
  extId: undefined
}

export const mFormConfigItem = [
  {
    type: 'text',
    key: 'proName',
    label: '所属属性',
    isHidden: true
  },
  {
    type: 'input',
    key: 'name',
    label: '属性项名称'
  },
  {
    type: 'input',
    key: 'extId',
    label: '外部属性项Id'
  }
]
export const mFormRules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['change', 'blur']
    }
  ]
}
export const promptInfoTitle = '若您的产品有多种属性，你可以在这里进行配置。在配置的过程中，需要先配置具体的产品属性名称，之后再对属性项进行配置。'
