export const ddTabs = [
  // { label: '流程配置', value: 'process' },
  { label: '钉钉应用配置', value: 'ddApp' }
]

// 接口返回数据独有的配置，与form数据一一对应
export const apiConfig = {
  'dingtalk.agent.id': 'AgentId',
  'dingtalk.app.key': 'AppKey',
  'dingtalk.app.secret': 'AppSceret',
  'dingtalk.notify.aeskey': 'NotifyAeskey',
  'dingtalk.notify.token': 'NotifyToken',
  'dingtalk.enable': 'Enable'
}

export const cFormData = {
  AgentId: undefined,
  AppKey: undefined,
  AppSceret: undefined,
  NotifyAeskey: undefined,
  NotifyToken: undefined,
  Enable: '否'
}
// 签名 token：
// 加密 aes_key：
export const cFormConfig = [
  { type: 'text', key: 'AgentId', label: 'AgentId：' },
  { type: 'text', key: 'AppKey', label: 'AppKey：' },
  { type: 'text', key: 'AppSceret', label: 'AppSecret：', slotName: 'AppSecret' },
  { type: 'text', key: 'NotifyAeskey', label: '加密aes_key：' },
  { type: 'text', key: 'NotifyToken', label: '签名token：' },
  { type: 'text', key: 'Enable', label: '同步组织架构：', activeValue: '1', inactiveValue: '0' }
]

export const formAttrs = {
  AgentId: {
    type: 'input'
  },
  AppKey: {
    type: 'input'
  },
  AppSceret: {
    type: 'input'
  },
  NotifyAeskey: {
    type: 'input'
  },
  NotifyToken: {
    type: 'input'
  },
  Enable: {
    type: 'switch',
    // options: {
    //   0: '否',
    //   1: '是',
    //   是: 1,
    //   否: 0
    // }
  }
}

export const cFormRules = {
  AgentId: [
    { required: true, message: '请输入AgentId', trigger: ['blur', 'change'] }
  ],
  AppKey: [
    { required: true, message: '请输入AppKey', trigger: ['blur', 'change'] }
  ],
  AppSceret: [
    { required: true, message: '请输入AppSecret', trigger: ['blur', 'change'] }
  ],
  NotifyAeskey: [
    { required: true, message: '请输入加密aes_key', trigger: ['blur', 'change'] }
  ],
  NotifyToken: [
    { required: true, message: '请输入签名token', trigger: ['blur', 'change'] }
  ],
}
