export const configs = [
  {
    label: '项目应收',
    detail: [
      { label: '应收类型', key: 'receivableName' },
      { label: '应收名称', key: 'receivablePlanName' },
      { label: '内部编号', key: 'extPlanCode' },
      { label: '收款对象', key: 'customerName' },
      { label: '应收总金额（元）', key: 'receivableAmount' },
      { label: '最后应收时间', key: 'receivableEndDate' }
    ]
  }, {
    label: '关联项目信息',
    key: 'projectDetail',
    detail: [
      { label: '项目名称', key: 'name' },
      { label: '内部编号', key: 'projectSn' },
      { label: '项目地址', key: 'address' },
      { label: '详细地址', key: 'detailAddress' },
      { label: '项目方', key: 'projectCompany' },
      { label: '经销商', key: 'customerName' },
      { label: '备注', key: 'remark' },
    ]
  }, {
    label: '关联合同信息',
    key: 'contractRelDetail',
    detail: [
      { label: '合同名称', key: 'contractName' },
      { label: '内部编号', key: 'contractCode' },
    ]
  }
]
