import { computed } from '@vue/composition-api'

export default function ({
  formState,
  optionsState,
}) {
  // 前端自定义的模型策略的唯一序号
  let strategyIndex = 0
  // 创建行
  const createStrategyRow = () => {
    return {
      strategyIndex: strategyIndex++,
      objectReferenceId: '',
      compareValue: '', // 比较符号
      valueType: '', // 比较值
      suffixText: '',
      objectType: null, // 后端需要
    }
  }

  const showAddBtn = computed(() => {
    return optionsState.objectReferenceOptions.length > formState.formData.strategys.length
  })

  // 变更作用对象
  const changeObjectReference = (v, row) => {
    if (v) {
      const or = optionsState.objectReferenceOptions.find(item => item.id === v)
      row.suffixText = or.suffixText
      row.objectType = or.objectType
    } else {
      row.suffixText = ''
      row.objectType = ''
    }
    optionsState.renderSelectedObjectReference()
  }

  // 添加模型策略
  const addStrategy = () => {
    formState.formData.strategys.push(createStrategyRow())
  }
  // 删除模型策略
  const delStrategy = (strategy, index) => {
    formState.formData.strategys.splice(index, 1)
    optionsState.renderSelectedObjectReference()
  }
  // 模型策略校验规则
  const vStrategys = () => {
    const strategys = formState.formData.strategys
    if (strategys.length <= 0) {
      formState.setConfig('strategys', 'info', '请添加模型策略')
      return false
    }
    for (let i = 0; i < strategys.length; i++) {
      const strategy = strategys[i]
      if (!strategy.objectReferenceId) {
        formState.setConfig('strategys', 'info', '作用对象不能为空')
        return false
      }
      if (!strategy.compareWay) {
        formState.setConfig('strategys', 'info', '比较符号不能为空')
        return false
      }
      if (!strategy.compareValue) {
        formState.setConfig('strategys', 'info', '数值不能为空')
        return false
      }
    }
    return true
  }
  return {
    showAddBtn,
    createStrategyRow,
    changeObjectReference,
    addStrategy,
    delStrategy,
    vStrategys,
  }
}
