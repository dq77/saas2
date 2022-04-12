// 系统催收时的form config
/* eslint-disable */
export const formConfig = [
  { type: 'input', key: 'title', label: '标题', width: '300px', clearable: true },
  {
    type: 'select', key: 'receiver', label: '消息推送角色', width: '300px', isHidden: true,
    clearable: true,
    filterable: true,
    remote: true,
    remoteMethod: null,
    options: [],
    otherKeys: { label: 'roleName', value: 'roleCode' },
  },
  { type: 'checkboxGroup', key: 'channels', label: '触达渠道', options: [] },
  {
    type: 'select', key: 'messageTemplateCode', label: '模型消息', width: '780px',
    clearable: true,
    options: [],
    otherKeys: { label: 'text', value: 'templateCode' },
  },
  { slotName: 'strategys', key: 'strategys', label: '模型策略' },
]

export const formData = {
  title: '',
  receiver: '',
  channels: [],
  messageTemplateCode: '',
  strategys: [
    {
      objectReferenceId: '',
      compareWay: '',
      compareValue: '',
      suffixText: '',
    }
  ]
}

export const formRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  receiver: [
    { required: true, message: '请选择消息推送角色', trigger: 'blur' }
  ],
  channels: [
    { required: true, message: '请选择触发渠道', trigger: 'blur' }
  ],
  messageTemplateCode: [
    { required: true, message: '请选择消息模板', trigger: 'blur' }
  ],
  strategys: [
    { required: true },
  ],
}
