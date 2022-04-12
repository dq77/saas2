export const formData = { limitType: 1, applicationScenario: [], limitObject: 1, cycle: undefined }

export const formConfig = [
  { type: 'radio', key: 'limitType', label: '限制方式：', options: [{ label: '规则提醒', value: '1' }, { label: '阻止业务(即，根据规则阻断业务继续发生)', value: '2' }] },
  { type: 'checkboxGroup', key: 'applicationScenario', label: '应用场景：', options: [{ label: '授信申请', value: 'creditApply' }, { label: '使用授信额度(即，业务开单)', value: 'create_order' }] },
  { type: 'radio', key: 'limitObject', label: '限制对象：', options: [{ label: '仅业务员', value: '1' }, { label: '仅经销商(含：项目方)', value: '2' }] },
  { type: null, key: 'cycle', label: '配置规则条件：', slotName: 'cycle' },
]
