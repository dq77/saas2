import { ref } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import { checkFormData, checkFormConfig, checkFormRules } from './config'

export default ({
  setTitle,
  formApis
}) => {
  // useTimeout
  const { perTimeout } = useTimeout()
  // 是否已经切换
  const isCheck = ref(false)
  // 设置isCheck
  const setIsCheck = value => { isCheck.value = value }
  // 切换表单为添加销售组织及授信额度
  const orgCheckHandle = () => {
    isCheck.value = true
    setTitle && setTitle('添加销售组织及授信额度')
    formApis.setFormData(checkFormData)
    formApis.setConfigs(checkFormConfig)
    formApis.setFormRules(checkFormRules)
    perTimeout(() => formApis.clearValidate())
  }

  return {
    isCheck,
    setIsCheck,
    orgCheckHandle
  }
}
