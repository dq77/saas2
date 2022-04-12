// hasGuide 1表示有指引  2表示无指引
export const dataSource = [
  { id: 1, name: 'creditType', menuTag: 'credit_system_type_setting', operationModule: 'CREDIT_SET', title: '第一步，授信设置', content: '企业可以根据自身的发展情况设置赊销规则，具体内容包括“赊销类型配置”、“赊销额度配置”、“营销规则配置”、“风险防范配置”、“审批材料配置”五个设置步骤' },
  { id: 2, name: 'QuotaAdd', menuTag: 'credit_system_launch_add', operationModule: 'CREDIT_APPLY', title: '第二步，发起授信', content: '赊销管理已覆盖渠道授信和直签授信两种业务场景；支持“年度授信”、“项目授信”、“直签授信”、“临时授信”四种授信类型' },
  { id: 3, name: 'quota', menuTag: 'credit_system_quota', operationModule: 'CREDIT_ACCOUNT', title: '第三步，授信列表', content: '授信额度管理中心' },
  { id: 4, name: 'useCredit', menuTag: 'credit_system_use_credit', operationModule: 'CREDIT_ORDER', title: '第四步，用信单列表', content: '根据企业的贸易订单管理授信额度的使用情况' },
  { id: 5, name: 'creditOperate', menuTag: 'supplier_saascredit_operate_manage', operationModule: 'CREDIT_DELIVERY', title: '最后一步，还款操作', content: '基于企业贸易订单的发货所形成的应收账款进行还款以恢复授客户信额度' }
]

// 各指引流程标识
export const guideCode = {
  CREDIT_SET: 1,
  CREDIT_APPLY: 2,
  CREDIT_ACCOUNT: 3,
  CREDIT_ORDER: 4,
  CREDIT_DELIVERY: 5
}
